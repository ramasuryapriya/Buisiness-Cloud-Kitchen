import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Truck, ChefHat, Sparkles, Clock, CircleDollarSign } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Sprout className="w-6 h-6 text-emerald-500" />,
      title: 'Peak Fresh Ingredients',
      desc: '100% organic heirloom greens, non-GMO grains, and fresh morning-catch seafood sourced directly from high-altitude chemical-free micro-farms.'
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-500" />,
      title: 'Aeronautic Fast Delivery',
      desc: 'Our couriers use vacuum thermic containers. We guarantee steaming, hot-off-the-fire flavor delivered to your doorstep within 25 minutes.'
    },
    {
      icon: <ChefHat className="w-6 h-6 text-indigo-500" />,
      title: 'Hygienic Clean Capsule',
      desc: 'Ingredients prepped inside strict medical-grade HEPA-filtered laminar clean workstations. Absolute clinical purity for sound-minded gourmet dining.'
    },
    {
      icon: <CircleDollarSign className="w-6 h-6 text-amber-500" />,
      title: 'Sensible Premium Value',
      desc: 'By avoiding traditional premium high street rental premiums, we forward 100% of the cost savings directly into Michelin-grade ingredients.'
    },
    {
      icon: <Clock className="w-6 h-6 text-pink-500" />,
      title: '24/7 Lunar Baking',
      desc: 'Our kitchen maintains rotating night-owl shift masterchefs so you can satisfy midnight dessert, ramen, or pizza cravings at any stellar hour.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: 'Dreamy Gastronomy Concept',
      desc: 'Every recipe is engineered with textures, colors, and aromas to trigger calming endorphins, giving you a relaxing sky-lounge cloud escape.'
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      className="relative py-20 bg-slate-50/50 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Underlines heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
            Engineered Excellence
          </span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">
            Why Dine in Our Clouds?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed">
            We operate at the innovative frontier of luxury food-tech. Here is how we guarantee a pristine gourmet dining experience.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="glass-panel p-6 sm:p-8 rounded-[28px] border border-sky-100/30 dark:border-slate-800/40 shadow-sm relative overflow-hidden group hover:border-sky-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card visual blob */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-sky-200/5 dark:bg-sky-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              
              <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 w-fit shadow-xs group-hover:scale-110 transition-transform">
                {card.icon}
              </div>

              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mt-6">
                {card.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed font-sans font-normal">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
