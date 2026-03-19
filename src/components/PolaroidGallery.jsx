// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const photos = [
  { src: '/img/foto1.jpg', caption: 'Minha Padmé' },
  { src: '/img/foto2.jpg', caption: 'Minha Constante ❤️' },
  { src: '/img/foto3.jpg', caption: 'Primeira Dama da Comunicação!' },
  { src: '/img/capa1.jpg', caption: 'Seu cachorrão!' },
  { src: '/img/favicon.jpg', caption: 'Mini Advogata ⚖️' },
  { src: '/img/IMG-20251219-WA0034.jpg', caption: 'MINHA.' },
  { src: '/img/IMG-20251231-WA0032.jpg', caption: 'G A T A' },
  { src: '/img/IMG-20260101-WA0048.jpg', caption: 'Au do meu tismo!' },
  { src: '/img/IMG-20260101-WA0051.jpg', caption: 'É você.' },
  { src: '/img/IMG-20260104-WA0046.jpg', caption: 'Minha Melhor versão' },
  { src: '/img/IMG-20260111-WA0026.jpg', caption: 'Minha Princesa.' },
];

const desktopRotations = photos.map(() => (Math.random() - 0.5) * 6);

export function PolaroidGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);

  // Auto-play for Stories
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 4500); // 4.5 seconds per story
    return () => clearInterval(timer);
  }, [isAutoPlaying, photos.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setIsAutoPlaying(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    else setIsAutoPlaying(!isAutoPlaying); // Pause/Play if user taps without swipe
  };

  const getOffset = (index) => {
    let diff = index - activeIndex;
    const len = photos.length;
    // Circular logic using the shortest distance
    if (diff > Math.floor(len / 2)) diff -= len;
    else if (diff < -Math.floor(len / 2)) diff += len;
    return diff;
  };

  return (
    <section className="bg-black py-20 px-4 overflow-hidden min-h-screen flex flex-col items-center">
      <h2 className="text-center font-serif text-4xl text-white mb-10 drop-shadow-lg md:mb-16">
        📸 O Reflexo da Alma
      </h2>

      {/* Mobile 3D Glass Carousel View */}
      <div className="md:hidden relative w-full h-[75vh] min-h-[550px] max-h-[800px] max-w-sm flex flex-col items-center justify-start pt-10 [perspective:1000px]">

        {/* Instagram Story Progress Bars */}
        <div className="absolute top-0 left-2 right-2 z-50 flex gap-1.5">
          {photos.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                initial={{ width: i < activeIndex ? '100%' : '0%' }}
                animate={{ width: i === activeIndex ? '100%' : i < activeIndex ? '100%' : '0%' }}
                transition={{ duration: i === activeIndex && isAutoPlaying ? 4.5 : 0.2, ease: "linear" }}
              />
            </div>
          ))}
        </div>

        {/* 3D Carousel Cards */}
        <div
          className="relative w-full flex-1 flex items-center justify-center mt-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence>
            {photos.map((photo, index) => {
              const offset = getOffset(index);
              const absOffset = Math.abs(offset);
              // Render only the active item and immediate neighbors (-1, 0, 1) for performance and neatness
              if (absOffset > 1) return null;

              const isActive = offset === 0;

              return (
                <motion.div
                  key={`carousel-${index}`}
                  className="absolute w-[82vw] max-w-[340px] flex flex-col items-center origin-center cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8, x: offset * 100 }}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1 : 0.88,
                    x: offset * 80, // Horizontal displacement (left or right behind)
                    rotateY: offset * -25, // 3D door rotation effect
                    zIndex: 20 - absOffset,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: offset * -100 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (offset === 1) handleNext();
                    else if (offset === -1) handlePrev();
                    else setIsAutoPlaying(!isAutoPlaying); // Pause/Play on active card click
                  }}
                >
                  {/* Caption ABOVE the image */}
                  <div className="w-full px-2 mb-4 flex items-center justify-center min-h-[4rem]">
                    <p className="font-handwritten text-center text-white text-[28px] drop-shadow-md leading-tight line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>

                  {/* 9:16 Image Container */}
                  <div className="w-full aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/20 relative bg-[#121212]">
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />

                    {/* Dark overlay for side cards to give depth */}
                    {!isActive && <div className="absolute inset-0 bg-black/60" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Grid View (Classic Polaroids) */}
      <div className="hidden md:flex flex-wrap justify-center gap-10 max-w-7xl w-full">
        {photos.map((photo, index) => (
          <motion.div
            key={`desktop-${index}`}
            className="bg-white p-3 pb-10 rounded-sm shadow-2xl w-96 flex flex-col items-center shrink-0"
            initial={{ rotate: desktopRotations[index] }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          >
            {/* Container da Imagem Quadrada */}
            <div className="w-full aspect-square overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Legenda Estilo Caneta */}
            <div className="min-h-20 flex items-center justify-center w-full px-2 mt-4">
              <p className="text-center font-handwritten text-gray-800 text-3xl tracking-tight line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
