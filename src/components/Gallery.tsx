import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ZoomIn, Heart } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [lovedPhotos, setLovedPhotos] = useState<string[]>([]);

  const handleToggleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (lovedPhotos.includes(id)) {
      setLovedPhotos(lovedPhotos.filter(photoId => photoId !== id));
    } else {
      setLovedPhotos([...lovedPhotos, id]);
    }
  };

  return (
    <section 
      id="gallery" 
      className="relative py-20 bg-slate-50/50 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery titles */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-500 dark:text-sky-400">
            Ambient Lens
          </span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Our Flying Kitchen Files
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
            Direct high-definition captured moments from our fermentation vaults, styling booths, and masterchef stations.
          </p>
        </div>

        {/* NATIVE CSS COLUMN MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
          {GALLERY_ITEMS.map((item) => {
            const isLoved = lovedPhotos.includes(item.id);

            return (
              <motion.div
                layout
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 group cursor-pointer"
              >
                {/* Photo Element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-left" />

                {/* Overlaid contents on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={(e) => handleToggleLove(item.id, e)}
                    className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-500 text-pink-500 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isLoved ? 'fill-pink-500 text-pink-500 animate-pulse' : 'text-slate-600'}`} />
                  </button>
                </div>

                <div className="absolute bottom-5 inset-x-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-left">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-500/20">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-white mt-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] font-sans font-medium text-slate-300">
                    <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge snapshot
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* FULL SCREEN PHOTO LIGHTBOX PREVIEW MODAL */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-55 flex items-center justify-center p-4"
              id="gallery-lightbox"
            >
              
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/55 hover:bg-slate-800 text-white border border-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-[36px] bg-slate-900 border border-slate-800"
              >
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-t-[36px]"
                  referrerPolicy="no-referrer"
                />

                <div className="p-6 bg-slate-950 text-left">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 border border-sky-500/20 rounded-md px-2.5 py-0.5">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white mt-3">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 pb-1">
                    Captured on 50mm dynamic macro lenses at our primary design kitchen chambers. 
                  </p>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
