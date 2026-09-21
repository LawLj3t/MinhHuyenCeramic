'use client';

import React from 'react';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/common/Header';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ProductGrid from '@/components/home/ProductGrid';
import FengShuiAdvisor from '@/components/home/FengShuiAdvisor';
import CraftingProcess from '@/components/home/CraftingProcess';
import ArtisanStory from '@/components/home/ArtisanStory';
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

export default function HomePage() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A2421]">
        {/* Navigation Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Banner with Masterpiece Carousel */}
          <HeroBanner />

          {/* Six Quintessential Categories */}
          <CategoryShowcase />

          {/* Complete Product Catalog with Advanced Filter & Sort */}
          <ProductGrid />

          {/* Interactive Feng Shui Advisor */}
          <FengShuiAdvisor />

          {/* 5-Step 700-year Crafting Process */}
          <CraftingProcess />

          {/* Artisan Heritage & Family Workshop Story */}
          <ArtisanStory />

          {/* Ceramic Knowledge & Feng Shui Guide */}
          <BlogSection />

          {/* Verified Customer Reviews */}
          <Testimonials />
        </main>

        {/* Traditional Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <OrderTrackingModal />
        <AdminDashboard />
      </div>
    </StoreProvider>
  );
}
