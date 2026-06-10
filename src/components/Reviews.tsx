import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Reviews() {
  return (
    <section 
      id="reviews" 
      className="relative py-20 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-sky-200/25 dark:bg-sky-950/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-pink-100/25 dark:bg-purple-950/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
            Epicurean Critiques
          </span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Loved by Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
            Hear what world-renowned Michelin judges, local food critics, and passionate home diners are saying.
          </p>
        </div>

        {/* Global Rating Summary Block */}
        <div className="glass-panel max-w-3xl mx-auto p-6 sm:p-8 rounded-[36px] border border-sky-100/30 dark:border-slate-800/40 shadow-sm mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center md:border-r border-slate-200/50 dark:border-slate-850 py-2">
            <h3 className="font-display font-black text-5xl text-[#87CEEB]">
              4.92
            </h3>
            <div className="flex justify-center gap-1.5 mt-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 font-sans">
              Based on 3,450 Verified Orders
            </p>
          </div>

          <div className="md:col-span-8 text-left">
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              A Perfect Culinary Score
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
              Cloud Kitchen remains the highest-rated digital kitchen in the metropolitan landscape. Recognized for outstanding molecular preservation, consistent crust elasticity, and sustainable zero-emission bicycle couriers.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-sky-500">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.4% Hot-Arrival Rate
              </span>
              <span className="flex items-center gap-1 text-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Organic certified
              </span>
            </div>
          </div>

        </div>

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                key={t.id}
                className="glass-panel p-6 sm:p-8 rounded-[32px] border border-sky-100/30 dark:border-slate-800/40 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Quote symbol */}
                <span className="absolute top-6 right-6 text-slate-300 dark:text-slate-800 opacity-20 group-hover:scale-110 transition-transform">
                  <Quote className="w-12 h-12" />
                </span>

                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(t.rating) 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-200 dark:text-slate-700'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Feedback Message */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 mt-5 leading-relaxed font-sans italic text-left">
                    "{t.review}"
                  </p>
                </div>

                {/* Profile card bottom */}
                <div className="mt-8 pt-6 border-t border-slate-200/30 dark:border-slate-850 flex items-center gap-3 text-left">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-300/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      {t.role}
                    </p>
                    
                    {/* Tag showing what dish they reviewed */}
                    <span className="inline-block mt-1 bg-sky-50 dark:bg-slate-900/40 border border-sky-100/40 text-[9px] font-mono text-indigo-500 dark:text-sky-400 font-semibold px-2 py-0.5 rounded-full uppercase">
                      Ordered: {t.dishReviewed}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
