/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChefHat, Compass, Sparkles } from 'lucide-react';

export default function DiningSection() {
  const chips = ['Seasonal Menu', 'Locally Sourced', 'Open to Non-Residents Thu–Sun'];

  return (
    <section className="py-24 px-6 bg-surface-raised" id="dining">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Copywriting & Editorial */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="label-caps text-accent mb-2 block">Cotswold Gastronomy</span>
            <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
              The Restaurant
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
              />
            </h2>
          </div>

          {/* Pull Quote */}
          <blockquote className="font-serif text-2xl md:text-3xl font-light italic text-accent leading-relaxed pl-6 border-l-2 border-accent/40 py-1">
            "Everything on the menu was either grown here, reared locally, or foraged from the surrounding countryside."
          </blockquote>

          {/* Paragraphs */}
          <div className="font-sans font-light text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              Under the creative direction of Head Chef James Cole, our dining room celebrates the rich agricultural tapestry of the Cotswolds. From wild garlic foraged in our woodland to beef reared on adjacent pastures, we cook with a sense of place and deep culinary respect.
            </p>
            <p>
              Each week, Chef Cole and his kitchen team compose a unique, multi-course tasting menu that mirrors the micro-seasons of the valleys. Our farmhouse breakfast is served fresh daily to all residents, while the main dining room opens its doors to non-resident dinners from Thursday evening through Sunday afternoon.
            </p>
          </div>

          {/* Gold Chips list */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {chips.map((chip, idx) => (
              <span
                key={idx}
                className="bg-accent/10 border border-accent/20 text-accent font-sans text-[10px] uppercase tracking-widest px-4 py-1.5 font-medium"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Chef Card Details */}
          <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <ChefHat className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left font-sans">
                <h4 className="text-sm font-semibold text-foreground">James Cole</h4>
                <p className="text-xs text-muted-foreground">Head Chef, former Michelin Star Laureate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-end Food Photography */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-accent/5 translate-x-3 translate-y-3 -z-10 border border-accent/20 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 duration-300" />
          <div className="aspect-[4/5] overflow-hidden bg-surface border border-border">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800"
              alt="Plated gourmet food photography"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          <div className="absolute top-4 left-4 bg-background/90 border border-border px-4 py-2 font-sans text-xs">
            <p className="text-[10px] uppercase tracking-wider text-accent font-medium">Weekly Composed Tasting Menu</p>
            <p className="text-muted-foreground text-[10px]">Changes Sunday evenings</p>
          </div>
        </div>

      </div>
    </section>
  );
}
