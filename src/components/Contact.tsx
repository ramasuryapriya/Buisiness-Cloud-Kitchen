import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMsg('');
    }, 2000);
  };

  const contactCards = [
    {
      icon: <Phone className="w-5 h-5 text-sky-500" />,
      title: 'Voice Dispatch',
      value: '+1 (800) 555-CL99',
      sub: 'Mon-Sun, 24/7 Hotline support'
    },
    {
      icon: <Mail className="w-5 h-5 text-indigo-500" />,
      title: 'Pristine Inquiries',
      value: 'hello@cloud9kitchen.com',
      sub: 'Expected response under 2 hours'
    },
    {
      icon: <MapPin className="w-5 h-5 text-pink-500" />,
      title: 'Our Launching Vaults',
      value: 'Cumulus Station 1, Sky City Metro',
      sub: 'Zero-emission routing hub'
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: CONTACT CARDS & INFOS (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
              Get in Touch
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-2 tracking-tight">
              Let's Connect in <br />
              Our Culinary Orbits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-sans">
              Have questions regarding molecular preservation, allergens, hosting custom dynamic private events inside our Cloud Suites, or registering corporate dining accounts? Drop us a line!
            </p>

            {/* Infor Stack Cards */}
            <div className="mt-10 flex flex-col gap-6">
              {contactCards.map((cc, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 shadow-xs relative group-hover:scale-110 transition-transform shrink-0">
                    {cc.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider">
                      {cc.title}
                    </h4>
                    <p className="font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                      {cc.value}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {cc.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Channels tag links */}
            <div className="mt-10 pt-8 border-t border-slate-205/10 dark:border-slate-850">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                Follow our orbits
              </span>
              
              <div className="flex gap-3 mt-3">
                {[
                  { icon: <Instagram className="w-4 h-4" />, name: 'Instagram', url: '#instagram' },
                  { icon: <Facebook className="w-4 h-4" />, name: 'Facebook', url: '#facebook' },
                  { icon: <Twitter className="w-4 h-4" />, name: 'Twitter (X)', url: '#twitter' }
                ].map((sc, i) => (
                  <a
                    key={i}
                    href={sc.url}
                    className="p-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 transition-colors"
                    title={sc.name}
                  >
                    {sc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE EMAIL FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-[36px] border border-sky-100/30 dark:border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[42px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {isSent ? (
                  /* Form successful submission screen */
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center justify-center"
                  >
                    <div className="p-4 bg-emerald-500 rounded-full text-white shadow-lg animate-bounce">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    
                    <h4 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-5">
                      Message Sent Into Orbit!
                    </h4>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
                      We have captured your dispatch successfully. A sky ambassador will address your inquiry back to your email inbox within 2 hours.
                    </p>

                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl mt-6 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* Standard form input elements */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmitContact}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-slate-950 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Send a Direct Dispatch
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                        Your messages are answered directly by our principal masterchefs and delivery engineers.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        Your Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        Your Messages / Questions *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="How can we help make your dining experience dreamy, Lord/Lady John?"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-[#87CEEB]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#87CEEB] hover:bg-[#72bddc] text-white font-semibold text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors mt-2"
                      id="submit-contact-btn"
                    >
                      <Send className="w-3.5 h-3.5" /> Launch Dispatch Into Sky
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
