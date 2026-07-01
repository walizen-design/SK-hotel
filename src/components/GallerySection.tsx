/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GALLERY } from '../data';

interface GallerySectionProps {
  lang: 'en' | 'th';
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="py-24 px-6 bg-background" id="gallery">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="label-caps text-accent mb-2 block">
            {lang === 'en' ? 'Visual Diary' : 'อัลบั้มภาพบันทึกความทรงจำ'}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
            {lang === 'en' ? 'SK Hotel in Detail' : 'เจาะลึกภาพบรรยากาศ SK Hotel'}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
            />
          </h2>
          <p className="font-sans font-light text-muted-foreground mt-4 text-sm max-w-md">
            {lang === 'en'
              ? 'Glimpses of quiet moments, beautiful canals, and tranquil waterfront sunrises.'
              : 'สัมผัสเสี้ยวนาทีแห่งความสงบ วิถีชีวิตคลองธนเจริญ และแสงเช้าแสนอบอุ่นเหนือผืนน้ำเมืองตราด'}
          </p>
        </div>

        {/* 2-column Masonry Grid, 3px Gap, No border radius */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[3px] bg-border/20 p-[3px]"
          id="gallery-grid"
        >
          {GALLERY.map((item) => {
            const title = lang === 'en' ? item.title : (item.titleTh || item.title);
            const category = lang === 'en' ? item.category : (item.categoryTh || item.category);

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative overflow-hidden group cursor-pointer ${
                  item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Overlay 0 -> 0.7 on Hover */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-10" />

                {/* Title Content - Elegant Serif centered or bottom */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="label-caps text-accent text-[9px] tracking-widest mb-1">{category}</span>
                  <h3 className="font-serif text-2xl italic text-foreground">{title}</h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
