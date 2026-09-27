'use client';

import React from 'react';
import { CATEGORIES } from '@/data/categories';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';
import { CeramicCategory } from '@/types';

export default function CategoryShowcase() {
  const { setActiveCategory } = useStore();

  const handleSelectCategory = (catId: CeramicCategory) => {
    setActiveCategory(catId);
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-men-dan-surface crackle-overlay border-b border-[#2C5F6F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142228]">
            Dòng Gốm Chủ Đạo
          </h2>
        </div>

        {/* Lưới danh mục: Ảnh lớn làm trung tâm, tên 1 dòng gọn gàng */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group cursor-pointer bg-white/90 hover:bg-white rounded-xl border border-[#C9A24B]/35 hover:border-[#2C5F6F] p-3 transition-all duration-300 hover-lift flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-[#2C5F6F]/10 flex items-center justify-center">
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
                  className="w-full h-full"
                  showSeal={false}
                />
              </div>

              <h3 className="font-serif text-sm font-bold text-[#142228] group-hover:text-[#2C5F6F] transition-colors mt-3 line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#9B7832] font-sans font-medium mt-0.5">
                {cat.itemCount} tác phẩm
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
