'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CloudLotusDivider } from '@/components/common/CeramicArtwork';
import { FengShuiElement, CeramicGlaze } from '@/types';

export default function FengShuiAdvisor() {
  const { setActiveGlaze, setSearchQuery } = useStore();

  const [selectedElement, setSelectedElement] = useState<FengShuiElement>('Kim');
  const [selectedSpace, setSelectedSpace] = useState<'ban-tho' | 'phong-khach' | 'ban-lam-viec' | 'qua-bieu'>('phong-khach');

  const elementsData: Record<
    'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ',
    {
      name: string;
      color: string;
      bgColor: string;
      textColor: string;
      complementaryColors: string;
      recommendedGlaze: CeramicGlaze;
      glazeName: string;
      advice: string;
      suggestedItems: string[];
    }
  > = {
    Kim: {
      name: 'Mệnh Kim',
      color: '#DAA520',
      bgColor: 'bg-amber-50 border-amber-300',
      textColor: 'text-amber-800',
      complementaryColors: 'Vàng kim, trắng bạc, nâu đất, xám ngà',
      recommendedGlaze: 'men-ran',
      glazeName: 'Men Rạn Cổ Dát Vàng 24K',
      advice: 'Thổ sinh Kim - Gia chủ mệnh Kim cực kỳ vượng khi thỉnh gốm men rạn có chi tiết dát vàng hoặc bọc đồng, giúp gia tăng tài khí và uy thế.',
      suggestedItems: [
        'Bát Hương Men Rạn Đắp Nổi Dát Vàng 24K',
        'Bình Hút Lộc Dát Vàng Thuận Buồm',
        'Bộ Ấm Trà Men Rạn Bọc Đồng Cổ'
      ]
    },
    Mộc: {
      name: 'Mệnh Mộc',
      color: '#2E7D32',
      bgColor: 'bg-emerald-50 border-emerald-300',
      textColor: 'text-emerald-800',
      complementaryColors: 'Xanh lá ngọc bích, xanh lam cobalt, đen huyền vũ',
      recommendedGlaze: 'men-ngoc',
      glazeName: 'Men Ngọc Bích Celadon & Men Lam',
      advice: 'Thủy sinh Mộc - Sắc men ngọc bích tươi mát kết hợp men lam chàm cổ tạo nguồn sinh khí dồi dào, giúp gia đạo bình an, công việc sinh sôi nảy nở.',
      suggestedItems: [
        'Bình Hút Lộc Men Ngọc Bích Celadon',
        'Đôi Lộc Bình Tứ Quý Men Lam Cổ',
        'Bộ Bát Đĩa Men Lam Hoàng Gia Vẽ Sen'
      ]
    },
    Thủy: {
      name: 'Mệnh Thủy',
      color: '#1565C0',
      bgColor: 'bg-blue-50 border-blue-300',
      textColor: 'text-blue-800',
      complementaryColors: 'Xanh dương, đen ánh kim, trắng ngà (Kim sinh Thủy)',
      recommendedGlaze: 'men-hoa-bien',
      glazeName: 'Men Hỏa Biến Sắc Biển & Men Lam',
      advice: 'Kim sinh Thủy - Nước men hỏa biến loang sắc thiên hà sâu thẳm như đại dương là vật phẩm tương trợ tối thượng, kích hoạt dòng chảy tài lộc hanh thông.',
      suggestedItems: [
        'Bộ Trà Men Hỏa Biến Hải Long Thiên Cơ',
        'Lọ Lộc Bình Tứ Quý Men Lam Cổ 1m6',
        'Mai Bình Tích Lộc Men Lam Vẽ Tùng Hạc'
      ]
    },
    Hỏa: {
      name: 'Mệnh Hỏa',
      color: '#C62828',
      bgColor: 'bg-rose-50 border-rose-300',
      textColor: 'text-rose-800',
      complementaryColors: 'Đỏ son, cam chu sa, tím than, xanh lá ngọc (Mộc sinh Hỏa)',
      recommendedGlaze: 'men-ngoc',
      glazeName: 'Men Ngọc Bích (Mộc sinh Hỏa) & Men Rạn Chu Sa',
      advice: 'Mộc sinh Hỏa - Gốm nung củi mang năng lượng của Lửa kết hợp cùng men ngọc đại diện cho Mộc tạo thế tương sinh rực rỡ, đốt cháy năng lượng tích cực.',
      suggestedItems: [
        'Bát Hương Men Rạn Đắp Rồng Chu Sa',
        'Bình Hút Lộc Men Ngọc Bích Celadon',
        'Tranh Gốm Đắp Nổi Cá Chép Hóa Rồng'
      ]
    },
    Thổ: {
      name: 'Mệnh Thổ',
      color: '#8D6E63',
      bgColor: 'bg-stone-100 border-stone-300',
      textColor: 'text-stone-800',
      complementaryColors: 'Nâu đất, vàng hoàng gia, đỏ son, cam đất',
      recommendedGlaze: 'men-tu-sa',
      glazeName: 'Men Tử Sa & Men Rạn Tam Thái Đắp Nổi',
      advice: 'Bản mệnh là Đất Mẹ - Gốm sứ Bát Tràng làm từ đất cao lanh tinh túy chính là vật phẩm hòa hợp tuyệt đối với người mệnh Thổ, giữ cho vận khí vững như bàn thạch.',
      suggestedItems: [
        'Trọn Bộ Đồ Thờ Men Rạn Bọc Đồng',
        'Hũ Đựng Trà Tử Sa Men Tro Cổ',
        'Tượng Phật Di Lặc Men Rạn Bát Tràng'
      ]
    }
  };

  const currentAdvice = elementsData[selectedElement as 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'] || elementsData.Kim;

  const handleApplyFengShuiGlaze = () => {
    setActiveGlaze(currentAdvice.recommendedGlaze);
    const el = document.getElementById('san-pham');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="phong-thuy" className="py-16 bg-[#F4ECE1] border-b border-[#C5A059]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <CloudLotusDivider
          title="Tư Vấn Phong Thủy Gốm Sứ Theo Bản Mệnh"
          subtitle="Gốm sứ hội tụ đủ ngũ hành Kim - Mộc - Thủy - Hỏa - Thổ. Chọn đúng sắc men tương sinh giúp chiêu tài nạp phúc, trấn trạch an gia"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-center">
          {/* Left: Input Selection */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border-2 border-[#C5A059]/40 rounded-xs shadow-md oriental-border-corner">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#8B1E1F] tracking-wide uppercase pb-3 border-b border-[#C5A059]/30">
              <Compass className="w-4 h-4" />
              <span>Bước 1: Chọn Bản Mệnh Của Quý Khách</span>
            </div>

            {/* Element Buttons */}
            <div className="grid grid-cols-5 gap-2 my-5">
              {(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'] as FengShuiElement[]).map((elem) => (
                <button
                  key={elem}
                  onClick={() => setSelectedElement(elem)}
                  className={`py-3 px-2 rounded-xs border text-center font-serif transition-all ${
                    selectedElement === elem
                      ? 'bg-[#181412] text-[#DAA520] border-[#DAA520] font-bold shadow-md scale-105'
                      : 'bg-[#FAF7F2] text-[#52433B] border-[#C5A059]/30 hover:border-[#8B1E1F]'
                  }`}
                >
                  <div className="text-sm md:text-base font-bold">{elem}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Mệnh {elem}</div>
                </button>
              ))}
            </div>

            {/* Space Placement */}
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#8B1E1F] tracking-wide uppercase pt-4 pb-3 border-b border-[#C5A059]/30">
              <Sparkles className="w-4 h-4" />
              <span>Bước 2: Không Gian Bài Trí Dự Kiến</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {[
                { id: 'phong-khach', label: 'Phòng Khách - Tụ Tài' },
                { id: 'ban-tho', label: 'Ban Thờ Gia Tiên' },
                { id: 'ban-lam-viec', label: 'Bàn Làm Việc Giám Đốc' },
                { id: 'qua-bieu', label: 'Quà Mừng Tân Gia / Đối Tác' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSpace(item.id as typeof selectedSpace)}
                  className={`p-2.5 text-xs text-left rounded-xs border font-serif transition-colors ${
                    selectedSpace === item.id
                      ? 'bg-[#8B1E1F] text-white border-[#8B1E1F] font-bold'
                      : 'bg-[#FAF7F2] text-[#2A2421] border-[#C5A059]/30 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Expert Advice & Recommended Artifacts */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border-2 border-[#C5A059]/40 rounded-xs shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/30">
              <span className="text-xs font-serif font-bold text-[#8C6D27] uppercase tracking-wider">
                Lời Khuyên Từ Nghệ Nhân Phong Thủy
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#8B1E1F]/10 text-[#8B1E1F] font-serif">
                Bát Tràng Cung Đình
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#181412]">
                  {currentAdvice.name} — Hợp Sắc {currentAdvice.glazeName}
                </h4>
                <p className="text-xs text-[#8C6D27] font-serif mt-1">
                  Màu sắc tương hợp & tương sinh: <strong>{currentAdvice.complementaryColors}</strong>
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF7F2] border-l-4 border-[#8B1E1F] text-xs leading-relaxed text-[#2A2421] font-serif italic">
                &ldquo;{currentAdvice.advice}&rdquo;
              </div>

              <div>
                <div className="text-xs font-serif font-bold text-[#181412] mb-2 uppercase tracking-wide">
                  Tuyệt Phẩm Khuyên Dùng Cho Quý Khách:
                </div>
                <div className="space-y-1.5">
                  {currentAdvice.suggestedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#52433B] font-serif">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E1F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#C5A059]/20">
                <button
                  onClick={handleApplyFengShuiGlaze}
                  className="w-full py-2.5 px-4 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs tracking-wider uppercase rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Xem Các Mẫu Gốm Men {currentAdvice.glazeName.split('&')[0]} Hợp Mệnh</span>
                  <ArrowRight className="w-4 h-4 text-[#DAA520]" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
