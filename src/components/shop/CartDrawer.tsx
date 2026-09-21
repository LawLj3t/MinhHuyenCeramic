'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    shippingFee,
    cartFinalTotal,
    setIsCheckoutOpen
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ success: res.success, text: res.message });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Progress to free shipping (1.500.000đ)
  const freeShippingThreshold = 1500000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="glass-morph border-l-2 border-[#C5A059] w-full max-w-md h-full flex flex-col justify-between shadow-strong relative animate-slide-in-right">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#C5A059]/40 bg-white/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B1E1F]" />
            <h3 className="font-serif font-bold text-lg text-[#181412] tracking-wide">
              Giỏ Hàng Gốm Sứ ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#8B1E1F]/10 text-[#2A2421] hover:text-[#8B1E1F] transition-smooth hover:rotate-90"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#181412] text-[#EADCC9] px-4 py-2.5 text-xs font-serif border-b border-[#C5A059]/40">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-[#DAA520]">
              <Truck className="w-3.5 h-3.5" />
              {remainingForFreeShipping === 0 ? (
                <span className="font-bold text-[#4ADE80]">Quý khách được Miễn Phí Vận Chuyển toàn quốc!</span>
              ) : (
                <span>Mua thêm <strong className="text-[#FAF7F2]">{remainingForFreeShipping.toLocaleString('vi-VN')}₫</strong> để freeship</span>
              )}
            </span>
            <span className="text-[10px] text-[#C5A059] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#DAA520] to-[#E5C278] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full border border-[#C5A059]/40 bg-white flex items-center justify-center mx-auto text-[#8C6D27]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#181412]">
                Giỏ hàng của quý khách đang trống
              </h4>
              <p className="text-xs text-[#8C6D27] font-serif max-w-xs mx-auto">
                Hãy dạo quanh bộ sưu tập gốm sứ Bát Tràng và chọn cho gia đình những tuyệt phẩm ưng ý nhất.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 bg-[#8B1E1F] text-white text-xs font-serif font-bold rounded-xs uppercase tracking-wider hover:bg-[#A82224] transition-colors"
              >
                Khám Phá Gốm Sứ
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white p-3.5 border border-[#C5A059]/30 rounded-xs shadow-xs hover:shadow-medium flex gap-3 relative group transition-smooth hover-lift"
              >
                {/* Artwork Thumbnail */}
                <div className="w-20 h-20 shrink-0 rounded-xs overflow-hidden border border-[#C5A059]/20 bg-[#FAF7F2]">
                  <CeramicArtwork
                    type={product.illustrationType}
                    glaze={product.glaze}
                    className="h-full min-h-0"
                    showSeal={false}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#181412] line-clamp-2 leading-snug">
                        {product.name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#8C6D27] hover:text-[#8B1E1F] hover:bg-[#8B1E1F]/10 p-1 rounded-xs transition-smooth hover:scale-110"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#8C6D27] font-serif mt-0.5">
                      Men: {product.glazeName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C5A059]/10">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#8B1E1F]">
                      {(product.price * quantity).toLocaleString('vi-VN')}₫
                    </span>

                    {/* Quantity Modifier */}
                    <div className="flex items-center border border-[#C5A059]/40 rounded-xs bg-[#FAF7F2] overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        disabled={quantity === 1}
                        className="px-2 py-1 text-[#2A2421] hover:bg-[#8B1E1F] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-sm transition-smooth"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#181412] bg-white border-x border-[#C5A059]/20 min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 text-[#2A2421] hover:bg-[#8B1E1F] hover:text-white text-sm transition-smooth"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#C5A059]/40 bg-white space-y-3">
            
            {/* Promo code form */}
            <form onSubmit={handleApplyCode} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Mã giảm giá (VD: BATTRANG10, TRIAN)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#C5A059]/40 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] font-serif uppercase placeholder:normal-case"
                />
                <Tag className="w-3.5 h-3.5 text-[#8C6D27] absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-gradient-to-r from-[#181412] to-[#2A2421] hover:from-[#2A2421] hover:to-[#181412] text-[#DAA520] text-xs font-serif font-bold rounded-xs transition-smooth shadow-xs hover:shadow-glow-gold"
              >
                Áp Dụng
              </button>
            </form>

            {promoMessage && (
              <div className={`text-[11px] font-serif ${promoMessage.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                {promoMessage.text}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-serif text-[#52433B] pt-2 border-t border-[#C5A059]/20">
              <div className="flex justify-between">
                <span>Tạm tính gốm sứ:</span>
                <span className="font-bold text-[#181412]">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#8B1E1F]">
                  <span>Ưu đãi khuyến mãi ({promoCode}):</span>
                  <span className="font-bold">-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Phí vận chuyển bọc xốp 3 lớp:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#1E4638]">Miễn Phí</strong>
                  ) : (
                    `${shippingFee.toLocaleString('vi-VN')}₫`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-bold text-[#181412] pt-2 border-t border-[#C5A059]/30">
                <span>Tổng thanh toán:</span>
                <span className="text-[#8B1E1F] text-lg font-serif">
                  {cartFinalTotal.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] hover:from-[#A82224] hover:to-[#8B1E1F] text-white font-serif font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xs transition-smooth shadow-medium hover:shadow-glow-red flex items-center justify-center gap-2 group hover:scale-105"
            >
              <span>Tiến Hành Đặt Hàng Ngay</span>
              <ArrowRight className="w-4 h-4 text-[#DAA520] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C6D27] font-serif pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E4638]" />
              <span>Kiểm tra hàng cẩn thận trước khi thanh toán</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
