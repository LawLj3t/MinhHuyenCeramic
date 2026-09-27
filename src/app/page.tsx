'use client';

import React from 'react';
import Header from '@/components/common/Header';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ProductGrid from '@/components/home/ProductGrid';
import ArtisanStory from '@/components/home/ArtisanStory';
import CraftingProcess from '@/components/home/CraftingProcess';
import BlogSection from '@/components/home/BlogSection';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/common/Footer';

// Modals
import ProductDetailModal from '@/components/shop/ProductDetailModal';
import CartDrawer from '@/components/shop/CartDrawer';
import CheckoutModal from '@/components/shop/CheckoutModal';
import OrderSuccessModal from '@/components/shop/OrderSuccessModal';
import OrderTrackingModal from '@/components/shop/OrderTrackingModal';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AuthModal from '@/components/auth/AuthModal';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-men-dan-surface text-[#243740] font-sans">
      <Header />

      <main className="flex-1">
        <HeroBanner />
        <CategoryShowcase />
        <ProductGrid />
        <ArtisanStory />
        <CraftingProcess />
        <BlogSection />
        <Testimonials />
      </main>

      <Footer />

      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <AdminDashboard />
      <AuthModal />
    </div>
  );
}
