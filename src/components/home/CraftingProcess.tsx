'use client';

import React from 'react';

export default function CraftingProcess() {
  const steps = [
    {
      step: '01',
      title: 'Tuyển Đất Cao Lanh',
      desc: 'Chọn đất sét trắng tinh khiết, ngâm ủ khử sạch tạp chất.'
    },
    {
      step: '02',
      title: 'Vuốt Tay Bàn Xoay',
      desc: 'Nghệ nhân chuốt dáng thủ công cân đối trên bàn xoay gỗ.'
    },
    {
      step: '03',
      title: 'Chạm Khắc Đắp Nổi',
      desc: 'Đắp nổi hoa văn cung đình và họa tiết truyền thống Việt.'
    },
    {
      step: '04',
      title: 'Phủ Men Ngọc Lam',
      desc: 'Tráng lớp men dạn xanh ngọc lam điểm ánh vàng trầm cổ.'
    },
    {
      step: '05',
      title: 'Nung Củi 1300°C',
      desc: 'Đốt lò 72 giờ liên tục, gốm kết tinh đanh vang bền vĩnh cửu.'
    }
  ];

  return (
    <section id="quy-trinh" className="py-12 bg-men-dan-surface crackle-overlay border-b border-[#2C5F6F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142228]">
            Quy Trình 5 Bước Chế Tác
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 p-4 rounded-xl border border-[#C9A24B]/35 hover:border-[#2C5F6F] transition-all hover-lift"
            >
              <span className="font-sans text-xs font-bold text-[#9B7832] tracking-wider uppercase">
                Bước {item.step}
              </span>

              <h3 className="font-serif text-base font-bold text-[#142228] mt-1">
                {item.title}
              </h3>

              <p className="text-xs text-[#526872] mt-1.5 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
