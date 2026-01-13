import { motion } from 'framer-motion';

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

export function PolaroidGallery() {
  const mobilePhotos = [...photos, ...photos, ...photos];

  return (
    <section className="bg-[#020c1b] py-20 px-4">
      <h2 className="text-center font-serif text-4xl text-white mb-12">
        📸 Através da Sua Lente
      </h2>

      {/* Mobile Infinite Loop View */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-8 px-4 pb-8 scrollbar-hide">
        {mobilePhotos.map((photo, index) => (
          <motion.div
            key={`mobile-${index}`}
            className="bg-white p-3 pb-12 rounded-sm shadow-2xl w-64 flex-shrink-0 snap-center first:pl-3"
            whileHover={{
              scale: 1.1,
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
          >
            <img src={photo.src} alt="Gallery photo" className="w-full h-60 object-cover border border-gray-200" />
            <p className="text-center font-serif text-gray-800 mt-4">{photo.caption}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={`desktop-${index}`}
            className="bg-white p-3 pb-12 rounded-sm shadow-2xl w-64"
            initial={{ rotate: (Math.random() - 0.5) * 10 }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
          >
            <img src={photo.src} alt="Gallery photo" className="w-full h-60 object-cover border border-gray-200" />
            <p className="text-center font-serif text-gray-800 mt-4">{photo.caption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
