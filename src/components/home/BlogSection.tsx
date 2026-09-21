'use client';

import React, { useState } from 'react';
import { ARTICLES } from '@/data/products';
import { CloudLotusDivider, CeramicArtwork } from '@/components/common/CeramicArtwork';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);

  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CloudLotusDivider
          title="Góc Tri Thức Gốm Cổ & Phong Thủy"
          subtitle="Cẩm nang bài trí bàn thờ gia tiên, chọn bình tụ khí sinh tài và nghệ thuật thưởng ngoạn gốm Bát Tràng chuẩn mực"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-[#C5A059]/40 hover:border-[#8B1E1F] rounded-xs shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Thumbnail Ceramic Art */}
              <div className="h-44 overflow-hidden relative border-b border-[#C5A059]/20 bg-[#FAF7F2]">
                <CeramicArtwork
                  type={article.illustrationType}
                  glaze="men-ran"
                  badgeText={article.category}
                  className="h-full"
                  showSeal={false}
                />
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#8C6D27] font-serif">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#181412] group-hover:text-[#8B1E1F] transition-colors mt-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#52433B] mt-2 font-sans line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <span className="text-[11px] font-serif text-[#8C6D27] italic">
                    Bởi: {article.author}
                  </span>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-serif font-bold text-[#8B1E1F] flex items-center gap-1 hover:underline"
                  >
                    <span>Đọc Tiếp</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C5A059] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xs p-6 relative shadow-2xl oriental-border-corner">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-[#8B1E1F] hover:text-white transition-colors border border-[#C5A059]/40"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-serif text-[#8B1E1F] font-bold uppercase tracking-wider">
              {selectedArticle.category} • {selectedArticle.date}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#181412] mt-2 leading-snug">
              {selectedArticle.title}
            </h3>

            <div className="text-xs font-serif text-[#8C6D27] italic mt-1 pb-4 border-b border-[#C5A059]/30">
              Tác giả: {selectedArticle.author} — Thời lượng: {selectedArticle.readTime}
            </div>

            <div className="mt-4 space-y-3 text-sm text-[#2A2421] font-serif leading-relaxed">
              <p className="font-semibold text-[#8B1E1F]">
                {selectedArticle.summary}
              </p>
              <p>
                Gốm sứ Bát Tràng từ thời Lý - Trần - Lê đã được xem là quốc bảo cống phẩm. Đặc tính quý giá nhất của đồ gốm Bát Tràng nằm ở cốt đất sét trắng cao lanh tinh luyện và nhiệt độ lò nung đạt tới 1300°C. Ở mức nhiệt này, toàn bộ độc chì, thủy ngân và kim loại nặng đều bay hơi triệt để, để lại lớp men trong vắt như ngọc và xương gốm đanh chắc trường tồn.
              </p>
              <p>
                Khi thỉnh đồ gốm cho gia đình, đặc biệt là đồ thờ cúng gia tiên và bình hút lộc phong thủy, gia chủ nên quan sát kỹ độ tự nhiên của các đường men rạn, hoa văn vẽ tay uyển chuyển mềm mại và tiếng gõ phát ra trong trẻo như tiếng chuông khánh.
              </p>
              <p className="p-3 bg-white border-l-4 border-[#8B1E1F] text-xs italic">
                Lời khuyên từ Minh Huyền Ceramic: Tránh mua các loại gốm nung nhẹ lửa nhiệt độ thấp dưới 1000°C vì chất men dễ ố vàng, xỉn màu và tiềm ẩn nguy cơ nhiễm độc kim loại nặng khi tiếp xúc với thực phẩm hoặc thắp hương lâu ngày.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C5A059]/30 text-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-[#8B1E1F] text-white font-serif text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#A82224] transition-colors"
              >
                Đã Hiểu & Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
