'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Truck,
  UserPlus
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: 'Hà Nội'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ để giao hàng.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!formData.password || formData.password.length < 3) {
      setErrorMsg('Mật khẩu cần tối thiểu 3 ký tự.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Vui lòng đồng ý với điều khoản sử dụng và chính sách giao nhận.');
      return;
    }

    setIsLoading(true);

    try {
      const result = register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        address: formData.address.trim(),
        city: formData.city
      });

      if (result.success) {
        setSuccessMsg('Đăng ký tài khoản thành công! Đang chuyển hướng về trang chủ...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setErrorMsg(result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      setErrorMsg('Đã có lỗi xảy ra trong quá trình tạo tài khoản.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col font-sans text-[#142228] selection:bg-[#C9A24B]/30 selection:text-[#163845]">
      
      {/* Top Header */}
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

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full bg-white rounded-2xl border border-[#C9A24B]/35 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Brand Intro */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#163845] via-[#1F4959] to-[#0D242D] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24B]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2C5F6F]/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C9A24B]/40 text-[#E2C67E] text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trở Thành Khách Hàng Thân Thiết</span>
              </div>

              <div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF7F2] leading-tight">
                  Gia Nhập Cộng Đồng Yêu Gốm Sứ
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-2.5 leading-relaxed font-sans">
                  Tạo tài khoản để dễ dàng lưu lại các tác phẩm tâm đắc, nhận tư vấn phong thủy chuyên sâu và theo dõi đơn hàng từng phút.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#E2C67E]" />
                  </div>
                  <span>Bảo mật tuyệt đối thông tin cá nhân và đơn hàng</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#E2C67E]" />
                  </div>
                  <span>Lưu sẵn địa chỉ giao nhận, thanh toán siêu nhanh</span>
                </div>
              </div>
            </div>

            <div className="relative z-1 pt-8 border-t border-white/15 text-xs text-white/70">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-[#E2C67E] font-bold hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
            
            <div className="mb-6">
              <h2 className="font-serif font-bold text-2xl text-[#163845]">
                Đăng Ký Tài Khoản Khách Hàng
              </h2>
              <p className="text-xs text-[#526872] mt-1 font-sans">
                Điền đầy đủ các thông tin bên dưới để tạo tài khoản mới.
              </p>
            </div>

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

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              <div>
                <label className="block text-xs font-semibold text-[#142228] mb-1">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Số điện thoại <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="khachhang@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Tối thiểu 3 ký tự..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#526872] p-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Xác nhận mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Nhập lại mật khẩu..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142228] mb-1">
                  Địa chỉ nhận hàng (Số nhà, tên đường, phường/xã)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Ví dụ: 128 Phố Huế, P. Hàng Bài"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142228] mb-1">
                  Tỉnh / Thành phố
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#2C5F6F]/25 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:bg-white focus:outline-hidden focus:border-[#163845]"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Bắc Ninh">Bắc Ninh</option>
                  <option value="Khác">Tỉnh thành khác</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-[#2C5F6F]/30 text-[#163845] focus:ring-[#163845]"
                  />
                  <span className="text-[11px] text-[#526872] leading-relaxed">
                    Tôi đồng ý với Quy chế hoạt động & Chính sách bảo mật thông tin khách hàng của xưởng gốm Minh Huyền Ceramic.
                  </span>
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
                    <UserPlus className="w-4 h-4 text-[#E2C67E]" />
                    <span>Đăng Ký Tài Khoản</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-[#526872]">
                Đã có tài khoản thành viên?{' '}
                <Link
                  href="/login"
                  className="font-bold text-[#163845] hover:text-[#C9A24B] transition-colors hover:underline"
                >
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>

          </div>

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-[#526872] border-t border-[#C9A24B]/20 bg-white">
        © 2026 Minh Huyền Ceramic — Tinh Hoa Gốm Sứ Bát Tràng. Bảo lưu mọi quyền.
      </footer>

    </div>
  );
}
