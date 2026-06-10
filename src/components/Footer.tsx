import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Send, Check } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  openReservationModal: () => void;
}

export default function Footer({ onScrollToSection, openReservationModal }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-400 py-16 overflow-hidden border-t border-slate-900 transition-colors duration-300">
      
      {/* Absolute floating cloud particles behind text */}
      <div className="absolute top-0 right-10 pointer-events-none opacity-5 animate-cloud-drift-left">
        ☁️
      </div>
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-5 animate-cloud-drift-right">
        ☁️☁️
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* UPPER ROW: NEWSLETTER, SOCIAL & BRAND DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-900 text-left">
          
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onScrollToSection('hero')}>
              <div className="p-2 bg-[#87CEEB] rounded-full shadow-xs">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-[#87CEEB]">
                  Cloud Kitchen
                </span>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-sky-400">
                  Dreamy Dining
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-5 leading-relaxed max-w-sm font-sans font-normal">
              A futuristic gastronomy brand merging molecular food science with atmospheric dreaming. Fully optimized for cozy living rooms and high-altitude suits.
            </p>

            <p className="text-[11px] text-slate-600 mt-3 font-mono">
              Lic. No: #CLK-9283-DOM9 <br />
              Atmospheric Kitchen Authority certified
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-5">
              General Navigation
            </h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { name: 'Gourmet Menu', id: 'menu' },
                { name: 'Special Offers', id: 'offers' },
                { name: 'Why Cloud Kitchen?', id: 'why-choose-us' },
                { name: 'Testimonials', id: 'reviews' },
                { name: 'Contact support', id: 'contact' },
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => onScrollToSection(link.id)}
                  className="text-left hover:text-sky-400 transition-colors py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={openReservationModal}
                className="text-left hover:text-pink-400 transition-colors py-1 cursor-pointer font-semibold text-sky-400"
              >
                Book Cloud Suite
              </button>
            </div>
          </div>

          {/* NEWSLETTER FORM SECTION */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-5">
              Subscribe to "Aether Beats"
            </h4>
            
            <p className="text-xs text-slate-500 leading-normal mb-4 font-sans font-normal">
              Join 12,000+ luxury food lovers. Receive weekly molecular recipe breakdowns, priority Cloud Suite schedules, and flash 50% discount triggers.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="sub"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Subscribed successfully! Thank you for joining.</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2 w-full"
                >
                  <input
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-4 py-2 text-xs rounded-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#87CEEB] font-sans"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#87CEEB] hover:bg-[#72bddc] rounded-full text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* LOWER ROW: PRIVACY, TOS & LEGAL COPYRIGHTS */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-600 gap-4">
          <p>© {currentYear} Cloud Kitchen – Dreamy Realistic Dining Experience. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-slate-400 transition-colors">Coordinates & Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
