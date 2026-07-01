/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Utensils, Sparkles, X, Compass, CalendarRange, Clock } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { Experience } from '../types';

interface ExperiencesSectionProps {
  lang: 'en' | 'th';
}

export default function ExperiencesSection({ lang }: ExperiencesSectionProps) {
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);

  // Map icon strings to Lucide icon components
  const iconMap: { [key: string]: any } = {
    Map: Map,
    Utensils: Utensils,
    Sparkles: Sparkles,
  };

  return (
    <section className="py-24 px-6 bg-background" id="experiences">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="label-caps text-accent mb-2 block">
            {lang === 'en' ? 'Trat Ecological Curation' : 'กิจกรรมเชิงอนุรักษ์ธรรมชาติเมืองตราด'}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
            {lang === 'en' ? 'What to Do' : 'กิจกรรมท่องเที่ยว'}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute bottom-0 left-5/12 w-2/12 h-[1px] bg-accent"
            />
          </h2>
          <p className="font-sans font-light text-muted-foreground mt-4 text-sm max-w-md mx-auto">
            {lang === 'en'
              ? "Thoughtfully structured guest services designed to connect you deeply with Trat's rich canals, mangroves, and island pathways."
              : "กิจกรรมท่องเที่ยวที่เราคัดสรรมาอย่างดี เพื่อให้ท่านได้สัมผัสเสน่ห์ลำคลอง ป่าชายเลน และการเดินทางสู่เกาะที่สวยงามของจังหวัดตราดอย่างใกล้ชิด"}
          </p>
        </div>

        {/* Dynamic 3-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="experiences-grid">
          {EXPERIENCES.map((exp) => {
            const IconComponent = iconMap[exp.icon] || Compass;
            const title = lang === 'en' ? exp.title : (exp.titleTh || exp.title);
            const description = lang === 'en' ? exp.description : (exp.descriptionTh || exp.description);

            return (
              <motion.div
                key={exp.id}
                whileHover={{ y: -6 }}
                onClick={() => setActiveExperience(exp)}
                className="bg-surface border border-border p-8 cursor-pointer flex flex-col justify-between h-[280px] hover:border-accent/40 hover:bg-surface-raised transition-all duration-300 relative group"
                id={`exp-card-${exp.id}`}
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-2xl italic font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
                
                <span className="text-[10px] uppercase tracking-widest text-accent font-medium mt-4 block group-hover:translate-x-1.5 transition-transform duration-300">
                  {lang === 'en' ? 'Read Details →' : 'อ่านรายละเอียดเพิ่มเติม →'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide-out or Modal Detail View for Experiences */}
      <AnimatePresence>
        {activeExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveExperience(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slideout Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-surface-raised border-l border-border p-8 md:p-12 z-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
              id="experience-drawer"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveExperience(null)}
                className="absolute top-6 right-6 p-2 text-foreground/60 hover:text-accent transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8 mt-6">
                <div>
                  <span className="label-caps text-accent block mb-2">
                    {lang === 'en' ? 'Guest Curation' : 'กิจกรรมพิเศษสำหรับคุณ'}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl italic text-foreground mb-4">
                    {lang === 'en' ? activeExperience.title : (activeExperience.titleTh || activeExperience.title)}
                  </h3>
                  <p className="font-sans font-light text-sm text-foreground/80 leading-relaxed">
                    {lang === 'en' ? activeExperience.longDescription : (activeExperience.longDescriptionTh || activeExperience.longDescription)}
                  </p>
                </div>

                <div className="space-y-4 font-sans text-xs border-t border-b border-border/50 py-6">
                  <div className="flex items-center gap-3 text-foreground/90">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        {lang === 'en' ? 'Scheduling & Availability' : 'กำหนดเวลาและรอบกิจกรรม'}
                      </h4>
                      <p className="text-muted-foreground text-[11px]">
                        {lang === 'en' ? activeExperience.details : (activeExperience.detailsTh || activeExperience.details)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-foreground/90">
                    <CalendarRange className="w-4 h-4 text-accent shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        {lang === 'en' ? 'Direct Booking Policy' : 'วิธีการสำรองสิทธิ์'}
                      </h4>
                      <p className="text-muted-foreground text-[11px]">
                        {lang === 'en' 
                          ? 'Reservations can be synchronized or scheduled upon check-in with the concierge.'
                          : 'ท่านสามารถแจ้งจองหรือจัดตารางเวลาเรือและทัวร์กับล็อบบี้ขณะเช็คเอาท์/เช็คอินได้โดยตรง'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border/30">
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">
                  {lang === 'en'
                    ? 'Interested in adding this experience? Mention this in the special requests section during checkout, or reply to your confirmation email directly.'
                    : 'สนใจอยากเพิ่มกิจกรรมนำเที่ยวพิเศษนี้ใช่ไหม? ท่านสามารถพิมพ์ระบุลงในช่องแจ้งคำขอพิเศษระหว่างทำการจอง หรือจองผ่านล็อบบี้ขณะเข้าพักได้ตลอดเวลา'}
                </p>
                <button
                  onClick={() => setActiveExperience(null)}
                  className="w-full bg-accent hover:bg-accent/90 text-background font-sans font-semibold text-xs uppercase tracking-widest py-3 transition-colors"
                >
                  {lang === 'en' ? 'Return to Guide' : 'ย้อนกลับไปยังไกด์นำทาง'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
