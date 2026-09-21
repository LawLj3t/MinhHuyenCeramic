'use client';

import React from 'react';
import { CloudLotusDivider } from '@/components/common/CeramicArtwork';

export default function CraftingProcess() {
  const steps = [
    {
      step: '01',
      title: 'Tuyển Đất Cao Lanh',
      desc: 'Đất sét trắng Trúc Thôn giàu khoáng dẻo mịn được thau lọc ngâm ủ ròng rã 3 tháng trong bể thủy lực để khử sạch hoàn toàn tạp chất hữu cơ.',
      motif: 'Thau Đất Tinh Khiết'
    },
    {
      step: '02',
      title: 'Chuốt Gốm Bàn Xoay',
      desc: 'Đôi bàn tay thô ráp của nghệ nhân nhịp nhàng cùng bàn xoay gỗ, vuốt nắn từng đường cong dáng bình, tạo nên độ dày đồng đều và thế đứng vững chãi.',
      motif: 'Vuốt Bàn Xoay'
    },
    {
      step: '03',
      title: 'Đắp Nổi & Thư Họa',
      desc: 'Bút lông chấm men lam chàm cổ hoặc nghệ thuật đắp nổi đất sống từng sợi râu rồng, cánh phượng, hoa sen mềm mại theo phong vị cung đình.',
      motif: 'Thần Bút Vẽ Hoa'
    },
    {
      step: '04',
      title: 'Tráng Men Bí Truyền',
      desc: 'Nước men làm từ tro trấu nếp nương, đá thạch anh nghiền mịn. Men rạn, men ngọc celadon hay men hỏa biến được phủ đều trong ngoài.',
      motif: 'Men Gia Truyền'
    },
    {
      step: '05',
      title: 'Nung Củi 1300°C',
      desc: 'Xếp vào bao nung đưa vào lò bầu, đốt liên tục 3 ngày 3 đêm bằng củi gỗ nghiến. Nhiệt độ đạt 1300°C khử sạch hoàn toàn chì, gốm đanh như chuông đồng.',
      motif: 'Lửa Thiêng Lò Bầu'
    }
  ];

  return (
    <section id="quy-trinh" className="py-16 bg-[#FAF7F2] border-b border-[#C5A059]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CloudLotusDivider
          title="Quy Trình 5 Bước Luyện Đất Thành Vàng"
          subtitle="700 năm làng gốm Bát Tràng giữ trọn tinh túy: Đất - Nước - Khí - Lửa và Tâm hồn của người thợ gốm xứ Đoài"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 border border-[#C5A059]/40 hover:border-[#8B1E1F] rounded-xs shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group oriental-border-corner"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
                  <span className="font-serif text-2xl font-bold text-[#8B1E1F]/80 group-hover:text-[#8B1E1F] transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-serif font-bold text-[#8C6D27] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                    {item.motif}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#181412] mt-3 group-hover:text-[#8B1E1F] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-[#52433B] mt-2 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center gap-1.5 text-[10px] text-[#8C6D27] font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1F]" />
                <span>Tiêu chuẩn thủ công Bát Tràng</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
