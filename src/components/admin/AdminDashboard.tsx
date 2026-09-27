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
  Filter, 
  Upload, 
  Image as ImageIcon, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  UserX, 
  BookOpen, 
  Copy, 
  ExternalLink,
  Camera
} from 'lucide-react';
import { SealStamp, CeramicArtwork } from '@/components/common/CeramicArtwork';
import { 
  Order, 
  OrderStatus, 
  Product, 
  CeramicCategory, 
  CeramicGlaze, 
  IllustrationType, 
  FengShuiElement, 
  UserRole, 
  UserAccount 
} from '@/types';

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
    editingProduct,
    setEditingProduct,
    isEditProductOpen,
    setIsEditProductOpen,
    storeSettings, 
    updateStoreSettings,
    currentUser,
    users,
    addUser,
    updateUserRole,
    toggleUserActive,
    deleteUser,
    switchDemoRole
  } = useStore();

  const isAdmin = currentUser?.role === 'admin';
  const isManager = currentUser?.role === 'manager';

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'staff' | 'settings' | 'guide'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(storeSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
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
    illustrationType: 'bat-huong' as IllustrationType,
    imageUrl: ''
  });

  // New Staff Modal State
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: '123',
    role: 'manager' as UserRole,
    address: 'Showroom Bát Tràng',
    city: 'Hà Nội',
    active: true
  });

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  // Handle settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Handle image upload from computer via Canvas resize & base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 850;
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        setProductForm((prev) => ({ ...prev, imageUrl: compressedBase64 }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Handle create or update product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name?.trim()) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      setEditingProduct(null);
      setIsEditProductOpen(false);
    } else {
      addProduct(productForm as Omit<Product, 'id'>);
      setIsAddProductOpen(false);
    }
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProductForm({ ...p });
    setIsEditProductOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'dotho',
      categoryName: 'Đồ Thờ Cúng Tâm Linh',
      glaze: 'men-ran',
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
      fengShuiElement: 'Hòa Hợp Tất Cả Mệnh',
      fengShuiMeaning: 'Mang lại sự bình an gia đạo và chiêu tài tụ khí.',
      description: 'Chế tác thủ công từ đất cao lanh Bát Tràng tuyển chọn, nung củi 1300°C khử chì.',
      features: ['Gốm Bát Tràng thủ công', 'Nung 1300°C khử sạch chì'],
      illustrationType: 'bat-huong',
      imageUrl: ''
    });
    setIsAddProductOpen(true);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.email.trim() || !newStaff.phone.trim()) return;
    addUser(newStaff);
    setIsAddStaffOpen(false);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: '123',
      role: 'manager',
      address: 'Showroom Bát Tràng',
      city: 'Hà Nội',
      active: true
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.orderStatus === orderStatusFilter;
  });

  // Filtered products
  const filteredAdminProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.glazeName.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q);
  });

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'cancelled' ? o.finalAmount : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] overflow-y-auto flex flex-col font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="bg-[#163845] text-white border-b-2 border-[#C9A24B] px-4 sm:px-6 py-3 shrink-0 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SealStamp text="Quản Trị" subtext={isAdmin ? 'Chủ Xưởng' : 'Bán Hàng'} className="bg-white/10" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-base sm:text-xl text-white leading-none">
                  Bảng Điều Hành Gốm Sứ Minh Huyền
                </h1>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                  isAdmin ? 'bg-[#C9A24B] text-[#142228]' : 'bg-[#2C5F6F] text-white border border-white/20'
                }`}>
                  {isAdmin ? '👑 Toàn Quyền Admin' : '💼 Quản Lý Bán Hàng & Kho'}
                </span>
              </div>
              <p className="text-[11px] text-[#E2C67E] font-sans mt-1">
                Tài khoản đang thao tác: <strong>{currentUser ? `${currentUser.name} (${currentUser.email})` : 'Khách vãng lai'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAdmin && !isManager && (
              <button
                onClick={() => switchDemoRole('admin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] text-xs font-semibold rounded-lg shadow-xs"
              >
                <span>Bật Quyền Admin</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-xs rounded-lg border border-[#C9A24B]/50 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#E2C67E]" />
              <span>Xem Web Khách Hàng</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        
        {/* KPI Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-[#C9A24B]/40 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526872] font-sans">
              <span>Doanh Thu Ghi Nhận</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-sans text-[#163845] mt-1 tabular-nums">
              {totalRevenue.toLocaleString('vi-VN')}₫
            </div>
            <div className="text-[11px] text-[#526872] mt-0.5">
              Từ {orders.length} đơn hàng thực tế
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C9A24B]/40 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526872] font-sans">
              <span>Đơn Chờ Xử Lý</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-sans text-amber-700 mt-1">
              {pendingOrdersCount} đơn
            </div>
            <div className="text-[11px] text-[#526872] mt-0.5">
              Cần liên hệ xác nhận
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C9A24B]/40 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526872] font-sans">
              <span>Tác Phẩm Gốm Tại Xưởng</span>
              <Package className="w-4 h-4 text-[#2C5F6F]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-sans text-[#142228] mt-1">
              {products.length} tác phẩm
            </div>
            <div className="text-[11px] text-[#526872] mt-0.5">
              Có {products.filter((p) => p.imageUrl).length} sản phẩm đã có ảnh thật
            </div>
          </div>

          <div className="bg-white p-4 border border-[#C9A24B]/40 rounded-xl shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#526872] font-sans">
              <span>Tài Khoản VietQR</span>
              <QrCode className="w-4 h-4 text-[#C9A24B]" />
            </div>
            <div className="text-sm font-bold font-sans text-[#142228] mt-1 truncate tabular-nums">
              {storeSettings.bankAccount}
            </div>
            <div className="text-[11px] text-[#9B7832] font-sans truncate">
              {storeSettings.bankName.split('(')[0]}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#2C5F6F]/20 gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2.5 px-4 font-sans font-semibold text-xs sm:text-sm rounded-t-lg border-t border-x transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-white border-[#C9A24B] text-[#163845] border-b-white -mb-px shadow-xs'
                : 'bg-[#FAF7F2] border-transparent text-[#526872] hover:text-[#142228]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#2C5F6F]" />
            <span>Đơn Hàng ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-2.5 px-4 font-sans font-semibold text-xs sm:text-sm rounded-t-lg border-t border-x transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-white border-[#C9A24B] text-[#163845] border-b-white -mb-px shadow-xs'
                : 'bg-[#FAF7F2] border-transparent text-[#526872] hover:text-[#142228]'
            }`}
          >
            <Package className="w-4 h-4 text-[#2C5F6F]" />
            <span>Kho Gốm & Ảnh Thật ({products.length})</span>
          </button>

          {/* Tab Staff (Only Admin) */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('staff')}
              className={`py-2.5 px-4 font-sans font-semibold text-xs sm:text-sm rounded-t-lg border-t border-x transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'staff'
                  ? 'bg-white border-[#C9A24B] text-[#163845] border-b-white -mb-px shadow-xs'
                  : 'bg-[#FAF7F2] border-transparent text-[#526872] hover:text-[#142228]'
              }`}
            >
              <Users className="w-4 h-4 text-[#9B7832]" />
              <span>Nhân Sự & Phân Quyền ({users.length})</span>
            </button>
          )}

          {/* Tab Settings (Only Admin) */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2.5 px-4 font-sans font-semibold text-xs sm:text-sm rounded-t-lg border-t border-x transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-white border-[#C9A24B] text-[#163845] border-b-white -mb-px shadow-xs'
                  : 'bg-[#FAF7F2] border-transparent text-[#526872] hover:text-[#142228]'
              }`}
            >
              <Settings className="w-4 h-4 text-[#2C5F6F]" />
              <span>Cài Đặt VietQR</span>
            </button>
          )}

          {/* Tab Guide for Image and Render deployment */}
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-2.5 px-4 font-sans font-semibold text-xs sm:text-sm rounded-t-lg border-t border-x transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-white border-[#C9A24B] text-[#163845] border-b-white -mb-px shadow-xs'
                : 'bg-[#FAF7F2] border-transparent text-[#526872] hover:text-[#142228]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#9B7832]" />
            <span>Hướng Dẫn Thêm Ảnh & Deploy Render</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-3 border border-[#C9A24B]/30 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9B7832]" />
                <span className="text-xs font-bold text-[#142228]">Lọc trạng thái:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  aria-label="Lọc trạng thái đơn hàng"
                  className="px-2.5 py-1 text-xs border border-[#2C5F6F]/25 rounded-lg bg-[#FAF7F2]"
                >
                  <option value="all">Tất cả đơn ({orders.length})</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao hàng</option>
                  <option value="completed">Đã hoàn tất</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <span className="text-xs text-[#526872]">
                Hiển thị <strong>{filteredOrders.length}</strong> đơn hàng
              </span>
            </div>

            <div className="bg-white border border-[#C9A24B]/35 rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#526872] border-b border-[#2C5F6F]/15 font-semibold">
                  <tr>
                    <th className="p-3">Mã Đơn</th>
                    <th className="p-3">Khách Hàng & SĐT</th>
                    <th className="p-3">Địa Chỉ Nhận</th>
                    <th className="p-3">Tác Phẩm</th>
                    <th className="p-3">Tổng Tiền</th>
                    <th className="p-3">Thanh Toán</th>
                    <th className="p-3">Trạng Thái Đơn</th>
                    <th className="p-3 text-right">Liên Hệ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C5F6F]/10">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-xs text-[#526872]">
                        Không có đơn hàng nào theo điều kiện lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="p-3 font-bold text-[#163845] whitespace-nowrap font-serif">
                          {order.id}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#142228]">{order.customerName}</div>
                          <a href={`tel:${order.phone}`} className="text-[#2C5F6F] hover:underline tabular-nums">
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
                        <td className="p-3 font-bold text-[#9B7832] whitespace-nowrap tabular-nums">
                          {order.finalAmount.toLocaleString('vi-VN')}₫
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => updatePaymentStatus(order.id, order.paymentStatus === 'paid' ? 'pending' : 'paid')}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                              order.paymentStatus === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                            title="Bấm để chuyển trạng thái thanh toán"
                          >
                            {order.paymentStatus === 'paid' ? 'Đã Trả' : 'Chưa Trả'}
                          </button>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            aria-label="Cập nhật trạng thái đơn hàng"
                            className="px-2 py-1 text-[11px] border border-[#2C5F6F]/25 rounded-md bg-white font-medium"
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
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md text-[10px] font-bold"
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

        {/* TAB 2: PRODUCTS MANAGEMENT WITH IMAGE UPLOAD */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-[#C9A24B]/35 rounded-xl shadow-xs">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-[#526872] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm tác phẩm gốm theo tên, dòng men..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#2C5F6F]/25 rounded-lg bg-[#FAF7F2] focus:outline-hidden focus:border-[#2C5F6F]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-[#2C5F6F] hover:bg-[#163845] text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#E2C67E]" />
                  <span>Thêm Tác Phẩm Gốm Mới</span>
                </button>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white border border-[#C9A24B]/35 rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#526872] border-b border-[#2C5F6F]/15 font-semibold">
                  <tr>
                    <th className="p-3">Hình Ảnh (Thực Tế/Vẽ)</th>
                    <th className="p-3">Tên Tác Phẩm</th>
                    <th className="p-3">Dòng Men</th>
                    <th className="p-3">Giá Bán</th>
                    <th className="p-3">Tồn Kho</th>
                    <th className="p-3">Ảnh Đang Dùng</th>
                    <th className="p-3 text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C5F6F]/10">
                  {filteredAdminProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-3 w-16">
                        <div 
                          onClick={() => handleOpenEdit(prod)}
                          className="w-14 h-14 rounded-lg overflow-hidden border border-[#C9A24B]/35 cursor-pointer relative group bg-gray-50 flex items-center justify-center"
                          title="Bấm để đổi ảnh hoặc chỉnh sửa tác phẩm"
                        >
                          {prod.imageUrl ? (
                            <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                          ) : (
                            <CeramicArtwork
                              type={prod.illustrationType}
                              glaze={prod.glaze}
                              className="h-full min-h-0"
                              showSeal={false}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Camera className="w-4 h-4" />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-[#142228] max-w-xs">
                        <div className="font-serif">{prod.name}</div>
                        <div className="text-[10px] text-[#526872] font-normal">{prod.dimensions}</div>
                      </td>
                      <td className="p-3 text-[#2C5F6F] font-medium">
                        {prod.glazeName}
                      </td>
                      <td className="p-3 font-bold text-[#142228] tabular-nums">
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                          aria-label={`Giá bán của ${prod.name}`}
                          className="w-24 px-2 py-1 border border-[#2C5F6F]/25 rounded-md text-xs font-semibold tabular-nums"
                        />
                        <span className="ml-1 text-[11px] text-[#526872]">₫</span>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={prod.stockQuantity}
                          onChange={(e) => updateProduct(prod.id, { stockQuantity: Number(e.target.value) })}
                          aria-label={`Số lượng tồn kho của ${prod.name}`}
                          className="w-16 px-2 py-1 border border-[#2C5F6F]/25 rounded-md text-xs font-semibold"
                        />
                      </td>
                      <td className="p-3 text-[11px]">
                        {prod.imageUrl ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ảnh thật
                          </span>
                        ) : (
                          <span className="text-[#9B7832] font-medium">Vẽ SVG (Minh họa)</span>
                        )}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="px-2.5 py-1 bg-white hover:bg-gray-100 text-[#2C5F6F] border border-[#2C5F6F]/30 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors"
                            title="Chỉnh sửa chi tiết & đổi ảnh"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Đổi ảnh / Sửa</span>
                          </button>

                          {isAdmin && (
                            <button
                              onClick={() => {
                                if (confirm(`Bạn có chắc muốn xóa "${prod.name}" khỏi danh mục?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-[#526872] hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                              title="Xóa tác phẩm (Chỉ Admin)"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STAFF & ROLES MANAGEMENT (ADMIN ONLY) */}
        {activeTab === 'staff' && isAdmin && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 border border-[#C9A24B]/35 rounded-xl shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#142228]">
                  Danh Sách Nhân Sự & Phân Quyền Xưởng Gốm
                </h3>
                <p className="text-xs text-[#526872] mt-0.5">
                  Phân quyền 3 vai trò: <strong>Admin (Chủ tiệm)</strong>, <strong>Manager (Quản lý bán hàng)</strong>, <strong>User (Khách mua hàng)</strong>
                </p>
              </div>

              <button
                onClick={() => setIsAddStaffOpen(true)}
                className="px-3.5 py-1.5 bg-[#C9A24B] hover:bg-[#b8913d] text-[#142228] font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Nhân Viên Mới</span>
              </button>
            </div>

            <div className="bg-white border border-[#C9A24B]/35 rounded-xl overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#526872] border-b border-[#2C5F6F]/15 font-semibold">
                  <tr>
                    <th className="p-3">Họ Tên</th>
                    <th className="p-3">Email Đăng Nhập</th>
                    <th className="p-3">Số Điện Thoại</th>
                    <th className="p-3">Vai Trò (Role)</th>
                    <th className="p-3">Trạng Thái</th>
                    <th className="p-3 text-right">Tác Vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C5F6F]/10">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-3 font-semibold text-[#142228]">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#163845] text-white flex items-center justify-center text-[10px] font-bold">
                            {u.role === 'admin' ? '👑' : u.role === 'manager' ? '💼' : '🛍️'}
                          </span>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-[#526872]">{u.email}</td>
                      <td className="p-3 tabular-nums">{u.phone}</td>
                      <td className="p-3">
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                          className="px-2 py-1 text-xs border border-[#2C5F6F]/30 rounded-md bg-white font-medium"
                          disabled={u.id === currentUser?.id}
                        >
                          <option value="admin">Admin (Chủ Xưởng)</option>
                          <option value="manager">Manager (Bán Hàng)</option>
                          <option value="user">User (Khách Hàng)</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleUserActive(u.id)}
                          disabled={u.id === currentUser?.id}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {u.active ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                          <span>{u.active ? 'Đang hoạt động' : 'Tạm khóa'}</span>
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        {u.id !== currentUser?.id && (
                          <button
                            onClick={() => {
                              if (confirm(`Xóa tài khoản của "${u.name}"?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1 text-[#526872] hover:text-rose-600 rounded transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STORE SETTINGS & VIETQR (ADMIN ONLY) */}
        {activeTab === 'settings' && isAdmin && (
          <div className="bg-white p-6 border border-[#C9A24B]/40 rounded-xl shadow-xs max-w-3xl">
            <div className="pb-3 border-b border-[#2C5F6F]/15 mb-5">
              <h3 className="font-serif font-bold text-base text-[#142228] uppercase tracking-wider">
                Cấu Hình Cửa Hàng & Tài Khoản Ngân Hàng VietQR
              </h3>
              <p className="text-xs text-[#526872] mt-1">
                Thay đổi tại đây sẽ cập nhật ngay lập tức mã VietQR và hotline trên toàn bộ website.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Tên Xưởng Gốm
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Khẩu Hiệu / Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Hotline Tư Vấn
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hotline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Số Zalo Của Xưởng
                  </label>
                  <input
                    type="text"
                    value={settingsForm.zaloNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, zaloNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142228] mb-1">
                    Email Liên Hệ
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142228] mb-1">
                  Địa Chỉ Xưởng Sản Xuất
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                />
              </div>

              {/* Bank VietQR Section */}
              <div className="pt-3 border-t border-[#2C5F6F]/20">
                <div className="font-bold text-xs text-[#163845] uppercase mb-3 flex items-center gap-1.5 font-serif">
                  <QrCode className="w-4 h-4 text-[#C9A24B]" />
                  <span>Thông Tin Ngân Hàng Tạo Mã VietQR Tự Động</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142228] mb-1">
                      Ngân Hàng
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142228] mb-1">
                      Số Tài Khoản Nhận Tiền
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankAccount}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAccount: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142228] mb-1">
                      Tên Chủ Tài Khoản (Không Dấu)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bankAccountName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAccountName: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 text-xs border border-[#2C5F6F]/30 rounded-lg focus:outline-hidden focus:border-[#2C5F6F] uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C5F6F] hover:bg-[#163845] text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#E2C67E]" />
                  <span>Lưu Cấu Hình VietQR</span>
                </button>

                {settingsSaved && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đã lưu thành công!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: GUIDE FOR IMAGE UPLOAD & RENDER DEPLOYMENT */}
        {activeTab === 'guide' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Guide: How to add real images */}
            <div className="bg-white p-5 border border-[#C9A24B]/40 rounded-xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#2C5F6F]/15">
                <div className="w-8 h-8 rounded-lg bg-[#2C5F6F]/10 flex items-center justify-center text-[#2C5F6F]">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#142228]">
                    Hướng Dẫn Thay Ảnh Thật Cho Tác Phẩm Gốm
                  </h3>
                  <span className="text-xs text-[#526872]">Dễ dàng thực hiện theo 2 cách</span>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-[#243740]">
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C9A24B]/30 space-y-1.5">
                  <div className="font-bold text-[#163845] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#2C5F6F] text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Cách 1: Tải trực tiếp từ Máy Tính / Điện Thoại (Tiện nhất)</span>
                  </div>
                  <p className="text-[#526872] pl-6.5">
                    Tại Tab <strong>Kho Gốm & Ảnh Thật</strong> hoặc ngay trên <strong>Trang chủ</strong> (khi đăng nhập Admin/Manager), bấm nút <strong>"Đổi ảnh / Sửa"</strong> trên sản phẩm. Chọn nút <strong>"Tải ảnh từ máy"</strong>. Hệ thống sẽ tự động nén kích thước chuẩn và hiển thị ngay lập tức!
                  </p>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C9A24B]/30 space-y-1.5">
                  <div className="font-bold text-[#163845] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#2C5F6F] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Cách 2: Chép ảnh vào thư mục dự án (Chuẩn Production)</span>
                  </div>
                  <p className="text-[#526872] pl-6.5">
                    Copy các file ảnh của bạn vào thư mục:
                  </p>
                  <div className="pl-6.5 flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-[11px] font-mono text-[#163845] border">
                      public/images/products/ten-anh.jpg
                    </code>
                    <button
                      onClick={() => copyToClipboard('public/images/products/', 'folder')}
                      className="px-2 py-1 rounded bg-[#2C5F6F] text-white text-[10px] font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copySuccess === 'folder' ? 'Đã chép!' : 'Chép'}</span>
                    </button>
                  </div>
                  <p className="text-[#526872] pl-6.5">
                    Sau đó khi sửa sản phẩm, chỉ cần điền đường dẫn: <code className="text-[#9B7832]">/images/products/ten-anh.jpg</code>
                  </p>
                </div>
              </div>
            </div>

            {/* Guide: Deploying to Render.com */}
            <div className="bg-white p-5 border border-[#C9A24B]/40 rounded-xl shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#2C5F6F]/15">
                <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/15 flex items-center justify-center text-[#9B7832]">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#142228]">
                    Hướng Dẫn Triển Khai Lên Render.com
                  </h3>
                  <span className="text-xs text-[#526872]">Dự án đã có sẵn cấu hình render.yaml chuẩn</span>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-[#243740]">
                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C9A24B]/30 space-y-1.5">
                  <div className="font-bold text-[#163845] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#163845] text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Bước 1: Đẩy mã nguồn lên GitHub</span>
                  </div>
                  <p className="text-[#526872] pl-6.5">
                    Kho mã nguồn hiện tại của bạn đã kết nối sẵn với GitHub:
                  </p>
                  <div className="pl-6.5 flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-[11px] font-mono text-[#163845] border">
                      https://github.com/LawLj3t/MinhHuyenCeramic
                    </code>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C9A24B]/30 space-y-1.5">
                  <div className="font-bold text-[#163845] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#163845] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Bước 2: Tạo Web Service trên Render.com</span>
                  </div>
                  <ul className="list-disc pl-11 text-[#526872] space-y-1">
                    <li>Đăng nhập <a href="https://dashboard.render.com" target="_blank" rel="noreferrer" className="text-[#2C5F6F] underline font-semibold">dashboard.render.com</a>.</li>
                    <li>Bấm <strong>New +</strong> &rarr; chọn <strong>Web Service</strong> (hoặc chọn <strong>Blueprint</strong>).</li>
                    <li>Kết nối với repository <strong>LawLj3t/MinhHuyenCeramic</strong>.</li>
                    <li>Chọn Region: <strong>Singapore</strong> (gần Việt Nam, tải nhanh nhất).</li>
                    <li>Lệnh build: <code className="bg-gray-100 px-1 text-[11px]">npm install && npm run build</code></li>
                    <li>Lệnh start: <code className="bg-gray-100 px-1 text-[11px]">npm start</code></li>
                  </ul>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#C9A24B]/30 space-y-1">
                  <div className="font-bold text-[#163845] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#163845] text-white flex items-center justify-center text-[10px]">3</span>
                    <span>Bước 3: Nhận tên miền chạy vĩnh viễn</span>
                  </div>
                  <p className="text-[#526872] pl-6.5">
                    Render sẽ cấp phát miễn phí đường dẫn dạng: <code className="text-[#2C5F6F] font-bold">https://minhhuyenceramic.onrender.com</code>, khách hàng toàn quốc có thể vào xem và đặt hàng 24/7.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {(isAddProductOpen || isEditProductOpen) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] border-2 border-[#C9A24B] max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-xl p-5 sm:p-6 relative shadow-2xl oriental-border-corner">
            <button
              onClick={() => {
                setIsAddProductOpen(false);
                setIsEditProductOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white text-[#142228] transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-[#163845] pb-2 border-b border-[#2C5F6F]/20">
              {editingProduct ? `Chỉnh Sửa Tác Phẩm & Đổi Ảnh: ${editingProduct.name}` : 'Thêm Tác Phẩm Gốm Mới Vào Cửa Hàng'}
            </h3>

            <form onSubmit={handleSaveProduct} className="mt-4 space-y-4 text-xs">
              
              {/* IMAGE UPLOAD & PREVIEW SECTION */}
              <div className="p-3.5 bg-white rounded-xl border border-[#C9A24B]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#163845] uppercase tracking-wider flex items-center gap-1.5 text-xs">
                    <Camera className="w-4 h-4 text-[#9B7832]" />
                    Hình Ảnh Sản Phẩm (Thực Tế)
                  </span>
                  {productForm.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, imageUrl: '' })}
                      className="text-rose-600 hover:underline text-[11px] font-semibold"
                    >
                      Xóa ảnh thực (Quay về minh họa SVG)
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Preview Box */}
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-[#2C5F6F]/30 overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 relative">
                    {productForm.imageUrl ? (
                      <img
                        src={productForm.imageUrl}
                        alt="Xem trước ảnh sản phẩm"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full">
                        <CeramicArtwork
                          type={productForm.illustrationType || 'bat-huong'}
                          glaze={productForm.glaze || 'men-ran'}
                          className="h-full min-h-0"
                          showSeal={false}
                        />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="space-y-2 flex-1 w-full">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#142228] mb-1">
                        1. Tải ảnh thật từ máy tính / điện thoại
                      </label>
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2C5F6F] hover:bg-[#163845] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-[#E2C67E]" />
                        <span>Chọn File Ảnh Từ Máy</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#142228] mb-1">
                        2. Hoặc dán đường dẫn ảnh / Link URL
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: /images/products/bat-huong-1.jpg hoặc https://..."
                        value={productForm.imageUrl || ''}
                        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                        className="w-full px-3 py-1.5 border border-[#2C5F6F]/25 rounded-lg bg-[#FAF7F2] text-xs focus:outline-hidden focus:border-[#2C5F6F]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Information */}
              <div>
                <label className="block font-semibold text-[#142228] mb-1">
                  Tên tác phẩm gốm sứ *
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bát Hương Men Rạn Đắp Nổi Rồng Phượng..."
                  value={productForm.name || ''}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Danh mục</label>
                  <select
                    value={productForm.category || 'dotho'}
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
                      setProductForm({
                        ...productForm,
                        category: cat,
                        categoryName: catNames[cat]
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
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
                  <label className="block font-semibold text-[#142228] mb-1">Dòng men</label>
                  <select
                    value={productForm.glaze || 'men-ran'}
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
                      setProductForm({
                        ...productForm,
                        glaze: gl,
                        glazeName: glazeNames[gl]
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
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
                  <label className="block font-semibold text-[#142228] mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white tabular-nums"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={productForm.stockQuantity || 0}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Kích thước</label>
                  <input
                    type="text"
                    value={productForm.dimensions || ''}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Kiểu minh họa gốm</label>
                  <select
                    value={productForm.illustrationType || 'bat-huong'}
                    onChange={(e) => setProductForm({ ...productForm, illustrationType: e.target.value as IllustrationType })}
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
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
                <label className="block font-semibold text-[#142228] mb-1">Mô tả tác phẩm</label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setIsEditProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2C5F6F] hover:bg-[#163845] text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#E2C67E]" />
                  <span>{editingProduct ? 'Lưu Thay Đổi' : 'Lưu & Đăng Bán'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Staff Modal */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] border-2 border-[#C9A24B] max-w-md w-full rounded-xl p-5 sm:p-6 relative shadow-2xl oriental-border-corner">
            <button
              onClick={() => setIsAddStaffOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white text-[#142228]"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-base text-[#163845] pb-2 border-b border-[#2C5F6F]/20">
              Thêm Nhân Viên / Phân Quyền Mới
            </h3>

            <form onSubmit={handleCreateStaff} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#142228] mb-1">Họ và tên nhân viên *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lê Văn Sơn"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#142228] mb-1">Email đăng nhập *</label>
                <input
                  type="email"
                  placeholder="son.le@minhhuyen.vn"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    placeholder="0912..."
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#142228] mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    placeholder="Mặc định: 123"
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#142228] mb-1">Vai trò phân quyền</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 border border-[#2C5F6F]/30 rounded-lg bg-white font-medium"
                >
                  <option value="manager">💼 Manager (Bán hàng & Quản lý kho gốm)</option>
                  <option value="admin">👑 Admin (Đồng quản trị xưởng)</option>
                  <option value="user">🛍️ User (Khách hàng thông thường)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-3.5 py-1.5 border border-gray-300 rounded-lg font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2C5F6F] hover:bg-[#163845] text-white rounded-lg font-semibold shadow-xs"
                >
                  Thêm Nhân Sự
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
