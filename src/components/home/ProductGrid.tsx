'use client';

import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Eye, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Flame, 
  Check, 
  ArrowUpDown 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CeramicArtwork, CloudLotusDivider } from '@/components/common/CeramicArtwork';
import { CeramicCategory, CeramicGlaze, Product } from '@/types';

export default function ProductGrid() {
  const { 
    filteredProducts,
    activeCategory,
    setActiveCategory,
    activeGlaze,
    setActiveGlaze,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    resetFilters,
    addToCart,
    setQuickViewProduct,
    setIsCheckoutOpen
  } = useStore();

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const categoriesList: { id: CeramicCategory | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất Cả Sản Phẩm' },
    { id: 'dotho', name: 'Đồ Thờ Cúng' },
    { id: 'amtra', name: 'Ấm Chén Trà' },
    { id: 'binhhutloc', name: 'Bình Hút Lộc' },
    { id: 'locbinh', name: 'Lộc Bình Đại' },
    { id: 'giadung', name: 'Gốm Bàn Ăn' },
    { id: 'tuongphongthuy', name: 'Tượng & Tranh Gốm' }
  ];

  const glazesList: { id: CeramicGlaze | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất Cả Dòng Men' },
    { id: 'men-ran', name: 'Men Rạn Cổ' },
    { id: 'men-lam', name: 'Men Lam Huế' },
    { id: 'men-hoa-bien', name: 'Men Hỏa Biến' },
    { id: 'men-ngoc', name: 'Men Ngọc Bích' },
    { id: 'men-tu-sa', name: 'Men Tử Sa' }
  ];

  return (
    <section id="san-pham" className="py-16 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <CloudLotusDivider
          title="Kho Tàng Tuyệt Tác Bát Tràng"
          subtitle="Từng tác phẩm mang trọn tâm huyết của bậc thầy nghệ nhân, bảo lưu nét văn hóa Đại Việt kết hợp cốt cách cung đình Á Đông"
        />

        {/* Filter & Sort Controls */}
        <div className="mt-8 space-y-4">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs md:text-sm font-serif whitespace-nowrap rounded-xs border transition-smooth ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] text-[#FAF7F2] border-[#8B1E1F] shadow-glow-red font-bold scale-105'
                    : 'bg-white text-[#2A2421] border-[#C5A059]/40 hover:border-[#8B1E1F] hover:bg-[#FAF7F2] hover:scale-105'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Secondary Sub-filters (Glaze, Price, Sort) */}
          <div className="bg-white/80 border border-[#C5A059]/30 p-3 sm:p-4 rounded-xs shadow-2xs flex flex-wrap items-center justify-between gap-3">
            {/* Glaze Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-serif font-bold text-[#8C6D27] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#DAA520]" />
                Dòng Men:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {glazesList.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveGlaze(g.id)}
                    className={`px-2.5 py-1 text-[11px] rounded-xs border font-serif transition-bounce ${
                      activeGlaze === g.id
                        ? 'bg-gradient-to-r from-[#181412] to-[#2A2421] text-[#DAA520] border-[#DAA520] font-bold shadow-glow-gold scale-105'
                        : 'bg-[#FAF7F2] text-[#52433B] border-[#C5A059]/30 hover:border-[#8C6D27] hover:scale-105'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter & Sorting */}
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              {/* Price Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#8C6D27] font-serif">Khoảng Giá:</span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  aria-label="Lọc theo khoảng giá"
                  className="px-2.5 py-1 text-xs bg-white border border-[#C5A059]/40 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] focus:ring-2 focus:ring-[#8B1E1F]/20 text-[#2A2421] font-serif transition-smooth"
                >
                  <option value="all">Mọi mức giá</option>
                  <option value="under-1m">Dưới 1.000.000₫</option>
                  <option value="1m-3m">1.000.000₫ - 3.000.000₫</option>
                  <option value="3m-10m">3.000.000₫ - 10.000.000₫</option>
                  <option value="over-10m">Tuyệt tác trên 10.000.000₫</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#8C6D27] font-serif">Sắp Xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sắp xếp sản phẩm"
                  className="px-2.5 py-1 text-xs bg-white border border-[#C5A059]/40 rounded-xs focus:outline-hidden focus:border-[#8B1E1F] focus:ring-2 focus:ring-[#8B1E1F]/20 text-[#2A2421] font-serif transition-smooth"
                >
                  <option value="featured">Tiêu biểu nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>

              {/* Reset Filter button if any active */}
              {(activeCategory !== 'all' || activeGlaze !== 'all' || priceFilter !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] text-[#8B1E1F] hover:text-[#5C1213] font-serif px-2 py-1 hover:bg-[#8B1E1F]/10 rounded-xs transition-smooth"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa lọc</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Count Notification */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#8C6D27] font-serif">
          <span>Tìm thấy <strong>{filteredProducts.length}</strong> tác phẩm gốm sứ Bát Tràng</span>
          <span className="text-[11px] italic">Tất cả sản phẩm đều nung củi 1300°C an toàn sức khỏe</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="my-16 text-center bg-white border border-dashed border-[#C5A059] p-8 rounded-xs max-w-md mx-auto">
            <p className="font-serif text-lg text-[#2A2421] font-bold">Không tìm thấy sản phẩm phù hợp</p>
            <p className="text-xs text-[#8C6D27] mt-1">Vui lòng chọn tiêu chí lọc khác hoặc đặt lại bộ lọc để xem toàn bộ tác phẩm.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#8B1E1F] text-white text-xs font-serif rounded-xs hover:bg-[#A82224] transition-colors"
            >
              Xem Tất Cả Gốm Sứ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-[#C5A059]/40 hover:border-[#8B1E1F] rounded-xs shadow-2xs hover:shadow-strong transition-smooth hover-lift flex flex-col justify-between overflow-hidden animate-fade-in"
              >
                {/* Visual Artwork & Quick View Trigger */}
                <div className="relative overflow-hidden cursor-pointer group/image" onClick={() => setQuickViewProduct(product)}>
                  <div className="transition-transform duration-500 group-hover/image:scale-110">
                    <CeramicArtwork
                      type={product.illustrationType}
                      glaze={product.glaze}
                      badgeText={product.badge}
                      imageUrl={product.imageUrl}
                      className="h-60"
                    />
                  </div>

                  {/* Quick Action Floating Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-2.5 rounded-full bg-white text-[#2A2421] hover:text-[#8B1E1F] hover:scale-125 transition-bounce shadow-medium translate-y-4 group-hover:translate-y-0"
                      title="Xem nhanh chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="p-2.5 rounded-full bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] text-white hover:from-[#A82224] hover:to-[#8B1E1F] hover:scale-125 transition-bounce shadow-glow-red translate-y-4 group-hover:translate-y-0"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Feng Shui Element Tag */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 glass-morph-dark text-[#DAA520] text-[10px] font-serif rounded-xs border border-[#DAA520]/40 flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Mệnh: {product.fengShuiElement}</span>
                  </div>
                </div>

                {/* Product Meta & Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Glaze Tag */}
                    <div className="flex items-center justify-between text-[11px] text-[#8C6D27] font-serif">
                      <span>{product.categoryName}</span>
                      <span className="font-medium text-[#181412] bg-[#FAF7F2] px-1.5 py-0.5 rounded-xs border border-[#C5A059]/20">
                        {product.glazeName}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif text-sm md:text-base font-bold text-[#181412] mt-1.5 group-hover:text-[#8B1E1F] transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Rating & Review */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-[#DAA520]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#8C6D27] font-serif">
                        ({product.reviewCount} đánh giá)
                      </span>
                    </div>

                    {/* Dimension / Temp Quick Spec */}
                    <div className="text-[11px] text-[#52433B] mt-1.5 line-clamp-1 italic font-serif">
                      {product.dimensions}
                    </div>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="pt-2 border-t border-[#C5A059]/20 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="font-serif font-bold text-base md:text-lg text-[#8B1E1F] leading-none">
                          {product.price.toLocaleString('vi-VN')}₫
                        </div>
                        {product.originalPrice && (
                          <div className="text-[11px] text-[#8C6D27] line-through font-serif mt-0.5">
                            {product.originalPrice.toLocaleString('vi-VN')}₫
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-[#1E4638] font-serif bg-[#D8F3DC] px-1.5 py-0.5 rounded-xs font-semibold">
                        Sẵn hàng
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-1.5 px-2 border-2 border-[#8B1E1F] text-[#8B1E1F] hover:bg-[#8B1E1F] hover:text-white text-xs font-serif font-bold rounded-xs transition-smooth flex items-center justify-center gap-1 hover:shadow-medium"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Thêm Giỏ</span>
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full py-1.5 px-2 bg-gradient-to-br from-[#8B1E1F] to-[#5C1213] hover:from-[#A82224] hover:to-[#8B1E1F] text-white text-xs font-serif font-bold rounded-xs transition-smooth shadow-xs hover:shadow-glow-red hover:scale-105"
                      >
                        Mua Ngay
                      </button>
                    </div>
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
