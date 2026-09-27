'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Settings, ClipboardList, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const { 
    storeSettings, 
    setIsAdminOpen, 
    setIsOrderTrackingOpen, 
    currentUser, 
    setIsAuthModalOpen, 
    setAuthModalTab 
  } = useStore();

  return (
    <footer className="bg-[#163845] text-white/90 border-t border-[#C9A24B]/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-12 h-12 rounded-lg bg-white border-2 border-[#C9A24B] p-0.5 shrink-0 flex items-center justify-center overflow-hidden shadow-xs">
              <img
                src="/images/logo.png"
                alt="Minh Huyền Ceramic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-white tracking-tight">
                {storeSettings.storeName}
              </div>
              <p className="text-xs text-white/75 font-sans mt-1 flex items-center justify-center md:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E2C67E] shrink-0" />
                <span>{storeSettings.address}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans font-medium">
            <a 
              href={`tel:${storeSettings.hotline}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#E2C67E] transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{storeSettings.hotline}</span>
            </a>

            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="inline-flex items-center gap-1.5 hover:text-[#E2C67E] transition-colors"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Tra cứu đơn</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setAuthModalTab('profile');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 hover:text-[#E2C67E] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#E2C67E]" />
                <span>Tài khoản ({currentUser.name})</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 hover:text-[#E2C67E] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#E2C67E]" />
                <span>Đăng nhập</span>
              </Link>
            )}

            {currentUser?.role === 'admin' || currentUser?.role === 'manager' ? (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#E2C67E] hover:underline transition-colors font-semibold"
                title="Bảng Quản Trị Xưởng"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Bảng Quản Trị</span>
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-[#E2C67E] transition-colors"
                title="Cổng Quản Trị Nội Bộ"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Cổng Quản Trị</span>
              </Link>
            )}
          </div>

          <div className="text-xs text-white/65 font-sans text-center md:text-right">
            © {new Date().getFullYear()} Minh Huyền Ceramic. Tinh hoa gốm Việt.
          </div>

        </div>
      </div>
    </footer>
  );
}
