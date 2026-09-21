'use client';

import React from 'react';
import { SealStamp } from '@/components/common/CeramicArtwork';
import { Award, HeartHandshake, MapPin, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ArtisanStory() {
  const { storeSettings } = useStore();

  return (
    <section id="nghe-nhan" className="py-16 bg-[#F5EFEB] border-b border-[#C5A059]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual: Traditional Master Workshop Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border-2 border-[#C5A059] p-6 rounded-xs shadow-xl relative oriental-border-corner">
              {/* Traditional Seal */}
              <div className="absolute top-4 right-4 z-10">
                <SealStamp text="Bát Tràng" subtext="Nghệ Nhân" />
              </div>

              {/* Artisan Profile Visual / Workshop Impression */}
              <div className="w-full h-72 rounded-xs overflow-hidden bg-gradient-to-br from-[#2A2421] to-[#181412] text-[#FAF7F2] p-6 flex flex-col justify-between relative border border-[#C5A059]/40">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10">
                  <div className="text-[11px] font-serif tracking-widest text-[#DAA520] uppercase">
                    Kỷ Vật Truyền Đời
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mt-1">
                    Gia Tộc Gốm Sứ Minh Huyền
                  </h3>
                  <p className="text-xs text-[#EADCC9] font-serif italic mt-1">
                    Xóm 1, Làng cổ Bát Tràng, Gia Lâm, Hà Nội
                  </p>
                </div>

                <div className="relative z-10 space-y-2 border-t border-white/20 pt-3 text-xs text-[#FAF7F2]/90 font-serif">
                  <div className="flex items-center gap-2">
                    <span className="text-[#DAA520]">✦</span>
                    <span>35 năm gìn giữ bài men rạn chân kim thời Lê</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#DAA520]">✦</span>
                    <span>Từng tác phẩm đều có chữ ký & triện ấn nghệ nhân</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#DAA520]">✦</span>
                    <span>Phục dựng đồ thờ cung đình cho hàng vạn gia đình Việt</span>
                  </div>
                </div>
              </div>

              {/* Bottom quote */}
              <div className="mt-4 text-center font-serif text-xs text-[#8C6D27] italic">
                &ldquo;Nhất xương, nhì da, thứ ba nước men — Đất lành chim đậu, người có tâm mới tạo nên gốm có hồn.&rdquo;
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-4 text-[#2A2421]">
            <div className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#8B1E1F] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#DAA520]" />
              <span>Chuyện Làng Nghề • Người Giữ Hồn Cho Đất</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#181412] leading-tight">
              Tôn Vinh Bàn Tay Nghệ Nhân <br />
              <span className="text-[#8B1E1F]">Nâng Niêu Từng Hạt Đất Phù Sa</span>
            </h2>

            <p className="text-sm md:text-base text-[#52433B] font-serif leading-relaxed">
              Bát Tràng là cái nôi của gốm sứ Việt Nam với bề dày hơn 700 năm lịch sử. Trải qua bao biến thiên của thời cuộc, 
              những gia đình nghệ nhân tại <strong className="text-[#181412]">Minh Huyền Ceramic</strong> vẫn miệt mài bên bàn xoay, 
              dùng củi gỗ nung đốt ở nhiệt độ cao 1300°C để tạo nên chất gốm đanh vang, khử sạch độc tố chì.
            </p>

            <p className="text-sm md:text-base text-[#52433B] font-serif leading-relaxed">
              Chúng tôi không sản xuất đại trà theo khuôn máy công nghiệp. Mỗi chiếc bát hương dát vàng, 
              mỗi bình hút tài lộc hay bộ ấm chén men rạn bọc đồng đều là thành quả của hàng trăm giờ vuốt ve, 
              đắp nổi và canh lửa ngày đêm của những người thợ cả giàu kinh nghiệm nhất làng nghề.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-[#C5A059]/30">
              <div className="bg-white p-3 border border-[#C5A059]/30 rounded-xs">
                <div className="text-xl font-bold font-serif text-[#8B1E1F]">700+</div>
                <div className="text-[11px] text-[#8C6D27] font-serif">Năm truyền thống Bát Tràng</div>
              </div>
              <div className="bg-white p-3 border border-[#C5A059]/30 rounded-xs">
                <div className="text-xl font-bold font-serif text-[#8B1E1F]">1300°C</div>
                <div className="text-[11px] text-[#8C6D27] font-serif">Nhiệt độ nung khử chì</div>
              </div>
              <div className="bg-white p-3 border border-[#C5A059]/30 rounded-xs col-span-2 sm:col-span-1">
                <div className="text-xl font-bold font-serif text-[#8B1E1F]">10.000+</div>
                <div className="text-[11px] text-[#8C6D27] font-serif">Gia đình Việt tin dùng</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#8C6D27] font-serif">
              <MapPin className="w-4 h-4 text-[#8B1E1F] shrink-0" />
              <span>Ghé thăm xưởng sản xuất: {storeSettings.address}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
