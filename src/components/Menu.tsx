import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, Flame, Plus, Search, Heart, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuProps {
  onAddToCart: (item: MenuItem, customNote?: string) => void;
  favoritedIds: string[];
  onToggleFavorite: (id: string) => void;
}

export default function Menu({ onAddToCart, favoritedIds, onToggleFavorite }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Indian');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSpecialsOnly, setShowSpecialsOnly] = useState<boolean>(false);
  const [selectedSubSection, setSelectedSubSection] = useState<'All' | 'Starters' | 'Veg' | 'Non-Veg'>('All');
  const [activeInstructionsId, setActiveInstructionsId] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<{ [key: string]: string }>({});

  const categories = ['Indian', 'Chinese', 'Italian', 'Burgers', 'Pizza', 'Asian Cuisine', 'Desserts', 'Beverages'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Filter
      if (item.category !== selectedCategory) return false;
      
      // Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      // Specials Filter
      if (showSpecialsOnly && !item.isSpecial) return false;

      // Sub-section filter (Starters, Veg, Non-Veg)
      if (selectedSubSection === 'Starters') {
        if (!item.tags?.some(tag => tag === 'Starter' || tag === 'Starters')) return false;
      } else if (selectedSubSection === 'Veg') {
        if (!item.tags?.some(tag => tag === 'Veg' || tag === 'Vegetarian')) return false;
      } else if (selectedSubSection === 'Non-Veg') {
        if (!item.tags?.some(tag => tag === 'Non-Veg')) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, showSpecialsOnly, selectedSubSection]);

  const handleAddToCartClick = (item: MenuItem) => {
    const note = customNotes[item.id] || '';
    onAddToCart(item, note);
    // Clear note and close input
    setCustomNotes(prev => ({ ...prev, [item.id]: '' }));
    setActiveInstructionsId(null);
  };

  return (
    <section 
      id="menu" 
      className="relative py-20 md:py-28 transition-colors duration-300 bg-slate-50/50 dark:bg-slate-900/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(135,206,235,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION METADATA */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
            Aesthetic Feast
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-2 tracking-tight">
            Explore Our Ethereal Menu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed">
            Choose from a rich palette of cloud-fermented crusts, premium Wagyu blends, fresh high-altitude greens, and sparkling molecular tonics.
          </p>
        </div>

        {/* SEARCH, CATEGORIES & INTERACTIVE FILTERS UNIT */}
        <div className="glass-panel p-4 rounded-3xl shadow-lg border border-sky-100/40 dark:border-slate-800 mb-12 flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search flavors, truffle, berries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm placeholder-slate-400 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 transition-all font-sans"
              />
            </div>

            {/* Premium Category Tabs Selector */}
            <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full no-scrollbar no-scrollbar::-webkit-scrollbar { display: none; }">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchQuery('');
                      setActiveInstructionsId(null);
                    }}
                    className={`px-5 py-2 rounded-full font-display font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#87CEEB] hover:bg-[#72bddc] text-white shadow-xs'
                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-[#87CEEB] border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            
          </div>

          <hr className="border-slate-200/40 dark:border-slate-800/40" />

          {/* Course Section tabs & Chef Specials toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest mr-1.5 shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Type:
              </span>
              {(['All', 'Starters', 'Veg', 'Non-Veg'] as const).map((sub) => {
                const isActive = selectedSubSection === sub;
                const iconsMap = {
                  All: '🍽️ All Flavors',
                  Starters: '🥟 Starters',
                  Veg: '🟢 Veg',
                  'Non-Veg': '🔴 Non-Veg'
                };
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubSection(sub)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#87CEEB] hover:bg-[#72bddc] text-white shadow-xs scale-[1.01]'
                        : 'bg-white/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:border-[#87CEEB] hover:text-[#87CEEB]'
                    }`}
                  >
                    {iconsMap[sub]}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSpecialsOnly(!showSpecialsOnly)}
                className={`px-3.5 py-1.5 rounded-full border text-[11px] font-sans font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  showSpecialsOnly
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                    : 'bg-white/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Chef Specials Only
              </button>
              
              {(showSpecialsOnly || selectedSubSection !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setShowSpecialsOnly(false);
                    setSelectedSubSection('All');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

        </div>

        {/* FOOD CARD LISTING GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredItems.map((item) => {
              const isFav = favoritedIds.includes(item.id);
              const isNoteOpen = activeInstructionsId === item.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  key={item.id}
                  className="food-card-element p-3 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 group"
                >
                  
                  {/* Card Section Image */}
                  <div className="relative w-full sm:w-48 md:w-52 lg:w-56 h-56 sm:h-auto overflow-hidden bg-slate-100 dark:bg-slate-950 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Ribbon badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      {item.isSpecial && (
                        <div className="py-1 px-3 rounded-full bg-amber-500 text-white text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3 fill-white" /> Special Offer
                        </div>
                      )}
                      
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <div 
                          key={idx} 
                          className="py-0.5 px-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[9px] font-sans font-semibold text-slate-800 dark:text-slate-200 border border-white/20"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/70 dark:bg-slate-900/75 backdrop-blur-md text-slate-600 hover:text-pink-500 shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer"
                      title={isFav ? 'Remove from Favs' : 'Pin to Favs'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-slate-700 dark:text-slate-350 hover:text-pink-500'}`} />
                    </button>

                    {/* Nutrition metadata bar at bottom of image on hover */}
                    <div className="absolute bottom-3 left-3 right-3 glass-panel p-1.5 rounded-xl border border-white/40 flex justify-around text-[10px] font-mono text-slate-700 dark:text-slate-200">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-pink-500" /> {item.calories} kCal
                      </span>
                      <span className="w-1 h-3 border-r border-slate-300 dark:border-slate-800" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-500" /> {item.prepTime}
                      </span>
                    </div>

                  </div>

                  {/* Card Section Description Content */}
                  <div className="p-6 flex flex-col justify-between flex-1 text-left">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight group-hover:text-indigo-500 dark:group-hover:text-sky-400 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-lg border border-amber-500/10 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500" /> {item.rating}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed font-sans font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing, notes option & checkout action trigger */}
                    <div className="mt-6">
                      
                      <AnimatePresence>
                        {isNoteOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4"
                          >
                            <input
                              type="text"
                              placeholder="Any dietary note? (e.g. Extra mild, no sesame)"
                              value={customNotes[item.id] || ''}
                              onChange={(e) => setCustomNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between gap-4">
                        
                        <div>
                          {item.discountPrice ? (
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-mono font-extrabold text-xl text-indigo-500 dark:text-sky-400">
                                ₹{item.discountPrice}
                              </span>
                              <span className="font-mono text-xs text-slate-400 line-through">
                                ₹{item.price}
                              </span>
                            </div>
                          ) : (
                            <span className="font-mono font-extrabold text-lg text-slate-900 dark:text-white">
                              ₹{item.price}
                            </span>
                          )}
                          
                          <button
                            onClick={() => setActiveInstructionsId(isNoteOpen ? null : item.id)}
                            className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-sky-400 dark:hover:text-sky-350 block mt-1 underline cursor-pointer"
                          >
                            {isNoteOpen ? 'Cancel instruction' : '+ Add special requests'}
                          </button>
                        </div>

                        <button
                          onClick={() => handleAddToCartClick(item)}
                          className="px-5 py-2 bg-[#87CEEB] hover:bg-[#72bddc] text-white rounded-full hover:scale-[1.02] text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          Add to Cart
                        </button>

                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl py-12 px-6 text-center max-w-md mx-auto">
            <span className="text-3xl">🌥️</span>
            <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mt-3">
              No dreamy dishes match
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Try readjusting your search inquiry or selected filter preferences.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
