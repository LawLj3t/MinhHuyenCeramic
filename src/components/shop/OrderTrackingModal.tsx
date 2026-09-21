'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';
import { SealStamp } from '@/components/common/CeramicArtwork';
import { Order } from '@/types';

export default function OrderTrackingModal() {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, findOrder, orders, storeSettings, latestOrder } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  React.useEffect(() => {
    if (isOrderTrackingOpen && !hasSearched) {
      if (latestOrder) {
        setSearchInput(latestOrder.id);
        setSearchedOrder(latestOrder);
        setHasSearched(true);
      } else if (orders.length > 0) {
        setSearchInput(orders[0].id);
        setSearchedOrder(orders[0]);
        setHasSearched(true);
      }
    }
  }, [isOrderTrackingOpen, latestOrder, orders, hasSearched]);

  if (!isOrderTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = findOrder(searchInput);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getTimelineStep = (status: Order['orderStatus']) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'confirmed':
        return 2;
      case 'shipping':
        return 3;
      case 'completed':
        return 4;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] border-2 border-[#C5A059] max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl p-6 sm:p-8 relative oriental-border-corner">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOrderTrackingOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white text-[#2A2421] transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pb-5 border-b border-[#C5A059]/30">
          <SealStamp text="Bát Tràng" subtext="Tra Cứu" className="mx-auto" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#181412]">
            Tra Cứu Tiến Trình Giao Gốm
          </h3>
          <p className="text-xs text-[#8C6D27] font-serif max-w-md mx-auto">
            Nhập <strong>Số điện thoại</strong> đặt hàng hoặc <strong>Mã đơn hàng</strong> (VD: MH-8829) để kiểm tra tiến trình bọc hàng và vận chuyển.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 my-5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Nhập SĐT hoặc Mã đơn (VD: 0912345678, MH-8829...)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-[#C5A059]/50 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] font-serif"
              autoFocus
            />
            <Search className="w-4 h-4 text-[#8C6D27] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs"
          >
            Tra Cứu
          </button>
        </form>

        {/* Search Result */}
        {hasSearched && (
          <div>
            {!searchedOrder ? (
              <div className="bg-white p-6 border border-dashed border-[#C5A059] rounded-xs text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-[#8C6D27] mx-auto" />
                <h4 className="font-serif font-bold text-sm text-[#181412]">
                  Không tìm thấy đơn hàng với thông tin vừa nhập
                </h4>
                <p className="text-xs text-[#52433B] font-serif">
                  Vui lòng kiểm tra lại số điện thoại hoặc mã đơn hàng. Hoặc gọi trực tiếp xưởng gốm qua hotline <strong>{storeSettings.hotline}</strong> để được hỗ trợ kiểm tra ngay lập tức.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#C5A059]/40 p-5 rounded-xs shadow-xs space-y-5">
                {/* Order Top Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20 flex-wrap gap-2">
                  <div>
                    <span className="text-[11px] text-[#8C6D27] font-serif block">Mã đơn:</span>
                    <strong className="text-base font-serif text-[#8B1E1F]">{searchedOrder.id}</strong>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#8C6D27] font-serif block">Ngày đặt:</span>
                    <span className="text-xs font-serif text-[#2A2421]">
                      {new Date(searchedOrder.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Progress Visual Timeline */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center relative">
                    {/* Connecting Line */}
                    <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-[#C5A059]/30 -z-0" />
                    
                    {[
                      { step: 1, label: 'Tiếp Nhận', desc: 'Đã xác nhận', icon: Clock },
                      { step: 2, label: 'Đóng Gói', desc: 'Xốp 3 lớp', icon: Package },
                      { step: 3, label: 'Đang Giao', desc: 'Bưu tá vận chuyển', icon: Truck },
                      { step: 4, label: 'Hoàn Tất', desc: 'Đã nhận hàng', icon: CheckCircle2 }
                    ].map((s) => {
                      const currentStep = getTimelineStep(searchedOrder.orderStatus);
                      const isPastOrCurrent = currentStep >= s.step;
                      const Icon = s.icon;
                      return (
                        <div key={s.step} className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            isPastOrCurrent 
                              ? 'bg-[#8B1E1F] border-[#DAA520] text-white shadow-xs' 
                              : 'bg-white border-[#C5A059]/40 text-[#C5A059]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className={`text-xs font-serif font-bold mt-1.5 ${
                            isPastOrCurrent ? 'text-[#8B1E1F]' : 'text-[#8C6D27]/60'
                          }`}>
                            {s.label}
                          </div>
                          <div className="text-[10px] text-[#8C6D27] font-serif hidden sm:block">
                            {s.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customer & Items Breakdown */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xs text-xs font-serif space-y-2 border border-[#C5A059]/20">
                  <div className="flex justify-between">
                    <span className="text-[#8C6D27]">Người nhận:</span>
                    <strong className="text-[#181412]">{searchedOrder.customerName} ({searchedOrder.phone})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C6D27]">Địa chỉ giao:</span>
                    <span className="text-[#181412] text-right">{searchedOrder.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C6D27]">Hình thức:</span>
                    <span className="uppercase font-bold text-[#8B1E1F]">{searchedOrder.paymentMethod}</span>
                  </div>
                  <div className="pt-2 border-t border-[#C5A059]/20 flex justify-between text-sm font-bold">
                    <span>Tổng tiền thu:</span>
                    <span className="text-[#8B1E1F]">{searchedOrder.finalAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>

                {/* Items in order */}
                <div>
                  <div className="text-xs font-serif font-bold text-[#181412] mb-2 uppercase">
                    Danh mục tác phẩm trong kiện hàng:
                  </div>
                  <div className="space-y-1.5 text-xs font-serif text-[#52433B]">
                    {searchedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-[#C5A059]/15">
                        <span className="line-clamp-1">{item.product.name} (x{item.quantity})</span>
                        <span className="text-[#8B1E1F] font-semibold shrink-0">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick sample buttons for test */}
        {!hasSearched && orders.length > 0 && (
          <div className="text-xs font-serif text-[#8C6D27] text-center pt-2">
            <span>Đơn hàng mẫu gần đây: </span>
            <button
              type="button"
              onClick={() => {
                setSearchInput(orders[0].id);
                const found = findOrder(orders[0].id);
                setSearchedOrder(found || null);
                setHasSearched(true);
              }}
              className="text-[#8B1E1F] font-bold underline hover:text-[#A82224] ml-1"
            >
              {orders[0].id} ({orders[0].customerName})
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
