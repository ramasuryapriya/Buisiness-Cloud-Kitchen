/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Offers from './components/Offers';
import NutritionAnalysis from './components/NutritionAnalysis';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import ReservationSection from './components/ReservationSection';
import OrderSession from './components/OrderSession';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');

  // Synchronize initial dark mode status with html node
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleAddToCart = (item: MenuItem, customInstructions?: string) => {
    // Generate a unique cart item id based on menu itemId and special instruction
    const trimmedInstructions = (customInstructions || '').trim();
    const cartItemId = trimmedInstructions 
      ? `${item.id}-${trimmedInstructions.toLowerCase().replace(/[^a-z0-9]/g, '')}`
      : item.id;

    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prevCart.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          menuItem: item,
          quantity: 1,
          customInstructions: trimmedInstructions || undefined,
        },
      ];
    });

    // Provide immediate scroll to order session or simple positive feedback
    handleScrollToSection('order-section');
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.id === cartItemId);
      if (!existing) return prevCart;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prevCart.filter((ci) => ci.id !== cartItemId);
      }
      return prevCart.map((ci) =>
        ci.id === cartItemId ? { ...ci, quantity: newQty } : ci
      );
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoritedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCouponCode(code);
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of our navigation header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-sky-200 dark:selection:bg-indigo-900">
      
      {/* 1. Header Sticky Nav Panel */}
      <Header
        cart={cart}
        setIsCartOpen={(open) => {
          if (open) {
            handleScrollToSection('order-section');
          }
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onNavigate={handleScrollToSection}
        openReservationModal={() => setIsReservationOpen(true)}
        favoritesCount={favoritedIds.length}
      />

      {/* 2. Visual Hero Banner */}
      <Hero 
        onScrollToSection={handleScrollToSection} 
        openReservationModal={() => setIsReservationOpen(true)} 
      />

      {/* 3. Narrative "About Us" Origin Block */}
      <About />

      {/* 4. Category-navigable Gourmet Menu catalog */}
      <Menu
        onAddToCart={handleAddToCart}
        favoritedIds={favoritedIds}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 5. Special Voucher offers */}
      <Offers
        onScrollToSection={handleScrollToSection}
        onApplyCouponCode={handleApplyCoupon}
      />

      {/* 6. Nutrition Analysis Wellness Dashboard */}
      <NutritionAnalysis />

      {/* 7. Testimonial Reviews & Michelin block */}
      <Reviews />

      {/* 8. Masonry lens food logs & Lightbox */}
      <Gallery />

      {/* 9. Commerce ordering cart form, receipt summary & real GPS trackers */}
      <OrderSession
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        appliedCoupon={appliedCouponCode}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* 10. Direct message dispatches */}
      <Contact />

      {/* 11. Links and newsletter footpaths */}
      <Footer 
        onScrollToSection={handleScrollToSection} 
        openReservationModal={() => setIsReservationOpen(true)}
      />

      {/* 12. IMMERSIVE TABLE DOME BOOKING OVERLAYS */}
      <ReservationSection
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

    </div>
  );
}
