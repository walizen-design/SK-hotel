/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-24 px-6 bg-surface-raised" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="label-caps text-accent mb-2 block">Guest Chronicles</span>
          <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
            Guest Testimonials
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute bottom-0 left-5/12 w-2/12 h-[1px] bg-accent"
            />
          </h2>
        </div>

        {/* Testimonials Grid with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          id="testimonials-grid"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-surface border border-border p-8 flex flex-col justify-between space-y-8"
              id={`testimonial-card-${t.id}`}
            >
              {/* Star Rating Row */}
              <div className="flex items-center space-x-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg italic text-foreground leading-relaxed">
                "{t.quote}"
              </blockquote>

              {/* Author & Room stay info */}
              <div className="border-t border-border/40 pt-4 flex justify-between items-center">
                <span className="font-sans font-medium text-xs text-foreground/90">{t.author}</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground bg-background/50 border border-border px-2 py-1">
                  Stayed in {t.roomType}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
