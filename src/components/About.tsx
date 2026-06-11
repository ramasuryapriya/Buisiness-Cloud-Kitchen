import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, Soup, Compass } from 'lucide-react';

export default function About() {
  const storyPoints = [
    {
      icon: <Soup className="w-5 h-5 text-sky-500" />,
      title: 'Fluffy Fermentation & Textures',
      desc: 'Our culinary scientists spend months mastering moisture, humidity, and pressure to engineer dough, breads, and creams that look and taste like fluffy floating clouds.'
    },
    {
      icon: <Compass className="w-5 h-5 text-indigo-500" />,
      title: 'Hyperbaric Capsule Delivery',
      desc: 'Meals are vacuum-sealed inside custom thermal cloud pods filled with isolated food-grade vapor. This locks in original flavors and heat, preventing moisture degradation during transit.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: '100% Eco-Pure Ingredients',
      desc: 'We partner directly with high-altitude organic farms. Fruits, grains, and meats harvested at pristine peak hours are brought to our kitchen within 6 hours.'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-20 md:py-28 overflow-hidden transition-colors duration-300 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: IMAGE ACCENT GROUP */}
          <div className="lg:col-span-5 relative flex justify-center order-last lg:order-first">
            {/* Ambient decorative glowing blobs */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#87CEEB]/15 dark:bg-sky-950/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#E6E6FA]/30 dark:bg-slate-900/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[380px]">
              {/* Stacked overlapping visual cards for dreamy realistic vibe */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
              >
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop"
                  alt="Our Kitchen Chef prepping food"
                  className="w-full aspect-[4/5] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating card overlay inside image */}
                <div className="absolute bottom-5 inset-x-5 glass-panel p-4 rounded-2xl border border-white/50 text-left">
                  <div className="text-amber-500 text-sm font-bold flex gap-1 items-center">
                    <Sparkles className="w-4 h-4 fill-amber-500" /> Premium Standard
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-1">
                    Every dish is handcrafted individually under double laminar-flow clean atmospheric hoods.
                  </p>
                </div>
              </motion.div>

              {/* Premium Inspiration card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-10 -right-10 z-20 w-52 p-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-[24px] shadow-2xl text-left"
              >
                <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden mb-2.5">
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop" 
                    alt="Dream City Muse" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-white font-mono text-[9px] uppercase tracking-wider font-semibold">
                    ✨ Inspiration
                  </div>
                </div>
                <div className="px-2 pb-1">
                  <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">Culinary Artistry</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-sans font-normal">
                    Inspired by pristine high-altitude ingredients, micro-farms, and world-class molecular gastronomy standards.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: STORY CONTENT BLOCK */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
              The Genesis of Cloud Kitchen
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-3 tracking-tight">
              A Culinary Journey <br />
              Born Amidst the Clouds
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-6 leading-relaxed font-sans font-normal">
              Traditional kitchens deliver food in rigid cardboard boxes, robbing fresh pizzas of their airy crispiness and gourmet burgers of their initial structural harmony. <span className="font-semibold text-sky-400">Cloud Kitchen</span> was founded to solve this dilemma. 
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-sans font-normal">
              We combined advanced aeroponic moisture control with molecular cuisine techniques to invent dishes that retain absolute fluffiness. By eliminating traditional dine-in overheads, we pour all investment into Michelin-grade ingredients, bringing an incredible sky-dining experience to the intimate comfort of your private living room.
            </p>

            {/* Custom Features Column Checklist */}
            <div className="mt-10 flex flex-col gap-6">
              {storyPoints.map((point, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  key={index} 
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 p-3 h-fit rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:bg-sky-50 dark:group-hover:bg-slate-800 transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra culinary certification note */}
            <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
              <span className="p-1 px-2.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">100% Verified</span>
              <p className="text-[11px] sm:text-xs text-amber-800 dark:text-amber-400 font-sans font-medium">
                Federation of Aesthetic Feast certified our process as a "Pinnacle of Pure Gourmet Craftsmanship".
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
