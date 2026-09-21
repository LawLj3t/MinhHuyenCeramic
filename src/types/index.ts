export type CeramicGlaze = 'men-ran' | 'men-lam' | 'men-hoa-bien' | 'men-ngoc' | 'men-tu-sa' | 'men-tro';

export type CeramicCategory = 'dotho' | 'amtra' | 'binhhutloc' | 'locbinh' | 'giadung' | 'tuongphongthuy';

export type FengShuiElement = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Hòa Hợp Tất Cả Mệnh';

export type IllustrationType = 
  | 'bat-huong'
  | 'am-chen'
  | 'binh-hut-loc'
  | 'loc-binh'
  | 'bat-dia'
  | 'tuong-di-lac'
  | 'hu-tra'
  | 'mai-binh';

export interface Product {
  id: string;
  name: string;
  category: CeramicCategory;
  categoryName: string;
  glaze: CeramicGlaze;
  glazeName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  stockQuantity: number;
  dimensions: string;
  weight: string;
  temperature: string;
  artisan: string;
  fengShuiElement: FengShuiElement;
  fengShuiMeaning: string;
  description: string;
  features: string[];
  illustrationType: IllustrationType;
  imageUrl?: string;
  isFeatured?: boolean;
}

export interface CategoryInfo {
  id: CeramicCategory;
  name: string;
  subtitle: string;
  description: string;
  itemCount: number;
  illustrationType: IllustrationType;
  badge: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'vietqr' | 'vnpay' | 'zalo';

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city?: string;
  note?: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  hotline: string;
  zaloNumber: string;
  email: string;
  address: string;
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  bankAccountName: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  illustrationType: IllustrationType;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
