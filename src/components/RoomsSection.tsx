/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, ChevronUp, Maximize, Compass, ShieldCheck } from 'lucide-react';
import { ROOMS } from '../data';

interface RoomsSectionProps {
  lang: 'en' | 'th';
  onSelectRoom: (roomId: string) => void;
}

export default function RoomsSection({ lang, onSelectRoom }: RoomsSectionProps) {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedRoomId === id) {
      setExpandedRoomId(null);
    } else {
      setExpandedRoomId(id);
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-background" id="rooms">
      {/* Header */}
      <div className="mb-16">
        <span className="label-caps text-accent mb-2 block">
          {lang === 'en' ? 'Our Sanctuaries' : 'ห้องพักแสนสบาย'}
        </span>
        <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
          {lang === 'en' ? 'The Rooms' : 'ห้องพักของเรา'}
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
            ? 'Individually curated spaces harmonizing Trat waterfront charm with clean, relaxing comforts.'
            : 'ห้องพักแต่ละประเภทได้รับการจัดเตรียมและตกแต่งอย่างดี ผสมผสานกลิ่นอายริมน้ำตราดเข้ากับความสะอาดและสะดวกสบายแสนผ่อนคลาย'}
        </p>
      </div>

      {/* Full-width hover rows */}
      <div className="border-t border-border flex flex-col">
        {ROOMS.map((room) => {
          const isExpanded = expandedRoomId === room.id;
          const name = lang === 'en' ? room.name : (room.nameTh || room.name);
          const description = lang === 'en' ? room.description : (room.descriptionTh || room.description);
          const longDescription = lang === 'en' ? room.longDescription : (room.longDescriptionTh || room.longDescription);
          const features = lang === 'en' ? room.features : (room.featuresTh || room.features);
          const viewText = lang === 'en' ? room.view : (room.viewTh || room.view);

          return (
            <div key={room.id} className="border-b border-border">
              {/* Row Header */}
              <motion.div
                onClick={() => toggleExpand(room.id)}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 px-4 cursor-pointer transition-colors duration-300 hover:bg-surface-raised"
                whileHover={{ y: -2 }}
                id={`room-row-${room.id}`}
              >
                {/* Left: Name and Basic specs */}
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold italic text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    {name}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-accent md:hidden" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-accent md:hidden" />
                    )}
                  </h3>
                  <p className="font-sans font-light text-xs text-muted-foreground mt-1 group-hover:text-foreground/70 transition-colors">
                    {description}
                  </p>
                </div>

                {/* Center: Long description excerpt on desktop */}
                <div className="hidden lg:block flex-1 max-w-lg px-8">
                  <p className="font-sans font-light text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors">
                    {longDescription}
                  </p>
                </div>

                {/* Right: Price and Action Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                      {lang === 'en' ? 'From' : 'เริ่มต้นที่'}
                    </span>
                    <span className="font-sans text-lg font-semibold text-accent group-hover:scale-105 transition-transform duration-300 inline-block">
                      ฿{room.price} <span className="text-xs font-light text-muted-foreground">{lang === 'en' ? '/ night' : '/ คืน'}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="hidden md:block text-[10px] uppercase tracking-widest text-accent font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {lang === 'en' ? 'Explore Details' : 'รายละเอียดเพิ่มเติม'}
                    </button>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-background transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-accent group-hover:text-background transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Expandable Content Area */}
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden bg-surface"
              >
                <div className="p-6 md:p-10 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left Column: Image with specs overlay */}
                  <div className="relative aspect-[3/2] overflow-hidden group/image">
                    <img
                      src={room.image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                    
                    {/* Size and View Tags */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-4 font-sans text-xs">
                      <div className="bg-background/90 border border-border px-3 py-1.5 flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5 text-accent" />
                        <span>{room.size} {lang === 'en' ? 'Space' : 'พื้นที่'}</span>
                      </div>
                      <div className="bg-background/90 border border-border px-3 py-1.5 flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-accent" />
                        <span>{lang === 'en' ? 'Outlook' : 'วิวภายนอก'}: {viewText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Descriptions & Booking */}
                  <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-serif text-xl italic text-foreground border-b border-border/30 pb-2">
                        {lang === 'en' ? 'Room Characteristics' : 'สิ่งอำนวยความสะดวกและจุดเด่น'}
                      </h4>
                      <p className="font-sans font-light text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {longDescription}
                      </p>
                      
                      {/* Features List */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-foreground/80 font-sans">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book This Room shortcuts */}
                    <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        <div className="text-left font-sans">
                          <p className="text-xs font-medium text-foreground">
                            {lang === 'en' ? 'Best Rate Direct Guarantee' : 'รับประกันจองตรงราคาประหยัดและดีที่สุด'}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {lang === 'en'
                              ? 'Complimentary local tea and water bottles included.'
                              : 'ฟรี บริการน้ำดื่มและบริการชากาแฟท้องถิ่นครบครัน'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectRoom(room.id)}
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-sans font-semibold text-xs uppercase tracking-widest px-6 py-3 transition-colors"
                        id={`book-room-btn-${room.id}`}
                      >
                        {lang === 'en' ? `Reserve ${room.name} →` : `จองห้อง${name} →`}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
