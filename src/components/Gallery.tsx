'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  images: string[];
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Lumina Beauty',
    category: 'branding',
    image: 'https://picsum.photos/seed/lumina1/800/600',
    year: '2025',
    images: [
      'https://picsum.photos/seed/lumina1/1200/800',
      'https://picsum.photos/seed/lumina2/1200/800',
      'https://picsum.photos/seed/lumina3/1200/800',
    ],
    description: 'A complete brand identity for a luxury skincare line, blending organic textures with modern minimalism.',
  },
  {
    id: '2',
    title: 'Nexus Tech',
    category: 'digital',
    image: 'https://picsum.photos/seed/nexus1/800/600',
    year: '2025',
    images: [
      'https://picsum.photos/seed/nexus1/1200/800',
      'https://picsum.photos/seed/nexus2/1200/800',
      'https://picsum.photos/seed/nexus3/1200/800',
    ],
    description: 'Digital ecosystem design for a cutting-edge AI startup, including web platform and mobile app.',
  },
  {
    id: '3',
    title: 'Maison Élégance',
    category: 'branding',
    image: 'https://picsum.photos/seed/maison1/800/600',
    year: '2024',
    images: [
      'https://picsum.photos/seed/maison1/1200/800',
      'https://picsum.photos/seed/maison2/1200/800',
      'https://picsum.photos/seed/maison3/1200/800',
    ],
    description: 'Luxury fashion house rebranding, from logo redesign to seasonal campaign visuals.',
  },
  {
    id: '4',
    title: 'Verdant Living',
    category: 'print',
    image: 'https://picsum.photos/seed/verdant1/800/600',
    year: '2024',
    images: [
      'https://picsum.photos/seed/verdant1/1200/800',
      'https://picsum.photos/seed/verdant2/1200/800',
      'https://picsum.photos/seed/verdant3/1200/800',
    ],
    description: 'Editorial design for a sustainable lifestyle magazine, featuring botanical photography and hand-drawn illustrations.',
  },
  {
    id: '5',
    title: 'Atlas Finance',
    category: 'digital',
    image: 'https://picsum.photos/seed/atlas1/800/600',
    year: '2024',
    images: [
      'https://picsum.photos/seed/atlas1/1200/800',
      'https://picsum.photos/seed/atlas2/1200/800',
      'https://picsum.photos/seed/atlas3/1200/800',
    ],
    description: 'Fintech dashboard design with data visualization, balancing complexity with clarity.',
  },
  {
    id: '6',
    title: 'Côte d\'Azur',
    category: 'print',
    image: 'https://picsum.photos/seed/cote1/800/600',
    year: '2023',
    images: [
      'https://picsum.photos/seed/cote1/1200/800',
      'https://picsum.photos/seed/cote2/1200/800',
      'https://picsum.photos/seed/cote3/1200/800',
    ],
    description: 'Travel brochure and print collateral for a luxury Mediterranean resort collection.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePos({ x: x * 0.15, y: y * 0.15 });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      className="group relative overflow-hidden rounded-2xl bg-ivory cursor-pointer"
      style={{
        gridColumn: index === 0 ? 'span 2' : 'span 1',
        gridRow: index === 0 ? 'span 2' : 'span 1',
      }}
    >
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone to-ivory flex items-center justify-center">
            <p className="text-4xl md:text-6xl font-display font-bold text-ink/10">
              {project.title.charAt(0)}
            </p>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
      >
        <div className="text-cream">
          <motion.h3
            className="text-xl md:text-2xl font-display mb-1"
            animate={{
              fontWeight: isHovered ? 700 : 600,
              letterSpacing: isHovered ? '0.05em' : '0em',
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-xs text-cream/60 uppercase tracking-wider"
            animate={{
              letterSpacing: isHovered ? '0.15em' : '0.1em',
              opacity: isHovered ? 0.8 : 0.6,
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {project.category} &middot; {project.year}
          </motion.p>
        </div>
      </motion.div>

      {/* Magnetic bubble */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="absolute w-32 h-32 bg-electric/10 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatePresence: any = require('framer-motion').AnimatePresence;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-night/90 backdrop-blur-md" />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-cream"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-ink/10 backdrop-blur-md flex items-center justify-center text-ink/60 hover:text-ink hover:bg-ink/20 transition-all duration-300"
        >
          <X size={18} />
        </button>

        {/* Image carousel */}
        <div className="relative aspect-[16/10] bg-ivory overflow-hidden rounded-t-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={project.images[currentImage]}
              alt={`${project.title} - ${currentImage + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </AnimatePresence>

          {/* Nav arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-ink/60 hover:text-ink shadow-lg transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-ink/60 hover:text-ink shadow-lg transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? 'bg-white w-6'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Project info */}
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-ink/40 uppercase tracking-wider">
                {project.category} &middot; {project.year}
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors"
            >
              <ExternalLink size={14} />
              View Live
            </a>
          </div>

          <p className="text-base text-ink/70 font-light leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Thumbnail strip */}
          <div className="mt-8 flex gap-3">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === currentImage ? 'border-electric opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Parallax for section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const filters = [
    { key: 'all', label: dict.gallery.filterAll },
    { key: 'branding', label: dict.gallery.filterBranding },
    { key: 'digital', label: dict.gallery.filterDigital },
    { key: 'print', label: dict.gallery.filterPrint },
  ];

  return (
    <section id="works" ref={sectionRef} className="py-24 md:py-32 bg-cream relative overflow-hidden">
      {/* Parallax decorative background */}
      <motion.div
        style={{ y: sectionY }}
        className="absolute top-20 right-0 w-96 h-96 bg-electric-glow rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
        className="absolute bottom-40 left-0 w-64 h-64 bg-champagne/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
            {dict.gallery.title}
          </h2>
          <p className="text-lg text-ink/60 max-w-xl font-light">
            {dict.gallery.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f.key
                  ? 'bg-ink text-cream'
                  : 'bg-stone/50 text-ink/60 hover:bg-stone'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
