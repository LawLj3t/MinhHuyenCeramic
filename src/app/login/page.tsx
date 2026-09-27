'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  PhoneCall,
  LogIn
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, currentUser, storeSettings } = useStore();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // If already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Vui lòng nhập Email hoặc Số điện thoại.');
      return;
    }

    if (!password) {
      setErrorMsg('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);

    try {
      const result = login(identifier.trim(), password);
      if (result.success) {
        setSuccessMsg(result.message || 'Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => {
          router.push('/');
        }, 800);
      } else {
        setErrorMsg(result.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col font-sans text-[#142228] selection:bg-[#C9A24B]/30 selection:text-[#163845]">
      
      {/* Top Header Navigation */}
      <header className="bg-[#163845] border-b border-[#C9A24B]/40 py-3.5 px-4 sm:px-8 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-[#C9A24B] p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/images/logo.png"
                alt="Minh Huyền Ceramic"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-serif font-black text-lg tracking-wider text-[#E2C67E] uppercase leading-tight">
                Minh Huyền
              </div>
              <div className="text-[10px] tracking-[0.2em] font-sans text-white/80 uppercase">
                Gốm Sứ Bát Tràng
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/85 hover:text-[#E2C67E] transition-colors py-1.5 px-3 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trở về Trang Chủ</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full bg-white rounded-2xl border border-[#C9A24B]/35 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Brand Showcase (Luxury Bat Trang Ceramic Art) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#163845] via-[#1F4959] to-[#0D242D] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24B]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2C5F6F]/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/40 text-[#E2C67E] text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Di Sản Gốm Sứ Bát Tràng</span>
              </div>

              <div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF7F2] leading-tight">
                  Tinh Hoa Gốm Sứ Men Rạn Bát Tràng
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-2.5 leading-relaxed font-sans">
                  Đăng nhập tài khoản để quản lý đơn hàng, lưu thông tin giao nhận và nhận các đặc quyền ưu đãi dành riêng cho quý khách hàng thân thiết.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#E2C67E]" />
                  </div>
                  <span>Nung củi 1300°C khử chì và độc tố an toàn 100%</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#E2C67E]" />
                  </div>
                  <span>Bảo hiểm vỡ hỏng 100% khi vận chuyển toàn quốc</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#E2C67E]" />
                  </div>
                  <span>Chứng nhận nghệ nhân ưu tú Bát Tràng chính gốc</span>
                </div>
              </div>
            </div>

            <div className="relative z-1 pt-8 border-t border-white/15 text-xs text-white/70">
              Cần hỗ trợ trực tiếp? Hotline:{' '}
              <a href={`tel:${storeSettings?.hotline || '0988686888'}`} className="text-[#E2C67E] font-bold hover:underline">
                {storeSettings?.hotline || '0988 686 888'}
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Real E-Commerce Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
            
            <div className="mb-6">
              <h2 className="font-serif font-bold text-2xl text-[#163845]">
                Đăng Nhập Tài Khoản
              </h2>
              <p className="text-xs text-[#526872] mt-1 font-sans">
                Vui lòng điền thông tin để tiếp tục trải nghiệm mua sắm tại xưởng gốm.
              </p>
            </div>

            {/* Notification messages */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-fade-in font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fade-in font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#142228] mb-1.5">
                  Email hoặc Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#526872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Nhập email hoặc số điện thoại..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845] focus:ring-1 focus:ring-[#163845] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#142228]">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-[11px] text-[#2C5F6F] hover:text-[#163845] font-semibold hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#526872] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845] focus:ring-1 focus:ring-[#163845] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526872] hover:text-[#142228] p-1"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#2C5F6F]/30 text-[#163845] focus:ring-[#163845]"
                  />
                  <span className="text-xs text-[#526872]">Ghi nhớ đăng nhập trên thiết bị này</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl bg-[#163845] hover:bg-[#2C5F6F] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 text-[#E2C67E]" />
                    <span>Đăng Nhập</span>
                  </>
                )}
              </button>
            </form>

            {/* Switch to Register */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-[#526872]">
                Quý khách chưa có tài khoản?{' '}
                <Link
                  href="/register"
                  className="font-bold text-[#163845] hover:text-[#C9A24B] transition-colors hover:underline"
                >
                  Đăng ký tài khoản mới ngay
                </Link>
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#C9A24B]/40 shadow-2xl relative">
            <h3 className="font-serif font-bold text-lg text-[#163845] mb-2">
              Khôi Phục Mật Khẩu
            </h3>
            <p className="text-xs text-[#526872] leading-relaxed mb-4">
              Nhằm đảm bảo an toàn thông tin đơn hàng và thông tin cá nhân, vui lòng liên hệ trực tiếp với bộ phận chăm sóc khách hàng của Minh Huyền Ceramic qua Hotline để được hỗ trợ cấp lại mật khẩu ngay lập tức.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C9A24B]/30 flex items-center justify-between mb-5">
              <div>
                <div className="text-[11px] text-[#526872]">Hotline Hỗ Trợ Kỹ Thuật:</div>
                <div className="font-bold text-sm text-[#163845]">{storeSettings?.hotline || '0988 686 888'}</div>
              </div>
              <a
                href={`tel:${storeSettings?.hotline || '0988686888'}`}
                className="px-3 py-1.5 bg-[#163845] text-white text-xs font-semibold rounded-lg hover:bg-[#2C5F6F] flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E2C67E]" />
                <span>Gọi Ngay</span>
              </a>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#142228] rounded-lg transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="py-4 text-center text-xs text-[#526872] border-t border-[#C9A24B]/20 bg-white">
        © 2026 Minh Huyền Ceramic — Tinh Hoa Gốm Sứ Bát Tràng. Bảo lưu mọi quyền.
      </footer>

    </div>
  );
}
