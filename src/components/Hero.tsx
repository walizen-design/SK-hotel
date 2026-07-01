/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Compass, Camera, Sparkles, Volume2, Waves } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'th';
  onOpenBooking: () => void;
  onScrollToRooms: () => void;
}

export default function Hero({ lang, onOpenBooking, onScrollToRooms }: HeroProps) {
  const t = {
    en: {
      category: "Riverside Guesthouse · Trat Town, Thailand",
      title: "Where Riverside Calm Meets Trat Town Charm",
      desc: "15 comfortable canal-side rooms, interactive eco-tours, and genuine Thai waterfront hospitality that lets you experience Trat like a local.",
      primaryCTA: "Book a stay →",
      secondaryCTA: "Explore our rooms",
      chips: ['15 Rooms', 'Canal / River Views', 'Thai QR Dining Partners', 'Free High-Speed Wi-Fi', 'Trat Town']
    },
    th: {
      category: "ริเวอร์ไซด์ เกสท์เฮ้าส์ · อำเภอเมือง จังหวัดตราด",
      title: "สัมผัสความสุขสงบสุดผ่อนคลายริมแม่น้ำเมืองตราด",
      desc: "ห้องพักริมน้ำบรรยากาศแสนสบาย 15 ห้อง บริการกิจกรรมนำเที่ยวเชิงอนุรักษ์ป่าชายเลนพันปี และบริการอบอุ่นประทับใจที่คุณไม่ควรพลาด",
      primaryCTA: "จองห้องพักตอนนี้เลย →",
      secondaryCTA: "ชมประเภทห้องพัก",
      chips: ['ห้องพักแสนสบาย 15 ห้อง', 'วิวติดริมน้ำลำคลอง', 'สั่งของกินท้องถิ่นระบบ QR', 'ฟรี Wi-Fi ความเร็วสูง', 'ใจกลางชุมชนเมืองตราด']
    }
  };

  const current = t[lang];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background" id="hero-section">
      {/* Background HTML5 Video: Calming beach, ocean, clouds, waves */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none transition-opacity duration-1000"
        poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-calm-beach-with-turquoise-water-and-waves-44161-large.mp4"
          type="video/mp4"
        />
        {/* Fallback image */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920"
          alt="Tranquil Thailand beach ocean clouds waves"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </video>

      {/* Cinematic Dual Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/90" />
      <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />

      {/* Hero Content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Tagline category label */}
          <motion.span
            variants={itemVariants}
            className="label-caps text-accent mb-4 tracking-[0.2em] font-semibold text-xs"
          >
            {current.category}
          </motion.span>

          {/* Large Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-bold text-foreground leading-[1.1] mb-6 max-w-3xl"
          >
            {current.title}
          </motion.h1>

          {/* Descriptive intro paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-sans font-light text-foreground/80 text-sm md:text-base max-w-[640px] leading-relaxed mb-8 text-center"
          >
            {current.desc}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 font-sans"
          >
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300 font-semibold shadow-lg shadow-accent/15"
              id="hero-book-now"
            >
              {current.primaryCTA}
            </button>
            <button
              onClick={onScrollToRooms}
              className="w-full sm:w-auto border border-foreground/30 hover:border-foreground/80 text-foreground text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300 font-medium bg-background/15 backdrop-blur-md"
              id="hero-explore"
            >
              {current.secondaryCTA}
            </button>
          </motion.div>

          {/* Decorative Chips Grid */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-foreground/15 pt-6 w-full max-w-2xl font-sans"
          >
            {current.chips.map((chip, idx) => (
              <span
                key={idx}
                className="text-[10px] uppercase tracking-widest text-foreground/60 font-medium flex items-center gap-1.5"
              >
                <Waves className="w-3.5 h-3.5 text-accent shrink-0" />
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Bottom Visual Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-foreground/40 pointer-events-none z-10">
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-3 bg-accent rounded-full"
        />
      </div>
    </section>
  );
}
