// Workaround for Windows loopback WFP/socket filter issue where multi-write
// chunked HTTP responses stall after the first TCP send.
// Intercepts writeHead, flushHeaders, write, and end on http.ServerResponse
// so that headers and body are always buffered and sent in a single TCP write
// with an explicit Content-Length header (never Transfer-Encoding: chunked).

// Only enable on Windows. On Linux (e.g. Render.com / Docker) or macOS, Next.js standard HTTP handling works normally.
if (process.platform !== "win32") {
  module.exports = {};
  return;
}

const http = require("http");
const path = require("path");

const selfPath = path.resolve(__filename).replace(/\\/g, "/");
const requireFlag = `--require "${selfPath}"`;
if (!process.env.NODE_OPTIONS || !process.env.NODE_OPTIONS.includes(selfPath)) {
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS
    ? `${process.env.NODE_OPTIONS} ${requireFlag}`
    : requireFlag;
}

const origWriteHead = http.ServerResponse.prototype.writeHead;
const origWrite = http.ServerResponse.prototype.write;
const origEnd = http.ServerResponse.prototype.end;

http.ServerResponse.prototype.flushHeaders = function flushHeadersNoop() {
  // Defer flushing headers until end() so headers + body go out in one write.
};

http.ServerResponse.prototype.writeHead = function patchedWriteHead(
  statusCode,
  statusMessage,
  headers
) {
  this.statusCode = statusCode;
  let hdrs = headers;
  if (typeof statusMessage === "object" && statusMessage !== null) {
    hdrs = statusMessage;
  } else if (typeof statusMessage === "string") {
    this.statusMessage = statusMessage;
  }
  if (hdrs) {
    if (Array.isArray(hdrs)) {
      for (let i = 0; i < hdrs.length; i++) {
        const entry = hdrs[i];
        if (Array.isArray(entry) && entry.length === 2) {
          this.setHeader(entry[0], entry[1]);
        }
      }
    } else {
      for (const key of Object.keys(hdrs)) {
        if (hdrs[key] !== undefined) {
          this.setHeader(key, hdrs[key]);
        }
      }
    }
  }
  return this;
};

http.ServerResponse.prototype.write = function patchedWrite(
  chunk,
  encoding,
  cb
) {
  if (this.headersSent) {
    return origWrite.call(this, chunk, encoding, cb);
  }
  if (!this._winChunks) {
    this._winChunks = [];
  }
  if (chunk !== undefined && chunk !== null && typeof chunk !== "function") {
    const buf = Buffer.isBuffer(chunk)
      ? chunk
      : Buffer.from(
          chunk,
          typeof encoding === "string" ? encoding : undefined
        );
    if (buf.byteLength > 0) {
      this._winChunks.push(buf);
    }
  }
  if (typeof encoding === "function") {
    encoding();
  } else if (typeof cb === "function") {
    cb();
  }
  return true;
};

http.ServerResponse.prototype.end = function patchedEnd(chunk, encoding, cb) {
  const callback =
    typeof chunk === "function"
      ? chunk
      : typeof encoding === "function"
      ? encoding
      : cb;

  if (!this.headersSent) {
    const chunks = this._winChunks || [];
    this._winChunks = null;
    if (chunk !== undefined && chunk !== null && typeof chunk !== "function") {
      const buf = Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(
            chunk,
            typeof encoding === "string" ? encoding : undefined
          );
      if (buf.byteLength > 0) {
        chunks.push(buf);
      }
    }
    const full = chunks.length > 0 ? Buffer.concat(chunks) : Buffer.alloc(0);
    this.shouldKeepAlive = false;
    this.removeHeader("Transfer-Encoding");
    this.removeHeader("Keep-Alive");
    this.setHeader("Connection", "close");
    if (
      this.statusCode !== 204 &&
      this.statusCode !== 304 &&
      !(this.req && this.req.method === "HEAD")
    ) {
      this.setHeader("Content-Length", full.byteLength);
    }
    origWriteHead.call(this, this.statusCode || 200, this.statusMessage);
    if (
      this._hasBody === false ||
      this.statusCode === 204 ||
      this.statusCode === 304 ||
      (this.req && this.req.method === "HEAD")
    ) {
      return origEnd.call(this, callback);
    }
    return origEnd.call(this, full, callback);
  }

  return origEnd.call(this, chunk, encoding, cb);
};
