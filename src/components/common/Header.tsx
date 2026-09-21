'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  ClipboardList, 
  Settings,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SealStamp } from './CeramicArtwork';
import { CeramicCategory } from '@/types';

export default function Header() {
  const { 
    cartTotalCount, 
    setIsCartOpen, 
    setIsOrderTrackingOpen, 
    setIsAdminOpen,
    searchQuery, 
    setSearchQuery,
    setActiveCategory,
    storeSettings 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoryClick = (cat: CeramicCategory) => {
    setActiveCategory(cat);
    setMobileMenuOpen(false);
    // Scroll to products section
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 glass-morph border-b border-[#C5A059]/30 shadow-medium transition-smooth">
      {/* Top Banner with Oriental Traditional Flair */}
      <div className="bg-gradient-to-r from-[#181412] via-[#2A2421] to-[#181412] text-[#EADCC9] text-xs py-1.5 px-4 border-b border-[#C5A059]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent animate-shimmer"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 relative z-10">
          {/* Left Highlights */}
          <div className="flex items-center gap-4 text-[11px] md:text-xs animate-fade-in">
            <span className="flex items-center gap-1.5 text-[#E5C278] hover:text-[#FBF5B7] transition-smooth">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DAA520] animate-pulse" />
              Cam kết 100% Gốm Sứ Bát Tràng Chính Gốc
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FBF5B7] transition-smooth">
              <Truck className="w-3.5 h-3.5" />
              Bảo hành nứt vỡ 1 đổi 1 tận nơi khi nhận hàng
            </span>
          </div>

          {/* Right Highlights & Portal Access */}
          <div className="flex items-center gap-4 text-[11px] md:text-xs">
            <a 
              href={`tel:${storeSettings.hotline}`} 
              className="flex items-center gap-1 hover:text-[#E5C278] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#DAA520]" />
              <span>Tư vấn nghệ nhân: <strong className="text-[#F5E6C8]">{storeSettings.hotline}</strong></span>
            </a>
            
            <span className="text-white/30">•</span>

            {/* Admin Management Quick Switch for Owner & Family */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#8B1E1F]/80 hover:bg-[#8B1E1F] text-[#FDF8F0] text-[11px] font-medium border border-[#C5A059]/50 transition-bounce hover:scale-105 shadow-xs hover:shadow-glow-red"
              title="Dành cho chủ xưởng và nhân viên quản trị đơn hàng, sản phẩm"
            >
              <Settings className="w-3 h-3 text-[#E5C278] group-hover:rotate-90 transition-smooth" />
              <span>Quản Trị Xưởng</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity / Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <SealStamp text="Bát Tràng" subtext="Chính Gốc" className="scale-95 group-hover:scale-110 transition-bounce" />
              <div className="relative">
                <span className="block font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#181412] leading-none transition-smooth group-hover:text-[#8B1E1F]">
                  MINH HUYỀN <span className="text-gold-gradient">CERAMIC</span>
                </span>
                <span className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8C6D27] font-medium mt-1 transition-smooth group-hover:tracking-[0.25em]">
                  Tinh Hoa Gốm Sứ Đất Thăng Long
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#8B1E1F] via-[#C5A059] to-[#8B1E1F] group-hover:w-full transition-all duration-500"></div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-[#2A2421]">
            <a 
              href="#" 
              className="hover:text-[#8B1E1F] transition-smooth py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#8B1E1F] after:via-[#C5A059] after:to-[#8B1E1F] hover:after:w-full after:transition-all after:duration-300"
            >
              Trang Chủ
            </a>

            {/* Mega Dropdown Hover for Collections */}
            <div className="relative group py-1">
              <button 
                onClick={() => scrollToSection('san-pham')}
                className="flex items-center gap-1 hover:text-[#8B1E1F] transition-smooth"
              >
                <span>Bộ Sưu Tập Gốm</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-all duration-300 group-hover:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu with Oriental Style */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                <div className="glass-morph border-2 border-[#C5A059]/40 shadow-strong p-2 rounded-xs animate-scale-in">
                  <button 
                    onClick={() => handleCategoryClick('dotho')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Đồ Thờ Cúng Gia Tiên</span>
                    <span className="text-[10px] text-[#8B1E1F] font-bold">Men Rạn Dát Vàng</span>
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('amtra')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Bộ Ấm Chén Trà Đạo</span>
                    <span className="text-[10px] text-[#8C6D27] font-bold">Bọc Đồng Cổ</span>
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('binhhutloc')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Bình Hút Tài Lộc</span>
                    <span className="text-[10px] text-[#8C6D27] font-bold">Thuận Buồm Xuôi Gió</span>
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('locbinh')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Lộc Bình Đại Uy Nghi</span>
                    <span className="text-[10px] text-[#8C6D27] font-bold">Tứ Quý 1m6</span>
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('giadung')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Gốm Bàn Ăn Hoàng Gia</span>
                    <span className="text-[10px] text-[#8C6D27] font-bold">Khử Chì 1300°C</span>
                  </button>
                  <button 
                    onClick={() => handleCategoryClick('tuongphongthuy')}
                    className="w-full text-left px-3 py-2 text-xs font-serif text-[#2A2421] hover:bg-[#8B1E1F]/10 hover:text-[#8B1E1F] flex items-center justify-between rounded-xs transition-smooth hover:translate-x-1"
                  >
                    <span>Tượng & Tranh Gốm Quý</span>
                    <span className="text-[10px] text-[#8C6D27] font-bold">Di Lặc Ngự Đài Sen</span>
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection('quy-trinh')}
              className="hover:text-[#8B1E1F] transition-colors"
            >
              Làng Nghề 700 Năm
            </button>

            <button 
              onClick={() => scrollToSection('phong-thuy')}
              className="hover:text-[#8B1E1F] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DAA520]" />
              <span>Chọn Gốm Theo Mệnh</span>
            </button>

            <button 
              onClick={() => scrollToSection('nghe-nhan')}
              className="hover:text-[#8B1E1F] transition-colors"
            >
              Nghệ Nhân
            </button>

            <button 
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-[#8B1E1F] transition-colors flex items-center gap-1 text-[#8C6D27]"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Tra Cứu Đơn</span>
            </button>
          </nav>

          {/* Quick Right Actions (Search & Cart) */}
          <div className="flex items-center gap-3">
            {/* Search Trigger / Input on Desktop */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm gốm Bát Tràng, men rạn, đồ thờ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-8 pr-3 py-1.5 text-xs bg-white border border-[#C5A059]/40 rounded-full focus:outline-hidden focus:border-[#8B1E1F] transition-all placeholder:text-[#8C6D27]/60"
              />
              <Search className="w-3.5 h-3.5 text-[#8C6D27] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-[#2A2421] hover:text-[#8B1E1F]"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 bg-gradient-to-br from-[#8B1E1F]/10 to-[#8B1E1F]/20 hover:from-[#8B1E1F]/20 hover:to-[#8B1E1F]/30 text-[#8B1E1F] border border-[#8B1E1F]/30 rounded-xs transition-smooth hover-lift hover:shadow-glow-red group"
              aria-label="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-bounce" />
              <span className="hidden sm:inline font-serif font-bold text-xs tracking-wider">GIỎ HÀNG</span>
              {cartTotalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] text-[#FAF7F2] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] shadow-glow-red animate-bounce">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2A2421] hover:text-[#8B1E1F]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Bar (Dropdown) */}
        {searchOpen && (
          <div className="mt-3 pt-3 border-t border-[#C5A059]/20 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm bát hương, ấm chén, bình hút lộc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/50 rounded-xs focus:outline-hidden focus:border-[#8B1E1F]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#8C6D27] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b-2 border-[#C5A059] px-4 py-4 space-y-3">
          <div className="font-serif font-bold text-xs text-[#8C6D27] uppercase tracking-wider pb-1 border-b border-[#C5A059]/20">
            Danh Mục Sản Phẩm
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleCategoryClick('dotho')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Đồ Thờ Cúng
            </button>
            <button
              onClick={() => handleCategoryClick('amtra')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Ấm Chén Trà Đạo
            </button>
            <button
              onClick={() => handleCategoryClick('binhhutloc')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Bình Hút Lộc
            </button>
            <button
              onClick={() => handleCategoryClick('locbinh')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Lộc Bình Tứ Quý
            </button>
            <button
              onClick={() => handleCategoryClick('giadung')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Gốm Bàn Ăn
            </button>
            <button
              onClick={() => handleCategoryClick('tuongphongthuy')}
              className="p-2 text-left bg-white/70 border border-[#C5A059]/30 rounded-xs font-serif hover:bg-[#8B1E1F]/10 text-[#2A2421]"
            >
              Tượng & Tranh Gốm
            </button>
          </div>

          <div className="pt-2 border-t border-[#C5A059]/20 flex flex-col gap-2.5 text-sm">
            <button 
              onClick={() => scrollToSection('quy-trinh')}
              className="text-left py-1 text-[#2A2421] hover:text-[#8B1E1F]"
            >
              Làng Nghề Gốm 700 Năm
            </button>
            <button 
              onClick={() => scrollToSection('phong-thuy')}
              className="text-left py-1 text-[#2A2421] hover:text-[#8B1E1F] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#DAA520]" />
              Chọn Gốm Phong Thủy
            </button>
            <button 
              onClick={() => scrollToSection('nghe-nhan')}
              className="text-left py-1 text-[#2A2421] hover:text-[#8B1E1F]"
            >
              Nghệ Nhân Bát Tràng
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOrderTrackingOpen(true);
              }}
              className="text-left py-1 text-[#8C6D27] font-medium flex items-center gap-1.5"
            >
              <ClipboardList className="w-4 h-4" />
              Tra Cứu Đơn Hàng Của Bạn
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left py-2 px-3 bg-[#8B1E1F] text-white rounded-xs font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#E5C278]" />
                Quản Trị Xưởng (Chủ Xưởng & Nhân Viên)
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-xs">Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
