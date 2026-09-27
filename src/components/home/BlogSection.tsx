'use client';

import React, { useState } from 'react';
import { ARTICLES } from '@/data/products';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';
import { Calendar, ArrowRight, X } from 'lucide-react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <section className="py-14 bg-men-dan-warm crackle-overlay border-b border-[#2C5F6F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142228]">
            Tin Tức Nổi Bật
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white/95 rounded-xl border border-[#C9A24B]/35 hover:border-[#2C5F6F] transition-all duration-300 hover-lift overflow-hidden flex flex-col justify-between"
            >
              <div className="h-52 overflow-hidden relative border-b border-[#2C5F6F]/10">
                <CeramicArtwork
                  type={article.illustrationType}
                  glaze="men-ngoc"
                  className="h-full"
                  showSeal={false}
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-[#9B7832] font-sans font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#142228] group-hover:text-[#2C5F6F] transition-colors mt-1.5 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-[#2C5F6F]/10 flex items-center justify-between text-xs font-sans font-semibold text-[#2C5F6F]">
                  <span>Khám phá</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-strong p-6 relative border border-[#C9A24B]/40">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#DFECEF] hover:bg-[#2C5F6F] text-[#142228] hover:text-white transition-colors"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-sans text-[#9B7832] font-semibold">
              {selectedArticle.category} • {selectedArticle.date}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142228] mt-1">
              {selectedArticle.title}
            </h3>

            <div className="my-4 h-56 rounded-xl overflow-hidden">
              <CeramicArtwork
                type={selectedArticle.illustrationType}
                glaze="men-ngoc"
                className="h-full"
                showSeal={false}
              />
            </div>

            <div className="space-y-3 text-sm text-[#243740] font-sans leading-relaxed">
              <p className="font-semibold text-[#142228]">{selectedArticle.summary}</p>
              <p className="text-xs text-[#526872]">Tác giả: {selectedArticle.author} • Thời lượng đọc: {selectedArticle.readTime}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
