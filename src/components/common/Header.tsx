'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ClipboardList, 
  Settings,
  User,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CeramicCategory } from '@/types';

export default function Header() {
  const { 
    cartTotalCount, 
    setIsCartOpen, 
    setIsOrderTrackingOpen, 
    setIsAdminOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalTab,
    searchQuery, 
    setSearchQuery,
    setActiveCategory,
    storeSettings 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoryClick = (cat: CeramicCategory | 'all') => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#163845]/95 backdrop-blur-md text-white border-b border-[#C9A24B]/35 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo thương hiệu */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#E2C67E] font-serif font-bold text-lg leading-none">
            M
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
              Minh Huyền Ceramic
            </span>
            <span className="text-[10px] text-[#E2C67E] font-sans font-medium tracking-widest uppercase leading-none mt-0.5">
              Bát Tràng • 1300°C
            </span>
          </div>
        </div>

        {/* Menu điều hướng chính (Đồng nhất font-sans, thẳng hàng tuyệt đối) */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-sans font-medium tracking-wide text-white/90">
          <button onClick={() => handleCategoryClick('all')} className="hover:text-[#E2C67E] transition-colors">
            Bộ Sưu Tập
          </button>
          <button onClick={() => handleCategoryClick('dotho')} className="hover:text-[#E2C67E] transition-colors">
            Đồ Thờ
          </button>
          <button onClick={() => handleCategoryClick('amtra')} className="hover:text-[#E2C67E] transition-colors">
            Ấm Trà
          </button>
          <button onClick={() => handleCategoryClick('binhhutloc')} className="hover:text-[#E2C67E] transition-colors">
            Bình Hút Lộc
          </button>
          <button onClick={() => scrollToSection('nghe-nhan')} className="hover:text-[#E2C67E] transition-colors">
            Di Sản
          </button>
          <button onClick={() => scrollToSection('quy-trinh')} className="hover:text-[#E2C67E] transition-colors">
            Quy Trình
          </button>
        </nav>

        {/* Tác vụ bên phải */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center bg-white/10 border border-[#C9A24B]/50 rounded-lg px-3 py-1.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const el = document.getElementById('san-pham');
                  if (el && e.target.value.length === 1) el.scrollIntoView({ behavior: 'smooth' });
                }}
                placeholder="Tìm sản phẩm..."
                className="bg-transparent text-xs font-sans text-white placeholder:text-white/60 focus:outline-hidden w-32 sm:w-44"
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-white/70 hover:text-white ml-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 text-white/90 hover:text-[#E2C67E] transition-colors"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Tra cứu đơn hàng */}
          <button
            onClick={() => setIsOrderTrackingOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-xs font-sans font-medium text-white/90 hover:text-[#E2C67E] transition-colors"
            title="Tra cứu đơn hàng"
          >
            <ClipboardList className="w-4 h-4 text-[#E2C67E]" />
            <span className="hidden md:inline">Tra cứu</span>
          </button>

          {/* Nút Quản trị (Admin & Manager) */}
          {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#E2C67E] border border-[#C9A24B]/40 text-xs font-sans font-semibold transition-colors shadow-xs"
              title="Mở Bảng Quản Trị Xưởng"
            >
              <Settings className="w-4 h-4 text-[#E2C67E]" />
              <span className="hidden md:inline">
                {currentUser.role === 'admin' ? 'Quản Trị' : 'Bán Hàng'}
              </span>
            </button>
          )}

          {/* Nút Tài khoản / Đăng nhập / Phân quyền */}
          <button
            onClick={() => {
              setAuthModalTab(currentUser ? 'profile' : 'login');
              setIsAuthModalOpen(true);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans transition-colors ${
              currentUser
                ? 'bg-white/15 text-white hover:bg-white/20 border border-white/20'
                : 'hover:bg-white/10 text-white/90 hover:text-[#E2C67E]'
            }`}
            title={currentUser ? `Tài khoản: ${currentUser.name} (${currentUser.role})` : 'Đăng nhập / Phân quyền'}
          >
            {currentUser ? (
              <>
                <div className="w-5 h-5 rounded-full bg-[#C9A24B] text-[#142228] font-bold flex items-center justify-center text-[10px]">
                  {currentUser.role === 'admin' ? '👑' : currentUser.role === 'manager' ? '💼' : currentUser.name.charAt(0)}
                </div>
                <span className="hidden md:inline font-semibold max-w-[100px] truncate">
                  {currentUser.name.split(' ').slice(-1)[0]}
                </span>
                <span className="text-[10px] hidden xl:inline px-1.5 py-0.2 rounded-full bg-[#163845] text-[#E2C67E] border border-[#C9A24B]/40">
                  {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'manager' ? 'Kho/Sales' : 'Khách'}
                </span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-[#E2C67E]" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </>
            )}
          </button>

          {/* Giỏ hàng */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] font-sans font-semibold text-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {cartTotalCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#163845] text-white rounded-full text-[10px] font-bold leading-none tabular-nums">
                {cartTotalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu di động */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#163845] border-t border-[#C9A24B]/25 px-4 py-3 space-y-2 text-xs font-sans">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleCategoryClick('all')} className="text-left py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 font-medium">
              Tất Cả Bộ Sưu Tập
            </button>
            <button onClick={() => handleCategoryClick('dotho')} className="text-left py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 font-medium">
              Đồ Thờ Cúng
            </button>
            <button onClick={() => handleCategoryClick('amtra')} className="text-left py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 font-medium">
              Ấm Chén Trà
            </button>
            <button onClick={() => handleCategoryClick('binhhutloc')} className="text-left py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 font-medium">
              Bình Hút Lộc
            </button>
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalTab(currentUser ? 'profile' : 'login');
                setIsAuthModalOpen(true);
              }}
              className="text-[#E2C67E] font-medium flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Đăng nhập / Phân quyền'}</span>
            </button>

            {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="text-white hover:text-[#E2C67E] font-medium flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Quản trị</span>
              </button>
            )}

            <button onClick={() => { setMobileMenuOpen(false); setIsOrderTrackingOpen(true); }} className="text-white/80 font-medium">
              Tra cứu đơn
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
