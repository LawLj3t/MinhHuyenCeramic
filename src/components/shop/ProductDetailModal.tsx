'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  Flame, 
  Star, 
  PhoneCall, 
  Truck,
  ChevronLeft,
  ChevronRight,
  Camera,
  Images
} from 'lucide-react';

interface GallerySlide {
  id: string;
  label: string;
  kind: 'image' | 'zoom-center' | 'zoom-top' | 'artwork';
  url?: string;
}

export default function ProductDetailModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    setIsCheckoutOpen,
    storeSettings,
    currentUser,
    setEditingProduct,
    setIsEditProductOpen,
    setIsAdminOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setActiveSlideIndex(0);
    setQuantity(1);
  }, [quickViewProduct?.id]);

  if (!quickViewProduct) return null;

  // Xây dựng danh sách nhiều ảnh chi tiết cho sản phẩm
  const detailImages = (quickViewProduct.images || []).filter((u) => u && u.trim().length > 0);
  const slides: GallerySlide[] = [];

  if (quickViewProduct.imageUrl) {
    slides.push({
      id: 'cover',
      label: 'Ảnh đại diện toàn cảnh',
      kind: 'image',
      url: quickViewProduct.imageUrl
    });
  }

  detailImages.forEach((imgUrl, idx) => {
    slides.push({
      id: `detail-${idx}`,
      label: `Ảnh chi tiết góc #${idx + 1}`,
      kind: 'image',
      url: imgUrl
    });
  });

  // Nếu người dùng mới chỉ tải lên 1 ảnh đại diện (chưa tải thêm ảnh phụ), tự động tạo thêm các góc phóng cận cảnh + minh họa
  if (slides.length === 1 && quickViewProduct.imageUrl) {
    slides.push(
      {
        id: 'zoom-center',
        label: 'Cận cảnh họa tiết & nước men',
        kind: 'zoom-center',
        url: quickViewProduct.imageUrl
      },
      {
        id: 'zoom-top',
        label: 'Cận cảnh miệng & dáng cổ',
        kind: 'zoom-top',
        url: quickViewProduct.imageUrl
      },
      {
        id: 'artwork-ref',
        label: 'Bản vẽ chế tác Bát Tràng',
        kind: 'artwork'
      }
    );
  } else if (slides.length === 0) {
    // Trường hợp chưa có ảnh thật nào, hiển thị 4 góc nhìn của minh họa gốm
    slides.push(
      { id: 'svg-main', label: 'Toàn cảnh chính diện', kind: 'artwork' },
      { id: 'svg-center', label: 'Cận cảnh hoa văn đắp nổi', kind: 'zoom-center' },
      { id: 'svg-top', label: 'Chi tiết miệng & viền vàng', kind: 'zoom-top' }
    );
  }

  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] border-2 border-[#C9A24B] max-w-5xl w-full max-h-[94vh] overflow-y-auto rounded-xl shadow-2xl relative oriental-border-corner animate-scale-in my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-white/95 text-[#142228] hover:bg-[#163845] hover:text-white transition-colors border border-[#C9A24B]/50 shadow-sm"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7">
          
          {/* Left Column: Multi-Image Gallery (7/12 columns on desktop so full uncropped photos & thumbnails shine) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            
            {/* Main Full-Frame Image Viewer (object-contain, never cropped) */}
            <div className="relative rounded-xl overflow-hidden border-2 border-[#C9A24B]/50 bg-gradient-to-b from-[#F8F6F0] via-[#EFECE2] to-[#E5DEC9] shadow-inner h-80 sm:h-[400px] flex items-center justify-center group">
              {currentSlide.kind === 'image' && currentSlide.url && (
                <>
                  <img
                    src={currentSlide.url}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                  />
                  <img
                    src={currentSlide.url}
                    alt={`${quickViewProduct.name} - ${currentSlide.label}`}
                    className="relative z-10 w-full h-full object-contain p-3 transition-transform duration-500"
                  />
                </>
              )}

              {currentSlide.kind === 'zoom-center' && (
                currentSlide.url ? (
                  <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#F4F1E8]">
                    <img
                      src={currentSlide.url}
                      alt={currentSlide.label}
                      className="w-full h-full object-contain scale-135 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full scale-135">
                      <CeramicArtwork
                        type={quickViewProduct.illustrationType}
                        glaze={quickViewProduct.glaze}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )
              )}

              {currentSlide.kind === 'zoom-top' && (
                currentSlide.url ? (
                  <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#F4F1E8]">
                    <img
                      src={currentSlide.url}
                      alt={currentSlide.label}
                      className="w-full h-full object-contain scale-150 origin-top transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full scale-140 origin-top">
                      <CeramicArtwork
                        type={quickViewProduct.illustrationType}
                        glaze={quickViewProduct.glaze}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )
              )}

              {currentSlide.kind === 'artwork' && (
                <CeramicArtwork
                  type={quickViewProduct.illustrationType}
                  glaze={quickViewProduct.glaze}
                  badgeText={quickViewProduct.badge}
                  className="w-full h-full"
                />
              )}

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#163845]/85 hover:bg-[#163845] text-[#E2C67E] shadow-md transition-all"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#163845]/85 hover:bg-[#163845] text-[#E2C67E] shadow-md transition-all"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Slide Counter & Label Badge */}
              <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-[#163845]/90 text-white text-[11px] font-sans font-medium flex items-center gap-1.5 border border-[#C9A24B]/40 shadow-xs">
                <Images className="w-3.5 h-3.5 text-[#E2C67E]" />
                <span>
                  Ảnh {activeSlideIndex + 1}/{slides.length}: {currentSlide.label}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip (Danh sách nhiều ảnh chi tiết của sản phẩm) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#163845] flex items-center gap-1.5">
                  <Images className="w-3.5 h-3.5 text-[#9B7832]" />
                  <span>Bộ sưu tập ảnh chi tiết sản phẩm ({slides.length} góc nhìn)</span>
                </span>

                {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                  <button
                    type="button"
                    onClick={() => {
                      const prod = quickViewProduct;
                      setQuickViewProduct(null);
                      setEditingProduct(prod);
                      setIsEditProductOpen(true);
                      setIsAdminOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#163845] hover:bg-[#2C5F6F] text-[#E2C67E] text-[11px] font-semibold transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                    <span>+ Thêm / Quản lý nhiều ảnh chi tiết</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-white flex flex-col items-center justify-center p-1 ${
                      idx === activeSlideIndex
                        ? 'border-[#163845] ring-2 ring-[#C9A24B]/60 shadow-sm scale-[1.02]'
                        : 'border-[#C9A24B]/30 opacity-75 hover:opacity-100 hover:border-[#2C5F6F]'
                    }`}
                    title={slide.label}
                  >
                    {slide.kind === 'image' && slide.url ? (
                      <img
                        src={slide.url}
                        alt={slide.label}
                        className="w-full h-full object-contain"
                      />
                    ) : slide.kind === 'zoom-center' && slide.url ? (
                      <img
                        src={slide.url}
                        alt={slide.label}
                        className="w-full h-full object-cover scale-125"
                      />
                    ) : slide.kind === 'zoom-top' && slide.url ? (
                      <img
                        src={slide.url}
                        alt={slide.label}
                        className="w-full h-full object-cover object-top scale-125"
                      />
                    ) : (
                      <div className="w-full h-full">
                        <CeramicArtwork
                          type={quickViewProduct.illustrationType}
                          glaze={quickViewProduct.glaze}
                          className="w-full h-full"
                          showSeal={false}
                        />
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-[#163845]/85 text-white text-[9px] py-0.5 truncate px-1 text-center">
                      {idx === 0 ? 'Ảnh chính' : `Góc #${idx + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Seals Guarantee */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-sans font-medium text-[#163845]">
              <div className="p-2 bg-white border border-[#C9A24B]/35 rounded-lg flex items-center justify-center gap-1.5">
                <Flame className="w-4 h-4 text-[#9B7832] shrink-0" />
                <span>Nung 1300°C</span>
              </div>
              <div className="p-2 bg-white border border-[#C9A24B]/35 rounded-lg flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2C5F6F] shrink-0" />
                <span>Khử Sạch Chì</span>
              </div>
              <div className="p-2 bg-white border border-[#C9A24B]/35 rounded-lg flex items-center justify-center gap-1.5">
                <Truck className="w-4 h-4 text-[#9B7832] shrink-0" />
                <span>Bảo Hiểm Vỡ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Purchasing (5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Glaze */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-sans font-bold text-[#2C5F6F] tracking-wide uppercase">
                  {quickViewProduct.categoryName}
                </span>
                <span className="text-xs font-sans font-semibold text-[#9B7832]">
                  {quickViewProduct.glazeName}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142228] mt-1.5 leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C9A24B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#526872] font-sans">
                  ({quickViewProduct.reviewCount} đánh giá)
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline flex-wrap gap-3 mt-3 pt-3 border-t border-[#2C5F6F]/15">
                <span className="price-text text-2xl sm:text-3xl font-bold text-[#9B7832]">
                  {quickViewProduct.price.toLocaleString('vi-VN')}₫
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="price-text text-sm text-[#526872] line-through">
                    {quickViewProduct.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#243740] font-sans mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specifications Box */}
              <div className="bg-white p-3.5 border border-[#C9A24B]/35 rounded-xl mt-3 space-y-1.5 text-xs font-sans">
                <div className="flex justify-between gap-2">
                  <span className="text-[#526872]">Kích thước:</span>
                  <strong className="text-[#142228] text-right">{quickViewProduct.dimensions}</strong>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#526872]">Trọng lượng:</span>
                  <strong className="text-[#142228]">{quickViewProduct.weight}</strong>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#526872]">Nghệ nhân chế tác:</span>
                  <strong className="text-[#142228] text-right">{quickViewProduct.artisan}</strong>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#526872]">Phong thủy bản mệnh:</span>
                  <strong className="text-[#2C5F6F]">{quickViewProduct.fengShuiElement}</strong>
                </div>
              </div>

              {/* Feng Shui Meaning Highlight */}
              <div className="p-3 bg-[#2C5F6F]/8 border-l-3 border-[#2C5F6F] rounded-r-lg text-xs font-sans text-[#243740] mt-3">
                <span className="font-bold text-[#163845]">Ý nghĩa phong thủy: </span>
                {quickViewProduct.fengShuiMeaning}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-3 border-t border-[#2C5F6F]/15 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-sans font-bold text-[#142228]">Số lượng:</span>
                <div className="flex items-center border border-[#2C5F6F]/30 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold hover:bg-[#FAF7F2] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold font-sans min-w-10 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold hover:bg-[#FAF7F2] transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-[#526872] font-sans">
                  (Còn {quickViewProduct.stockQuantity} tác phẩm)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 border-2 border-[#2C5F6F] text-[#163845] hover:bg-[#2C5F6F]/10 font-sans font-bold text-xs uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#163845] hover:bg-[#2C5F6F] text-white font-sans font-bold text-xs uppercase rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Đặt Mua Ngay</span>
                </button>
              </div>

              {/* Consultation Hotline */}
              <div className="text-center pt-1">
                <a
                  href={`tel:${storeSettings.hotline}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#526872] hover:text-[#163845]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#9B7832]" />
                  <span>Cần tư vấn chi tiết? Gọi Hotline: <strong className="text-[#163845]">{storeSettings.hotline}</strong></span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
