'use client';

import React from 'react';
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

  const handleAdminClick = () => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'manager') {
      setIsAdminOpen(true);
    } else {
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
    }
  };

  return (
    <footer className="bg-[#163845] text-white/90 border-t border-[#C9A24B]/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <div className="font-serif text-lg font-bold text-white tracking-tight">
              {storeSettings.storeName}
            </div>
            <p className="text-xs text-white/75 font-sans mt-1 flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E2C67E] shrink-0" />
              <span>{storeSettings.address}</span>
            </p>
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

            <button
              onClick={() => {
                setAuthModalTab(currentUser ? 'profile' : 'login');
                setIsAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 hover:text-[#E2C67E] transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser ? currentUser.name : 'Đăng nhập / Phân quyền'}</span>
            </button>

            <button
              onClick={handleAdminClick}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#E2C67E] transition-colors"
              title="Khu vực Quản trị & Bán hàng"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Quản trị xưởng</span>
            </button>
          </div>

          <div className="text-xs text-white/65 font-sans text-center md:text-right">
            © {new Date().getFullYear()} Minh Huyền Ceramic. Tinh hoa gốm Việt.
          </div>

        </div>
      </div>
    </footer>
  );
}
