'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SECTIONS = [
  { id: 'home', color: '#FF3366', title: 'HOME', subtitle: 'THE BEGINNING' },
  { id: 'about', color: '#33CC99', title: 'ABOUT', subtitle: 'THE STORY' },
  { id: 'work', color: '#7B61FF', title: 'WORK', subtitle: 'THE CRAFT' },
  { id: 'contact', color: '#FF9933', title: 'CONTACT', subtitle: 'THE END' },
];

export default function CinematicNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle wheel scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      if (e.deltaY > 50) {
        if (currentIndex < SECTIONS.length - 1) {
          setDirection(1);
          setCurrentIndex(prev => prev + 1);
          setIsAnimating(true);
        }
      } else if (e.deltaY < -50) {
        if (currentIndex > 0) {
          setDirection(-1);
          setCurrentIndex(prev => prev - 1);
          setIsAnimating(true);
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, isAnimating]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (currentIndex < SECTIONS.length - 1) {
          setDirection(1);
          setCurrentIndex(prev => prev + 1);
          setIsAnimating(true);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setDirection(-1);
          setCurrentIndex(prev => prev - 1);
          setIsAnimating(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  const handleNavClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAnimating(true);
  };

  const currentSection = SECTIONS[currentIndex];

  // Cinematic easing curves
  const SPLIT_EASE = [0.76, 0, 0.24, 1] as const; // Expo ease in out
  const CONTENT_EASE = [0.16, 1, 0.3, 1] as const; // Expo ease out
  const CONTENT_EASE_SMOOTH = [0.22, 1, 0.36, 1] as const; // Quint ease out

  const getHalf1Variants = (isVertical: boolean) => ({
    enter: (direction: number) => ({
      x: isVertical ? (direction > 0 ? '100%' : '-100%') : '0%',
      y: !isVertical ? (direction > 0 ? '100%' : '-100%') : '0%',
      zIndex: 20,
    }),
    center: {
      x: '0%',
      y: '0%',
      zIndex: 20,
      transition: { duration: 1.4, ease: SPLIT_EASE },
    },
    exit: (direction: number) => ({
      x: isVertical ? (direction > 0 ? '-100%' : '100%') : '0%',
      y: !isVertical ? (direction > 0 ? '-100%' : '100%') : '0%',
      zIndex: 10,
      transition: { duration: 1.4, ease: SPLIT_EASE },
    }),
  });

  const getHalf2Variants = (isVertical: boolean) => ({
    enter: (direction: number) => ({
      x: isVertical ? (direction > 0 ? '-100%' : '100%') : '0%',
      y: !isVertical ? (direction > 0 ? '-100%' : '100%') : '0%',
      zIndex: 20,
    }),
    center: {
      x: '0%',
      y: '0%',
      zIndex: 20,
      transition: { duration: 1.4, ease: SPLIT_EASE },
    },
    exit: (direction: number) => ({
      x: isVertical ? (direction > 0 ? '100%' : '-100%') : '0%',
      y: !isVertical ? (direction > 0 ? '100%' : '-100%') : '0%',
      zIndex: 10,
      transition: { duration: 1.4, ease: SPLIT_EASE },
    }),
  });

  const renderSectionContent = (section: typeof SECTIONS[0]) => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: section.color }}>
      {/* Background Pattern / Texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, transparent 0%, black 100%)' 
           }} 
      />
      
      {/* Parallax Background Elements (Visible on larger screens) */}
      <div className="absolute inset-[-10%] hidden md:block mix-blend-overlay">
        <motion.div 
          className="w-full h-full"
          animate={{ x: mousePos.x * -15, y: mousePos.y * -15 }}
          transition={{ type: 'spring', stiffness: 30, damping: 25 }}
          style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, black 100%)' }}
        />
      </div>

      {/* Grid pattern for extra depth */}
      <div className="absolute inset-[-10%] hidden md:block">
        <motion.div 
          className="w-full h-full"
          animate={{ x: mousePos.x * -30, y: mousePos.y * -30 }}
          transition={{ type: 'spring', stiffness: 20, damping: 35 }}
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Mobile fallback background */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay md:hidden" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at center, transparent 0%, black 100%)' 
           }} 
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {section.id === 'home' && (
          <motion.div
            initial={{ y: 30, scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -30, scale: 1.05, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 0.2, ease: CONTENT_EASE }}
          >
            <h1 className="text-[15vw] font-black tracking-tighter mix-blend-overlay text-white opacity-90 select-none leading-none">
              {section.title}
            </h1>
            <p className="text-2xl font-light tracking-widest mt-4 opacity-70">{section.subtitle}</p>
          </motion.div>
        )}
        
        {section.id === 'about' && (
          <motion.div
            initial={{ x: -40, opacity: 0, filter: 'blur(10px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: 40, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 0.2, ease: CONTENT_EASE_SMOOTH }}
          >
            <h1 className="text-[15vw] font-black tracking-tighter mix-blend-overlay text-white opacity-90 select-none leading-none">
              {section.title}
            </h1>
            <p className="text-2xl font-light tracking-widest mt-4 opacity-70">{section.subtitle}</p>
          </motion.div>
        )}

        {section.id === 'work' && (
          <motion.div
            initial={{ y: 40, opacity: 0, rotateX: 15, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
            exit={{ y: -40, opacity: 0, rotateX: -15, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 0.2, ease: CONTENT_EASE }}
            style={{ perspective: 1000 }}
          >
            <h1 className="text-[15vw] font-black tracking-tighter mix-blend-overlay text-white opacity-90 select-none leading-none">
              {section.title}
            </h1>
            <p className="text-2xl font-light tracking-widest mt-4 opacity-70">{section.subtitle}</p>
          </motion.div>
        )}

        {section.id === 'contact' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 0.2, ease: CONTENT_EASE }}
          >
            <h1 className="text-[15vw] font-black tracking-tighter mix-blend-overlay text-white opacity-90 select-none leading-none"
                style={{ letterSpacing: '-0.05em' }}>
              {section.title}
            </h1>
            <p className="text-2xl font-light tracking-widest mt-4 opacity-70">{section.subtitle}</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* Navigation Overlay */}
      <nav className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-bold tracking-tighter">CINEMA</div>
        <div className="flex gap-6">
          {SECTIONS.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(idx)}
              className={`text-sm font-medium tracking-widest transition-opacity duration-500 ${
                idx === currentIndex ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Progress Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mix-blend-difference">
        {SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleNavClick(idx)}
            className="w-2 h-2 rounded-full transition-all duration-500 relative"
          >
            <div 
              className={`absolute inset-0 rounded-full bg-white transition-transform duration-500 ${
                idx === currentIndex ? 'scale-150' : 'scale-100 opacity-40'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Main Content Transitions */}
      <AnimatePresence 
        initial={false} 
        custom={direction}
        onExitComplete={() => setIsAnimating(false)}
      >
        {/* Half 1 (Left or Top) */}
        <motion.div
          key={`half1-${currentIndex}`}
          custom={direction}
          variants={getHalf1Variants(currentIndex % 2 === 0)}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: currentIndex % 2 === 0 ? 'inset(-10% calc(50% - 1px) -10% -10%)' : 'inset(-10% -10% calc(50% - 1px) -10%)' }}
        >
          {renderSectionContent(currentSection)}
        </motion.div>

        {/* Half 2 (Right or Bottom) */}
        <motion.div
          key={`half2-${currentIndex}`}
          custom={direction}
          variants={getHalf2Variants(currentIndex % 2 === 0)}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: currentIndex % 2 === 0 ? 'inset(-10% -10% -10% calc(50% - 1px))' : 'inset(calc(50% - 1px) -10% -10% -10%)' }}
        >
          {renderSectionContent(currentSection)}
        </motion.div>
        
      </AnimatePresence>
    </div>
  );
}
