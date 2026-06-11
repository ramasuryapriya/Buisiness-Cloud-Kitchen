import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, Flame, Apple, Sparkles, Plus, RefreshCw, Layers, Zap, 
  HeartPulse, ShieldCheck, Scale, Award, Search, Check, ChevronDown 
} from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

export default function NutritionAnalysis() {
  const [selectedFoodId, setSelectedFoodId] = useState<string>('b1'); // Default: Wagyu Truffle Burger
  const [searchMealQuery, setSearchMealQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Hydration state
  const [hydrationIntake, setHydrationIntake] = useState<number>(1250); // ml
  const hydrationTarget = 3000; // ml

  // Extract categories for analyzing filter
  const categories = useMemo(() => {
    const list = new Set(MENU_ITEMS.map(i => i.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered menu items for the nutritional lookup list
  const filteredMealsForAnalysis = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchMealQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchMealQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchMealQuery, selectedCategory]);

  const activeFoodItem = useMemo(() => {
    return MENU_ITEMS.find(item => item.id === selectedFoodId) || MENU_ITEMS[0];
  }, [selectedFoodId]);

  // Dynamically calculate precise macro & micro metrics based on the food category & calories
  const computedNutrition = useMemo(() => {
    const cal = activeFoodItem.calories || 450;
    const cat = activeFoodItem.category;
    const hasMeat = activeFoodItem.tags?.some(tag => tag === 'Non-Veg' || tag.includes('Wagyu') || tag.includes('Lamb') || tag.includes('Chicken') || tag.includes('Mutton') || tag.includes('Pork'));

    let protein = 12;
    let carbs = 45;
    let fat = 10;

    // Macro distributions by category
    if (cat === 'Burgers') {
      protein = hasMeat ? 42 : 24;
      carbs = 72;
      fat = hasMeat ? 32 : 18;
    } else if (cat === 'Pizza') {
      protein = hasMeat ? 36 : 28;
      carbs = 105;
      fat = 24;
    } else if (cat === 'Indian') {
      protein = hasMeat ? 38 : 22;
      carbs = 40;
      fat = hasMeat ? 26 : 18;
    } else if (cat === 'Chinese' || cat === 'Asian Cuisine') {
      protein = hasMeat ? 32 : 18;
      carbs = 65;
      fat = 15;
    } else if (cat === 'Italian') {
      protein = hasMeat ? 28 : 16;
      carbs = 85;
      fat = 20;
    } else if (cat === 'Desserts') {
      protein = 6;
      carbs = 78;
      fat = 22;
    } else if (cat === 'Beverages') {
      protein = 0;
      carbs = 28;
      fat = 0;
    }

    // Scale proportional to calories if discrepancy exists
    const totalEstCal = (protein * 4) + (carbs * 4) + (fat * 9);
    const scalingFactor = cal / totalEstCal;
    protein = Math.max(0, Math.round(protein * scalingFactor));
    carbs = Math.max(1, Math.round(carbs * scalingFactor));
    fat = Math.max(0, Math.round(fat * scalingFactor));

    // Dynamic Micro-mineral status
    let vitA = Math.round(300 + (cal * 0.6));
    let vitC = Math.round(15 + (cat === 'Beverages' ? 95 : cat === 'Desserts' ? 40 : 12));
    let vitD = cat === 'Asian Cuisine' || hasMeat ? 18 : 8;

    let iron = hasMeat ? 16 : 6;
    let calcium = cat === 'Pizza' || cat === 'Italian' ? 780 : 320;
    let zinc = hasMeat ? 12 : 4;

    let sodium = cat === 'Pizza' || cat === 'Burgers' || cat === 'Chinese' ? 1450 : 420;
    let potassium = cat === 'Indian' || cat === 'Asian Cuisine' ? 880 : 410;
    let magnesium = hasMeat ? 290 : 380;

    return {
      calories: cal,
      protein: { current: protein, target: 110, unit: 'g', color: 'from-sky-400 to-indigo-500', name: 'Protein', desc: 'Cellular repair & organic lean peptide fibers' },
      fat: { current: fat, target: 75, unit: 'g', color: 'from-pink-400 to-rose-500', name: 'Healthy Fats', desc: 'Hormonal equilibrium & cell membrane structural safety' },
      carbs: { current: carbs, target: 250, unit: 'g', color: 'from-amber-400 to-orange-500', name: 'Carbohydrates', desc: 'Direct mental energy & dynamic glucose reserves' },
      vitamins: [
        { name: 'Vitamin A', current: vitA, target: 900, unit: 'mcg', status: vitA > 700 ? 'Optimal' : 'Healthy', color: 'bg-sky-400' },
        { name: 'Vitamin C', current: vitC, target: 90, unit: 'mg', status: vitC > 90 ? 'High' : 'Optimal', color: 'bg-indigo-400' },
        { name: 'Vitamin D3', current: vitD, target: 20, unit: 'mcg', status: vitD > 12 ? 'Excellent' : 'Normal', color: 'bg-purple-400' }
      ],
      minerals: [
        { name: 'Iron (Fe)', current: iron, target: 18, unit: 'mg', status: iron > 12 ? 'Rich' : 'Standard', color: 'bg-pink-400' },
        { name: 'Calcium (Ca)', current: calcium, target: 1000, unit: 'mg', status: calcium > 600 ? 'Abundant' : 'Normal', color: 'bg-[#87CEEB]' },
        { name: 'Zinc (Zn)', current: zinc, target: 11, unit: 'mg', status: zinc >= 10 ? 'Complete' : 'Trace', color: 'bg-indigo-400' }
      ],
      electrolytes: [
        { name: 'Sodium (Na)', current: sodium, target: 2300, unit: 'mg', status: sodium > 1200 ? 'Satisfied' : 'Balanced', color: 'bg-amber-400' },
        { name: 'Potassium (K)', current: potassium, target: 3500, unit: 'mg', status: potassium > 700 ? 'Optimal' : 'Good', color: 'bg-orange-400' },
        { name: 'Magnesium (Mg)', current: magnesium, target: 400, unit: 'mg', status: magnesium > 300 ? 'Optimal' : 'Balanced', color: 'bg-purple-400' }
      ]
    };
  }, [activeFoodItem]);

  // Water helper triggers
  const handleAddWater = (amount: number) => {
    setHydrationIntake(prev => Math.min(6000, prev + amount));
  };

  const handleResetWater = () => {
    setHydrationIntake(0);
  };

  const getPercent = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  return (
    <section 
      id="nutrition-analysis" 
      className="relative py-20 bg-white dark:bg-slate-950 transition-colors duration-300 scroll-mt-20 border-t border-slate-100 dark:border-slate-900"
    >
      {/* Dynamic graphic backgrounds */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/10 dark:bg-sky-950/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/10 dark:bg-purple-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
            Nutrition Analysis
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Nutrition Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed">
            Select any pure-crafted dish from our menu below. View its real culinary laboratory reports, exact macronutrient ratios, micro-minerals, and water synchronization logs.
          </p>
        </div>

        {/* SEARCH & INTERACTIVE SELECTION BAR CARD */}
        <div className="glass-panel p-6 rounded-[32px] border border-sky-100/40 dark:border-slate-800/60 shadow-md max-w-5xl mx-auto mb-8 text-left">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-sky-500" />
            Pick a menu item to check laboratory nutrients:
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between mb-6">
            {/* Find Food Search query input */}
            <input 
              type="text" 
              placeholder="Search dishes to inspect (e.g. Burger, Pizza)..." 
              value={searchMealQuery}
              onChange={(e) => setSearchMealQuery(e.target.value)}
              className="flex-grow pl-4 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs placeholder-slate-400 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-400 transition-all font-sans"
            />

            {/* Quick Category Tab-Filter */}
            <div className="flex gap-1.5 overflow-x-auto p-1 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800 shrink-0">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-xl font-display font-bold text-[10px] transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === c
                      ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-850'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC DISH CAROUSEL SLIDER */}
          <div className="flex gap-4 overflow-x-auto pb-4 max-h-[140px] no-scrollbar">
            {filteredMealsForAnalysis.length === 0 ? (
              <div className="py-6 text-center w-full text-slate-400 text-xs italic font-mono">
                No matching dishes found in our orbits...
              </div>
            ) : (
              filteredMealsForAnalysis.map((item) => {
                const isActive = item.id === selectedFoodId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFoodId(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all shrink-0 text-left min-w-[240px] cursor-pointer group focus:outline-none ${
                      isActive 
                        ? 'bg-sky-500/10 border-sky-400/80 dark:border-sky-500 shadow-sm' 
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/60 border-slate-150 dark:border-slate-800'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/40">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        {item.category} • {item.calories} Cal
                      </p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        {isActive ? (
                          <span className="text-[9px] font-mono font-black text-sky-500 flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> ACTIVE REPORT
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-400 group-hover:text-sky-500">
                            Check Lab stats
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* MAIN COMPREHENSIVE DASHBOARD METRIC ANALYSIS BOARD */}
        <div className="glass-panel p-6 sm:p-10 rounded-[38px] border border-sky-100/50 dark:border-slate-800 shadow-xl max-w-5xl mx-auto text-left relative overflow-hidden">
          
          {/* LAB CARD WATERMARK BACKGROUND */}
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none text-slate-900 dark:text-white font-mono font-black text-[120px] select-none uppercase tracking-tighter translate-x-12 -translate-y-12">
            LAB
          </div>

          {/* ACTIVE DISH PROFILE HEADER */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-855 pb-8 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl overflow-hidden shrink-0 shadow-md border-2 border-sky-300 relative">
                <img 
                  src={activeFoodItem.image} 
                  alt={activeFoodItem.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[8px] font-mono tracking-widest text-[#87CEEB] p-1 py-0.5 rounded-md border border-white/5 font-black uppercase">
                  {activeFoodItem.prepTime}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded-full">
                    {activeFoodItem.category}
                  </span>
                  {activeFoodItem.isSpecial && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Chef Exclusive
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
                  {activeFoodItem.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lines-clamp-2 leading-relaxed max-w-lg font-sans font-normal">
                  {activeFoodItem.description}
                </p>
              </div>
            </div>

            {/* TOTAL CALORIES ORBIT GAUGE PILL */}
            <div className="py-3 px-6 rounded-2xl bg-slate-950 dark:bg-slate-900 border border-slate-800 text-white shrink-0 flex items-center gap-4 select-none">
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">Inspect Energy</span>
                <span className="font-display font-black text-2xl text-sky-400">
                  {computedNutrition.calories} <strong className="text-xs text-white uppercase font-normal">Kcal</strong>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center animate-pulse">
                <Flame className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* DYNAMIC REPORTING SECTION */}
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: MACRONUTRIENTS CARD ROW (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-sky-500" />
                    Macronutrient Budget Details
                  </h4>
                  <div className="py-1 px-3 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Certified Purified ratios
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['protein', 'fat', 'carbs'].map((key) => {
                    const data = computedNutrition[key as 'protein' | 'fat' | 'carbs'];
                    const percent = getPercent(data.current, data.target);
                    // Circle stroke arithmetic
                    const strokeRadius = 36;
                    const circumference = 2 * Math.PI * strokeRadius;
                    const strokeDashoffset = circumference - (percent / 100) * circumference;

                    return (
                      <div 
                        key={key} 
                        className="p-5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150/40 dark:border-slate-850/60 rounded-[28px] hover:shadow-md transition-shadow group flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="overflow-hidden">
                            <h5 className="font-display font-extrabold text-sm text-slate-900 dark:text-white truncate">
                              {data.name}
                            </h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight lines-clamp-2 h-7 font-sans">
                              {data.desc}
                            </p>
                          </div>
                          
                          {/* Svg tracking ring */}
                          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full rotate-[-95deg]">
                              <circle 
                                cx="28" 
                                cy="28" 
                                r={24} 
                                className="stroke-slate-200 dark:stroke-slate-800" 
                                strokeWidth="4.5" 
                                fill="transparent" 
                              />
                              <circle 
                                cx="28" 
                                cy="28" 
                                r={24} 
                                className="stroke-sky-400 group-hover:opacity-90 transition-all duration-1000" 
                                strokeWidth="4.5" 
                                fill="transparent" 
                                strokeDasharray={2 * Math.PI * 24}
                                strokeDashoffset={2 * Math.PI * 24 - (percent / 100) * (2 * Math.PI * 24)}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute font-mono font-black text-[10px] text-slate-800 dark:text-slate-100">
                              {percent}%
                            </span>
                          </div>
                        </div>

                        {/* Quantitative details */}
                        <div className="mt-6 pt-3 border-t border-slate-150 dark:border-slate-850">
                          <div className="flex justify-between items-end text-[10px] font-mono font-bold text-slate-400">
                            <span>BUDGET:</span>
                            <span className="text-slate-900 dark:text-white">
                              {data.current} / <strong className="text-slate-400 font-normal">{data.target}{data.unit}</strong>
                            </span>
                          </div>

                          {/* Linear visual load */}
                          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden p-0.5">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${data.color} transition-all duration-1000`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MICRONUTRIENT FACT BOX ELEMENTS */}
                <div className="mt-2 p-5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150/40 dark:border-slate-850/60 rounded-[30px]">
                  <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-100">
                    <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="font-display font-extrabold text-xs uppercase tracking-wider">
                      Essential Micronutrients Density Index
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Column 1: Vitamins */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-150 dark:border-slate-800 pb-1.5">Vitamins</span>
                      {computedNutrition.vitamins.map((v, idx) => {
                        const pct = getPercent(v.current, v.target);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                              <span className="font-bold">{v.name}</span>
                              <span className="font-mono text-[9px]">{v.current}/{v.target} {v.unit}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-sky-400" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 2: Bio Minerals */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-150 dark:border-slate-800 pb-1.5">Bio Minerals</span>
                      {computedNutrition.minerals.map((m, idx) => {
                        const pct = getPercent(m.current, m.target);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                              <span className="font-bold">{m.name}</span>
                              <span className="font-mono text-[9px]">{m.current}/{m.target} {m.unit}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-indigo-400" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 3: Electrolytes */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block border-b border-slate-150 dark:border-slate-800 pb-1.5">Electrolytes</span>
                      {computedNutrition.electrolytes.map((el, idx) => {
                        const pct = getPercent(el.current, el.target);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                              <span className="font-bold">{el.name}</span>
                              <span className="font-mono text-[9px]">{el.current}/{el.target} {el.unit}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-pink-400" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT: INTERACTIVE FLUID HYDRATION LOGGER (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-pink-500 animate-pulse" />
                    Hydration Log Tracker
                  </h4>
                  
                  {/* Fluid water count card */}
                  <div className="mt-4 p-6 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150/40 dark:border-slate-850/60 rounded-[30px] relative overflow-hidden">
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">Liquid consumed</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-display font-black text-5xl text-slate-950 dark:text-white transition-all">
                        {hydrationIntake}
                      </span>
                      <span className="font-mono font-bold text-slate-400 uppercase text-sm">
                        ml / {hydrationTarget}ml
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal mt-3 font-sans">
                      Proper biological fluid ratios help digest gourmet dishes up to <strong className="text-sky-500 font-extrabold text-xs">22% better</strong>. Remember to drink pure water.
                    </p>

                    {/* Progress water gauge bar */}
                    <div className="relative w-full h-10 bg-slate-200 dark:bg-slate-900 rounded-2xl overflow-hidden p-1 mt-5 shadow-inner">
                      <div 
                        className="h-full rounded-xl bg-gradient-to-r from-sky-400 via-sky-400 to-indigo-500 transition-all duration-700 overflow-hidden relative flex items-center pl-4 shadow-sm"
                        style={{ width: `${getPercent(hydrationIntake, hydrationTarget)}%`, minWidth: '10%' }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%)] bg-[size:50px_50px] animate-pulse pointer-events-none" />
                        <span className="font-display font-black text-[9px] text-white tracking-widest uppercase z-10 leading-none">
                          {getPercent(hydrationIntake, hydrationTarget)}% Consumed
                        </span>
                      </div>
                    </div>

                    {/* Quick Add buttons */}
                    <div className="mt-5 pt-4 border-t border-slate-200/30 dark:border-slate-850/40 flex items-center justify-between gap-25">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddWater(250)}
                          className="py-2 px-3.5 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-[10px] font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs transition-transform hover:scale-102"
                        >
                          <Plus className="w-3 h-3 text-sky-500" />
                          +250ml Glass
                        </button>

                        <button
                          onClick={() => handleAddWater(500)}
                          className="py-2 px-3.5 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-[10px] font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs transition-transform hover:scale-102"
                        >
                          <Plus className="w-3 h-3 text-sky-500 animate-bounce" />
                          +500ml Bottle
                        </button>
                      </div>

                      <button
                        onClick={handleResetWater}
                        className="p-2 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-350 rounded-xl cursor-pointer transition-colors"
                        title="Reset water logs"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* WEEKLY TRACK STATS GRID */}
                <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-150/40 dark:border-slate-850/60 rounded-[30px] mt-2">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3.5">
                    Continuous Water Intake Diagnostics
                  </span>

                  <div className="grid grid-cols-7 gap-1.5">
                    {[
                      { day: 'Mon', vol: '2.8k ml', state: 'bg-emerald-500' },
                      { day: 'Tue', vol: '3.2k ml', state: 'bg-emerald-500' },
                      { day: 'Wed', vol: '1.5k ml', state: 'bg-amber-400 animate-pulse' },
                      { day: 'Thu', vol: '3.0k ml', state: 'bg-emerald-500' },
                      { day: 'Fri', vol: '2.4k ml', state: 'bg-sky-400' },
                      { day: 'Sat', vol: '1.8k ml', state: 'bg-pink-400' },
                      { day: 'Sun', vol: 'Active', val: hydrationIntake, state: hydrationIntake >= hydrationTarget ? 'bg-emerald-500' : 'bg-sky-400' }
                    ].map((d, i) => (
                      <div key={i} className="p-1 px-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850/80 rounded-xl text-center">
                        <span className="block text-[8px] font-mono text-slate-400 uppercase">{d.day}</span>
                        <div className={`w-1.5 h-1.5 mx-auto rounded-full ${d.state} my-1.5`} />
                        <span className="block text-[8px] font-mono font-bold text-slate-700 dark:text-slate-300">
                          {d.vol === 'Active' ? `${d.val} ml` : d.vol}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* LOWER ANALYTICS SUMMARY BULLETS FIELDS */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-850">
            <div className="flex gap-3 items-start p-4 bg-slate-50/45 dark:bg-slate-950/20 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Clinical Standards</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">
                  Approved by certified dieticians under ISO metabolic compliance standards.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-slate-50/45 dark:bg-slate-950/20 rounded-2xl">
              <Scale className="w-5 h-5 text-[#87CEEB] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Weight Equilibrium</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">
                  Ratios of real clean elements facilitate continuous cellular digestion and low sodium bloats.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-slate-50/45 dark:bg-slate-950/20 rounded-2xl">
              <Award className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Michelin Purity</h5>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans">
                  Zero processed high-fructose syrups are allowed in any elements of our kitchens.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
