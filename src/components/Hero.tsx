import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Flame, Sparkles, ShoppingBag, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  openReservationModal: () => void;
}

export default function Hero({ onScrollToSection, openReservationModal }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20 transition-colors duration-300 bg-[#F8FAFC] dark:bg-slate-950"
    >
      {/* Absolute Cloud drifting animations & design cloud backgrounds */}
      <div className="cloud-bg-element" />
      <div className="absolute top-1/4 -left-20 w-80 h-40 bg-sky-200/20 dark:bg-sky-950/5 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-0 w-96 h-48 bg-purple-100/15 dark:bg-purple-950/5 rounded-full blur-3xl pointer-events-none animate-float-mid" />
      
      {/* Drifting Cloud Asset 1 */}
      <div className="absolute top-12 left-10 pointer-events-none opacity-20 dark:opacity-10 animate-cloud-drift-right">
        <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sky-300 dark:text-sky-800">
          <path d="M50 100C40 100 20 90 20 70C20 50 40 40 50 40C55 20 75 10 95 10C115 10 130 25 135 40C145 35 160 35 170 45C180 55 180 70 170 80C175 80 190 85 190 95C190 105 175 110 160 110H50V100Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Drifting Cloud Asset 2 */}
      <div className="absolute bottom-16 right-10 pointer-events-none opacity-25 dark:opacity-10 animate-cloud-drift-left">
        <svg width="320" height="160" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-300 dark:text-purple-900">
          <path d="M70 130C55 130 30 115 30 90C30 65 55 50 70 50C77 25 105 10 133 10C161 10 182 30 189 50C203 45 224 45 238 58C252 71 252 91 238 104C245 104 266 110 266 123C266 136 245 143 224 143H70V130Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Grid Background Subtle Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(135,206,235,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(135,206,235,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* LEFT COLUMN: HERO TEXT & CTAS */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Glowing Brand Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 border border-sky-100/50 dark:border-slate-800/40 shadow-xs mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#87CEEB] animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" /> Dreamy Realistic Dining
              </span>
            </motion.div>

            {/* Giant Title: Where Dreams Meet Flavor */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] text-slate-900 dark:text-white tracking-tight"
            >
              Where <span className="text-[#87CEEB]">Dreams</span> <br />
              Meet Gourmet <br />
              <span className="relative">
                Flavor
                {/* Hand drawn loop behind word */}
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#87CEEB]/20 rounded-full -rotate-1" />
              </span>
            </motion.h1>

            {/* Subheading text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-sans font-normal leading-relaxed"
            >
              Freshly crafted luxury meals delivered in cloud chambers from our immersive kitchen to your doorstep. An exquisite fusion of state-of-the-art culinary art & beautiful dreaming. Showcasing the supreme luxury of gourmet dining at home.
            </motion.p>

            {/* Key feature snippets */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg mb-8"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-50 dark:bg-slate-900 rounded-xl text-[#87CEEB]">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">25 Min</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400">Guaranteed Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-pink-50/50 dark:bg-slate-900 rounded-xl text-pink-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Vacuum Seal</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400">Fresh & Steaming</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50/50 dark:bg-slate-900 rounded-xl text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Premium Chefs</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-400">Michelin standards</p>
                </div>
              </div>
            </motion.div>

            {/* CTA action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onScrollToSection('menu')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#87CEEB] hover:bg-[#72bddc] text-white font-semibold text-sm rounded-full shadow-md shadow-sky-200/50 dark:shadow-none hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-order-now-btn"
              >
                <ShoppingBag className="w-4 h-4" /> Explore Menu
              </button>
              
              <button
                onClick={() => onScrollToSection('about')}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-learn-more-btn"
              >
                Our Story
              </button>
              
              <button
                onClick={openReservationModal}
                className="sm:hidden w-full px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold rounded-full"
              >
                ✨ Reserve Premium Dine-In Suite ✨
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE GLASS GRAPHIC CLOUD PLATE */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-[430px]"
            >
              {/* Spinning cloud base behind card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-200 via-sky-50 to-indigo-100 rounded-[48px] blur-2xl opacity-40 dark:opacity-20 animate-pulse-subtle" />

              {/* Floating Container Frame */}
              <div className="relative glass-panel rounded-[42px] p-4 p-b-6 shadow-2xl overflow-hidden group animate-float-slow">
                
                {/* Real interactive glass badge */}
                <div className="absolute top-6 left-6 z-10 py-1.5 px-3 rounded-full bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800/40 text-[10px] font-mono font-semibold text-indigo-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Plated Live at cloud 9
                </div>

                {/* Main luxury dish image */}
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <img
                    src="/src/assets/images/gourmet_hero_cloud_1781081411113.png"
                    alt="Seared Salmon on Cloud Plate"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Fog mist effect inside frame */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-slate-950/70 pointer-events-none" />
                </div>

                {/* Culinary labels */}
                <div className="mt-5 px-3 pb-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      The Sky Seared Salmon
                    </span>
                    <span className="font-mono font-bold text-sky-500 text-sm">
                      ₹1,850
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-sans">
                    Glazed in pine honey, nested upon double-boiled vanilla cream clouds, seasoned with microgreen starbursts. Available in limited batches daily.
                  </p>
                  
                  {/* Floating visual reviews spark */}
                  <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/30 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <img className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" alt="Critic" />
                      <img className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="Critic 2" />
                      <img className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" alt="Critic 3" />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-medium">
                      ⭐ <strong>4.9</strong> (1,240 critical reviews)
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Guide on bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block animate-bounce">
        <button
          onClick={() => onScrollToSection('about')}
          className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 cursor-pointer hover:text-sky-400 dark:hover:text-sky-350"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
