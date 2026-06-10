import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Clipboard, ClipboardCheck, Sparkles, AlertCircle } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data';
import { Offer } from '../types';

interface OffersProps {
  onScrollToSection: (sectionId: string) => void;
  onApplyCouponCode: (code: string) => void;
}

export default function Offers({ onScrollToSection, onApplyCouponCode }: OffersProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (offer: Offer) => {
    navigator.clipboard.writeText(offer.code);
    setCopiedCodeId(offer.id);
    onApplyCouponCode(offer.code);
    
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2500);
  };

  return (
    <section 
      id="offers" 
      className="relative py-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Visual glowing cloud in background */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100/30 dark:bg-pink-950/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-sky-200/20 dark:bg-sky-950/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title segment */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-500 dark:text-pink-400">
            Exclusive Sky Rewards
          </span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Special Seasonal Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
            Apply luxury coupon codes upon checkout or click code pill below to integrate automatically.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer) => {
            const isCopied = copiedCodeId === offer.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                key={offer.id}
                className={`relative rounded-3xl p-6 overflow-hidden flex flex-col justify-between border border-slate-100 dark:border-slate-850 shadow-md ${offer.bannerBg} group transition-all duration-300 hover:shadow-xl`}
              >
                {/* Visual Glass circles */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 dark:bg-white/5 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div>
                  {/* Badge top */}
                  <span className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 text-[10px] font-mono font-extrabold uppercase tracking-wide">
                    <Sparkles className="w-3 h-3 text-amber-400 dark:text-indigo-500" />
                    {offer.badge}
                  </span>

                  <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mt-4 leading-snug">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-sans font-normal">
                    {offer.description}
                  </p>
                </div>

                {/* COPY COUPON CONSOLE CARD */}
                <div className="mt-8 pt-4 border-t border-slate-900/5 dark:border-white/5">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Coupon Code
                  </span>
                  
                  <div className="flex gap-2">
                    {/* The code pill */}
                    <button
                      onClick={() => handleCopyCode(offer)}
                      className="flex-1 flex items-center justify-between px-3 py-2 bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 transition-colors hover:border-sky-400 cursor-pointer"
                      title="Click to copy and apply"
                    >
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                        <span className="font-bold tracking-wider">{offer.code}</span>
                      </div>
                      
                      <div className="shrink-0 text-slate-400">
                        {isCopied ? (
                          <ClipboardCheck className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clipboard className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isCopied && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold mt-1.5 flex items-center gap-1"
                      >
                        ✅ applied successfully! Saved {offer.discount}%
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => onScrollToSection('menu')}
                    className="w-full text-center py-2 bg-[#87CEEB] hover:bg-[#72bddc] text-white text-xs font-semibold rounded-full mt-4 cursor-pointer transition-colors"
                  >
                    Redeem on Menu
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer ribbon note */}
        <div className="mt-12 p-3 bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-100/30 dark:border-slate-850 rounded-2xl max-w-2xl mx-auto flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Cloud kitchen coupons cannot be stacked; maximum of one discount selection applies per order checkout sequence. Discounts exclude courier service base delivery fees.
          </p>
        </div>

      </div>
    </section>
  );
}
