import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Flame, Video, Volume2, Maximize2, X, Sparkles, Watch, Plus, Thermometer } from 'lucide-react';

interface Clip {
  id: string;
  title: string;
  category: string;
  image: string;
  duration: string;
  temperature: string;
  soundCue: string;
  masterchef: string;
  desc: string;
}

const COOKING_CLIPS: Clip[] = [
  {
    id: 'c1',
    title: 'High-Heat Flambé & Fire Toss',
    category: 'Sauté Station',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=600&auto=format&fit=crop',
    duration: '0:14',
    temperature: '240°C',
    soundCue: 'Sizzling wok crackle & flame burst',
    masterchef: 'Chef Marcus Vane',
    desc: 'Flash-charring premium Szechuan chilis and lotus root cubes over high-frequency flame orbits to trap smoke glaze.'
  },
  {
    id: 'c2',
    title: 'Laminar Air Sourdough Shaping',
    category: 'Artisanal Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    duration: '1:05',
    temperature: '22°C (Humidified)',
    soundCue: 'Gentle fold, rhythmic flour dusting',
    masterchef: 'Boulanger Lucas Lin',
    desc: 'Kneading wild-fermented 72-hour dough inside HEPA-filtered clean chambers to introduce maximum micro-air pillows.'
  }
];

export default function Gallery() {
  const [activeClip, setActiveClip] = useState<Clip | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayHover = (id: string) => {
    setPlayingId(id);
  };

  const handlePlayLeave = () => {
    setPlayingId(null);
  };

  return (
    <section 
      id="gallery" 
      className="relative py-20 bg-slate-50/50 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white dark:from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400 flex items-center justify-center gap-1.5">
            <Video className="w-3.5 h-3.5 animate-pulse text-pink-500" />
            Culinary Live Clips
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Kitchen Behind-The-Scenes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed">
            Tune directly into our humming styling rooms and active fire orbits. Press play to view raw dynamic molecular prep clips captured by our micro-gros cameras.
          </p>
        </div>

        {/* CLIPS GRID (BENTO STYLED CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COOKING_CLIPS.map((clip) => {
            const isHovered = playingId === clip.id;

            return (
              <motion.div
                key={clip.id}
                whileHover={{ y: -6 }}
                onMouseEnter={() => handlePlayHover(clip.id)}
                onMouseLeave={handlePlayLeave}
                onClick={() => setActiveClip(clip)}
                className="glass-panel overflow-hidden rounded-[32px] border border-slate-200/50 dark:border-slate-800/60 bg-white dark:bg-slate-900 cursor-pointer relative group shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col text-left"
              >
                {/* Image Placeholder Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={clip.image}
                    alt={clip.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dynamic Dark Matte Filter overlay with active scanner line */}
                  <div className="absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/25 transition-colors duration-300" />

                  {/* Live recording indicator in top-left */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-950/70 p-1.5 px-3 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                    <span className="text-[9px] font-mono font-black uppercase text-white tracking-widest leading-none">
                      STREAM ACTIVE
                    </span>
                  </div>

                  {/* Play circle trigger in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="p-4 rounded-full bg-white/95 dark:bg-slate-950/95 text-slate-950 dark:text-white shadow-xl flex items-center justify-center border border-sky-100"
                      animate={{ scale: isHovered ? 1.08 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Play className="w-5 h-5 fill-slate-950 dark:fill-white shrink-0 ml-0.5" />
                    </motion.div>
                  </div>

                  {/* Duration on bottom right */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/75 p-1 px-2.5 rounded-md text-[9px] font-mono text-slate-300 border border-white/5 flex items-center gap-1 font-semibold">
                    <Watch className="w-3 h-3 text-sky-400" />
                    {clip.duration}
                  </div>
                </div>

                {/* Card description content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-sky-400">
                        {clip.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400">
                        <Thermometer className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        {clip.temperature}
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-2 leading-snug">
                      {clip.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans font-normal leading-relaxed lines-clamp-2">
                      {clip.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-805 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-sans font-medium">
                      By: <strong className="text-slate-700 dark:text-slate-200">{clip.masterchef}</strong>
                    </span>
                    <span className="text-[9px] font-mono text-sky-500 dark:text-sky-400 uppercase tracking-widest font-black flex items-center gap-1">
                      Tap to enlarge clip <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* FULL SCREEN DYNAMIC MP4/GIF LOG LIGHTBOX WITH PLAY CONTROLS */}
        <AnimatePresence>
          {activeClip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveClip(null)}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
              id="gallery-clip-lightbox"
            >
              <button
                onClick={() => setActiveClip(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full overflow-hidden rounded-[38px] bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-stretch"
              >
                {/* Interactive Player Screen */}
                <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center overflow-hidden">
                  <img
                    src={activeClip.image}
                    alt={activeClip.title}
                    className="w-full h-full object-cover min-h-[300px] md:max-h-[500px]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dynamic audio-waves equalizer simulation over top */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-6 pt-16 flex justify-between items-end">
                    <div className="flex gap-1.5 items-end h-8">
                      {[1, 2, 3, 2, 4, 3, 5, 2, 3, 1, 4, 2, 3, 5, 1, 4, 3, 2].map((height, i) => (
                        <span 
                          key={i} 
                          className="w-1 bg-[#87CEEB] rounded-full animate-pulse" 
                          style={{ 
                            height: `${height * 15}%`, 
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: `${0.6 + height * 0.2}s`
                          }} 
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider">
                      <Volume2 className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                      {activeClip.soundCue}
                    </div>
                  </div>
                </div>

                {/* Side description block */}
                <div className="md:w-2/5 p-8 flex flex-col justify-between bg-slate-950 text-left border-t md:border-t-0 md:border-l border-slate-800">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-sky-400 px-3 py-1 bg-sky-950/60 border border-sky-500/20 rounded-md">
                        {activeClip.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-pink-500 animate-bounce" />
                        Temp: {activeClip.temperature}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl text-white mt-5">
                      {activeClip.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed font-sans font-normal">
                      {activeClip.desc}
                    </p>

                    <div className="mt-8 space-y-3.5 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/40">
                      <div className="flex items-center gap-2.5 text-xs text-slate-350">
                        <span className="font-mono font-bold uppercase text-[9px] bg-slate-800 px-2 py-0.5 text-slate-400 rounded-md shrink-0">CHEF</span>
                        <span className="font-semibold">{activeClip.masterchef}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-350">
                        <span className="font-mono font-bold uppercase text-[9px] bg-slate-800 px-2 py-0.5 text-slate-400 rounded-md shrink-0">SOUND</span>
                        <span className="font-semibold italic font-mono text-sky-300">"{activeClip.soundCue}"</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">CLIPID_KTV_{activeClip.id}</span>
                    <button 
                      onClick={() => setActiveClip(null)}
                      className="py-2.5 px-5 bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-xs font-bold font-display rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
