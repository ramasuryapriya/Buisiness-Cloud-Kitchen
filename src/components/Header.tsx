import React, { useState } from 'react';
import { Sun, Moon, ShoppingBag, Utensils, Calendar, MapPin, Sparkles, Menu, X, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  onNavigate: (sectionId: string) => void;
  openReservationModal: () => void;
  favoritesCount: number;
}

export default function Header({
  cart,
  setIsCartOpen,
  isDarkMode,
  setIsDarkMode,
  onNavigate,
  openReservationModal,
  favoritesCount,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const menuLinks = [
    { name: 'Menu', id: 'menu' },
    { name: 'Special Offers', id: 'offers' },
    { name: 'Nutrition Analysis', id: 'nutrition-analysis' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Behind the Scenes', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300">
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-sky-100/50 dark:border-slate-800/40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo with cloud-realistic float */}
        <div 
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#87CEEB] shadow-md shadow-sky-200/50 dark:shadow-none animate-float-mid shrink-0">
            <img 
              src="https://files.catbox.moe/mmishw.jpg" 
              alt="Paris Dream Logo" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
              Cloud Kitchen
            </span>
            <span className="block text-[10px] font-mono tracking-widest uppercase text-sky-500 dark:text-sky-450">
              Aesthetic Feast
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-slate-600 dark:text-slate-300">
          {menuLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="relative py-1 hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-300 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* UTILITY BAR: Cart, Dark Mode, Reservation CTA */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors tooltip relative group cursor-pointer"
            title={isDarkMode ? 'Brighter Sky (Light Mode)' : 'Starry Night (Dark Mode)'}
            id="theme-toggle-btn"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Favorites simple indicator */}
          {favoritesCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-500 text-xs font-medium border border-pink-100/50 dark:border-pink-900/30">
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>{favoritesCount}</span>
            </div>
          )}

          {/* Interactive Floating Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-300/30 dark:shadow-none flex items-center gap-2 relative transition-all hover:scale-105 cursor-pointer"
            id="floating-cart-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline font-sans text-xs font-semibold">
              Cart
            </span>
            {totalCartItems > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                {totalCartItems}
              </span>
            ) : null}
          </button>

          {/* Reservation CTA button */}
          <button
            onClick={openReservationModal}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 rounded-xl hover:opacity-90 font-sans text-xs font-semibold transition-all hover:shadow-md cursor-pointer"
            id="header-reserve-btn"
          >
            <Calendar className="w-4 h-4" />
            Reserve a Suite
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] inset-x-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-850/50 py-4 px-6 z-40 shadow-xl transition-all animate-float-mid">
          <div className="flex flex-col gap-4">
            {menuLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2 font-display font-medium text-lg text-slate-800 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            <hr className="border-slate-200/50 dark:border-slate-800/50" />
            
            <button
              onClick={() => {
                openReservationModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-sky-400 to-indigo-400 text-white rounded-xl font-medium text-sm"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Cloud Suite
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
