/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChefHat } from 'lucide-react';

interface DiningSectionProps {
  lang: 'en' | 'th';
}

export default function DiningSection({ lang }: DiningSectionProps) {
  const chips = lang === 'en' 
    ? ['Traditional Trat Recipes', 'In-Room QR Orders', 'Direct Local Delivery']
    : ['ตำรับอาหารตราดดั้งเดิม', 'สั่งจากห้องพักระบบ QR', 'บริการเดลิเวอรี่ส่งตรงถึงห้อง'];

  return (
    <section className="py-24 px-6 bg-surface-raised" id="dining">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Copywriting & Editorial */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="label-caps text-accent mb-2 block">
              {lang === 'en' ? 'Trat Local Flavors' : 'รสชาติท้องถิ่นเมืองตราด'}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
              {lang === 'en' ? 'Canal-Side QR Dining' : 'สั่งอาหารริมคลองผ่าน QR'}
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
            {lang === 'en' 
              ? '"Order award-winning local crab noodles, legendary Trat massaman curries, and fresh tropical fruits delivered straight to your canalside room."'
              : '"ลิ้มลองก๋วยเตี๋ยวปูกล่องรางวัล มัสมั่นไก่เมืองตราดในตำนาน และผลไม้สดตามฤดูกาล ส่งตรงถึงหน้าห้องพักริมคลองของคุณ"'}
          </blockquote>

          {/* Paragraphs */}
          <div className="font-sans font-light text-muted-foreground text-sm md:text-base space-y-4 leading-relaxed">
            <p>
              {lang === 'en'
                ? "To give you a highly authentic and affordable taste of the province, SK Hotel partners directly with Trat Town’s most celebrated street vendors and generational family kitchens. Scan our in-room QR menu cards to explore legendary local dishes and order fast delivery directly to your door."
                : "เพื่อส่งมอบรสชาติของเมืองตราดที่แท้จริงและราคาเป็นกันเองที่สุด SK Hotel ได้ร่วมมือโดยตรงกับร้านอาหารตามสั่งชื่อดังของชุมชนเมืองตราดและครัวครอบครัวระดับตำนาน เพียงแค่สแกนบัตร QR เมนูภายในห้องพักของคุณเพื่อเลือกอาหารจานเด็ดและรอรับบริการส่งร้อนถึงหน้าห้องพักได้อย่างสะดวกสบาย"}
            </p>
            <p>
              {lang === 'en'
                ? "From breakfast noodle soup to fresh seafood platters plucked straight from the Gulf of Thailand, experience authentic culinary heritage without the premium resort markups. We support the local community by taking zero commission from our restaurant partners."
                : "ตั้งแต่น้ำซุปก๋วยเตี๋ยวร้อนๆ ในมื้อเช้าไปจนถึงซีฟู้ดทะเลสดใหม่ปรุงส่งตรงจากอ่าวไทย สัมผัสประสบการณ์อาหารท้องถิ่นโดยไม่ต้องจ่ายในราคารีสอร์ทพรีเมียมแพงๆ เราไม่มีการเก็บค่าคอมมิชชั่นใดๆ จากผู้ค้าท้องถิ่นเพื่อเป็นการสนับสนุนชุมชนอย่างแท้จริง"}
            </p>
          </div>

          {/* Chef / Team details */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
            {/* Inline chips */}
            <div className="flex flex-wrap gap-2">
              {chips.map((chip, i) => (
                <span key={i} className="px-3 py-1 bg-background border border-border text-[10px] uppercase tracking-wider text-foreground/80">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/35 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left font-sans">
                <h4 className="text-sm font-semibold text-foreground">
                  {lang === 'en' ? 'Maerom & Trat Culinary Partners' : 'แม่รมย์ และผู้ค้าอาหารเมืองตราด'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {lang === 'en' ? 'Authentic street kitchens & waterfront vendors' : 'ร้านสตรีทฟู้ดชื่อดังและแม่ครัวชุมชนริมน้ำ'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Imagery with layered elements */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-accent/5 translate-x-3 translate-y-3 -z-10 border border-accent/20 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 duration-300" />
          <div className="aspect-[4/5] overflow-hidden bg-surface border border-border">
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800"
              alt="Plated traditional Thai food photography"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          <div className="absolute top-4 left-4 bg-background/90 border border-border px-4 py-2 font-sans text-xs">
            <p className="text-[10px] uppercase tracking-wider text-accent font-medium">
              {lang === 'en' ? 'Local Culinary Partner Delivery' : 'พันธมิตรร้านอาหารจัดส่งถึงห้อง'}
            </p>
            <p className="text-muted-foreground text-[10px]">
              {lang === 'en' ? 'Daily 11:00 AM – 10:00 PM' : 'บริการทุกวัน 11:00 น. – 22:00 น.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
