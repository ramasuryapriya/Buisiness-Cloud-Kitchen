import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, CheckCircle, MapPin, Truck, AlertCircle, Clock, Percent, Calendar, Heart, Trash2, ArrowRight, Star, Plus, Minus } from 'lucide-react';
import { CartItem, Order, OrderStatus, MenuItem } from '../types';
import { SPECIAL_OFFERS } from '../data';

interface OrderSessionProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
}

export default function OrderSession({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedCoupon,
  onApplyCoupon,
}: OrderSessionProps) {
  // Delivery address details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Active placed order simulation
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(25);

  // Sync coupon input with header/offer code applications
  useEffect(() => {
    if (appliedCoupon) {
      setCouponInput(appliedCoupon);
      setCouponError('');
    }
  }, [appliedCoupon]);

  // Simulation timeline for tracking orders
  useEffect(() => {
    let interval: any;
    if (activeOrder) {
      interval = setInterval(() => {
        setSimulationStep(prev => {
          if (prev < 3) {
            setRemainingTime(t => Math.max(2, t - Math.floor(Math.random() * 5) - 3));
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev; // Delivered
          }
        });
      }, 15000); // Progress every 15 seconds
    }
    return () => clearInterval(interval);
  }, [activeOrder]);

  const subtotal = cart.reduce((tot, item) => {
    const price = item.menuItem.discountPrice || item.menuItem.price;
    return tot + (price * item.quantity);
  }, 0);

  // Calculate discount percentage based on coupon matching
  const discountRate = useMemo(() => {
    const matchingOffer = SPECIAL_OFFERS.find(off => off.code.toUpperCase() === couponInput.trim().toUpperCase());
    return matchingOffer ? matchingOffer.discount : 0;
  }, [couponInput]);

  const discountAmount = subtotal * (discountRate / 100);
  const deliveryFee = subtotal > 1500 ? 0 : (subtotal > 0 ? 80 : 0);
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal - discountAmount + deliveryFee + tax;

  const handleApplyCouponBtn = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    const isValid = SPECIAL_OFFERS.some(off => off.code === clean);
    
    if (isValid) {
      onApplyCoupon(clean);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try CLOUD9 or DREAMY15.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !name || !address || !phone) return;

    const placedOrder: Order = {
      id: `CLK-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      address,
      phone,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryFee,
      tax,
      total,
      status: 'received',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setActiveOrder(placedOrder);
    setSimulationStep(0);
    setRemainingTime(24);
    onClearCart();
  };

  const handleCancelSimulation = () => {
    setActiveOrder(null);
    setSimulationStep(0);
  };

  // Status helpers for tracking
  const steps: { label: string; desc: string; time: string }[] = [
    { label: 'Order Received', desc: 'Securely registered inside our cloud queue.', time: '0 Min' },
    { label: 'Fluffy Baking & Sealing', desc: 'Prepped inside sanitized laminar clean ovens.', time: '5 Min' },
    { label: 'Vacuum Capsule Dispatched', desc: 'Secured inside pressurized heat pod.', time: '12 Min' },
    { label: 'Delivered with Joy', desc: 'Fresh aroma released at your table.', time: '20 Min' }
  ];

  return (
    <section 
      id="order-section" 
      className="relative py-20 bg-white dark:bg-slate-950 transition-colors duration-300 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {activeOrder ? (
            /* ========================================================================= */
            /* 1. ORDER ORBIT GPS TRACKING SIMULATOR */
            /* ========================================================================= */
            <motion.div
              key="tracking"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-[38px] border border-sky-100/50 dark:border-slate-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-205/10 dark:border-slate-800 pb-5 gap-4">
                <div className="text-left">
                  <span className="py-1 px-3 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    🛰️ Live Cloud Orbit Active
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1.5">
                    Order Launching for {activeOrder.name}! 🚀
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    CLOUD ORBIT REFRESH PIN ID: <strong className="text-indigo-500 dark:text-sky-400 font-bold">{activeOrder.id}</strong>
                  </p>
                </div>
                
                <div className="bg-sky-50 dark:bg-slate-900 border border-sky-100/30 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-3 shrink-0 text-left">
                  <div className="p-2 bg-sky-500 text-white rounded-xl">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">Est. Delivery</span>
                    <span className="font-display font-black text-xl text-slate-950 dark:text-white">
                      {simulationStep === 3 ? 'Delivered!' : `${remainingTime} mins remaining`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Stepper row */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {steps.map((st, idx) => {
                  const isDone = simulationStep >= idx;
                  const isActive = simulationStep === idx;
                  
                  return (
                    <div key={idx} className="flex gap-4 md:flex-col items-start text-left relative z-10">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-gradient-to-tr from-sky-400 via-indigo-400 to-pink-500 text-white ring-4 ring-sky-100 dark:ring-slate-800' 
                            : 'bg-slate-100 dark:bg-slate-900 border border-slate-250 text-slate-400 dark:text-slate-600'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        {idx < 3 && (
                          <div className={`w-1 h-12 md:hidden ${isDone ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                        )}
                      </div>
                      
                      <div>
                        <h4 className={`font-display font-bold text-sm ${isDone ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                          {st.label}
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MIDDLE PORTION: INTERACTIVE GPS GRAPHICAL MAP & LIVE CAMERA STREAM */}
              <div className="mt-10 p-4 bg-slate-50/50 dark:bg-slate-950/40 rounded-[38px] border border-slate-150/30 dark:border-slate-850 overflow-hidden relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* LEFT COLUMN: LIVE STREAM / CAMERA FEED */}
                  <div className="md:col-span-5 flex flex-col text-left">
                    <div className="flex items-center justify-between p-1.5 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                          📺 Dynamic Culinary Cam Feed
                        </span>
                      </div>
                      <span className="py-0.5 px-2 rounded-md bg-slate-200/50 dark:bg-slate-900 border border-slate-250/30 text-[9px] font-mono text-slate-500">
                        CAM_HQ_0{(simulationStep + 1)}
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 shadow-sm group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={simulationStep}
                          src={
                            simulationStep === 0
                              ? 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop'
                              : simulationStep === 1
                              ? 'https://images.unsplash.com/photo-1590577976322-3d276f58760a?q=80&w=600&auto=format&fit=crop'
                              : simulationStep === 2
                              ? 'https://images.unsplash.com/photo-1526367790999-015078648679?q=80&w=600&auto=format&fit=crop'
                              : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop'
                          }
                          alt="Live Kitchen Stream"
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, filter: 'blur(5px)' }}
                          transition={{ duration: 0.4 }}
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>

                      {/* Video Scanline and overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3.5 flex items-end justify-between">
                        <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest font-black">
                          {simulationStep === 0
                            ? 'Preparing fresh elements'
                            : simulationStep === 1
                            ? 'Fluffy baking & sealing'
                            : simulationStep === 2
                            ? 'In transit (heat locked)'
                            : 'Gourmet meal arrived!'}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-wider animate-pulse uppercase">
                          ● Online
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: SIMULATED GPS MAP */}
                  <div className="md:col-span-7 flex flex-col text-left">
                    <div className="text-[10px] p-1.5 mb-1 text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono font-bold">
                      📌 Active GPS Cloud Route Tracking (Live)
                    </div>

                    <div className="relative h-[220px] w-full bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-200/40 dark:border-slate-800">
                      {/* Styled Map outlines */}
                      <svg className="absolute inset-0 w-full h-full text-slate-200 dark:text-slate-850" fill="none" preserveAspectRatio="none">
                        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" />
                        <line x1="30%" y1="80%" x2="60%" y2="20%" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                        <path d="M 0,100 C 150,150 250,50 450,200 L 900,100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                        {/* Decorative map layout blocks */}
                        <rect x="5%" y="60%" width="12%" height="15%" rx="8" fill="currentColor" opacity="0.3" />
                        <rect x="65%" y="10%" width="20%" height="20%" rx="12" fill="currentColor" opacity="0.3" />
                        <rect x="40%" y="70%" width="18%" height="10%" rx="6" fill="currentColor" opacity="0.3" />
                      </svg>

                      {/* 1. HQ Marker */}
                      <div className="absolute left-[15%] top-[25%] flex flex-col items-center">
                        <div className="p-2 bg-indigo-500 text-white rounded-full shadow-lg border border-white/60 animate-float-slow">
                          🍳
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-white dark:bg-slate-950 p-1 rounded-md shadow-xs text-slate-800 dark:text-slate-300 mt-1 uppercase border border-slate-100 dark:border-slate-800">
                          Cloud HQ
                        </span>
                      </div>

                      {/* 2. Destination Marker */}
                      <div className="absolute right-[15%] bottom-[25%] flex flex-col items-center">
                        <div className="p-2 bg-pink-500 text-white rounded-full shadow-lg border border-white/60 animate-float-mid">
                          🏠
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-white dark:bg-slate-950 p-1 rounded-md shadow-xs text-slate-800 dark:text-slate-300 mt-1 uppercase border border-slate-100 dark:border-slate-800">
                          Your Room
                        </span>
                      </div>

                      {/* Moving Scooter Courier Courier Indicator */}
                      {simulationStep < 3 && (
                        <motion.div 
                          className="absolute p-1.5 bg-gradient-to-tr from-sky-400 to-indigo-500 text-white rounded-full shadow-xl border border-white flex items-center gap-1 z-10"
                          animate={{
                            left: simulationStep === 0 ? '22%' : simulationStep === 1 ? '45%' : '75%',
                            top: simulationStep === 0 ? '30%' : simulationStep === 1 ? '48%' : '65%',
                          }}
                          transition={{ duration: 6, ease: 'easeInOut' }}
                        >
                          <Truck className="w-3.5 h-3.5 animate-bounce" />
                          <span className="text-[8px] font-mono font-extrabold pr-1 tracking-wider">POD FLYING</span>
                        </motion.div>
                      )}

                      {/* Fog/Mist clouds rolling across the map for atmospheric feel */}
                      <div className="absolute left-[-50px] top-1/3 opacity-35 dark:opacity-15 animate-cloud-drift-right pointer-events-none">
                        ☁️☁️
                      </div>
                      <div className="absolute right-[-40px] top-2/3 opacity-30 dark:opacity-10 animate-cloud-drift-left pointer-events-none">
                        ☁️
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Order checkout breakdown receipt list */}
              <div className="mt-8 border-t border-slate-200/50 dark:border-slate-850/60 pt-6 text-left">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  Order Summary
                </h4>
                
                <div className="mt-3 flex flex-col gap-3">
                  {activeOrder.items.map((item, index) => {
                    const price = item.menuItem.discountPrice || item.menuItem.price;
                    return (
                      <div key={index} className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.quantity}x
                          </span>
                          <span>{item.menuItem.name}</span>
                          {item.customInstructions && (
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-900 px-1.5 rounded-md italic">
                              "{item.customInstructions}"
                            </span>
                          )}
                        </div>
                        <span className="font-mono">₹{price * item.quantity}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-205/10 dark:border-slate-850 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Recipient & Address details:</p>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">👤 {activeOrder.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">📍 {activeOrder.address}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">Total charge (incl. tax & delivery)</p>
                    <p className="text-lg font-mono font-black text-slate-900 dark:text-white mt-0.5">
                      ₹{Math.round(activeOrder.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action list buttons to cancel tracking or order again */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleCancelSimulation}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Clear & Order Again
                </button>
              </div>

            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. MAIN COMMERCE VIEW (LEFT SIDE CART, RIGHT SIDE CHECKOUT) */
            /* ========================================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="order-commerce-view">
              
              {/* LEFT: CART DETAILS CARD (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <div className="text-left mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
                    Live Booking
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                    Your Shopping Cart
                  </h3>
                </div>

                <div className="glass-panel rounded-3xl p-6 border border-sky-100/30 dark:border-slate-800 text-left relative overflow-hidden">
                  
                  {cart.length > 0 ? (
                    <div>
                      {/* Cart items list */}
                      <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                        {cart.map((item) => {
                          const price = item.menuItem.discountPrice || item.menuItem.price;
                          return (
                            <motion.div
                              layout
                              key={item.id}
                              className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-850/60"
                            >
                              <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-100"
                                referrerPolicy="no-referrer"
                              />

                              <div className="flex-1 min-w-0">
                                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
                                  {item.menuItem.name}
                                </h4>
                                <p className="font-mono text-xs font-semibold text-indigo-500 dark:text-sky-400 mt-0.5">
                                  ₹{price}
                                </p>
                                {item.customInstructions && (
                                  <p className="text-[9px] bg-slate-50 dark:bg-slate-900/60 p-1 rounded-md inline-block max-w-full text-slate-400 italic mt-1 pb-0.5 truncate">
                                    "{item.customInstructions}"
                                  </p>
                                )}
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-sans text-xs font-semibold px-1 text-slate-800 dark:text-slate-100">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                                
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-pink-500 ml-1.5 cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Coupon Inputs code block */}
                      <form onSubmit={handleApplyCouponBtn} className="mt-6 flex gap-2">
                        <input
                          type="text"
                          placeholder="PROMO CODE (CLOUD9 / DREAMY15)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 placeholder-slate-450 focus:outline-none focus:border-[#87CEEB]"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#87CEEB] hover:bg-[#72bddc] text-white text-[10px] font-bold font-mono tracking-wide rounded-full cursor-pointer transition-colors"
                        >
                          APPLY
                        </button>
                      </form>
                      {couponError && <p className="text-[10px] text-pink-500 mt-1">{couponError}</p>}

                      {/* Line-item billing receipt breakdown */}
                      <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-850/60 flex flex-col gap-2.5 text-xs text-slate-550 dark:text-slate-400">
                        <div className="flex justify-between">
                          <span>Culinary Subtotal</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">₹{subtotal}</span>
                        </div>
                        
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                            <span className="flex items-center gap-1">🏷️ Promo Applied ({discountRate}%)</span>
                            <span className="font-mono">-₹{Math.round(discountAmount)}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>Thermic Pod Delivery</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (5%)</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">₹{Math.round(tax)}</span>
                        </div>

                        <hr className="border-slate-200/50 dark:border-slate-800 my-1" />

                        <div className="flex justify-between text-slate-950 dark:text-white font-extrabold text-base">
                          <span>Grand Total charge</span>
                          <span className="font-mono text-indigo-500 dark:text-sky-400 font-black">
                            ₹{Math.round(total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <span className="text-4xl">🛍️</span>
                      <h4 className="font-display font-bold text-base text-slate-800 dark:text-white mt-3">
                        Your Shopping Bag is empty!
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-[240px] mx-auto font-sans">
                        Flick some cloud-soft pizza, burgers, or refreshing lavender cocktails from our menu section above.
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* RIGHT: CHECKOUT FORMS CARD (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                <div className="text-left mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-500 dark:text-pink-400">
                    Direct Shipping
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                    Thermic Pod Delivery Details
                  </h3>
                </div>

                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-100/30 dark:border-slate-800 text-left">
                  
                  <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                          Your Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g., Lord Sterling"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                        />
                      </div>

                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="sterling@luxury.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                          Mobile Call Number *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (555) 0122"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                        />
                      </div>

                      <div className="flex flex-col gap-1 text-left">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                          Preferred Call Hour
                        </label>
                        <select
                          className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                        >
                          <option>Leave inside dynamic mailbox</option>
                          <option>Ring bell upon landing</option>
                          <option>Call upon capsule arrival</option>
                        </select>
                      </div>

                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                        Physical Delivery Address *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Penthouse Suite, 452 Nimbus Parkway, Metropolis"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                        Gate Key / Entrance Memo notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Concierge desk keycode #234, or please use the east elevator button."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                      />
                    </div>

                    {/* Disclaimer ribbon note */}
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-2.5 mt-2">
                      <span className="text-base shrink-0">🛸</span>
                      <p className="text-[11px] text-amber-800 dark:text-amber-400 font-sans font-medium">
                        You are selecting raw Cash-on-Delivery (or contactless wave pay upon capsule arrival). There are zero credit cards or pre-payments required inline.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={cart.length === 0}
                      className={`w-full py-4 text-sm font-semibold rounded-full shadow-xs transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer ${
                        cart.length > 0
                          ? 'bg-[#87CEEB] hover:bg-[#72bddc] text-white hover:scale-[1.01]'
                          : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                      id="place-order-btn"
                    >
                      <Truck className="w-5 h-5" />
                      Dispatch Thermic Cloud Pod (Place Order)
                    </button>

                  </form>

                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}



