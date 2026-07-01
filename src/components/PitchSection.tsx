/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Languages, 
  TrendingUp, 
  QrCode, 
  Compass, 
  Coins, 
  MapPin, 
  Smartphone, 
  Award, 
  Percent,
  Sparkles,
  ChevronRight,
  Anchor,
  ChefHat,
  Camera,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function PitchSection() {
  const [lang, setLang] = useState<'en' | 'th'>('th'); // Default to Thai as requested for the Owner pitch, with easy toggle
  
  // Interactive Calculator States tailored specifically for SK Hotel (300 - 500 Baht room rate, currently low occupancy)
  const [rooms, setRooms] = useState<number>(15); // Total rooms at SK Hotel
  const [currentOccupancy, setCurrentOccupancy] = useState<number>(25); // Baseline walk-in occupancy rate %
  const [currentRoomRate, setCurrentRoomRate] = useState<number>(350); // Baht per night for simple walk-ins (300 to 500)
  
  const [futureOccupancy, setFutureOccupancy] = useState<number>(70); // Occupancy rate % with modern website & SEO
  const [futureRoomRate, setFutureRoomRate] = useState<number>(450); // Baht per night from premium online/foreign guests (300 to 500)

  const [dailyFoodOrders, setDailyFoodOrders] = useState<number>(1.0); // Avg food delivery orders per occupied room per day
  const [foodCommission, setFoodCommission] = useState<number>(40); // Commission per food order (THB)
  const [monthlyTours, setMonthlyTours] = useState<number>(40); // Number of local tours/ferry tickets sold per month
  const [tourCommission, setTourCommission] = useState<number>(150); // Commission per tour/ferry ticket (THB)

  // Calculations
  const currentMonthlyRoomRevenue = Math.round(rooms * 30 * (currentOccupancy / 100) * currentRoomRate);
  const futureMonthlyRoomRevenue = Math.round(rooms * 30 * (futureOccupancy / 100) * futureRoomRate);
  
  // Food Delivery Commission
  const occupiedRoomsPerNight = Math.round((rooms * futureOccupancy) / 100);
  const monthlyOccupiedRoomNights = occupiedRoomsPerNight * 30;
  const monthlyFoodOrders = Math.round(monthlyOccupiedRoomNights * dailyFoodOrders);
  const monthlyFoodRevenue = monthlyFoodOrders * foodCommission;
  
  // Tour/Ticket Commission
  const monthlyTourRevenue = monthlyTours * tourCommission;
  
  // Totals
  const totalFutureMonthlyIncome = futureMonthlyRoomRevenue + monthlyFoodRevenue + monthlyTourRevenue;
  const netMonthlyIncrease = totalFutureMonthlyIncome - currentMonthlyRoomRevenue;
  const netAnnualIncrease = netMonthlyIncrease * 12;

  // Currency Formatter
  const formatTHB = (num: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(num);
  };

  const tratImages = [
    {
      title: "Ban Tha Ranae Mangrove Forest",
      titleTh: "ป่าชายเลนบ้านท่าระแนะ",
      desc: "An ancient, labyrinthine mangrove canopy where tourists enjoy peaceful longtail boat tours.",
      descTh: "มหัศจรรย์ป่าชายเลนพันปีลานตะบูน แหล่งท่องเที่ยวเชิงอนุรักษ์อันเลื่องชื่อของตราด",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
      tag: "Nature Tour"
    },
    {
      title: "Koh Chang Ferry Connections",
      titleTh: "เรือเฟอร์รี่ข้ามฟากเกาะช้าง",
      desc: "Essential transit serving thousands of international travelers visiting Trat's famous archipelago daily.",
      descTh: "บริการจองตั๋วเรือเฟอร์รี่ล่วงหน้า เพิ่มความสะดวกสบายสูงสุดให้ผู้เข้าพัก",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800",
      tag: "Transit"
    },
    {
      title: "Pristine Sands of Koh Chang",
      titleTh: "ชายหาดเกาะช้างที่เงียบสงบ",
      desc: "White sands and crystal-clear waters that draw high-value European and Asian holidaymakers.",
      descTh: "หาดทรายขาวละเอียดและน้ำทะเลสีครามที่ดึงดูดนักท่องเที่ยวระดับพรีเมียมจากทั่วโลก",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
      tag: "Paradise"
    }
  ];

  const pitchEn = {
    greeting: "Dear Owner,",
    p1: "Currently, SK Hotel relies heavily on walk-in guests, which means you are missing out on the high-spending international tourists. Foreigners plan their trips online months in advance. By building you a modern, multi-language website, we will put SK Hotel directly in front of travelers from Europe and Asia on Google.",
    p2: "But the website will do more than just book rooms—it will act as a digital concierge to make you extra money. We will place digital QR-code menus in every room. Instead of running an expensive kitchen, guests can order delivery from local restaurants right from their phones, and your hotel will take a commission cut from every order.",
    p3: "We will also sell local activities directly on the website, like boat tours to the Ban Tha Ranae mangroves or ferry tickets to Koh Chang. You earn a cut of the tours, your guests get a premium experience, and SK Hotel becomes a highly profitable, modern destination.",
    author: "Digital Growth Strategy Team for SK Hotel"
  };

  const pitchTh = {
    greeting: "เรียน ท่านเจ้าของกิจการ SK Hotel ครับ",
    p1: "ปัจจุบันการพึ่งพาลูกค้าวอล์คอิน (Walk-in) อาจทำให้เราพลาดโอกาสจากกลุ่มนักท่องเที่ยวต่างชาติที่มีกำลังซื้อสูงครับ เนื่องจากชาวต่างชาติมักจะวางแผนและจองที่พักผ่านอินเทอร์เน็ตล่วงหน้าหลายเดือน ผมจึงขอเสนอการจัดทำเว็บไซต์ที่รองรับหลายภาษาและระบบ SEO เพื่อให้ชาวต่างชาติค้นพบ SK Hotel เป็นอันดับแรกๆ บน Google",
    p2: "นอกจากนี้ เว็บไซต์จะไม่ได้เป็นแค่ช่องทางจองห้องพัก แต่จะเป็นเครื่องมือเพิ่มรายได้ (Digital Revenue) ให้กับท่านด้วยครับ เราจะทำระบบ 'ดิจิทัลเมนู' ผ่าน QR Code ในทุกห้องพัก แทนที่โรงแรมจะต้องลงทุนจ้างแม่ครัวหรือเปิดครัวตลอดเวลา ลูกค้าสามารถสั่งอาหารจากร้านอร่อยในท้องถิ่นให้มาส่งถึงที่ผ่านมือถือได้เลย โดยทางโรงแรมจะได้รับส่วนแบ่ง (Commission) จากทุกออเดอร์",
    p3: "อีกทั้งเรายังสามารถเพิ่มระบบจองทัวร์และกิจกรรมบนเว็บไซต์ เช่น ทัวร์นั่งเรือชมป่าชายเลนบ้านท่าระแนะ หรือตั๋วเรือข้ามไปเกาะช้าง ซึ่งโรงแรมก็จะได้ส่วนแบ่งกำไรจากการขายกิจกรรมเหล่านี้ด้วย ระบบเทคโนโลยีนี้จะช่วยยกระดับการบริการและเพิ่มรายได้ให้ SK Hotel อย่างยั่งยืนครับ",
    author: "ทีมวางแผนกลยุทธ์การเติบโตดิจิทัลของ SK Hotel"
  };

  return (
    <section className="py-24 px-6 bg-surface border-t border-b border-border/80 relative overflow-hidden" id="owner-pitch">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Pitch Headline with Language Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="label-caps text-accent mb-2 block">Executive Proposal</span>
            <h2 className="font-serif text-3xl md:text-5xl italic font-bold text-foreground">
              {lang === 'en' ? "SK Hotel's Digital Transformation" : "การปฏิรูปดิจิทัลเพื่อเพิ่มรายได้ของ SK Hotel"}
            </h2>
            <p className="font-sans font-light text-muted-foreground mt-2 text-xs md:text-sm max-w-xl">
              {lang === 'en' 
                ? "A tailored strategy to capture high-value global tourists, eliminate kitchen overheads, and monetize local tours automatically."
                : "กลยุทธ์ปรับปรุงประสิทธิภาพเพื่อเข้าถึงกลุ่มลูกค้านานาชาติที่มีกำลังซื้อสูง ลดต้นทุนครัว และสร้างรายได้จากกิจกรรมการท่องเที่ยวโดยอัตโนมัติ"
              }
            </p>
          </div>

          {/* Elegant Language Switcher */}
          <div className="flex items-center gap-2 bg-surface-raised border border-border p-1">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-widest transition-all ${
                lang === 'en' ? 'bg-accent text-background' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('th')}
              className={`px-4 py-1.5 text-[10px] font-sans font-semibold uppercase tracking-widest transition-all ${
                lang === 'th' ? 'bg-accent text-background' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              ภาษาไทย
            </button>
          </div>
        </div>

        {/* Dynamic Presentation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Left Column: The Interactive Pitch Board */}
          <div className="lg:col-span-7 bg-surface-raised border border-border p-8 md:p-12 flex flex-col justify-between space-y-8 relative">
            {/* Slide Border Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
            
            <div className="space-y-6">
              <span className="font-serif italic text-accent text-lg">
                {lang === 'en' ? pitchEn.greeting : pitchTh.greeting}
              </span>
              
              <div className="space-y-4 font-sans font-light text-sm text-foreground/90 leading-relaxed">
                <p className="border-l border-accent/20 pl-4">
                  {lang === 'en' ? pitchEn.p1 : pitchTh.p1}
                </p>
                <p className="border-l border-accent/20 pl-4">
                  {lang === 'en' ? pitchEn.p2 : pitchTh.p2}
                </p>
                <p className="border-l border-accent/20 pl-4">
                  {lang === 'en' ? pitchEn.p3 : pitchTh.p3}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/40 flex items-center justify-between text-xs font-sans text-muted-foreground">
              <span>{lang === 'en' ? "Business Case Deck" : "เอกสารข้อเสนอทางธุรกิจ"}</span>
              <span className="text-accent font-medium">{lang === 'en' ? pitchEn.author : pitchTh.author}</span>
            </div>
          </div>

          {/* Right Column: Key Pillars Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-surface border border-border p-6 hover:border-accent/40 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg italic font-medium text-foreground mb-1">
                    {lang === 'en' ? "Global Visibility (SEO)" : "สร้างตัวตนบน Google ระดับสากล (SEO)"}
                  </h3>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {lang === 'en'
                      ? "Establish high ranking searches in multiple languages, allowing clients from Europe and Asia to discover SK Hotel months before boarding."
                      : "ติดหน้าแรกในการค้นหาหลากหลายภาษา ช่วยให้กลุ่มผู้มีกำลังซื้อจากยุโรปและเอเชียพบเจอก่อนออกเดินทางล่วงหน้าหลายเดือน"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface border border-border p-6 hover:border-accent/40 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg italic font-medium text-foreground mb-1">
                    {lang === 'en' ? "In-Room QR Code Concierge" : "ระบบสั่งอาหารดิจิทัล QR Code ในห้องพัก"}
                  </h3>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {lang === 'en'
                      ? "Replace expensive kitchen staff. Guests order delivery from top rated local Trat restaurants via smartphones. Your hotel secures passive commission cuts."
                      : "ลดภาระค่าใช้จ่ายในการเปิดครัวและจ้างแม่ครัว ให้ลูกค้าสั่งเดลิเวอรี่จากร้านอาหารท้องถิ่นในตราดด้วยมือถือ โรงแรมรับส่วนแบ่งค่าอาหารทันที"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface border border-border p-6 hover:border-accent/40 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg italic font-medium text-foreground mb-1">
                    {lang === 'en' ? "Monetized Local Activities" : "เพิ่มรายได้จากทัวร์และตั๋วพรีเมียม"}
                  </h3>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {lang === 'en'
                      ? "Automatically sell premium local packages like boat trips to Ban Tha Ranae mangroves and ferry tickets to Koh Chang. Secure a cut of every ticket sold."
                      : "เป็นตัวแทนจองทัวร์ล่องเรือลานตะบูนบ้านท่าระแนะ หรือตั๋วเรือข้ามฟากไปเกาะช้างโดยอัตโนมัติ โรงแรมหักเปอร์เซ็นต์กำไรโดยไม่ต้องเหนื่อย"
                    }
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* INTERACTIVE COMMISSION CALCULATOR (Tailored to realistic 300-500 Baht pricing) */}
        <div className="bg-surface-raised border border-border p-8 md:p-12 mb-16 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-border/50 gap-4">
            <div>
              <span className="label-caps text-accent mb-1 block">Realistic Profit Forecast</span>
              <h3 className="font-serif text-2xl italic text-foreground">
                {lang === 'en' ? "SK Hotel Guesthouse Profitability Model" : "โมเดลคาดการณ์รายได้ตามจริงสำหรับ SK Hotel"}
              </h3>
              <p className="font-sans font-light text-xs text-muted-foreground mt-1">
                {lang === 'en'
                  ? "Based on your actual room rates (300 - 500 Baht per night). See how capturing international tourists boosts overall profit."
                  : "คำนวณตามราคาห้องพักจริงของท่าน (300 - 500 บาทต่อคืน) เพื่อแสดงให้เห็นผลต่างกำไรเมื่อมีระบบเว็บจองล่วงหน้า"
                }
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/20 px-3 py-1 text-xs text-accent font-sans font-medium">
              {lang === 'en' ? "Interactive Simulator" : "เครื่องมือจำลองผลตอบแทน"}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Input Sliders */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Hotel Setup variables */}
              <div className="space-y-4">
                <h4 className="font-serif text-base italic text-accent font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {lang === 'en' ? "1. Current Guesthouse Baseline (Reaching only Walk-ins)" : "1. ข้อมูลฐานเดิมของเกสท์เฮ้าส์ (พึ่งพาลูกค้า Walk-in เท่านั้น)"}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Total Rooms" : "จำนวนห้องพักทั้งหมด"}</span>
                      <span className="text-foreground font-semibold">{rooms} {lang === 'en' ? "Rooms" : "ห้อง"}</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={35}
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Current Walk-in Rate" : "ราคาห้อง Walk-in ปัจจุบัน"}</span>
                      <span className="text-foreground font-semibold">{currentRoomRate} B</span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={500}
                      step={50}
                      value={currentRoomRate}
                      onChange={(e) => setCurrentRoomRate(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Current Occupancy" : "อัตราการเข้าพักเดิม"}</span>
                      <span className="text-foreground font-semibold">{currentOccupancy}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={currentOccupancy}
                      onChange={(e) => setCurrentOccupancy(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>

                <div className="bg-surface p-3 border border-border/60 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground mr-1">
                    {lang === 'en' ? "Current Monthly Revenue:" : "รายได้ห้องพักปัจจุบัน:"}
                  </span>
                  <span className="text-foreground font-mono">{formatTHB(currentMonthlyRoomRevenue)} / {lang === 'en' ? "month" : "เดือน"}</span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5">
                    {lang === 'en' 
                      ? "* Standard walk-ins without online booking rely on busy weekends and local transit flow, leaving rooms empty on weekdays."
                      : "* การไม่มีชื่อบนระบบออนไลน์ทำให้ขาดโอกาสได้ลูกค้าในวันธรรมดา และจำกัดอยู่แค่ราคาประหยัดที่สุดสำหรับผู้ที่ผ่านไปมา"
                    }
                  </span>
                </div>
              </div>

              {/* Future digital growth variables */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <h4 className="font-serif text-base italic text-accent font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {lang === 'en' ? "2. Digital Performance (Reaching International Tourists)" : "2. ผลลัพธ์หลังปฏิรูปดิจิทัล (เข้าถึงกลุ่มนักท่องเที่ยวต่างชาติ)"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Projected Occupancy" : "อัตราเข้าพักเป้าหมาย (ต่างชาติ + จองล่วงหน้า)"}</span>
                      <span className="text-foreground font-semibold text-accent">{futureOccupancy}%</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={90}
                      step={5}
                      value={futureOccupancy}
                      onChange={(e) => setFutureOccupancy(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Target Direct Booking Rate" : "ราคาห้องจองออนไลน์ต่างชาติ"}</span>
                      <span className="text-foreground font-semibold text-accent">{futureRoomRate} B</span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={500}
                      step={20}
                      value={futureRoomRate}
                      onChange={(e) => setFutureRoomRate(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>
              </div>

              {/* In-Room Services variables */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <h4 className="font-serif text-base italic text-accent font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {lang === 'en' ? "3. Secondary Digital Concierge Streams" : "3. ช่องทางทำกำไรแบบพาสซีฟผ่านบริการเสริมบนหน้าเว็บ"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Local Food Commissions (Orders/Day)" : "จํานวนออเดอร์ส่งอาหาร / ห้อง / วัน"}</span>
                      <span className="text-foreground font-semibold">{dailyFoodOrders} {lang === 'en' ? "Orders" : "ครั้ง"}</span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={2.0}
                      step={0.1}
                      value={dailyFoodOrders}
                      onChange={(e) => setDailyFoodOrders(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-sans mb-1.5">
                      <span className="text-muted-foreground">{lang === 'en' ? "Tours & Ferry Bookings / Month" : "จองทัวร์ลานตะบูน & ตั๋วเรือเกาะช้าง / เดือน"}</span>
                      <span className="text-foreground font-semibold">{monthlyTours} {lang === 'en' ? "Tickets" : "ใบ"}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={5}
                      value={monthlyTours}
                      onChange={(e) => setMonthlyTours(Number(e.target.value))}
                      className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Projected Return card */}
            <div className="lg:col-span-5 bg-surface border border-accent/20 p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <span className="label-caps text-accent text-[9px] tracking-wider block">Est. Revenue Comparison</span>
                
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lang === 'en' ? "Current Monthly Baseline" : "รายได้รวมปัจจุบันเฉลี่ยต่อเดือน"}</p>
                  <p className="text-lg font-sans font-medium text-foreground/70">{formatTHB(currentMonthlyRoomRevenue)}</p>
                </div>

                <div className="space-y-1 border-t border-border/40 pt-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lang === 'en' ? "New Projected Monthly Total" : "เป้าหมายรายได้ใหม่ต่อเดือน"}</p>
                  <p className="text-3xl font-sans font-bold text-accent">{formatTHB(totalFutureMonthlyIncome)}</p>
                </div>

                <div className="space-y-1 border-t border-border/40 pt-3 bg-accent/5 -mx-6 px-6 py-3 border-b">
                  <p className="text-[10px] text-accent uppercase tracking-widest font-semibold">{lang === 'en' ? "Net Added Monthly Profit" : "กำไรสุทธิที่เพิ่มขึ้นต่อเดือน"}</p>
                  <p className="text-2xl font-sans font-bold text-accent">{formatTHB(netMonthlyIncrease)}</p>
                  <p className="text-[10px] text-muted-foreground">{lang === 'en' ? "Extra profit compared to standard walk-ins" : "รายได้ส่วนต่างเพิ่มขึ้นจากการใช้ระบบดิจิทัล"}</p>
                </div>

                <div className="space-y-1 pt-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lang === 'en' ? "Net Added Yearly Profit" : "กำไรสุทธิส่วนเพิ่มที่จะได้รับต่อปี"}</p>
                  <p className="text-xl font-sans font-semibold text-foreground">{formatTHB(netAnnualIncrease)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="bg-surface-raised p-3 border border-border text-[10px] text-muted-foreground leading-normal space-y-1.5">
                  <div className="flex justify-between text-foreground">
                    <span>{lang === 'en' ? "New Room Revenue:" : "รายได้ห้องพักรวมใหม่:"}</span>
                    <span className="font-semibold text-foreground">{formatTHB(futureMonthlyRoomRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>{lang === 'en' ? "In-Room Food Delivery Cuts:" : "ส่วนแบ่งอาหารเดลิเวอรี่:"}</span>
                    <span className="font-semibold text-accent">{formatTHB(monthlyFoodRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>{lang === 'en' ? "Trat Tours Commissions:" : "ส่วนแบ่งจองทัวร์ลานตะบูน/เรือ:"}</span>
                    <span className="font-semibold text-accent">{formatTHB(monthlyTourRevenue)}</span>
                  </div>
                </div>

                <p className="text-[9px] text-muted-foreground leading-tight italic">
                  * {lang === 'en' 
                    ? "Allows you to easily lift occupancy to 70% or more by becoming discoverable by European and Asian tourists searching Google for Trat."
                    : "ช่วยแก้ปัญหาไม่มีกลุ่มจองล่วงหน้าได้อย่างถาวร โดยการเปลี่ยนเป็นจุดหมายปลายทางยอดนิยมของต่างชาติบนกูเกิล"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING PLANS & CAVIAT WITH PROFESSIONAL PHOTOGRAPHY DISCOUNT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start" id="pricing-plans">
          
          {/* Left Column: Build Cost Breakdowns */}
          <div className="lg:col-span-7 bg-surface-raised border border-border p-8 md:p-12 space-y-8 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
            
            <div>
              <span className="label-caps text-accent mb-1 block">Project Cost Breakdown</span>
              <h3 className="font-serif text-2xl md:text-3xl italic font-bold text-foreground">
                {lang === 'en' ? "Standard Implementation Fee" : "รายละเอียดค่าบริการมาตรฐาน"}
              </h3>
              <p className="font-sans font-light text-xs text-muted-foreground mt-1">
                {lang === 'en' 
                  ? "Standard investment for a premium, custom-coded multilingual hotel & booking web platform." 
                  : "ราคาประมาณการโครงการปกติในการพัฒนาเว็บไซต์ภาษาคู่และระบบจัดการพรีเมียม"
                }
              </p>
            </div>

            <div className="space-y-4 font-sans text-xs">
              {/* Feature 1 */}
              <div className="flex justify-between items-start pb-4 border-b border-border/40 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{lang === 'en' ? "Multilingual (EN/TH) Web Platform" : "พัฒนาเว็บไซต์และแพลตฟอร์มสองภาษา (อังกฤษ/ไทย)"}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {lang === 'en' 
                      ? "Custom-designed elegant presentation pages, responsive on mobile & tablet, optimized for fast loading speed."
                      : "การออกแบบหน้าเว็บอย่างพิถีพิถันเพื่อภาพลักษณ์ที่หรูหรา รองรับการใช้งานมือถือ และรวดเร็วสูงสุด"
                    }
                  </p>
                </div>
                <span className="font-mono text-foreground font-semibold shrink-0">15,000 B</span>
              </div>

              {/* Feature 2 */}
              <div className="flex justify-between items-start pb-4 border-b border-border/40 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{lang === 'en' ? "Google SEO & International Discovery" : "การเพิ่มประสิทธิผลการค้นหาบน Google (SEO ต่างชาติ)"}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {lang === 'en' 
                      ? "Targeting European & Asian travelers searching for guesthouses/hotels in Trat and Koh Chang ferry bookings."
                      : "เจาะกลุ่มเป้าหมายนักท่องเที่ยวชาวต่างชาติที่ต้องการหาโรงแรมขนาดเล็กในตราด หรือต้องการจองตั๋วเรือล่วงหน้า"
                    }
                  </p>
                </div>
                <span className="font-mono text-foreground font-semibold shrink-0">10,000 B</span>
              </div>

              {/* Feature 3 */}
              <div className="flex justify-between items-start pb-4 border-b border-border/40 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{lang === 'en' ? "In-Room QR Concierge & Menu Setup" : "การติดตั้งระบบ QR Menu ประจำห้องพัก"}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {lang === 'en' 
                      ? "Setup and formatting of digital menus linked to local restaurants. Direct food delivery commission workflow."
                      : "จัดเตรียมรูปเล่มเมนูดิจิทัลและ QR เมนูสำหรับแขก เชื่อมโยงร้านค้าท้องถิ่นตราดเพื่อรับคอมมิชชั่นแบบพาสซีฟ"
                    }
                  </p>
                </div>
                <span className="font-mono text-foreground font-semibold shrink-0">12,000 B</span>
              </div>

              {/* Feature 4 */}
              <div className="flex justify-between items-start pb-4 border-b border-border/40 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{lang === 'en' ? "Direct Bookings & Reservation Automation" : "ระบบรับคำขอจองห้องพักและทัวร์ลานตะบูน"}</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {lang === 'en' 
                      ? "Seamless mobile friendly contact and direct booking inquiry pipeline to bypass Agoda/Booking 15% fee."
                      : "ระบบส่งแบบฟอร์มตรวจสอบห้องว่างและจองทัวร์เรือ/ตั๋วเรือล่วงหน้าโดยตรงเพื่อเลี่ยงค่าธรรมเนียมเอเย่นต์"
                    }
                  </p>
                </div>
                <span className="font-mono text-foreground font-semibold shrink-0">8,000 B</span>
              </div>

              {/* Standard Total */}
              <div className="flex justify-between items-center pt-2 font-mono text-sm">
                <span className="font-bold uppercase tracking-widest text-muted-foreground">{lang === 'en' ? "Total Regular Cost" : "ราคาประเมินโครงการปกติรวม"}</span>
                <span className="font-bold text-foreground line-through decoration-red-500/80 decoration-2 text-lg">45,000 B</span>
              </div>
            </div>

          </div>

          {/* Right Column: Special Partnership Discount with Photography Caveat */}
          <div className="lg:col-span-5 bg-surface border border-accent p-8 relative overflow-hidden flex flex-col justify-between h-full space-y-6">
            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent" />
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-accent/10 rounded-full blur-xl" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-accent text-background text-[9px] tracking-widest uppercase px-2.5 py-1 font-bold font-sans">
                  {lang === 'en' ? "Partnership Offer" : "ข้อเสนอพิเศษพันธมิตร"}
                </span>
                <span className="text-accent text-[11px] font-semibold flex items-center gap-1 font-sans">
                  <Camera className="w-3 h-3" />
                  {lang === 'en' ? "Photography Deal" : "ถ่ายภาพพรีเมียมเพื่อโปรโมท"}
                </span>
              </div>

              <h3 className="font-serif text-2xl italic font-bold text-foreground leading-tight">
                {lang === 'en' ? "The Photography Caveat & Special Discount" : "เงื่อนไขพิเศษและส่วนลดถ่ายภาพโปรโมท"}
              </h3>

              <div className="space-y-3 font-sans font-light text-xs text-muted-foreground leading-relaxed">
                <p className="text-foreground/90 font-medium bg-accent/5 p-3 border border-accent/20">
                  {lang === 'en'
                    ? "🚨 Caveat: SK Hotel currently has no high-quality photos online, and very few Google ratings. No matter how beautiful the website is, travelers will not book if they cannot see attractive, clear photos."
                    : "🚨 ปัญหาสำคัญ: ปัจจุบัน SK Hotel ไม่มีภาพประกอบที่ดึงดูดสายตาบนออนไลน์ และยังไม่มีคะแนนรีวิวบนกูเกิล ซึ่งการไม่มีภาพถ่ายที่สวยงามจะเป็นอุปสรรคสำคัญในการทำให้ลูกค้าต่างชาติตัดสินใจจองพัก"
                  }
                </p>
                <p>
                  {lang === 'en'
                    ? "Because we must solve this first, we propose a partnership: We will conduct an on-site professional photoshoot of your guesthouse, your rooms, and nearby scenery. In exchange for adding this content to the portfolio, we will grant an incredible direct discount!"
                    : "เนื่องจากเราจำเป็นต้องสร้างความประทับใจตั้งแต่แรกเห็น เราจึงขอเสนอโปรแกรมพันธมิตร: เราจะเดินทางไปถ่ายภาพโปรโมทระดับพรีเมียมให้โรงแรมของท่านถึงจังหวัดตราด ทั้งภาพห้องพัก มุมสวยงาม และทิวทัศน์ใกล้เคียง เพื่อนำไปอัปโหลดลงบน Google Maps, หน้าเว็บ และ Booking.com"
                  }
                </p>
              </div>
            </div>

            <div className="border-t border-border/60 pt-4 space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lang === 'en' ? "Special Partner Cost" : "ราคาพิเศษสำหรับพันธมิตรรวมถ่ายภาพ"}</p>
                  <p className="text-4xl font-sans font-bold text-accent">18,500 B</p>
                </div>
                <div className="text-right text-[10px] text-muted-foreground leading-none">
                  <span className="block line-through text-foreground/50 mb-1">45,000 B</span>
                  <span className="text-accent font-semibold">{lang === 'en' ? "You Save 26,500 B" : "ประหยัดทันที 26,500 บาท!"}</span>
                </div>
              </div>

              <div className="bg-accent/5 p-3 border border-accent/10 rounded text-[11px] font-sans text-foreground/80 space-y-1">
                <p className="font-semibold text-accent">{lang === 'en' ? "What is included in the 18,500 THB:" : "สิ่งที่ท่านจะได้รับในราคา 18,500 บาท:"}</p>
                <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[10px]">
                  <li>{lang === 'en' ? "Full Web Build + English & Thai Translation" : "ระบบเว็บไซต์สมบูรณ์แบบ รองรับสองภาษาอังกฤษ-ไทย"}</li>
                  <li>{lang === 'en' ? "On-site Professional Photoshoot in Trat" : "บริการถ่ายภาพโปรโมทระดับพรีเมียมในจังหวัดตราดฟรี"}</li>
                  <li>{lang === 'en' ? "Google Business Profile optimization (SEO)" : "ปรับปรุงและตกแต่งหมุดร้านบน Google Maps เพื่อเพิ่มคะแนนความน่าเชื่อถือ"}</li>
                  <li>{lang === 'en' ? "QR-code custom menus for all 15 rooms" : "การสร้าง QR-code เมนูดิจิทัลสำหรับทุกห้องพักเพื่อทำกำไรเสริม"}</li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* PROJECT TIMELINE (3 Weeks plan) */}
        <div className="bg-surface-raised border border-border p-8 md:p-12 mb-16" id="project-timeline">
          <div className="mb-8">
            <span className="label-caps text-accent mb-1 block">Implementation Roadmap</span>
            <h3 className="font-serif text-2xl italic font-bold text-foreground">
              {lang === 'en' ? "Project Timeline: Launch in 3 Weeks" : "แผนดำเนินงานด่วน: พร้อมเปิดตัวใน 3 สัปดาห์"}
            </h3>
            <p className="font-sans font-light text-muted-foreground mt-1 text-xs">
              {lang === 'en'
                ? "A fast, structured phase to modernise your guest house and start capturing online bookings."
                : "ขั้นตอนการสร้างและปรับโครงสร้างที่รวดเร็วเพื่อเปลี่ยนโรงแรมให้ทันสมัยพร้อมรับลูกค้าจองล่วงหน้า"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Week 1 */}
            <div className="bg-surface border border-border/80 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent border-b border-l border-border/40">
                W1
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-lg italic text-foreground font-medium">
                  {lang === 'en' ? "Week 1: Foundations" : "สัปดาห์ที่ 1: วางรากฐานและระบบ"}
                </h4>
              </div>
              <ul className="font-sans text-[11px] text-muted-foreground space-y-2 list-disc list-inside">
                <li>{lang === 'en' ? "Multilingual database setup" : "สร้างโครงสร้างฐานข้อมูลและแปลข้อมูลอังกฤษ-ไทย"}</li>
                <li>{lang === 'en' ? "Search Engine Optimization (SEO) setup" : "กำหนดคีย์เวิร์ดการค้นหาเจาะจง จ.ตราด และเกาะช้าง"}</li>
                <li>{lang === 'en' ? "Draft website architecture" : "วางหน้าดีไซน์เว็บไซต์สำหรับการจองพักโดยตรง"}</li>
              </ul>
            </div>

            {/* Week 2 */}
            <div className="bg-surface border border-border/80 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent border-b border-l border-border/40">
                W2
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-lg italic text-foreground font-medium">
                  {lang === 'en' ? "Week 2: Digital Concierge" : "สัปดาห์ที่ 2: ระบบสั่งอาหาร & ทัวร์"}
                </h4>
              </div>
              <ul className="font-sans text-[11px] text-muted-foreground space-y-2 list-disc list-inside">
                <li>{lang === 'en' ? "Integrate local Trat restaurant menu" : "จัดระบบสั่งเดลิเวอรี่และสร้างใบ QR Code"}</li>
                <li>{lang === 'en' ? "Local tour booking integration" : "เชื่อมระบบกิจกรรมจองเรือลานตะบูนบ้านท่าระแนะ"}</li>
                <li>{lang === 'en' ? "Interactive room reservation forms" : "ติดตั้งระบบแบบฟอร์มตรวจสอบสถานะห้องว่างล่วงหน้า"}</li>
              </ul>
            </div>

            {/* Week 3 */}
            <div className="bg-surface border border-accent/30 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-background px-3 py-1 font-mono text-xs font-semibold border-b border-l border-accent">
                LAUNCH
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent animate-pulse">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif text-lg italic text-foreground font-medium">
                  {lang === 'en' ? "Week 3: Photoshoot & Launch" : "สัปดาห์ที่ 3: ถ่ายภาพและเปิดระบบ"}
                </h4>
              </div>
              <ul className="font-sans text-[11px] text-muted-foreground space-y-2 list-disc list-inside">
                <li>{lang === 'en' ? "Professional photoshoot session in Trat" : "บริการถ่ายภาพห้องพักและภาพรวมเกสท์เฮ้าส์แบบพรีเมียม"}</li>
                <li>{lang === 'en' ? "Upload photos to Google Maps & Agoda" : "อัปโหลดภาพลงระบบกูเกิลแมป เพื่อดันคะแนนรีวิวทันที"}</li>
                <li>{lang === 'en' ? "Full public release of the booking platform" : "เปิดบริการเว็บไซต์สู่สาธารณะและส่งมอบ QR Code ประจำห้อง"}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BEAUTIFUL IMAGES OF TRAT, THAILAND */}
        <div>
          <div className="mb-8">
            <span className="label-caps text-accent mb-2 block">Destination Showcase</span>
            <h3 className="font-serif text-2xl italic font-bold text-foreground">
              {lang === 'en' ? "Visualizing the Trat Guest Experiences" : "ภาพประกอบมนต์เสน่ห์แห่งจังหวัดตราด"}
            </h3>
            <p className="font-sans font-light text-muted-foreground mt-1 text-xs md:text-sm">
              {lang === 'en'
                ? "Integrating authentic high-value localized tours is the secret to building high premium loyalty."
                : "การรวมตัวเลือกกิจกรรมท่องเที่ยวชุมชนในพื้นที่ตราดเข้าเป็นระบบจองเดี่ยวบนเว็บ ช่วยเปิดโลกกว้างให้ผู้มาเยือนอย่างพรีเมียม"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="trat-gallery">
            {tratImages.map((img, idx) => (
              <div key={idx} className="bg-surface-raised border border-border overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={img.image}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-accent/95 text-background font-sans font-semibold text-[9px] tracking-widest uppercase px-2.5 py-1">
                    {img.tag}
                  </span>
                </div>
                
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-lg font-medium italic text-foreground group-hover:text-accent transition-colors duration-200">
                    {lang === 'en' ? img.title : img.titleTh}
                  </h4>
                  <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                    {lang === 'en' ? img.desc : img.descTh}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
