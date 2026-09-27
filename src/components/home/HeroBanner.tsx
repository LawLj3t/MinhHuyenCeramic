'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';

export default function HeroBanner() {
  const { products, setQuickViewProduct } = useStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const heroProducts = products.slice(0, 3);
  const currentProduct = heroProducts[selectedIndex] || products[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const scrollToProducts = () => {
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-men-dan-deep border-b border-[#C9A24B]/40 py-10 md:py-16">
      {/* Họa tiết vân Men Rạn vàng trầm tinh tế */}
      <div className="absolute inset-0 crackle-overlay opacity-80 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hình ảnh sản phẩm Gốm Sứ Lớn Chiếm Spotlight (60% Viewport) */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#F4F8F9]/95 via-[#EFECE2]/95 to-[#E8E0CE]/95 border-2 border-[#C9A24B]/60 shadow-strong p-4 sm:p-8 oriental-border-corner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Cột Ảnh Sản Phẩm Lớn (Chiếm 7/12 cột) */}
            <div className="lg:col-span-7 relative">
              <div 
                onClick={() => setQuickViewProduct(currentProduct)}
                className="w-full h-80 sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden border border-[#C9A24B]/35 shadow-inner flex items-center justify-center relative group cursor-pointer"
              >
                <CeramicArtwork 
                  type={currentProduct?.illustrationType || 'bat-huong'} 
                  glaze={currentProduct?.glaze}
                  badgeText={currentProduct?.badge}
                  className="w-full h-full"
                  imageUrl={currentProduct?.imageUrl}
                />

                {/* Nút chuyển slide tinh tế */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
                  }}
                  className="absolute left-3 p-2.5 rounded-full bg-[#163845]/80 hover:bg-[#163845] text-[#E2C67E] transition-all shadow-md"
                  aria-label="Tác phẩm trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev + 1) % heroProducts.length);
                  }}
                  className="absolute right-3 p-2.5 rounded-full bg-[#163845]/80 hover:bg-[#163845] text-[#E2C67E] transition-all shadow-md"
                  aria-label="Tác phẩm sau"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cột Thông Tin Tối Giản (Chiếm 5/12 cột - không lấn át ảnh) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-center lg:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C5F6F]/12 border border-[#2C5F6F]/25 text-[#163845] text-xs font-sans font-semibold tracking-wider uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                  <span>Gốm Sứ Bát Tràng · Men Rạn Ngọc Lam</span>
                </div>

                {/* Slogan 1 câu ngắn gọn, mạnh mẽ (8-10 từ) */}
                <h1 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-[#142228] leading-[1.25]">
                  Tinh Hoa Men Rạn · Tuyệt Tác Nung Củi 1300°C
                </h1>

                {/* Tên & giá sản phẩm đang trình chiếu */}
                <div className="mt-5 pt-4 border-t border-[#2C5F6F]/15">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#2C5F6F]">
                    {currentProduct?.glazeName}
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#142228] mt-1 line-clamp-1">
                    {currentProduct?.name}
                  </h2>
                  <div className="mt-2 flex items-baseline justify-center lg:justify-start gap-3">
                    <span className="price-text text-2xl font-bold text-[#9B7832]">
                      {currentProduct?.price.toLocaleString('vi-VN')}₫
                    </span>
                    {currentProduct?.originalPrice && (
                      <span className="price-text text-sm text-[#526872] line-through">
                        {currentProduct.originalPrice.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Cụm CTA gọn gàng */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-celadon-gradient hover:opacity-95 text-white font-sans font-semibold text-sm shadow-medium transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Khám Phá Bộ Sưu Tập</span>
                  <ArrowRight className="w-4 h-4 text-[#E2C67E]" />
                </button>

                <button
                  onClick={() => setQuickViewProduct(currentProduct)}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg border border-[#2C5F6F]/35 hover:border-[#2C5F6F] bg-white/80 text-[#142228] font-sans font-semibold text-sm transition-all inline-flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#2C5F6F]" />
                  <span>Xem Chi Tiết</span>
                </button>
              </div>

              {/* Dots điều hướng */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                {heroProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`h-2 transition-all rounded-full ${
                      idx === selectedIndex 
                        ? 'w-8 bg-[#2C5F6F]' 
                        : 'w-2 bg-[#2C5F6F]/30 hover:bg-[#2C5F6F]/60'
                    }`}
                    aria-label={`Xem tác phẩm ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
