'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  CheckCircle2, 
  X, 
  PhoneCall, 
  Copy, 
  Check, 
  Package, 
  Truck, 
  Clock, 
  ClipboardList 
} from 'lucide-react';
import { SealStamp } from '@/components/common/CeramicArtwork';

export default function OrderSuccessModal() {
  const { 
    isSuccessModalOpen, 
    setIsSuccessModalOpen, 
    latestOrder, 
    setIsOrderTrackingOpen,
    storeSettings 
  } = useStore();

  const [copied, setCopied] = React.useState(false);

  if (!isSuccessModalOpen || !latestOrder) return null;

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(latestOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenTracking = () => {
    setIsSuccessModalOpen(false);
    setIsOrderTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border-2 border-[#C5A059] max-w-lg w-full rounded-xs shadow-2xl p-6 sm:p-8 relative oriental-border-corner text-center">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white text-[#2A2421] transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon with Traditional Ornament */}
        <div className="w-16 h-16 rounded-full bg-[#1E4638]/10 border-2 border-[#1E4638] text-[#1E4638] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <SealStamp text="Bát Tràng" subtext="Tiếp Nhận" className="mb-2" />

        <h3 className="font-serif text-2xl font-bold text-[#181412] mt-2">
          Đặt Hàng Gốm Sứ Thành Công!
        </h3>

        <p className="text-xs sm:text-sm text-[#52433B] font-serif mt-2">
          Kính gửi quý khách <strong className="text-[#181412]">{latestOrder.customerName}</strong>, 
          xưởng gốm Minh Huyền đã ghi nhận đơn hàng và đang chuẩn bị tuyển chọn tác phẩm hoàn mỹ nhất để đóng gói.
        </p>

        {/* Order Code Box */}
        <div className="my-5 p-4 bg-white border border-[#C5A059]/50 rounded-xs flex items-center justify-between shadow-2xs">
          <div className="text-left font-serif">
            <span className="text-[11px] text-[#8C6D27] block">Mã Đơn Hàng Của Quý Khách:</span>
            <span className="text-xl font-bold text-[#8B1E1F] tracking-widest">{latestOrder.id}</span>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-xs text-xs font-serif text-[#2A2421] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã Sao Chép' : 'Sao Chép'}</span>
          </button>
        </div>

        {/* Next Steps Info */}
        <div className="text-left bg-white/70 p-3.5 border border-[#C5A059]/30 rounded-xs space-y-2 text-xs font-serif text-[#52433B]">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#8B1E1F]" />
            <span>Nghệ nhân sẽ gọi điện xác nhận trong <strong>15 phút</strong> tới</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-[#8B1E1F]" />
            <span>Đóng gói 3 lớp xốp khí định hình chuyên biệt cho đồ gốm sứ</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#8B1E1F]" />
            <span>Giao tận nhà: <strong>{latestOrder.address}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleOpenTracking}
            className="py-2.5 px-3 border border-[#8B1E1F] text-[#8B1E1F] hover:bg-[#8B1E1F]/5 text-xs font-serif font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Theo Dõi Đơn</span>
          </button>

          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="py-2.5 px-3 bg-[#8B1E1F] hover:bg-[#A82224] text-white text-xs font-serif font-bold rounded-xs transition-colors shadow-xs"
          >
            Tiếp Tục Xem Gốm
          </button>
        </div>

        {/* Support Hotline */}
        <div className="mt-4 pt-3 border-t border-[#C5A059]/30 text-[11px] font-serif text-[#8C6D27]">
          Cần hỗ trợ gấp? Gọi Hotline Xưởng: <strong className="text-[#8B1E1F]">{storeSettings.hotline}</strong>
        </div>

      </div>
    </div>
  );
}
