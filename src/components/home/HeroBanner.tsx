'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Award, 
  ShieldCheck, 
  PhoneCall, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork, SealStamp } from '@/components/common/CeramicArtwork';

export default function HeroBanner() {
  const { products, addToCart, setQuickViewProduct, storeSettings } = useStore();
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  // Take top 3 featured products for the hero showcase
  const heroProducts = products.slice(0, 3);
  const currentHero = heroProducts[selectedHeroIndex] || products[0];

  const scrollToProducts = () => {
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F5EFEB] to-[#EAE1D2] border-b border-[#C5A059]/40 pt-6 pb-12 md:py-16">
      {/* Background Classical Motifs & Atmospheric Radial Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none animate-float" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8B1E1F]/5 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-[#DAA520]/10 blur-3xl pointer-events-none" style={{ animation: 'float 4s ease-in-out infinite' }} />

      {/* Traditional Corner Embellishments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand & Poetic Narrative */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left animate-fade-in">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#8B1E1F]/40 glass-morph rounded-xs text-[#8B1E1F] text-xs font-serif font-semibold tracking-wider shadow-xs animate-slide-in-left">
              <span className="w-2 h-2 rounded-full bg-[#8B1E1F] animate-ping" />
              <span>GỐM SỨ MỸ NGHỆ HOÀNG GIA ĐẠI VIỆT</span>
              <span className="text-gold-gradient">✦</span>
              <span className="text-[11px] text-[#8C6D27] font-sans font-normal">700 Năm Làng Cổ Bát Tràng</span>
            </div>

            {/* Main Poetic Heading blending Chinese oriental grandeur with Vietnamese soul */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#181412] leading-[1.18] tracking-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              Thổi Hồn Vào Đất <br className="hidden sm:inline" />
              <span className="text-gold-gradient relative inline-block">
                Đúc Vận Cung Đình
                <svg className="absolute -bottom-1.5 left-0 w-full text-[#C5A059]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M0 5 Q 100 0 200 5" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-lg text-[#52433B] max-w-2xl mx-auto lg:mx-0 font-serif leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Hội tụ tinh hoa men rạn cổ truyền, men lam cung đình và men hỏa biến kỳ ảo. 
              Mỗi tác phẩm đều được nghệ nhân ưu tú vuốt tay trên bàn xoay, nung lò củi <strong className="text-gold-gradient font-bold">1300°C</strong> khử sạch hoàn toàn chì và tạp chất kim loại nặng.
            </p>

            {/* Quick Guarantees Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 p-2 glass-morph border border-[#C5A059]/30 rounded-xs shadow-xs hover-lift group">
                <Flame className="w-4 h-4 text-[#8B1E1F] shrink-0 group-hover:scale-110 transition-bounce" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#2A2421] leading-none">Nung Củi 1300°C</div>
                  <div className="text-[10px] text-[#8C6D27] leading-tight mt-0.5">Khử sạch độc chì 100%</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 glass-morph border border-[#C5A059]/30 rounded-xs shadow-xs hover-lift group">
                <Award className="w-4 h-4 text-[#DAA520] shrink-0 group-hover:scale-110 transition-bounce" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#2A2421] leading-none">Vuốt Tay Thủ Công</div>
                  <div className="text-[10px] text-[#8C6D27] leading-tight mt-0.5">Độc bản từng tác phẩm</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 glass-morph border border-[#C5A059]/30 rounded-xs shadow-xs col-span-2 sm:col-span-1 hover-lift group">
                <ShieldCheck className="w-4 h-4 text-[#1E4638] shrink-0 group-hover:scale-110 transition-bounce" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#2A2421] leading-none">Bảo Hành Vỡ Hỏng</div>
                  <div className="text-[10px] text-[#8C6D27] leading-tight mt-0.5">1 đổi 1 tận tay khách</div>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={scrollToProducts}
                className="px-6 py-3 bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] hover:from-[#A82224] hover:to-[#8B1E1F] text-[#FAF7F2] font-serif font-bold text-sm tracking-wider uppercase border border-[#DAA520] shadow-medium hover:shadow-glow-red transition-smooth flex items-center gap-2 rounded-xs group hover:scale-105"
              >
                <span>Khám Phá Tuyệt Tác Gốm</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#DAA520]" />
              </button>

              <a
                href={`https://zalo.me/${storeSettings.zaloNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 glass-morph hover:bg-[#FAF7F2] text-[#2A2421] font-serif font-semibold text-sm border border-[#C5A059] shadow-xs hover:border-[#8B1E1F] transition-smooth flex items-center gap-2 rounded-xs hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 text-[#8B1E1F]" />
                <span>Tư Vấn Phong Thủy Zalo</span>
              </a>
            </div>

            {/* Seal & Artisan Endorsement */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#8C6D27] animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <SealStamp text="Bát Tràng" subtext="700 Năm" />
              <div className="text-left font-serif">
                <div className="font-semibold text-[#2A2421]">Xưởng Gốm Minh Huyền Bát Tràng</div>
                <div className="text-[11px] text-[#8C6D27]/80">Gia tộc 3 đời lưu giữ bí truyền men rạn tam thái</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Masterpiece Interactive Card */}
          <div className="lg:col-span-5 animate-slide-in-right">
            <div className="relative glass-morph border-2 border-[#C5A059]/50 shadow-strong hover:shadow-glow-gold p-4 sm:p-5 rounded-xs oriental-border-corner transition-smooth hover-lift">
              {/* Product Badge Ribbon */}
              <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B1E1F]" />
                  <span className="text-xs font-serif font-bold text-[#8B1E1F] tracking-wide uppercase">
                    Tuyệt Tác Tiêu Biểu
                  </span>
                </div>
                <span className="text-[11px] font-serif text-[#8C6D27] italic">
                  {currentHero?.categoryName}
                </span>
              </div>

              {/* Central Artwork Showcase */}
              <div className="relative rounded-xs overflow-hidden border border-[#C5A059]/30 shadow-inner bg-[#FAF7F2]">
                <CeramicArtwork 
                  type={currentHero?.illustrationType || 'bat-huong'} 
                  glaze={currentHero?.glaze}
                  badgeText={currentHero?.badge}
                  className="h-64 sm:h-72"
                  imageUrl={currentHero?.imageUrl}
                />
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#181412] line-clamp-2 leading-snug">
                    {currentHero?.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#8B1E1F] font-serif">
                    {currentHero?.price.toLocaleString('vi-VN')}₫
                  </span>
                  {currentHero?.originalPrice && (
                    <span className="text-xs text-[#8C6D27] line-through font-serif">
                      {currentHero.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  )}
                  <span className="text-[11px] text-[#1E4638] bg-[#D8F3DC] px-1.5 py-0.5 rounded-xs font-medium">
                    Tiết kiệm {((currentHero.originalPrice || currentHero.price) - currentHero.price).toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#52433B] pt-1 border-t border-[#C5A059]/20 font-serif">
                  <div>
                    <span className="text-[#8C6D27]">Chất men:</span> <strong>{currentHero?.glazeName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C6D27]">Quy cách:</span> <strong>{currentHero?.dimensions.split('x')[0]}</strong>
                  </div>
                </div>

                {/* Action Buttons for Hero */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setQuickViewProduct(currentHero)}
                    className="py-2 px-3 border-2 border-[#8B1E1F] text-[#8B1E1F] hover:bg-[#8B1E1F] hover:text-white text-xs font-serif font-bold tracking-wide rounded-xs flex items-center justify-center gap-1.5 transition-smooth hover:shadow-medium"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem Chi Tiết</span>
                  </button>

                  <button
                    onClick={() => addToCart(currentHero, 1)}
                    className="py-2 px-3 bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] hover:from-[#A82224] hover:to-[#8B1E1F] text-[#FAF7F2] text-xs font-serif font-bold tracking-wide rounded-xs flex items-center justify-center gap-1.5 transition-smooth shadow-xs hover:shadow-glow-red hover:scale-105"
                  >
                    <span>Thêm Vào Giỏ</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#DAA520]" />
                  </button>
                </div>
              </div>

              {/* Masterpiece Carousel Switcher Dots */}
              <div className="mt-4 pt-3 border-t border-[#C5A059]/30 flex items-center justify-between">
                <span className="text-[11px] text-[#8C6D27] font-serif">
                  Tác phẩm tiêu biểu ({selectedHeroIndex + 1}/{heroProducts.length})
                </span>
                <div className="flex items-center gap-1.5">
                  {heroProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedHeroIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === selectedHeroIndex 
                          ? 'w-6 bg-gradient-to-r from-[#8B1E1F] to-[#5C1213] shadow-glow-red' 
                          : 'w-2 bg-[#C5A059]/40 hover:bg-[#C5A059] hover:scale-125'
                      }`}
                      aria-label={`Xem tác phẩm ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
