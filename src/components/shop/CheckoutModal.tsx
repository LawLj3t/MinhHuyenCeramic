'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft,
  PhoneCall,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PaymentMethod } from '@/types';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartFinalTotal,
    createOrder,
    storeSettings 
  } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: 'Hà Nội',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'Vui lòng nhập họ và tên';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ (9 - 11 chữ số)';
    }
    if (!formData.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ nhận hàng';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Create order
      createOrder({
        customerName: formData.customerName,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}`,
        city: formData.city,
        note: formData.note,
        items: [...cart],
        totalAmount: cartSubtotal,
        discountAmount: discountAmount,
        shippingFee: shippingFee,
        finalAmount: cartFinalTotal,
        paymentMethod: paymentMethod
      });

      // Trigger Confetti fireworks celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
    }, 600);
  };

  // VietQR URL builder using standard VietQR format
  // https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
  const vietQrUrl = `https://img.vietqr.io/image/970436-${storeSettings.bankAccount}-compact2.png?amount=${cartFinalTotal}&addInfo=GOM%20BAT%20TRANG%20${formData.phone ? formData.phone.slice(-4) : 'DH'}&accountName=${encodeURIComponent(storeSettings.bankAccountName)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] border-2 border-[#C5A059] max-w-4xl w-full max-h-[95vh] overflow-y-auto rounded-xs shadow-2xl relative oriental-border-corner my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#C5A059]/40 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B1E1F]" />
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181412] tracking-wide">
              Thanh Toán & Đặt Hàng Gốm Bát Tràng
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#2A2421] transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Customer & Delivery Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Section 1: Customer Info */}
            <div className="bg-white p-4 sm:p-5 border border-[#C5A059]/30 rounded-xs shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#C5A059]/20">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#8B1E1F] uppercase tracking-wider">
                  1. Thông Tin Người Nhận
                </span>
                <span className="text-[11px] text-[#8C6D27] font-serif">Bảo mật thông tin</span>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                  Họ và tên quý khách <span className="text-[#8B1E1F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-xs focus:outline-hidden font-serif ${
                    formErrors.customerName ? 'border-rose-500 bg-rose-50' : 'border-[#C5A059]/50 focus:border-[#8B1E1F]'
                  }`}
                />
                {formErrors.customerName && (
                  <p className="text-[11px] text-rose-600 mt-1 font-serif">{formErrors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Số điện thoại nhận hàng <span className="text-[#8B1E1F]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ví dụ: 0988686888"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-xs focus:outline-hidden font-serif ${
                      formErrors.phone ? 'border-rose-500 bg-rose-50' : 'border-[#C5A059]/50 focus:border-[#8B1E1F]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1 font-serif">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Tỉnh / Thành phố <span className="text-[#8B1E1F]">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-[#C5A059]/50 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] font-serif bg-white"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Thanh Hóa">Thanh Hóa</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Tỉnh Thành Khác">Tỉnh Thành Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                  Địa chỉ chi tiết (Số nhà, ngõ/đường, phường/xã) <span className="text-[#8B1E1F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Số 28 Đường Cổ Bi, Xã Bát Tràng..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-xs focus:outline-hidden font-serif ${
                    formErrors.address ? 'border-rose-500 bg-rose-50' : 'border-[#C5A059]/50 focus:border-[#8B1E1F]'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-rose-600 mt-1 font-serif">{formErrors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                  Ghi chú cho xưởng gốm (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đóng thùng gỗ bọc kỹ đồ cúng giúp tôi, giao trước thứ 7..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#C5A059]/50 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] font-serif"
                />
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="bg-white p-4 sm:p-5 border border-[#C5A059]/30 rounded-xs shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#C5A059]/20">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#8B1E1F] uppercase tracking-wider">
                  2. Phương Thức Thanh Toán
                </span>
                <span className="text-[11px] text-[#1E4638] font-serif font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> An toàn tuyệt đối
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Method 1: COD */}
                <label 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-3 border rounded-xs cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#8B1E1F] bg-[#8B1E1F]/5 shadow-xs' : 'border-[#C5A059]/40 hover:border-[#8B1E1F]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-[#8B1E1F]"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-[#181412] flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#8B1E1F]" />
                      <span>Thanh Toán Khi Nhận (COD)</span>
                    </div>
                    <div className="text-[11px] text-[#8C6D27] font-serif mt-0.5">
                      Được mở kiện kiểm tra hàng ưng ý mới trả tiền
                    </div>
                  </div>
                </label>

                {/* Method 2: VietQR */}
                <label 
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`flex items-start gap-3 p-3 border rounded-xs cursor-pointer transition-all ${
                  paymentMethod === 'vietqr' ? 'border-[#8B1E1F] bg-[#8B1E1F]/5 shadow-xs' : 'border-[#C5A059]/40 hover:border-[#8B1E1F]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'vietqr'}
                    onChange={() => setPaymentMethod('vietqr')}
                    className="mt-0.5 accent-[#8B1E1F]"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-[#181412] flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-[#8B1E1F]" />
                      <span>Chuyển Khoản VietQR</span>
                    </div>
                    <div className="text-[11px] text-[#8C6D27] font-serif mt-0.5">
                      Quét mã QR qua mọi app ngân hàng (24/7)
                    </div>
                  </div>
                </label>

                {/* Method 3: VNPay */}
                <label 
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`flex items-start gap-3 p-3 border rounded-xs cursor-pointer transition-all ${
                  paymentMethod === 'vnpay' ? 'border-[#8B1E1F] bg-[#8B1E1F]/5 shadow-xs' : 'border-[#C5A059]/40 hover:border-[#8B1E1F]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                    className="mt-0.5 accent-[#8B1E1F]"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-[#181412] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#8B1E1F]" />
                      <span>Cổng VNPay Gateway</span>
                    </div>
                    <div className="text-[11px] text-[#8C6D27] font-serif mt-0.5">
                      Thanh toán thẻ ATM nội địa / Visa / Master
                    </div>
                  </div>
                </label>

                {/* Method 4: Zalo Consult */}
                <label 
                  onClick={() => setPaymentMethod('zalo')}
                  className={`flex items-start gap-3 p-3 border rounded-xs cursor-pointer transition-all ${
                  paymentMethod === 'zalo' ? 'border-[#8B1E1F] bg-[#8B1E1F]/5 shadow-xs' : 'border-[#C5A059]/40 hover:border-[#8B1E1F]'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'zalo'}
                    onChange={() => setPaymentMethod('zalo')}
                    className="mt-0.5 accent-[#8B1E1F]"
                  />
                  <div>
                    <div className="font-serif font-bold text-xs text-[#181412] flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4 text-[#8B1E1F]" />
                      <span>Đặt Nhanh Qua Zalo Xưởng</span>
                    </div>
                    <div className="text-[11px] text-[#8C6D27] font-serif mt-0.5">
                      Gửi ảnh thật tại lò nung qua Zalo duyệt
                    </div>
                  </div>
                </label>
              </div>

              {/* Dynamic Payment Instruction Panel */}
              {paymentMethod === 'vietqr' && (
                <div className="p-4 bg-[#FAF7F2] border border-[#C5A059]/40 rounded-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#8B1E1F]">
                    <QrCode className="w-4 h-4" />
                    <span>Mã VietQR Thanh Toán Tự Động</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-36 h-36 bg-white p-2 border border-[#C5A059]/40 rounded-xs flex items-center justify-center shrink-0 shadow-xs">
                      {/* Standard VietQR API image or fallback visual */}
                      <img
                        src={vietQrUrl}
                        alt="Mã VietQR"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to QR graphic if network limits external images
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="text-xs font-serif space-y-1 text-[#2A2421]">
                      <div>Ngân hàng: <strong>{storeSettings.bankName}</strong></div>
                      <div>Số tài khoản: <strong className="text-[#8B1E1F] text-sm">{storeSettings.bankAccount}</strong></div>
                      <div>Chủ tài khoản: <strong>{storeSettings.bankAccountName}</strong></div>
                      <div>Số tiền: <strong className="text-[#8B1E1F]">{cartFinalTotal.toLocaleString('vi-VN')}₫</strong></div>
                      <div className="text-[11px] text-[#8C6D27] italic pt-1">
                        * Quý khách có thể chuyển khoản sau khi bấm Xác Nhận Đơn Hàng.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-4 sm:p-5 border-2 border-[#C5A059]/40 rounded-xs shadow-md space-y-4">
              <div className="pb-3 border-b border-[#C5A059]/30">
                <h4 className="font-serif font-bold text-sm text-[#181412] uppercase tracking-wider">
                  Đơn Hàng Của Quý Khách ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
                </h4>
              </div>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs font-serif gap-2">
                    <div className="line-clamp-1 flex-1">
                      <span className="font-medium text-[#181412]">{product.name}</span>
                      <span className="text-[#8C6D27] ml-1">x{quantity}</span>
                    </div>
                    <span className="font-bold text-[#8B1E1F] shrink-0">
                      {(product.price * quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 pt-3 border-t border-[#C5A059]/30 text-xs font-serif text-[#52433B]">
                <div className="flex justify-between">
                  <span>Tiền hàng:</span>
                  <span className="font-bold text-[#181412]">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8B1E1F]">
                    <span>Giảm giá:</span>
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

                <div className="flex justify-between text-base font-bold text-[#181412] pt-2 border-t border-[#C5A059]/40">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-[#8B1E1F] text-xl font-serif">
                    {cartFinalTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Commit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-sm tracking-wider uppercase rounded-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang Khởi Tạo Đơn Hàng...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#DAA520]" />
                    <span>Xác Nhận Đặt Hàng Gốm</span>
                  </>
                )}
              </button>

              <div className="space-y-1 text-[11px] text-[#8C6D27] font-serif text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E4638]" />
                  <span>Cam kết đền bù 100% nếu có nứt mẻ do vận chuyển</span>
                </div>
                <div>Xưởng Bát Tràng sẽ gọi điện xác nhận trong vòng 15 phút</div>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
