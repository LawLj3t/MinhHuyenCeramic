'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';

export default function ArtisanStory() {
  return (
    <section id="nghe-nhan" className="py-14 bg-men-dan-deep border-b border-[#C9A24B]/40 relative">
      <div className="absolute inset-0 crackle-overlay opacity-75 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Cột Trái: Hình ảnh tuyệt tác gốm sứ của nghệ nhân (chiếm 50% diện tích) */}
          <div className="md:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A24B]/60 shadow-strong aspect-4/3 bg-[#F4F8F9]">
              <CeramicArtwork
                type="loc-binh"
                glaze="men-lam"
                className="w-full h-full"
                showSeal={true}
              />
            </div>
          </div>

          {/* Cột Phải: Giới thiệu ngắn gọn 2 câu (~40 từ) theo phong cách Minh Long */}
          <div className="md:col-span-6 space-y-4 text-center md:text-left text-white">
            <span className="text-xs font-sans font-semibold text-[#E2C67E] tracking-widest uppercase">
              Di Sản 700 Năm Bát Tràng
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              Nghệ Thuật Từ Đất & Lửa
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-sans leading-relaxed">
              Mỗi tác phẩm tại Minh Huyền Ceramic được nghệ nhân vuốt tay thủ công và nung củi 1300°C suốt 3 ngày đêm. Nước men rạn xanh ngọc lam hòa quyện sắc vàng trầm tạo nên vẻ đẹp độc bản vượt thời gian.
            </p>

            <div className="pt-2">
              <a
                href="#san-pham"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] text-xs font-sans font-semibold transition-colors"
              >
                <span>Tìm hiểu bộ sưu tập</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
