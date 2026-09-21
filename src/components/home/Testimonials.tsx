'use client';

import React from 'react';
import { REVIEWS } from '@/data/products';
import { CloudLotusDivider } from '@/components/common/CeramicArtwork';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#F4ECE1] border-b border-[#C5A059]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CloudLotusDivider
          title="Khách Hàng Khắp Mọi Miền Chia Sẻ"
          subtitle="Hơn 10.000 gia đình trên khắp 63 tỉnh thành đã tin tưởng trao trọn niềm tin cho đồ gốm Minh Huyền Bát Tràng"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 border border-[#C5A059]/40 rounded-xs shadow-xs flex flex-col justify-between relative oriental-border-corner"
            >
              <Quote className="w-8 h-8 text-[#C5A059]/30 absolute top-4 right-4" />

              <div>
                {/* Rating stars */}
                <div className="flex text-[#DAA520] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#2A2421] font-serif leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="mt-5 pt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#181412]">
                    {rev.customerName}
                  </div>
                  <div className="text-[11px] text-[#8C6D27] font-serif">
                    {rev.location}
                  </div>
                  <div className="text-[10px] text-[#8B1E1F] font-serif font-medium mt-0.5">
                    Đã mua: {rev.productName}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#1E4638] bg-[#D8F3DC] px-2 py-0.5 rounded-full font-serif font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Đã mua hàng</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
