'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  StoreSettings, 
  CeramicCategory, 
  CeramicGlaze 
} from '@/types';
import { INITIAL_PRODUCTS, DEFAULT_STORE_SETTINGS } from '@/data/products';

interface StoreContextType {
  products: Product[];
  categories: CeramicCategory[];
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: StoreSettings) => void;
  
  // Product Management (For Admin / Staff)
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  discountAmount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  shippingFee: number;
  cartFinalTotal: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  latestOrder: Order | null;
  findOrder: (query: string) => Order | undefined;
  
  // Modal & Navigation States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: CeramicCategory | 'all';
  setActiveCategory: (cat: CeramicCategory | 'all') => void;
  activeGlaze: CeramicGlaze | 'all';
  setActiveGlaze: (glaze: CeramicGlaze | 'all') => void;
  priceFilter: string;
  setPriceFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredProducts: Product[];
  resetFilters: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'MH-8829',
    customerName: 'Nguyễn Văn Thành',
    phone: '0912345678',
    address: 'Số 45 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội',
    note: 'Giao hàng giờ hành chính, bọc kỹ đồ cúng giúp tôi',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ],
    totalAmount: 3250000,
    discountAmount: 0,
    shippingFee: 0,
    finalAmount: 3250000,
    paymentMethod: 'vietqr',
    paymentStatus: 'paid',
    orderStatus: 'shipping',
    createdAt: '2026-09-19T08:30:00Z'
  },
  {
    id: 'MH-8830',
    customerName: 'Lê Thị Mai Hương',
    phone: '0987654321',
    address: '128 Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh',
    note: 'Đóng thùng gỗ cẩn thận, hàng gửi vào Nam',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1
      }
    ],
    totalAmount: 6530000,
    discountAmount: 300000,
    shippingFee: 0,
    finalAmount: 6230000,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: '2026-09-20T09:15:00Z'
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  
  // UI & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [fixedDiscount, setFixedDiscount] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CeramicCategory | 'all'>('all');
  const [activeGlaze, setActiveGlaze] = useState<CeramicGlaze | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Load from localStorage on client side mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('mh_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCart = localStorage.getItem('mh_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('mh_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedSettings = localStorage.getItem('mh_settings');
      if (savedSettings) setStoreSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.error('Failed to load local storage state', e);
    }
  }, []);

  // Save changes to localStorage
  const updateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    try {
      localStorage.setItem('mh_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `sp-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      localStorage.setItem('mh_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const updateProduct = (id: string, fields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...fields } : p));
    setProducts(updated);
    try {
      localStorage.setItem('mh_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    try {
      localStorage.setItem('mh_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }
      try {
        localStorage.setItem('mh_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      try {
        localStorage.setItem('mh_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      try {
        localStorage.setItem('mh_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('mh_cart');
    } catch (e) {
      console.error(e);
    }
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'BATTRANG10') {
      setPromoCode(cleanCode);
      setDiscountPercent(10);
      setFixedDiscount(0);
      return { success: true, message: 'Đã áp dụng mã giảm 10% giá trị đơn hàng!' };
    } else if (cleanCode === 'MINHHUYEN' || cleanCode === 'TRIAN') {
      setPromoCode(cleanCode);
      setFixedDiscount(100000);
      setDiscountPercent(0);
      return { success: true, message: 'Đã áp dụng mã giảm 100.000₫ tri ân khách hàng!' };
    } else {
      return { success: false, message: 'Mã khuyến mãi không tồn tại hoặc đã hết hạn.' };
    }
  };

  const discountAmount = discountPercent > 0 
    ? Math.round(cartSubtotal * (discountPercent / 100))
    : Math.min(fixedDiscount, cartSubtotal);

  // Free shipping on orders > 1.500.000 VND
  const shippingFee = cartSubtotal >= 1500000 || cartSubtotal === 0 ? 0 : 45000;
  const cartFinalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Order operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `MH-${randomCode}`,
      orderStatus: 'pending',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'pending',
      createdAt: new Date().toISOString()
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    setLatestOrder(newOrder);
    try {
      localStorage.setItem('mh_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    clearCart();
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
    setOrders(updated);
    try {
      localStorage.setItem('mh_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o));
    setOrders(updated);
    try {
      localStorage.setItem('mh_orders', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const findOrder = (query: string): Order | undefined => {
    const clean = query.trim().toLowerCase();
    const digitsOnly = clean.replace(/\D/g, '');
    return orders.find((o) => {
      const oId = o.id.toLowerCase();
      const oPhoneDigits = o.phone.replace(/\D/g, '');
      return (
        oId === clean ||
        oId.includes(clean) ||
        (digitsOnly.length > 0 && oPhoneDigits === digitsOnly) ||
        (digitsOnly.length >= 4 && oPhoneDigits.includes(digitsOnly))
      );
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveGlaze('all');
    setPriceFilter('all');
    setSortBy('featured');
  };

  // Filtered products calculation with useMemo to prevent infinite loops
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.categoryName.toLowerCase().includes(q);
        const matchGlaze = product.glazeName.toLowerCase().includes(q);
        const matchArtisan = product.artisan.toLowerCase().includes(q);
        const matchFengShui = product.fengShuiMeaning.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchGlaze && !matchArtisan && !matchFengShui) return false;
      }

      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Glaze filter
      if (activeGlaze !== 'all' && product.glaze !== activeGlaze) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under-1m' && product.price >= 1000000) return false;
      if (priceFilter === '1m-3m' && (product.price < 1000000 || product.price > 3000000)) return false;
      if (priceFilter === '3m-10m' && (product.price < 3000000 || product.price > 10000000)) return false;
      if (priceFilter === 'over-10m' && product.price <= 10000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      // featured
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, searchQuery, activeCategory, activeGlaze, priceFilter, sortBy]);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: ['dotho', 'amtra', 'binhhutloc', 'locbinh', 'giadung', 'tuongphongthuy'],
        storeSettings,
        updateStoreSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        discountAmount,
        promoCode,
        applyPromoCode,
        shippingFee,
        cartFinalTotal,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        latestOrder,
        findOrder,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeGlaze,
        setActiveGlaze,
        priceFilter,
        setPriceFilter,
        sortBy,
        setSortBy,
        filteredProducts,
        resetFilters
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
