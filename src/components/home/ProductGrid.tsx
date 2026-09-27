'use client';

import React from 'react';
import { 
  Eye, 
  ShoppingBag, 
  RotateCcw,
  Camera
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork } from '@/components/common/CeramicArtwork';
import { CeramicCategory, CeramicGlaze } from '@/types';

export default function ProductGrid() {
  const { 
    filteredProducts,
    activeCategory,
    setActiveCategory,
    activeGlaze,
    setActiveGlaze,
    priceFilter,
    sortBy,
    setSortBy,
    resetFilters,
    addToCart,
    setQuickViewProduct,
    currentUser,
    setEditingProduct,
    setIsEditProductOpen,
    setIsAdminOpen
  } = useStore();

  const categoriesList: { id: CeramicCategory | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'dotho', name: 'Đồ Thờ Cúng' },
    { id: 'amtra', name: 'Ấm Chén Trà' },
    { id: 'binhhutloc', name: 'Bình Hút Lộc' },
    { id: 'locbinh', name: 'Lộc Bình' },
    { id: 'giadung', name: 'Gốm Bàn Ăn' },
    { id: 'tuongphongthuy', name: 'Tượng Gốm' }
  ];

  const glazesList: { id: CeramicGlaze | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất Cả Men' },
    { id: 'men-ran', name: 'Men Rạn' },
    { id: 'men-lam', name: 'Men Lam' },
    { id: 'men-hoa-bien', name: 'Hỏa Biến' },
    { id: 'men-ngoc', name: 'Men Ngọc' }
  ];

  return (
    <section id="san-pham" className="py-14 bg-men-dan-warm crackle-overlay relative border-b border-[#2C5F6F]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Tiêu đề tinh gọn */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142228]">
            Bộ Sưu Tập Tuyệt Tác
          </h2>
        </div>

        {/* Bộ lọc đồng nhất font-sans chuẩn xác */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-sans font-medium whitespace-nowrap rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#163845] text-[#E2C67E] font-semibold shadow-sm border border-[#C9A24B]/50'
                    : 'bg-white/90 text-[#243740] border border-[#2C5F6F]/15 hover:border-[#2C5F6F]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs pt-2 border-t border-[#2C5F6F]/15">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#526872] font-sans font-medium">Chất men:</span>
              {glazesList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGlaze(g.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-sans font-medium transition-colors ${
                    activeGlaze === g.id
                      ? 'bg-[#C9A24B] text-[#142228] font-semibold'
                      : 'bg-white/85 text-[#526872] hover:text-[#142228]'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white/90 border border-[#2C5F6F]/20 rounded-md text-xs text-[#142228] font-sans font-medium focus:outline-hidden"
                aria-label="Sắp xếp sản phẩm"
              >
                <option value="featured">Tiêu biểu</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
              </select>

              {(activeCategory !== 'all' || activeGlaze !== 'all' || priceFilter !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#2C5F6F] hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lưới sản phẩm 3 cột (desktop) / 2 cột (tablet) để ảnh gốm sứ lớn và nổi bật */}
        {filteredProducts.length === 0 ? (
          <div className="my-12 text-center bg-white/90 p-8 rounded-xl max-w-sm mx-auto border border-[#C9A24B]/40">
            <p className="font-sans text-sm font-semibold text-[#142228]">Không tìm thấy sản phẩm phù hợp</p>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-2 bg-[#2C5F6F] text-white text-xs font-sans font-semibold rounded-md"
            >
              Xem Tất Cả
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group cursor-pointer bg-white/95 rounded-xl border border-[#C9A24B]/35 hover:border-[#2C5F6F] transition-all duration-300 hover-lift flex flex-col justify-between overflow-hidden"
              >
                {/* Ảnh đại diện sản phẩm hiển thị trọn vẹn (tỷ lệ vuông 1:1 cân đối, không cắt khuyết) */}
                <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center border-b border-[#2C5F6F]/10 bg-[#F7F5EE]">
                  <CeramicArtwork
                    type={product.illustrationType}
                    glaze={product.glaze}
                    badgeText={product.badge}
                    imageUrl={product.imageUrl}
                    className="w-full h-full"
                  />

                  {/* Chỉ báo có nhiều ảnh chi tiết bên trong */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-[#163845]/80 text-white text-[10px] font-sans font-medium backdrop-blur-xs pointer-events-none">
                    {product.images && product.images.length > 0
                      ? `+${product.images.length} ảnh chi tiết`
                      : 'Xem nhiều góc chụp'}
                  </div>

                  {/* Nút Đổi ảnh / Sửa nhanh dành cho Admin & Manager */}
                  {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProduct(product);
                        setIsEditProductOpen(true);
                        setIsAdminOpen(true);
                      }}
                      className="absolute top-2.5 right-2.5 z-20 px-2 py-1 bg-[#163845]/90 hover:bg-[#163845] text-[#E2C67E] border border-[#C9A24B]/60 rounded-md text-[10px] font-sans font-bold flex items-center gap-1 shadow-sm transition-all"
                      title="Đổi ảnh hoặc sửa thông tin tác phẩm này"
                    >
                      <Camera className="w-3 h-3 text-[#E2C67E]" />
                      <span>Đổi ảnh</span>
                    </button>
                  )}

                  {/* Nút xem chi tiết & thêm giỏ hàng chỉ hiện khi hover */}
                  <div className="absolute inset-0 bg-[#163845]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="px-3.5 py-2 rounded-lg bg-white text-[#142228] hover:bg-[#E2C67E] font-sans font-semibold text-xs inline-flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="p-2 rounded-lg bg-[#163845] text-[#E2C67E] hover:bg-[#2C5F6F] transition-colors shadow-md"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thông tin tối giản: chỉ 1 dòng tên + giá vàng trầm */}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-sans font-medium text-[#526872] block">
                      {product.glazeName}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#142228] group-hover:text-[#2C5F6F] transition-colors truncate mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="price-text text-base font-bold text-[#9B7832] block">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
