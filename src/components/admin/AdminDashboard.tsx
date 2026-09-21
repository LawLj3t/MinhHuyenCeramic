'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  ShoppingBag, 
  Package, 
  Settings, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Truck, 
  QrCode, 
  Save, 
  Search,
  Filter
} from 'lucide-react';
import { SealStamp, CeramicArtwork } from '@/components/common/CeramicArtwork';
import { Order, OrderStatus, Product, CeramicCategory, CeramicGlaze, IllustrationType, FengShuiElement } from '@/types';

export default function AdminDashboard() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    orders, 
    updateOrderStatus, 
    updatePaymentStatus,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    storeSettings, 
    updateStoreSettings 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(storeSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'dotho' as CeramicCategory,
    categoryName: 'Đồ Thờ Cúng Tâm Linh',
    glaze: 'men-ran' as CeramicGlaze,
    glazeName: 'Men Rạn Cổ Truyền',
    price: 1500000,
    originalPrice: 1800000,
    rating: 5.0,
    reviewCount: 1,
    badge: 'Mới Ra Lò',
    inStock: true,
    stockQuantity: 10,
    dimensions: 'Cao 25cm x Bụng 20cm',
    weight: '2.5 kg',
    temperature: '1300°C',
    artisan: 'Nghệ nhân Minh Huyền Ceramic',
    fengShuiElement: 'Hòa Hợp Tất Cả Mệnh' as FengShuiElement,
    fengShuiMeaning: 'Mang lại sự bình an gia đạo và chiêu tài tụ khí.',
    description: 'Chế tác thủ công từ đất cao lanh Bát Tràng tuyển chọn, nung củi 1300°C khử chì.',
    features: ['Gốm Bát Tràng thủ công', 'Nung 1300°C khử sạch chì'],
    illustrationType: 'bat-huong' as IllustrationType
  });

  if (!isAdminOpen) return null;

  // Handle settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Handle add product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;
    addProduct(newProduct);
    setIsAddProductOpen(false);
    // reset
    setNewProduct({
      ...newProduct,
      name: ''
    });
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.orderStatus === orderStatusFilter;
  });

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'cancelled' ? o.finalAmount : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] overflow-y-auto flex flex-col">
      
      {/* Top Admin Header Bar */}
      <header className="bg-[#181412] text-white border-b-2 border-[#C5A059] px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SealStamp text="Quản Trị" subtext="Xưởng Gốm" className="bg-white/10" />
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-[#FAF7F2] leading-none">
                Bảng Quản Lý Xưởng Gốm Minh Huyền
              </h1>
              <p className="text-[11px] text-[#DAA520] font-serif mt-1">
                Dành riêng cho vợ chồng chủ tiệm & nhân viên quản lý đơn hàng, kho gốm
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs rounded-xs border border-[#DAA520] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem Giao Diện Khách Mua</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        
        {/* KPI Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#8C6D27] font-serif">
              <span>Doanh Thu Ghi Nhận</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#8B1E1F] mt-1">
              {totalRevenue.toLocaleString('vi-VN')}₫
            </div>
            <div className="text-[11px] text-[#52433B] font-serif mt-0.5">
              Từ {orders.length} đơn hàng thực tế
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#8C6D27] font-serif">
              <span>Đơn Chờ Xử Lý</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-amber-700 mt-1">
              {pendingOrdersCount} đơn
            </div>
            <div className="text-[11px] text-[#52433B] font-serif mt-0.5">
              Cần gọi xác nhận với khách
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#8C6D27] font-serif">
              <span>Tác Phẩm Gốm Tại Xưởng</span>
              <Package className="w-4 h-4 text-[#1E4638]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#181412] mt-1">
              {products.length} mẫu gốm
            </div>
            <div className="text-[11px] text-[#52433B] font-serif mt-0.5">
              Đang hiển thị trên website
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C5A059]/40 rounded-xs shadow-2xs">
            <div className="flex items-center justify-between text-xs text-[#8C6D27] font-serif">
              <span>Tài Khoản VietQR</span>
              <QrCode className="w-4 h-4 text-[#8B1E1F]" />
            </div>
            <div className="text-sm font-bold font-serif text-[#181412] mt-1 truncate">
              {storeSettings.bankAccount}
            </div>
            <div className="text-[11px] text-[#8C6D27] font-serif truncate">
              {storeSettings.bankName.split('(')[0]}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#C5A059]/40 gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2.5 px-4 font-serif font-bold text-xs sm:text-sm rounded-t-xs border-t border-x transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-white border-[#C5A059] text-[#8B1E1F] border-b-white -mb-px'
                : 'bg-[#FAF7F2] border-transparent text-[#52433B] hover:text-[#181412]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quản Lý Đơn Hàng ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-2.5 px-4 font-serif font-bold text-xs sm:text-sm rounded-t-xs border-t border-x transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-white border-[#C5A059] text-[#8B1E1F] border-b-white -mb-px'
                : 'bg-[#FAF7F2] border-transparent text-[#52433B] hover:text-[#181412]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Quản Lý Sản Phẩm Gốm ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 font-serif font-bold text-xs sm:text-sm rounded-t-xs border-t border-x transition-colors flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-white border-[#C5A059] text-[#8B1E1F] border-b-white -mb-px'
                : 'bg-[#FAF7F2] border-transparent text-[#52433B] hover:text-[#181412]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cài Đặt Xưởng & VietQR</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-3 border border-[#C5A059]/30 rounded-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#8C6D27]" />
                <span className="text-xs font-serif font-bold text-[#2A2421]">Lọc trạng thái:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  aria-label="Lọc trạng thái đơn hàng"
                  className="px-2.5 py-1 text-xs border border-[#C5A059]/40 rounded-xs font-serif bg-[#FAF7F2]"
                >
                  <option value="all">Tất cả đơn ({orders.length})</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="completed">Đã hoàn tất</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <span className="text-xs text-[#8C6D27] font-serif">
                Hiển thị <strong>{filteredOrders.length}</strong> đơn hàng
              </span>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-[#C5A059]/40 rounded-xs overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-[#FAF7F2] text-[#8C6D27] border-b border-[#C5A059]/30">
                  <tr>
                    <th className="p-3">Mã Đơn</th>
                    <th className="p-3">Khách Hàng & SĐT</th>
                    <th className="p-3">Địa Chỉ Nhận</th>
                    <th className="p-3">Sản Phẩm</th>
                    <th className="p-3">Tổng Tiền</th>
                    <th className="p-3">Thanh Toán</th>
                    <th className="p-3">Trạng Thái Đơn</th>
                    <th className="p-3 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5A059]/20">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-xs text-[#8C6D27]">
                        Không có đơn hàng nào theo điều kiện lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        <td className="p-3 font-bold text-[#8B1E1F] whitespace-nowrap">
                          {order.id}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#181412]">{order.customerName}</div>
                          <a href={`tel:${order.phone}`} className="text-[#8C6D27] hover:underline">
                            {order.phone}
                          </a>
                        </td>
                        <td className="p-3 max-w-xs truncate" title={order.address}>
                          {order.address}
                          {order.note && (
                            <div className="text-[10px] text-amber-700 italic">
                              Ghi chú: {order.note}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {order.items.map((i, idx) => (
                            <div key={idx} className="line-clamp-1">
                              {i.product.name} (x{i.quantity})
                            </div>
                          ))}
                        </td>
                        <td className="p-3 font-bold text-[#8B1E1F] whitespace-nowrap">
                          {order.finalAmount.toLocaleString('vi-VN')}₫
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => updatePaymentStatus(order.id, order.paymentStatus === 'paid' ? 'pending' : 'paid')}
                            className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase transition-colors ${
                              order.paymentStatus === 'paid'
                                ? 'bg-[#D8F3DC] text-[#1E4638]'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                            title="Bấm để đổi trạng thái thanh toán"
                          >
                            {order.paymentStatus === 'paid' ? 'Đã Thanh Toán' : 'Chưa Trả'}
                          </button>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            aria-label="Cập nhật trạng thái đơn hàng"
                            className="px-2 py-1 text-[11px] border border-[#C5A059]/40 rounded-xs font-serif bg-white"
                          >
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="completed">Đã hoàn tất</option>
                            <option value="cancelled">Đã hủy</option>
                          </select>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <a
                            href={`https://zalo.me/${order.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xs text-[10px] font-bold"
                          >
                            Chat Zalo
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8C6D27] font-serif">
                Danh sách tác phẩm gốm sứ đang kinh doanh tại xưởng
              </span>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Mẫu Gốm Mới</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white border border-[#C5A059]/40 rounded-xs overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-[#FAF7F2] text-[#8C6D27] border-b border-[#C5A059]/30">
                  <tr>
                    <th className="p-3">Hình Dáng</th>
                    <th className="p-3">Tên Tác Phẩm</th>
                    <th className="p-3">Dòng Men</th>
                    <th className="p-3">Giá Bán</th>
                    <th className="p-3">Tồn Kho</th>
                    <th className="p-3">Nghệ Nhân</th>
                    <th className="p-3 text-right">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5A059]/20">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-3 w-16">
                        <div className="w-12 h-12 rounded-xs overflow-hidden border border-[#C5A059]/30">
                          <CeramicArtwork
                            type={prod.illustrationType}
                            glaze={prod.glaze}
                            className="h-full min-h-0"
                            showSeal={false}
                          />
                        </div>
                      </td>
                      <td className="p-3 font-bold text-[#181412] max-w-xs">
                        <div>{prod.name}</div>
                        <div className="text-[10px] text-[#8C6D27] font-normal">{prod.dimensions}</div>
                      </td>
                      <td className="p-3 text-[#8B1E1F] font-semibold">
                        {prod.glazeName}
                      </td>
                      <td className="p-3 font-bold text-[#181412]">
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                          aria-label={`Giá bán của ${prod.name}`}
                          className="w-24 px-1.5 py-0.5 border border-[#C5A059]/40 rounded-xs text-xs font-serif"
                        />
                        <span className="ml-1">₫</span>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={prod.stockQuantity}
                          onChange={(e) => updateProduct(prod.id, { stockQuantity: Number(e.target.value) })}
                          aria-label={`Số lượng tồn kho của ${prod.name}`}
                          className="w-16 px-1.5 py-0.5 border border-[#C5A059]/40 rounded-xs text-xs font-serif"
                        />
                      </td>
                      <td className="p-3 text-[#52433B] text-[11px]">
                        {prod.artisan}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1 text-[#8C6D27] hover:text-[#8B1E1F] transition-colors"
                          title="Xóa tác phẩm này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STORE SETTINGS & VIETQR */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 border border-[#C5A059]/40 rounded-xs shadow-2xs max-w-3xl">
            <div className="pb-3 border-b border-[#C5A059]/30 mb-5">
              <h3 className="font-serif font-bold text-base text-[#181412] uppercase tracking-wider">
                Cấu Hình Cửa Hàng & Tài Khoản Ngân Hàng VietQR
              </h3>
              <p className="text-xs text-[#8C6D27] font-serif mt-1">
                Thay đổi tại đây sẽ cập nhật ngay lập tức mã VietQR và hotline trên toàn bộ website.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Tên Xưởng Gốm
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Khẩu Hiệu / Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Hotline Tư Vấn
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hotline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Số Zalo Của Xưởng
                  </label>
                  <input
                    type="text"
                    value={settingsForm.zaloNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, zaloNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                    Email Liên Hệ
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                  Địa Chỉ Xưởng Sản Xuất
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                />
              </div>

              {/* Bank VietQR Section */}
              <div className="pt-3 border-t border-[#C5A059]/30">
                <div className="font-serif font-bold text-xs text-[#8B1E1F] uppercase mb-3 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  <span>Thông Tin Ngân Hàng Tạo Mã VietQR Tự Động</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                      Ngân Hàng
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                      Số Tài Khoản Nhận Tiền
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankAccount}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAccount: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-medium text-[#2A2421] mb-1">
                      Tên Chủ Tài Khoản (Không Dấu)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankAccountName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAccountName: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 text-xs border border-[#C5A059]/50 rounded-xs font-serif focus:outline-hidden focus:border-[#8B1E1F] uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8B1E1F] hover:bg-[#A82224] text-white font-serif font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi Cấu Hình</span>
                </button>

                {settingsSaved && (
                  <span className="text-xs font-serif text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đã lưu thành công!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Add New Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] border-2 border-[#C5A059] max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xs p-6 relative shadow-2xl oriental-border-corner">
            <button
              onClick={() => setIsAddProductOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white text-[#2A2421]"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-[#181412] pb-2 border-b border-[#C5A059]/30">
              Thêm Tác Phẩm Gốm Mới Vào Cửa Hàng
            </h3>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-3 text-xs font-serif">
              <div>
                <label className="block font-medium text-[#2A2421] mb-1">
                  Tên tác phẩm gốm sứ *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bát Hương Men Rạn Đắp Nổi Rồng Phượng..."
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Danh mục</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => {
                      const cat = e.target.value as CeramicCategory;
                      const catNames: Record<CeramicCategory, string> = {
                        dotho: 'Đồ Thờ Cúng Tâm Linh',
                        amtra: 'Bộ Ấm Chén Trà Đạo',
                        binhhutloc: 'Bình Hút Lộc & Mai Bình',
                        locbinh: 'Lộc Bình Đại Uy Nghiêm',
                        giadung: 'Gốm Bàn Ăn Hoàng Gia',
                        tuongphongthuy: 'Tượng & Tranh Gốm Quý'
                      };
                      setNewProduct({
                        ...newProduct,
                        category: cat,
                        categoryName: catNames[cat]
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  >
                    <option value="dotho">Đồ Thờ Cúng</option>
                    <option value="amtra">Ấm Chén Trà</option>
                    <option value="binhhutloc">Bình Hút Lộc</option>
                    <option value="locbinh">Lộc Bình</option>
                    <option value="giadung">Gốm Bàn Ăn</option>
                    <option value="tuongphongthuy">Tượng & Tranh Gốm</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Dòng men</label>
                  <select
                    value={newProduct.glaze}
                    onChange={(e) => {
                      const gl = e.target.value as CeramicGlaze;
                      const glazeNames: Record<CeramicGlaze, string> = {
                        'men-ran': 'Men Rạn Cổ Truyền',
                        'men-lam': 'Men Lam Cổ Cung Đình',
                        'men-hoa-bien': 'Men Hỏa Biến Thiên Cơ',
                        'men-ngoc': 'Men Ngọc Bích Celadon',
                        'men-tu-sa': 'Men Tử Sa Cao Cấp',
                        'men-tro': 'Men Tro Trấu Cổ'
                      };
                      setNewProduct({
                        ...newProduct,
                        glaze: gl,
                        glazeName: glazeNames[gl]
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  >
                    <option value="men-ran">Men Rạn Cổ</option>
                    <option value="men-lam">Men Lam Cung Đình</option>
                    <option value="men-hoa-bien">Men Hỏa Biến</option>
                    <option value="men-ngoc">Men Ngọc Bích</option>
                    <option value="men-tu-sa">Men Tử Sa</option>
                    <option value="men-tro">Men Tro Trấu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Kích thước</label>
                  <input
                    type="text"
                    value={newProduct.dimensions}
                    onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#2A2421] mb-1">Kiểu minh họa gốm</label>
                  <select
                    value={newProduct.illustrationType}
                    onChange={(e) => setNewProduct({ ...newProduct, illustrationType: e.target.value as IllustrationType })}
                    className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                  >
                    <option value="bat-huong">Bát Hương Đồ Thờ</option>
                    <option value="am-chen">Bộ Ấm Chén Trà</option>
                    <option value="binh-hut-loc">Bình Hút Tài Lộc</option>
                    <option value="loc-binh">Lộc Bình Uy Nghi</option>
                    <option value="bat-dia">Bộ Bát Đĩa Bàn Ăn</option>
                    <option value="tuong-di-lac">Tượng Di Lặc Phong Thủy</option>
                    <option value="hu-tra">Hũ Đựng Trà Cổ</option>
                    <option value="mai-binh">Mai Bình Tích Lộc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2A2421] mb-1">Mô tả tác phẩm</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#C5A059]/50 rounded-xs bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-[#C5A059]/50 rounded-xs font-bold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8B1E1F] text-white rounded-xs font-bold shadow-xs hover:bg-[#A82224]"
                >
                  Lưu & Đăng Bán
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
