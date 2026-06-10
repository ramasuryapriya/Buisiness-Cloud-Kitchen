import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Users, Clock, Flame, CheckCircle, Trash2, Milestone, Mail, Phone, User } from 'lucide-react';
import { CLOUD_SUITES } from '../data';
import { Reservation } from '../types';

interface ReservationSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationSection({ isOpen, onClose }: ReservationSectionProps) {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(CLOUD_SUITES[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [requests, setRequests] = useState('');
  
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState<Reservation | null>(null);

  // Load existing bookings
  useEffect(() => {
    const saved = localStorage.getItem('cloud_kitchen_reservations');
    if (saved) {
      try {
        setAllReservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;

    const newRes: Reservation = {
      id: `RES-C9-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      cloudSuiteId: selectedSuiteId,
      customRequests: requests
    };

    const updated = [newRes, ...allReservations];
    setAllReservations(updated);
    localStorage.setItem('cloud_kitchen_reservations', JSON.stringify(updated));
    setBookingSuccess(newRes);

    // Reset inputs
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setRequests('');
  };

  const handleDeleteRes = (id: string) => {
    const filt = allReservations.filter(r => r.id !== id);
    setAllReservations(filt);
    localStorage.setItem('cloud_kitchen_reservations', JSON.stringify(filt));
  };

  const activeSuite = CLOUD_SUITES.find(s => s.id === selectedSuiteId) || CLOUD_SUITES[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white dark:bg-slate-900 rounded-[38px] max-w-5xl w-full max-h-[90vh] overflow-hidden border border-sky-100/40 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row text-left"
        id="reservation-main-modal"
      >
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-105 transition-all text-xs font-bold leading-none shrink-0"
        >
          ✕ Close
        </button>

        {/* LEFT COLUMN: AMBIENT PRIVATE SUITE TOUR */}
        <div className="md:w-5/12 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-250/20 dark:border-slate-850/50">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
              High-Altitude Lounges
            </span>
            <h3 className="font-display font-extrabold text-2xl text-slate-950 dark:text-white mt-1 leading-snug">
              Immersive Dine-In Suites
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed">
              We operate three premium glass dome units designed with modular micro-climate projection, cosmic backdrops, and active acoustic relaxation loops.
            </p>

            {/* Selector Grid of Suites */}
            <div className="mt-8 flex flex-col gap-3">
              {CLOUD_SUITES.map((suite) => {
                const isSelected = selectedSuiteId === suite.id;
                
                return (
                  <button
                    key={suite.id}
                    onClick={() => {
                      setSelectedSuiteId(suite.id);
                      if (bookingSuccess) setBookingSuccess(null);
                    }}
                    className={`p-4 rounded-2xl text-left border flex flex-col transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-indigo-400 shadow-lg shadow-indigo-100 dark:shadow-none'
                        : 'bg-transparent border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-display font-bold text-sm text-slate-950 dark:text-white flex items-center gap-1.5">
                        {suite.id === 'cs3' ? '🌌' : suite.id === 'cs1' ? '🌅' : '🌇'}{' '}
                        {suite.name}
                      </span>
                      <span className="text-[9px] font-mono font-semibold bg-sky-100/50 dark:bg-slate-800 px-2 py-0.5 rounded text-sky-600 dark:text-sky-400">
                        {suite.capacity}
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {suite.description}
                    </p>
                    
                    <div className="mt-2.5 flex gap-3 text-[9px] font-mono font-medium text-slate-500 dark:text-slate-400">
                      <span>🎬 {suite.altitude}</span>
                      <span>✨ {suite.vibe}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reserved list snippet */}
          {allReservations.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-850/60 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Your Bookings ({allReservations.length})
              </span>
              <div className="mt-2 flex flex-col gap-2 max-h-[120px] overflow-y-auto no-scrollbar">
                {allReservations.map((item) => {
                  const suite = CLOUD_SUITES.find(s => s.id === item.cloudSuiteId);
                  return (
                    <div key={item.id} className="flex justify-between items-center text-[11px] bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-850">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {suite?.name || 'Aether Room'}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.date} @ {item.time} ({item.guests} seaters)
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteRes(item.id)}
                        className="p-1 text-slate-400 hover:text-pink-500 transition-colors"
                        title="Cancel reservation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: BOOKING CONTROLS / SUCCESS PANELS */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-none">
          <AnimatePresence mode="wait">
            
            {bookingSuccess ? (
              /* BOOKING SUCCESS RECEIPT */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center justify-center py-10"
              >
                <div className="p-4 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full text-white shadow-xl">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <h3 className="font-display font-extrabold text-2xl text-slate-950 dark:text-white mt-5">
                  Reservation Confirmed!
                </h3>
                
                <p className="text-xs text-slate-400 mt-2 font-mono tracking-wider">
                  BOOKING RECEIPT ID: <strong className="text-indigo-500 dark:text-sky-400 font-bold">{bookingSuccess.id}</strong>
                </p>

                {/* Receipt Card Details */}
                <div className="glass-panel w-full sm:w-[360px] p-5 rounded-2xl border border-slate-200/50 mt-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 py-1 px-3 bg-indigo-500 text-white text-[9px] font-mono tracking-wider rounded-bl-xl font-bold uppercase">
                    Physical Suite
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200/50 dark:border-slate-800 pb-2">
                    {activeSuite.name}
                  </h4>

                  <div className="mt-3 flex flex-col gap-2 font-sans text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Host Name</span>
                      <span className="font-semibold">{bookingSuccess.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date</span>
                      <span className="font-semibold">{bookingSuccess.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Arrival Slot</span>
                      <span className="font-semibold">{bookingSuccess.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Table Settings</span>
                      <span className="font-semibold">{bookingSuccess.guests} Seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience Vibe</span>
                      <span className="font-semibold text-sky-500">{activeSuite.vibe}</span>
                    </div>
                  </div>

                  {bookingSuccess.customRequests && (
                    <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-400">
                      <strong>Special Instructions:</strong> "{bookingSuccess.customRequests}"
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl"
                  >
                    Book another suite
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-xs font-bold rounded-xl"
                  >
                    Back to website
                  </button>
                </div>
              </motion.div>
            ) : (
              /* DUAL RESERVATION FORM */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleCreateReservation}
                className="flex flex-col gap-5 pt-4"
              >
                <div>
                  <h4 className="font-display font-extrabold text-xl text-slate-950 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Book "{activeSuite.name}"
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Experience customizable cloud projection mappings, fine linen tables, and dedicated butler table service.
                  </p>
                </div>

                {/* Name inputs group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., Charles Prince"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="charles@cloud9.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                {/* Phone & Guests counts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Party Members
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    >
                      <option value="1">1 Guest Room</option>
                      <option value="2">2 Guests (Couple Table)</option>
                      <option value="4">4 Guests (Private Salon)</option>
                      <option value="6">6 Guests (Sky banquet)</option>
                      <option value="8">8-12 Guests (Nebula event)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Reserve Date *
                    </label>
                    <input
                      required
                      type="date"
                      min="2026-06-10"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Dining Slot *
                    </label>
                    <select
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-850 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                    >
                      <option value="">Choose arrival window</option>
                      <option value="12:00 PM">12:00 PM (Lunch Matinee)</option>
                      <option value="1:30 PM">1:30 PM (Midday clouds)</option>
                      <option value="5:00 PM">5:00 PM (Early Amber Sunset)</option>
                      <option value="6:30 PM">6:30 PM (Twilight Gold Suite)</option>
                      <option value="8:00 PM">8:00 PM (Cosmic dinner)</option>
                      <option value="9:30 PM">9:30 PM (Midnight Nebula drink)</option>
                    </select>
                  </div>
                </div>

                {/* Note requests */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Aesthetic requests / Allergies
                  </label>
                  <textarea
                    rows={3}
                    placeholder="We provide optional lavender mist vapors, custom harp track volumes, or private server selections. Note any food allergy issues."
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* Submission bottom block */}
                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-850 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex gap-1.5 items-center">
                    <Milestone className="w-4 h-4 text-sky-400 shrink-0" /> No booking deposits required; cancel anytime.
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-500 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition-transform shrink-0"
                    id="submit-reservation-btn"
                  >
                    Confirm Cloud Reservation & Suite Setting
                  </button>
                </div>

              </motion.form>
            )}

          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
