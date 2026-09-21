'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork, SealStamp } from '@/components/common/CeramicArtwork';
import { 
  X, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Flame, 
  Star, 
  PhoneCall, 
  Sparkles, 
  Truck, 
  PackageCheck 
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setIsCheckoutOpen,
    storeSettings 
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="glass-morph border-2 border-[#C5A059] max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-xs shadow-strong relative oriental-border-corner animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#2A2421] hover:bg-[#8B1E1F] hover:text-white transition-smooth border border-[#C5A059]/40 shadow-xs hover:shadow-glow-red hover:scale-110"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Visual Artwork & Seals */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-xs overflow-hidden border-2 border-[#C5A059]/40 bg-white shadow-inner">
              <CeramicArtwork
                type={quickViewProduct.illustrationType}
                glaze={quickViewProduct.glaze}
                badgeText={quickViewProduct.badge}
                imageUrl={quickViewProduct.imageUrl}
                className="h-80 sm:h-96"
              />
            </div>

            {/* Quality Seals Guarantee */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-[11px] font-serif text-[#8C6D27]">
              <div className="p-2 bg-white border border-[#C5A059]/30 rounded-xs">
                <Flame className="w-4 h-4 text-[#8B1E1F] mx-auto mb-1" />
                <span>Nung 1300°C</span>
              </div>
              <div className="p-2 bg-white border border-[#C5A059]/30 rounded-xs">
                <ShieldCheck className="w-4 h-4 text-[#1E4638] mx-auto mb-1" />
                <span>Khử Sạch Chì</span>
              </div>
              <div className="p-2 bg-white border border-[#C5A059]/30 rounded-xs">
                <Truck className="w-4 h-4 text-[#DAA520] mx-auto mb-1" />
                <span>Bảo Hiểm Nứt Vỡ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Purchasing */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-semibold text-[#8B1E1F] tracking-wide uppercase">
                  {quickViewProduct.categoryName}
                </span>
                <span className="text-xs font-serif text-[#8C6D27] italic">
                  Dòng Men: {quickViewProduct.glazeName}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181412] mt-1.5 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#DAA520]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#8C6D27] font-serif">
                  ({quickViewProduct.reviewCount} đánh giá từ khách hàng đã thỉnh gốm)
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mt-3 pt-3 border-t border-[#C5A059]/30">
                <span className="text-2xl sm:text-3xl font-bold text-[#8B1E1F] font-serif">
                  {quickViewProduct.price.toLocaleString('vi-VN')}₫
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#8C6D27] line-through font-serif">
                    {quickViewProduct.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
                <span className="text-xs font-serif text-[#1E4638] bg-[#D8F3DC] px-2 py-0.5 rounded-xs font-semibold">
                  Tiết kiệm {((quickViewProduct.originalPrice || quickViewProduct.price) - quickViewProduct.price).toLocaleString('vi-VN')}₫
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#52433B] font-serif mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specifications Box */}
              <div className="bg-white p-3.5 border border-[#C5A059]/30 rounded-xs mt-3 space-y-1.5 text-xs font-serif">
                <div className="flex justify-between">
                  <span className="text-[#8C6D27]">Kích thước:</span>
                  <strong className="text-[#181412]">{quickViewProduct.dimensions}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6D27]">Cân nặng:</span>
                  <strong className="text-[#181412]">{quickViewProduct.weight}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6D27]">Nghệ nhân chế tác:</span>
                  <strong className="text-[#181412]">{quickViewProduct.artisan}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C6D27]">Phong thủy bản mệnh:</span>
                  <strong className="text-[#8B1E1F]">{quickViewProduct.fengShuiElement}</strong>
                </div>
              </div>

              {/* Feng Shui Meaning Highlight */}
              <div className="p-3 bg-[#8B1E1F]/5 border-l-3 border-[#8B1E1F] text-xs font-serif text-[#2A2421] mt-3">
                <span className="font-bold text-[#8B1E1F]">Ý nghĩa phong thủy: </span>
                {quickViewProduct.fengShuiMeaning}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-3 border-t border-[#C5A059]/30 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-serif font-bold text-[#2A2421]">Số lượng:</span>
                <div className="flex items-center border border-[#C5A059]/50 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold hover:bg-[#FAF7F2] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold font-serif min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold hover:bg-[#FAF7F2] transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-[#8C6D27] font-serif">
                  (Còn {quickViewProduct.stockQuantity} tác phẩm tại xưởng)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 border-2 border-[#8B1E1F] text-[#8B1E1F] hover:bg-[#8B1E1F]/5 font-serif font-bold text-xs tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs tracking-wider uppercase rounded-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Đặt Mua Ngay</span>
                </button>
              </div>

              {/* Consultation Hotline */}
              <div className="text-center pt-1">
                <a
                  href={`tel:${storeSettings.hotline}`}
                  className="inline-flex items-center gap-1.5 text-xs font-serif text-[#8C6D27] hover:text-[#8B1E1F]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#8B1E1F]" />
                  <span>Cần đặt kích thước riêng theo yêu cầu? Gọi Hotline: <strong>{storeSettings.hotline}</strong></span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
