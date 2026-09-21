'use client';

import React from 'react';
import { CATEGORIES } from '@/data/categories';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork, CloudLotusDivider } from '@/components/common/CeramicArtwork';
import { CeramicCategory } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryShowcase() {
  const { setActiveCategory } = useStore();

  const handleSelectCategory = (catId: CeramicCategory) => {
    setActiveCategory(catId);
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-[#FAF7F2] border-b border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading with Lotus Divider */}
        <CloudLotusDivider
          title="Lục Đại Tuyệt Tác Bát Tràng"
          subtitle="Sáu dòng sản phẩm chủ lực hội tụ tinh hoa đất sét trắng phù sa sông Hồng và kỹ thuật tạo men đỉnh cao"
        />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative bg-white border border-[#C5A059]/40 hover:border-[#8B1E1F] p-4 rounded-xs shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between oriental-border-corner"
            >
              {/* Category Artwork Preview */}
              <div className="relative h-48 w-full rounded-xs overflow-hidden border border-[#C5A059]/20 bg-[#FAF7F2]">
                <CeramicArtwork
                  type={cat.illustrationType}
                  glaze={
                    cat.id === 'dotho' 
                      ? 'men-ran' 
                      : cat.id === 'amtra' 
                      ? 'men-hoa-bien' 
                      : cat.id === 'binhhutloc' 
                      ? 'men-ngoc' 
                      : cat.id === 'locbinh' 
                      ? 'men-lam' 
                      : cat.id === 'giadung' 
                      ? 'men-lam' 
                      : 'men-ran'
                  }
                  badgeText={cat.badge}
                  className="h-full"
                  showSeal={true}
                />
              </div>

              {/* Text Information */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C6D27] font-serif mb-1">
                    <span className="italic">{cat.subtitle}</span>
                    <span className="font-bold bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                      {cat.itemCount}+ mẫu
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#181412] group-hover:text-[#8B1E1F] transition-colors leading-snug">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-[#52433B] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs font-serif font-bold text-[#8B1E1F] group-hover:text-[#A82224]">
                  <span className="tracking-wider uppercase">Xem Tất Cả Mẫu</span>
                  <div className="w-6 h-6 rounded-full bg-[#8B1E1F]/10 group-hover:bg-[#8B1E1F] text-[#8B1E1F] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
