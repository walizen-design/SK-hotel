/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToRooms: () => void;
}

export default function Hero({ onOpenBooking, onScrollToRooms }: HeroProps) {
  const chips = ['12 Rooms', 'Dog Friendly', 'Restaurant', 'Free Parking', 'Cotswolds'];

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const chipContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background" id="hero-section">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920"
        alt="The Aldwick exterior dusk"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Cinematic Dual Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(19,24,31,0.7) 0%, rgba(19,24,31,0.1) 35%, rgba(19,24,31,0.1) 60%, rgba(19,24,31,0.92) 100%)',
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center px-6 pb-[8vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl text-center flex flex-col items-center"
        >
          {/* Label Caps */}
          <motion.span
            variants={itemVariants}
            className="label-caps text-accent mb-4 tracking-[0.2em] font-semibold text-xs"
          >
            Boutique Hotel · Cotswolds
          </motion.span>

          {/* Large Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-foreground leading-[0.9] tracking-tight mb-6 text-center select-none"
            style={{ fontSize: 'clamp(48px, 8.5vw, 120px)' }}
          >
            A Place <br />
            <span className="italic text-accent">Unlike Any Other.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-sans font-light text-foreground/80 text-sm md:text-base max-w-[540px] leading-relaxed mb-8 text-center"
          >
            12 individually designed rooms, a restaurant serving seasonal Cotswolds produce, and grounds that change with every season.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-sans font-semibold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors duration-200"
              id="hero-book-btn"
            >
              Book a stay →
            </button>
            <button
              onClick={onScrollToRooms}
              className="w-full sm:w-auto border border-foreground/30 hover:border-foreground/80 text-foreground hover:bg-foreground/5 font-sans font-medium text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-200"
              id="hero-rooms-btn"
            >
              See the rooms
            </button>
          </motion.div>

          {/* Below CTA Chip Row */}
          <motion.div
            variants={chipContainerVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl"
          >
            {chips.map((chip, idx) => (
              <motion.span
                key={idx}
                variants={chipVariants}
                className="bg-accent/10 border border-accent/20 text-accent font-sans text-[10px] uppercase tracking-widest px-4 py-1.5 font-medium whitespace-nowrap"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
