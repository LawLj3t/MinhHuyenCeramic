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
  Clock
} from 'lucide-react';
import { UserRole } from '@/types';

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
    switchDemoRole, 
    updateUserProfile,
    userOrders,
    setIsAdminOpen
  } = useStore();

  // Form states
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
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
        handleClose();
      }, 900);
    } else {
      setMessage({ type: 'error', text: res.message });
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
        handleClose();
      }, 900);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleQuickSwitch = (role: UserRole) => {
    switchDemoRole(role);
    setMessage({ 
      type: 'success', 
      text: `Đã chuyển sang vai trò: ${role === 'admin' ? 'Chủ Xưởng (Admin)' : role === 'manager' ? 'Quản Lý Bán Hàng (Manager)' : 'Khách Mua Hàng (User)'}!` 
    });
    setTimeout(() => {
      setMessage(null);
    }, 1800);
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
            Chủ Xưởng (Admin)
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold bg-[#2C5F6F] text-white border border-white/20 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#E2C67E]" />
            Quản Lý Bán Hàng
          </span>
        );
      case 'user':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-[#EFE7D4] text-[#163845] border border-[#C9A24B]/35">
            <ShoppingBag className="w-3.5 h-3.5 text-[#9B7832]" />
            Khách Mua Hàng
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] border-2 border-[#C9A24B] max-w-lg w-full max-h-[92vh] overflow-y-auto rounded-xl shadow-2xl relative oriental-border-corner my-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#C9A24B]/35 bg-[#163845] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#E2C67E]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                {currentUser ? 'Tài Khoản & Phân Quyền' : 'Đăng Nhập Minh Huyền Ceramic'}
              </h3>
              <p className="text-[11px] text-[#E2C67E] font-sans mt-0.5">
                {currentUser ? `Đang đăng nhập: ${currentUser.name}` : 'Hệ thống phân quyền 3 vai trò: Admin · Manager · User'}
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

        {/* Tabs Bar */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Quick 1-Click Role Switcher Panel */}
          <div className="p-3.5 bg-gradient-to-r from-[#163845]/10 via-[#2C5F6F]/10 to-[#C9A24B]/15 border border-[#C9A24B]/40 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-sans font-bold text-[#163845] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
                Chuyển Nhanh 3 Vai Trò (1-Click Demo)
              </span>
              {currentUser && getRoleBadge(currentUser.role)}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSwitch('admin')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  currentUser?.role === 'admin'
                    ? 'bg-[#163845] text-white border-[#C9A24B] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#142228] border-[#C9A24B]/30'
                }`}
              >
                <div className="text-[11px] font-bold font-serif flex items-center gap-1">
                  👑 Admin
                </div>
                <div className="text-[10px] opacity-80 truncate">Chủ xưởng</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSwitch('manager')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  currentUser?.role === 'manager'
                    ? 'bg-[#2C5F6F] text-white border-[#C9A24B] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#142228] border-[#C9A24B]/30'
                }`}
              >
                <div className="text-[11px] font-bold font-serif flex items-center gap-1">
                  💼 Manager
                </div>
                <div className="text-[10px] opacity-80 truncate">Bán hàng</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickSwitch('user')}
                className={`p-2 rounded-lg text-left border transition-all ${
                  currentUser?.role === 'user'
                    ? 'bg-[#9B7832] text-white border-[#C9A24B] shadow-sm'
                    : 'bg-white/80 hover:bg-white text-[#142228] border-[#C9A24B]/30'
                }`}
              >
                <div className="text-[11px] font-bold font-serif flex items-center gap-1">
                  🛍️ User
                </div>
                <div className="text-[10px] opacity-80 truncate">Khách mua</div>
              </button>
            </div>
          </div>

          {/* If Logged In View */}
          {currentUser ? (
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

                    <div className="pt-2 flex items-center gap-2">
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
                        onClick={logout}
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
          ) : (
            // If Not Logged In: Login / Register Form
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-[#2C5F6F]/20 mb-4">
                <button
                  type="button"
                  onClick={() => { setAuthModalTab('login'); setMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold font-sans border-b-2 transition-colors ${
                    authModalTab === 'login'
                      ? 'border-[#2C5F6F] text-[#163845]'
                      : 'border-transparent text-[#526872] hover:text-[#142228]'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthModalTab('register'); setMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold font-sans border-b-2 transition-colors ${
                    authModalTab === 'register'
                      ? 'border-[#2C5F6F] text-[#163845]'
                      : 'border-transparent text-[#526872] hover:text-[#142228]'
                  }`}
                >
                  Đăng Ký Tài Khoản Mới
                </button>
              </div>

              {authModalTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-xs font-semibold text-[#142228] mb-1">
                      Email hoặc Số điện thoại
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="admin@minhhuyen.vn hoặc 0988686888"
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                        required
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142228] mb-1">
                      Mật khẩu (Mặc định cho tài khoản demo: 123)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#2C5F6F]/25 bg-white text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#2C5F6F] hover:bg-[#163845] text-white font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Đăng Nhập Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[11px] text-[#526872] text-center pt-1">
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthModalTab('register')}
                      className="text-[#2C5F6F] font-semibold hover:underline"
                    >
                      Đăng ký ngay
                    </button>{' '}
                    hoặc chọn nút Chuyển Nhanh ở trên.
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
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
                      <label className="block text-[11px] font-semibold text-[#142228] mb-1">Mật khẩu</label>
                      <input
                        type="password"
                        placeholder="Tối thiểu 3 ký tự"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
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
                    className="w-full py-2.5 rounded-lg bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] font-semibold text-xs transition-colors shadow-sm mt-1"
                  >
                    Tạo Tài Khoản Khách Hàng
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
