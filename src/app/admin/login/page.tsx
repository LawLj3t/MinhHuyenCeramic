'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound,
  Store,
  Layers
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, currentUser, setIsAdminOpen } = useStore();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in as Admin or Manager, redirect with admin panel
  useEffect(() => {
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'manager')) {
      const timer = setTimeout(() => {
        setIsAdminOpen(true);
        router.push('/');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [currentUser, router, setIsAdminOpen]);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim() || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ tài khoản và mật khẩu quản trị.');
      return;
    }

    setIsLoading(true);

    try {
      const result = login(identifier.trim(), password);

      if (!result.success || !result.user) {
        setErrorMsg(result.message || 'Thông tin xác thực không chính xác.');
        setIsLoading(false);
        return;
      }

      // Role check: Only admin or manager are allowed into this portal
      if (result.user.role !== 'admin' && result.user.role !== 'manager') {
        setErrorMsg('Truy cập bị từ chối: Tài khoản khách hàng thông thường không có quyền vào Cổng Quản Trị Nội Bộ.');
        setIsLoading(false);
        return;
      }

      setSuccessMsg(`Xác thực thành công! Xin chào ${result.user.name} (${result.user.role === 'admin' ? 'Chủ Xưởng' : 'Quản Lý Bán Hàng'}). Đang mở bảng điều hành...`);
      
      setTimeout(() => {
        setIsAdminOpen(true);
        router.push('/');
      }, 800);

    } catch (err) {
      setErrorMsg('Đã có lỗi kết nối máy chủ quản trị.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-[#1A3D4B] via-[#163845] to-[#0A1A21] flex flex-col font-sans text-white selection:bg-[#C9A24B]/30 selection:text-[#163845]">
      
      {/* Top Bar */}
      <header className="py-4 px-4 sm:px-8 border-b border-[#C9A24B]/30 bg-[#0D242D]/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-[#C9A24B] p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <img
              src="/images/logo.png"
              alt="Minh Huyền Ceramic"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-serif font-black text-sm sm:text-base text-[#E2C67E] tracking-wider uppercase">
              Minh Huyền Ceramic
            </div>
            <div className="text-[10px] text-white/70 tracking-widest font-sans uppercase">
              Cổng Điều Hành Nội Bộ
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-[#E2C67E] transition-colors py-1.5 px-3 rounded-lg hover:bg-white/10"
        >
          <Store className="w-4 h-4 text-[#E2C67E]" />
          <span>Về Gian Hàng</span>
        </Link>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-[#163845]/90 border-2 border-[#C9A24B]/60 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative oriental-border-corner">
          
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9A24B]/20 border border-[#C9A24B]/60 text-[#E2C67E] mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Cổng Quản Trị Hệ Thống
            </h1>
            <p className="text-xs text-white/70 font-sans">
              Khu vực dành riêng cho Chủ Xưởng và Nhân viên phụ trách vận hành xưởng gốm.
            </p>
          </div>

          {/* Error / Success Notifications */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-fade-in font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-white/90 mb-1.5">
                Tài khoản quản trị (Email / SĐT) <span className="text-[#E2C67E]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Nhập tài khoản quản trị..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#C9A24B]/40 bg-[#0D242D]/70 text-white placeholder-white/40 text-xs font-medium focus:outline-hidden focus:border-[#E2C67E] focus:ring-1 focus:ring-[#E2C67E] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/90 mb-1.5">
                Mật khẩu quản trị <span className="text-[#E2C67E]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu quản trị..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#C9A24B]/40 bg-[#0D242D]/70 text-white placeholder-white/40 text-xs font-medium focus:outline-hidden focus:border-[#E2C67E] focus:ring-1 focus:ring-[#E2C67E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#C9A24B] to-[#b8913d] hover:from-[#d8b056] hover:to-[#C9A24B] text-[#142228] font-bold text-xs transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-[#142228]/40 border-t-[#142228] rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Đăng Nhập Điều Hành</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#E2C67E]" />
              Hệ thống mã hóa phiên an toàn
            </span>
            <Link href="/login" className="text-[#E2C67E] hover:underline">
              Đăng nhập khách
            </Link>
          </div>

        </div>
      </main>

      <footer className="py-3 text-center text-xs text-white/50 border-t border-white/10 bg-[#0D242D]">
        Cổng Quản Trị Bảo Mật — Minh Huyền Ceramic Bát Tràng
      </footer>

    </div>
  );
}
