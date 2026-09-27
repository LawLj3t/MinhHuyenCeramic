'use client';

import React, { useState } from 'react';
import { REVIEWS } from '@/data/products';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = REVIEWS[index] || REVIEWS[0];

  return (
    <section className="py-12 bg-men-dan-surface crackle-overlay border-b border-[#2C5F6F]/15">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="font-serif text-2xl font-bold text-[#142228] mb-5">
          Khách Hàng Đánh Giá
        </h2>

        <div className="bg-white/95 p-6 sm:p-8 rounded-2xl border border-[#C9A24B]/40 shadow-soft relative">
          <div className="flex justify-center text-[#C9A24B] mb-3">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#142228] font-sans leading-relaxed max-w-xl mx-auto line-clamp-2">
            &ldquo;{current.comment}&rdquo;
          </p>

          <div className="mt-4 pt-3 border-t border-[#2C5F6F]/10">
            <div className="font-sans font-bold text-sm text-[#163845]">
              {current.customerName}
            </div>
            <div className="text-xs text-[#526872] font-sans mt-0.5">
              {current.location} • {current.productName}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              className="p-1.5 rounded-full border border-[#2C5F6F]/25 text-[#2C5F6F] hover:bg-[#2C5F6F] hover:text-white transition-colors"
              aria-label="Trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-sans font-medium text-[#526872] tabular-nums">
              {index + 1} / {REVIEWS.length}
            </span>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % REVIEWS.length)}
              className="p-1.5 rounded-full border border-[#2C5F6F]/25 text-[#2C5F6F] hover:bg-[#2C5F6F] hover:text-white transition-colors"
              aria-label="Sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
