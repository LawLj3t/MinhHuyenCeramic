'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  User, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  ShoppingBag, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Package,
  Clock,
  Eye,
  EyeOff,
  KeyRound,
  LogIn
} from 'lucide-react';
import { UserRole } from '@/types';

const DEMO_ACCOUNTS: {
  role: UserRole;
  badge: string;
  title: string;
  email: string;
  phone: string;
  password: string;
  desc: string;
}[] = [
  {
    role: 'admin',
    badge: '👑 Role 1: Admin',
    title: 'Chủ Cửa Hàng (Toàn Quyền)',
    email: 'admin@minhhuyen.vn',
    phone: '0988686888',
    password: '123',
    desc: 'Quản lý doanh thu, duyệt đơn, thêm/xóa sản phẩm, đổi ảnh thật, phân quyền nhân viên & VietQR.'
  },
  {
    role: 'manager',
    badge: '💼 Role 2: Manager',
    title: 'Nhân Viên Bán Hàng & Kho',
    email: 'banhang@minhhuyen.vn',
    phone: '0912888999',
    password: '123',
    desc: 'Tiếp nhận đơn hàng, cập nhật giá bán, tồn kho và tải/đổi ảnh thật cho sản phẩm.'
  },
  {
    role: 'user',
    badge: '🛍️ Role 3: User',
    title: 'Khách Mua Hàng',
    email: 'khachhang@gmail.com',
    phone: '0912345678',
    password: '123',
    desc: 'Đặt mua gốm sứ, tự động điền thông tin thanh toán và theo dõi lịch sử đơn hàng cá nhân.'
  }
];

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    currentUser, 
    login, 
    register, 
    logout, 
    updateUserProfile,
    userOrders,
    setIsAdminOpen
  } = useStore();

  // Form states
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    city: 'Hà Nội'
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Hà Nội'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setMessage(null);
    setIsAuthModalOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.identifier.trim()) {
      setMessage({ type: 'error', text: 'Vui lòng nhập Email hoặc Số điện thoại.' });
      return;
    }
    const res = login(loginForm.identifier, loginForm.password);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setAuthModalTab('profile');
        setMessage(null);
      }, 700);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleFillDemoAccount = (email: string, password: string, roleTitle: string) => {
    setAuthModalTab('login');
    setLoginForm({ identifier: email, password });
    setMessage({
      type: 'success',
      text: `Đã điền tài khoản ${roleTitle}. Hãy bấm nút "Đăng Nhập Hệ Thống" bên dưới!`
    });
  };

  const handleDirectDemoLogin = (email: string, password: string) => {
    setLoginForm({ identifier: email, password });
    const res = login(email, password);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setAuthModalTab('profile');
        setMessage(null);
      }, 600);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name.trim() || !registerForm.phone.trim() || !registerForm.email.trim()) {
      setMessage({ type: 'error', text: 'Vui lòng điền đủ Họ tên, Số điện thoại và Email.' });
      return;
    }
    const res = register(registerForm);
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setAuthModalTab('profile');
        setMessage(null);
      }, 800);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditingProfile(false);
    setMessage({ type: 'success', text: 'Đã cập nhật thông tin thành công!' });
    setTimeout(() => setMessage(null), 2000);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold bg-[#163845] text-[#E2C67E] border border-[#C9A24B]/60 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E2C67E]" />
            Admin (Chủ Cửa Hàng)
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold bg-[#2C5F6F] text-white border border-white/20 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#E2C67E]" />
            Manager (Bán Hàng)
          </span>
        );
      case 'user':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-[#EFE7D4] text-[#163845] border border-[#C9A24B]/35">
            <ShoppingBag className="w-3.5 h-3.5 text-[#9B7832]" />
            User (Khách Hàng)
          </span>
        );
    }
  };

  const activeTab = authModalTab === 'switch-role' ? 'login' : authModalTab;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] border-2 border-[#C9A24B] max-w-xl w-full max-h-[92vh] overflow-y-auto rounded-xl shadow-2xl relative oriental-border-corner my-auto">
        
        {/* Top Header with Store Logo */}
        <div className="p-4 sm:p-5 border-b border-[#C9A24B]/35 bg-[#163845] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#C9A24B] p-0.5 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/images/logo.png"
                alt="Minh Huyền Ceramic"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                Đăng Nhập & Tài Khoản Minh Huyền Ceramic
              </h3>
              <p className="text-[11px] text-[#E2C67E] font-sans mt-0.5">
                {currentUser 
                  ? `Đang đăng nhập: ${currentUser.name} (${currentUser.email})` 
                  : 'Đăng nhập bằng tài khoản của bạn hoặc chọn 1 trong 3 tài khoản Demo bên dưới'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Always visible so user can access Login form anytime) */}
        <div className="flex border-b border-[#2C5F6F]/20 bg-white px-4">
          <button
            type="button"
            onClick={() => { setAuthModalTab('login'); setMessage(null); }}
            className={`py-3 px-4 text-xs font-bold font-sans border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'login'
                ? 'border-[#163845] text-[#163845]'
                : 'border-transparent text-[#526872] hover:text-[#142228]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng Nhập (3 Role Demo)</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthModalTab('register'); setMessage(null); }}
            className={`py-3 px-4 text-xs font-bold font-sans border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'register'
                ? 'border-[#163845] text-[#163845]'
                : 'border-transparent text-[#526872] hover:text-[#142228]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Đăng Ký Mới</span>
          </button>

          {currentUser && (
            <button
              type="button"
              onClick={() => { setAuthModalTab('profile'); setMessage(null); }}
              className={`py-3 px-4 text-xs font-bold font-sans border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'border-[#163845] text-[#163845]'
                  : 'border-transparent text-[#526872] hover:text-[#142228]'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#9B7832]" />
              <span>Hồ Sơ & Đơn Hàng ({userOrders.length})</span>
            </button>
          )}
        </div>

        {/* Message notification */}
        {message && (
          <div className={`mx-4 mt-4 p-3 rounded-lg text-xs font-sans flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
              : 'bg-rose-50 text-rose-800 border border-rose-300'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="p-4 sm:p-5 space-y-5">
          
          {/* TAB 1: REAL LOGIN FORM + 3 DEMO ACCOUNTS TABLE */}
          {activeTab === 'login' && (
            <div className="space-y-5">
              
              {/* Real Login Form */}
              <form onSubmit={handleLoginSubmit} className="bg-white p-4 rounded-xl border border-[#C9A24B]/40 shadow-xs space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#2C5F6F]/15">
                  <span className="font-serif font-bold text-sm text-[#163845] flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#9B7832]" />
                    Đăng Nhập Bằng Tài Khoản
                  </span>
                  {currentUser && (
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Đang dùng: {currentUser.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Email hoặc Số điện thoại đăng nhập *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Nhập email (VD: admin@minhhuyen.vn) hoặc SĐT..."
                      value={loginForm.identifier}
                      onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2C5F6F]/30 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:outline-hidden focus:border-[#163845] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Mật khẩu *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu (tài khoản demo là: 123)"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-[#2C5F6F]/30 bg-[#FAF7F2]/50 text-xs font-medium text-[#142228] focus:outline-hidden focus:border-[#163845] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#526872] hover:text-[#142228] p-1"
                      title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#163845] hover:bg-[#2C5F6F] text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#E2C67E]" />
                  <span>Đăng Nhập Hệ Thống</span>
                </button>
              </form>

              {/* 3 Demo Accounts Box with explicit credentials */}
              <div className="p-4 bg-gradient-to-b from-[#163845]/8 to-[#C9A24B]/12 border border-[#C9A24B]/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#163845]">
                      Danh Sách Tài Khoản Demo Của 3 Role
                    </h4>
                    <p className="text-[11px] text-[#526872]">
                      Bấm <strong>"Điền TK"</strong> để điền vào ô đăng nhập ở trên, hoặc <strong>"Đăng nhập ngay"</strong>
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {DEMO_ACCOUNTS.map((acc) => {
                    const isCurrent = currentUser?.role === acc.role;
                    return (
                      <div
                        key={acc.role}
                        className={`p-3 rounded-lg border transition-all bg-white ${
                          isCurrent
                            ? 'border-[#163845] ring-1 ring-[#163845]/30'
                            : 'border-[#C9A24B]/35 hover:border-[#2C5F6F]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#163845] text-[#E2C67E] text-[10px] font-bold">
                              {acc.badge}
                            </span>
                            <span className="font-serif font-bold text-xs text-[#142228]">
                              {acc.title}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                Đang đăng nhập
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleFillDemoAccount(acc.email, acc.password, acc.title)}
                              className="px-2.5 py-1 rounded border border-[#2C5F6F]/40 hover:border-[#163845] bg-[#FAF7F2] hover:bg-white text-[#163845] text-[11px] font-semibold transition-colors"
                            >
                              Điền TK
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDirectDemoLogin(acc.email, acc.password)}
                              className="px-2.5 py-1 rounded bg-[#2C5F6F] hover:bg-[#163845] text-white text-[11px] font-semibold transition-colors"
                            >
                              Đăng nhập ngay
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px]">
                          <div>
                            <span className="text-[#526872]">Email: </span>
                            <code className="font-mono font-bold text-[#163845]">{acc.email}</code>
                          </div>
                          <div>
                            <span className="text-[#526872]">SĐT: </span>
                            <code className="font-mono font-bold text-[#163845]">{acc.phone}</code>
                          </div>
                          <div>
                            <span className="text-[#526872]">Mật khẩu: </span>
                            <code className="font-mono font-bold text-[#9B7832] bg-[#EFE7D4] px-1.5 py-0.2 rounded">{acc.password}</code>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#526872] mt-1.5 leading-snug">
                          {acc.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="bg-white p-4 rounded-xl border border-[#C9A24B]/40 shadow-xs space-y-3 text-xs">
              <div className="pb-2 border-b border-[#2C5F6F]/15">
                <h4 className="font-serif font-bold text-sm text-[#163845]">
                  Đăng Ký Tài Khoản Khách Hàng Mới
                </h4>
                <p className="text-[11px] text-[#526872] mt-0.5">
                  Tài khoản mới được tạo sẽ có vai trò <strong>User (Khách Mua Hàng)</strong>.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142228] mb-1">Họ và tên quý khách *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng Minh Tuấn"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142228] mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="0912..."
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142228] mb-1">Email *</label>
                  <input
                    type="email"
                    placeholder="tuan@gmail.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142228] mb-1">Mật khẩu *</label>
                  <input
                    type="password"
                    placeholder="Tối thiểu 3 ký tự"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142228] mb-1">Tỉnh / Thành phố</label>
                  <select
                    value={registerForm.city}
                    onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142228] mb-1">Địa chỉ giao hàng mặc định</label>
                <input
                  type="text"
                  placeholder="Số nhà, đường, quận/huyện..."
                  value={registerForm.address}
                  onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] font-bold text-xs transition-colors shadow-sm mt-1"
              >
                Tạo Tài Khoản Khách Hàng
              </button>
            </form>
          )}

          {/* TAB 3: PROFILE & ORDER HISTORY (WHEN LOGGED IN) */}
          {activeTab === 'profile' && currentUser && (
            <div className="space-y-4">
              
              {/* Profile Card */}
              <div className="bg-white p-4 rounded-xl border border-[#C9A24B]/30 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2C5F6F]/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#2C5F6F] text-white flex items-center justify-center font-serif font-bold text-sm">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-sm text-[#142228]">{currentUser.name}</div>
                      <div className="text-xs text-[#526872]">{currentUser.email}</div>
                    </div>
                  </div>
                  {getRoleBadge(currentUser.role)}
                </div>

                {!isEditingProfile ? (
                  <div className="space-y-1.5 text-xs text-[#243740]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#9B7832]" />
                      <span>{currentUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#9B7832]" />
                      <span>{currentUser.address ? `${currentUser.address}, ${currentUser.city}` : 'Chưa cập nhật địa chỉ'}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setProfileForm({
                            name: currentUser.name,
                            phone: currentUser.phone,
                            address: currentUser.address || '',
                            city: currentUser.city || 'Hà Nội'
                          });
                          setIsEditingProfile(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-[#2C5F6F]/30 hover:border-[#2C5F6F] text-xs font-semibold text-[#2C5F6F] transition-colors"
                      >
                        Sửa thông tin
                      </button>

                      <button
                        onClick={() => setAuthModalTab('login')}
                        className="px-3 py-1.5 rounded-lg border border-[#C9A24B] bg-[#FAF7F2] hover:bg-[#EFE7D4] text-xs font-semibold text-[#163845] transition-colors"
                      >
                        Đổi Tài Khoản Khác
                      </button>

                      {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
                        <button
                          onClick={() => {
                            handleClose();
                            setIsAdminOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#163845] hover:bg-[#2C5F6F] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-[#E2C67E]" />
                          <span>Mở Bảng Quản Trị</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setAuthModalTab('login');
                        }}
                        className="ml-auto px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#142228] mb-1">Họ và tên</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                        className="w-full px-3 py-1.5 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#142228] mb-1">Số điện thoại</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          required
                          className="w-full px-3 py-1.5 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#142228] mb-1">Tỉnh / Thành phố</label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#142228] mb-1">Địa chỉ giao hàng</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Số nhà, tên đường, phường/xã..."
                        className="w-full px-3 py-1.5 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-[#2C5F6F] hover:bg-[#163845] text-white text-xs font-semibold shadow-xs"
                      >
                        Lưu thông tin
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* User Orders History */}
              <div className="bg-white p-4 rounded-xl border border-[#C9A24B]/30 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2C5F6F]/15">
                  <span className="font-serif font-bold text-xs text-[#142228] uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#9B7832]" />
                    Đơn Hàng Của Quý Khách ({userOrders.length})
                  </span>
                  <span className="text-[11px] text-[#526872]">Được đồng bộ tự động</span>
                </div>

                {userOrders.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#526872]">
                    Quý khách chưa có đơn hàng nào tại xưởng.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {userOrders.map((order) => (
                      <div key={order.id} className="p-2.5 rounded-lg border border-[#2C5F6F]/15 bg-[#FAF7F2]/60 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#163845] font-serif">{order.id}</div>
                          <div className="text-[11px] text-[#526872] line-clamp-1 mt-0.5">
                            {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                          </div>
                          <div className="text-[10px] text-[#9B7832] font-medium mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-bold text-[#9B7832] tabular-nums">
                            {order.finalAmount.toLocaleString('vi-VN')}₫
                          </div>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.orderStatus === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.orderStatus === 'shipping'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.orderStatus === 'pending'
                              ? 'Chờ xác nhận'
                              : order.orderStatus === 'confirmed'
                              ? 'Đã xác nhận'
                              : order.orderStatus === 'shipping'
                              ? 'Đang giao'
                              : order.orderStatus === 'completed'
                              ? 'Đã hoàn tất'
                              : 'Đã hủy'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
