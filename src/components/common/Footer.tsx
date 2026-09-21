'use client';

import React from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Settings,
  Heart
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SealStamp } from './CeramicArtwork';

export default function Footer() {
  const { storeSettings, setIsAdminOpen, setIsOrderTrackingOpen, setActiveCategory } = useStore();

  const handleCategoryClick = (cat: 'dotho' | 'amtra' | 'binhhutloc' | 'locbinh' | 'giadung' | 'tuongphongthuy') => {
    setActiveCategory(cat);
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181412] text-[#EADCC9] border-t-2 border-[#C5A059] relative">
      {/* Top Value Propositions */}
      <div className="border-b border-[#C5A059]/30 py-8 bg-[#1F1916]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#DAA520]/50 bg-[#181412] flex items-center justify-center text-[#DAA520] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#FAF7F2]">100% Gốm Bát Tràng Thật</h5>
                <p className="text-[11px] text-[#C5A059]/80 mt-0.5">Phát hiện hàng giả đền gấp 10 lần giá trị</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#DAA520]/50 bg-[#181412] flex items-center justify-center text-[#DAA520] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#FAF7F2]">Đóng Gói 3 Lớp Chuyên Dụng</h5>
                <p className="text-[11px] text-[#C5A059]/80 mt-0.5">Hộp xốp định hình & kiện gỗ chống vỡ tuyệt đối</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#DAA520]/50 bg-[#181412] flex items-center justify-center text-[#DAA520] shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#FAF7F2]">Bảo Hành Nứt Vỡ 1 Đổi 1</h5>
                <p className="text-[11px] text-[#C5A059]/80 mt-0.5">Kiểm tra ưng ý mới thanh toán (Ship COD)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#DAA520]/50 bg-[#181412] flex items-center justify-center text-[#DAA520] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#FAF7F2]">Nung 1300°C An Toàn</h5>
                <p className="text-[11px] text-[#C5A059]/80 mt-0.5">Tuyệt đối không độc hại, không thôi nhiễm chì</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info & Address (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SealStamp text="Bát Tràng" subtext="Chính Gốc" className="bg-white/10" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF7F2] block">
                  MINH HUYỀN <span className="text-[#DAA520]">CERAMIC</span>
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#C5A059] block font-serif">
                  {storeSettings.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#C5A059]/90 font-serif leading-relaxed">
              Xưởng gốm sứ thủ công gia tộc Minh Huyền tại làng cổ Bát Tràng. Chuyên chế tác đồ thờ cúng men rạn dát vàng, bộ ấm chén hoàng gia, bình hút tài lộc phong thủy chuẩn thước Lỗ Ban.
            </p>

            <div className="space-y-2 text-xs font-serif pt-2 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DAA520] shrink-0 mt-0.5" />
                <span>{storeSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DAA520] shrink-0" />
                <span>Hotline / Zalo: <strong className="text-[#FAF7F2]">{storeSettings.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DAA520] shrink-0" />
                <span>Email: {storeSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#C5A059]/40">
              Bộ Sưu Tập Gốm
            </h5>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button onClick={() => handleCategoryClick('dotho')} className="hover:text-[#DAA520] transition-colors">
                  Đồ Thờ Cúng Gia Tiên (Men Rạn Dát Vàng)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('amtra')} className="hover:text-[#DAA520] transition-colors">
                  Bộ Ấm Chén Trà Đạo (Bọc Đồng Thủ Công)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('binhhutloc')} className="hover:text-[#DAA520] transition-colors">
                  Bình Hút Lộc & Mai Bình Phong Thủy
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('locbinh')} className="hover:text-[#DAA520] transition-colors">
                  Lộc Bình Đại Tứ Quý 1m6 Nung Nguyên Khối
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('giadung')} className="hover:text-[#DAA520] transition-colors">
                  Gốm Bàn Ăn Men Lam Vẽ Sen Cung Đình
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('tuongphongthuy')} className="hover:text-[#DAA520] transition-colors">
                  Tượng Di Lặc & Tranh Gốm Phong Thủy
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Customer Care (Col 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#FAF7F2] tracking-wider uppercase pb-2 border-b border-[#C5A059]/40">
              Chính Sách & Hỗ Trợ
            </h5>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-[#DAA520] transition-colors flex items-center gap-1.5">
                  <span>Tra Cứu Tiến Trình Đơn Hàng</span>
                  <span className="text-[10px] bg-[#DAA520] text-black px-1.5 py-0.2 rounded-xs font-bold">Mới</span>
                </button>
              </li>
              <li>
                <a href="#phong-thuy" className="hover:text-[#DAA520] transition-colors">
                  Hướng Dẫn Chọn Gốm Phong Thủy Theo Mệnh
                </a>
              </li>
              <li>
                <a href="#quy-trinh" className="hover:text-[#DAA520] transition-colors">
                  Quy Trình Nung Lò Củi 1300°C Bát Tràng
                </a>
              </li>
              <li>
                <span className="text-[#C5A059]/70">
                  Chính Sách Vận Chuyển Toàn Quốc: Kiểm tra hàng trước khi nhận
                </span>
              </li>
              <li>
                <span className="text-[#C5A059]/70">
                  Cam Kết Chất Lượng: Hoàn tiền 100% nếu nứt mẻ hoặc sai mô tả
                </span>
              </li>
            </ul>

            {/* Owner / Staff Access */}
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="w-full py-2 px-3 rounded-xs bg-[#8B1E1F]/70 hover:bg-[#8B1E1F] text-[#FAF7F2] text-xs font-serif font-semibold border border-[#DAA520]/50 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-3.5 h-3.5 text-[#DAA520]" />
                <span>Trang Quản Lý Xưởng (Dành Cho Chủ Tiệm & Nhân Viên)</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#C5A059]/30 py-4 bg-[#100C0A] text-center text-[11px] text-[#C5A059]/60 font-serif">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 MINH HUYỀN CERAMIC. Tất cả bản quyền được bảo hộ. Làng Gốm Cổ Bát Tràng.</span>
          <span className="flex items-center gap-1">
            Chế tác thủ công với <Heart className="w-3 h-3 text-[#8B1E1F] fill-current" /> tâm huyết nghệ nhân Việt Nam
          </span>
        </div>
      </div>
    </footer>
  );
}
