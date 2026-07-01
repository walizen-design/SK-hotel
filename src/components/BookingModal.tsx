/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, ShieldCheck, Check, Dog, Sparkles, Coffee } from 'lucide-react';
import { ROOMS } from '../data';

interface BookingModalProps {
  lang: 'en' | 'th';
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialDates?: { checkIn: string; checkOut: string };
}

export default function BookingModal({ lang, isOpen, onClose, initialRoomId = 'classic', initialDates }: BookingModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  
  // Extras
  const [dogFriendly, setDogFriendly] = useState<boolean>(false);
  const [breakfast, setBreakfast] = useState<boolean>(true);
  const [spaTreatment, setSpaTreatment] = useState<boolean>(false);

  // States for flow
  const [step, setStep] = useState<1 | 2>(1); // 1: Room & Dates details, 2: Guest Details & Confirm
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Set default dates if not provided
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 2);
      
      const formatDate = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      setCheckIn(initialDates?.checkIn || formatDate(today));
      setCheckOut(initialDates?.checkOut || formatDate(tomorrow));
      setSelectedRoomId(initialRoomId);
      setStep(1);
      setConfirmedBooking(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialRoomId, initialDates]);

  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0];

  // Price calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  const roomTotal = selectedRoom.price * nights;
  
  const dogFee = dogFriendly ? 150 : 0; // One-off dog fee in Baht
  const breakfastTotal = breakfast ? 80 * guests * nights : 0; // ฿80 per guest per night
  const spaFee = spaTreatment ? 350 * guests : 0; // ฿350 per guest per tour
  const finalTotal = roomTotal + dogFee + breakfastTotal + spaFee;

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    const confCode = `SKH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: confCode,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      roomName: lang === 'en' ? selectedRoom.name : (selectedRoom.nameTh || selectedRoom.name),
      roomPrice: selectedRoom.price,
      checkIn,
      checkOut,
      guests,
      nights,
      dogFriendly,
      breakfast,
      spaTreatment,
      totalAmount: finalTotal,
      createdAt: new Date().toISOString()
    };

    // Save to LocalStorage
    const existing = JSON.parse(localStorage.getItem('aldwick_bookings') || '[]');
    existing.unshift(newBooking);
    localStorage.setItem('aldwick_bookings', JSON.stringify(existing));

    setConfirmedBooking(newBooking);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-surface border border-border overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px]"
            id="booking-modal-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-foreground/70 hover:text-accent transition-colors"
              aria-label="Close modal"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedBooking ? (
              <>
                {/* Left Side: Room details & Bill Breakdown */}
                <div className="w-full md:w-5/12 bg-surface-raised p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border overflow-y-auto">
                  <div>
                    <span className="label-caps text-accent mb-2 block">
                      {lang === 'en' ? 'Your Stay at SK Hotel' : 'การเข้าพักของท่านที่ SK Hotel'}
                    </span>
                    <h3 className="font-serif text-2xl italic text-foreground mb-4">
                      {lang === 'en' ? selectedRoom.name : (selectedRoom.nameTh || selectedRoom.name)}
                    </h3>
                    
                    <div className="aspect-video w-full overflow-hidden mb-4 relative">
                      <img
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-background/95 border border-border px-3 py-1">
                        <p className="text-xs font-mono text-accent">฿{selectedRoom.price} / {lang === 'en' ? 'night' : 'คืน'}</p>
                      </div>
                    </div>

                    <div className="space-y-3 font-sans text-xs text-foreground/80 border-b border-border/50 pb-4 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{lang === 'en' ? 'Suite Size:' : 'ขนาดห้องพัก:'}</span>
                        <span>{selectedRoom.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{lang === 'en' ? 'Outlook:' : 'วิวนอกหน้าต่าง:'}</span>
                        <span>{lang === 'en' ? selectedRoom.view : (selectedRoom.viewTh || selectedRoom.view)}</span>
                      </div>
                    </div>

                    {/* Stay Detail Summary */}
                    <div className="space-y-2 text-sm font-sans">
                      <h4 className="label-caps text-accent/80 mb-2">{lang === 'en' ? 'Estimate Summary' : 'สรุปยอดประมาณการค่าใช้จ่าย'}</h4>
                      <div className="flex justify-between text-xs text-foreground/70">
                        <span>
                          {lang === 'en' 
                            ? `฿${selectedRoom.price} × ${nights} night${nights > 1 ? 's' : ''}`
                            : `฿${selectedRoom.price} × ${nights} คืน`}
                        </span>
                        <span>฿{roomTotal}</span>
                      </div>
                      
                      {dogFriendly && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>{lang === 'en' ? 'Dog Friendly Room Surcharge' : 'ค่าบริการต้อนรับสัตว์เลี้ยงแสนรัก'}</span>
                          <span>฿{dogFee}</span>
                        </div>
                      )}

                      {breakfast && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>{lang === 'en' ? `Traditional Thai Breakfast (${guests} guests)` : `อาหารเช้าตำรับไทยดั้งเดิม (สำหรับ ${guests} ท่าน)`}</span>
                          <span>฿{breakfastTotal}</span>
                        </div>
                      )}

                      {spaTreatment && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>{lang === 'en' ? `Ban Tha Ranae Mangrove Tour (${guests} guests)` : `ทัวร์ป่าชายเลนบ้านท่าระแนะ (สำหรับ ${guests} ท่าน)`}</span>
                          <span>฿{spaFee}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-serif italic text-base">{lang === 'en' ? 'Total Due' : 'ยอดสุทธิรวมทั้งสิ้น'}</span>
                      <span className="text-2xl font-sans font-medium text-accent">฿{finalTotal}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {lang === 'en'
                        ? 'Rate includes VAT. Free cancellation up to 72 hours prior to arrival. Pay in full upon arrival.'
                        : 'ราคาแสดงผลรวมภาษีมูลค่าเพิ่มแล้ว สามารถแจ้งปรับเปลี่ยนหรือยกเลิกฟรีสูงสุด 72 ชั่วโมงก่อนวันเข้าพัก ชำระเงินเมื่อเดินทางถึงเกสท์เฮ้าส์'}
                    </p>
                  </div>
                </div>

                {/* Right Side: Inputs Forms */}
                <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Steps Indicator */}
                    <div className="flex items-center space-x-4 mb-6">
                      <span className={`text-xs ${step === 1 ? 'text-accent font-medium' : 'text-muted-foreground'}`}>
                        {lang === 'en' ? '01 Stay Details' : '01 รายละเอียดการเข้าพัก'}
                      </span>
                      <div className="h-[1px] w-8 bg-border"></div>
                      <span className={`text-xs ${step === 2 ? 'text-accent font-medium' : 'text-muted-foreground'}`}>
                        {lang === 'en' ? '02 Guest Information' : '02 ข้อมูลผู้เข้าพักสำหรับการจอง'}
                      </span>
                    </div>

                    {step === 1 ? (
                      <div className="space-y-5">
                        <h4 className="font-serif text-xl italic text-foreground border-b border-border/40 pb-2">
                          {lang === 'en' ? 'Select Dates & Customizations' : 'ระบุวันเข้าพักและบริการที่ท่านสนใจ'}
                        </h4>
                        
                        {/* Room Selector */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            {lang === 'en' ? 'Select Room Type' : 'เลือกประเภทห้องพัก'}
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {ROOMS.map(r => (
                              <button
                                key={r.id}
                                onClick={() => setSelectedRoomId(r.id)}
                                className={`py-2 px-3 text-xs border font-sans text-center transition-all ${
                                  selectedRoomId === r.id
                                    ? 'bg-accent/10 border-accent text-accent animate-pulse-once'
                                    : 'border-border text-foreground/70 hover:border-foreground/40'
                                }`}
                              >
                                {lang === 'en' ? r.id.charAt(0).toUpperCase() + r.id.slice(1) : (r.nameTh || r.name)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Dates Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                              {lang === 'en' ? 'Check In' : 'วันเข้าเช็คอิน'}
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                              {lang === 'en' ? 'Check Out' : 'วันเช็คเอาท์'}
                            </label>
                            <div className="relative">
                              <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Guests count */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            {lang === 'en' ? 'Number of Guests' : 'จำนวนผู้เข้าพัก'}
                          </label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                          >
                            <option value={1}>{lang === 'en' ? '1 Guest' : 'ผู้ใหญ่ 1 ท่าน'}</option>
                            <option value={2}>{lang === 'en' ? '2 Guests' : 'ผู้ใหญ่ 2 ท่าน'}</option>
                            <option value={3}>{lang === 'en' ? '3 Guests (Includes roll-away single bed)' : 'ผู้ใหญ่ 3 ท่าน (รวมบริการติดตั้งเตียงเดี่ยวเสริม)'}</option>
                          </select>
                        </div>

                        {/* Addon details */}
                        <div className="space-y-3 pt-3 border-t border-border/30">
                          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                            {lang === 'en' ? 'SK Hotel Add-ons (Optional)' : 'บริการเสริมและกิจกรรมพิเศษ (ระบุตามต้องการ)'}
                          </span>
                          
                          {/* Dog Friendly */}
                          <div
                            onClick={() => setDogFriendly(!dogFriendly)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                              dogFriendly ? 'bg-accent/5 border-accent' : 'border-border hover:border-border/80'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Dog className={`w-4 h-4 ${dogFriendly ? 'text-accent' : 'text-muted-foreground'}`} />
                              <div>
                                <h5 className="text-xs font-medium">
                                  {lang === 'en' ? 'Dog Friendly Welcome' : 'บริการต้อนรับสัตว์เลี้ยงแสนรัก'}
                                </h5>
                                <p className="text-[10px] text-muted-foreground">
                                  {lang === 'en' 
                                    ? 'Dog-bed & special treats in room (+฿150 flat)'
                                    : 'จัดเตรียมเบาะนอน ถ้วยน้ำ และเซ็ตขนมต้อนรับพิเศษในห้อง (+฿150 เหมาจ่าย)'}
                                </p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 border flex items-center justify-center ${dogFriendly ? 'border-accent bg-accent text-background' : 'border-border'}`}>
                              {dogFriendly && <Check className="w-3 h-3" />}
                            </div>
                          </div>

                          {/* Breakfast */}
                          <div
                            onClick={() => setBreakfast(!breakfast)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                              breakfast ? 'bg-accent/5 border-accent' : 'border-border hover:border-border/80'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Coffee className={`w-4 h-4 ${breakfast ? 'text-accent' : 'text-muted-foreground'}`} />
                              <div>
                                <h5 className="text-xs font-medium">
                                  {lang === 'en' ? 'Traditional Thai Breakfast' : 'เซ็ตอาหารเช้าสไตล์ไทยโบราณ'}
                                </h5>
                                <p className="text-[10px] text-muted-foreground">
                                  {lang === 'en'
                                    ? 'Local Trat coffee, dynamic seasonal fruits & hot dishes (+฿80/guest/night)'
                                    : 'กาแฟคั่วบดขึ้นชื่อตราด ผลไม้ชุมชนคัดสรรประจำวัน และเซ็ตจานร้อน (+฿80/ท่าน/คืน)'}
                                </p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 border flex items-center justify-center ${breakfast ? 'border-accent bg-accent text-background' : 'border-border'}`}>
                              {breakfast && <Check className="w-3 h-3" />}
                            </div>
                          </div>

                          {/* Mangrove tour */}
                          <div
                            onClick={() => setSpaTreatment(!spaTreatment)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                              spaTreatment ? 'bg-accent/5 border-accent' : 'border-border hover:border-border/80'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Sparkles className={`w-4 h-4 ${spaTreatment ? 'text-accent' : 'text-muted-foreground'}`} />
                              <div>
                                <h5 className="text-xs font-medium">
                                  {lang === 'en' ? 'Ban Tha Ranae Mangrove Tour' : 'เรือนำเที่ยวป่าชายเลนพันปีบ้านท่าระแนะ'}
                                </h5>
                                <p className="text-[10px] text-muted-foreground">
                                  {lang === 'en'
                                    ? 'Guided mangrove eco-tour with boat transfer (+฿350/guest)'
                                    : 'บริการนำเรือทัวร์พาล่องข้ามแม่น้ำตราด ชมลานตะบูนป่าชายเลนมหัศจรรย์ (+฿350/ท่าน)'}
                                </p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 border flex items-center justify-center ${spaTreatment ? 'border-accent bg-accent text-background' : 'border-border'}`}>
                              {spaTreatment && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitBooking} className="space-y-4">
                        <h4 className="font-serif text-xl italic text-foreground border-b border-border/40 pb-2">
                          {lang === 'en' ? 'Your Contact Details' : 'รายละเอียดการติดต่อของท่าน'}
                        </h4>
                        
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            {lang === 'en' ? 'Full Name *' : 'ชื่อ-นามสกุลจริง *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={lang === 'en' ? "e.g. Somchai Jaidee" : "เช่น สมชาย ใจดี"}
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                              {lang === 'en' ? 'Email Address *' : 'ที่อยู่อีเมลติดต่อ *'}
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="somchai@example.com"
                              className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                              {lang === 'en' ? 'Phone Number *' : 'เบอร์โทรศัพท์มือถือ *'}
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +66 81 234 5678"
                              className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            {lang === 'en' ? 'Special Requests or Dietary Requirements' : 'คำขอพิเศษอื่นๆ หรือเงื่อนไขข้อจำกัดด้านอาหาร'}
                          </label>
                          <textarea
                            rows={3}
                            value={specialRequest}
                            onChange={(e) => setSpecialRequest(e.target.value)}
                            placeholder={lang === 'en' 
                              ? "Let us know if you require a cot, have food allergies, or if you are celebrating a special occasion..."
                              : "โปรดแจ้งความประสงค์เพิ่มเติม เช่น ทริปฉลองโอกาสพิเศษ แพ้อาหารชนิดใด หรือต้องการสิ่งอำนวยความสะดวกเฉพาะตัว..."}
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent resize-none"
                          />
                        </div>

                        <div className="bg-accent/5 border border-accent/20 p-3 flex items-start space-x-3">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p className="text-[10px] text-muted-foreground leading-normal">
                            {lang === 'en'
                              ? 'No immediate charge will be made. Standard rates authorize payment upon check-out. You can modify or cancel this booking for free up to 3 days before arrival.'
                              : 'ไม่มีการเก็บค่าบริการใดๆ ผ่านช่องทางออนไลน์ขณะนี้ ชำระเงินสดหรือโอนเงินผ่านพนักงานได้โดยตรง ณ วันเช็คเอาท์ สามารถยกเลิกฟรีสูงสุด 3 วันก่อนเข้าพัก'}
                          </p>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
                    {step === 1 ? (
                      <>
                        <span className="text-[10px] text-muted-foreground">
                          {lang === 'en' ? 'Step 1 of 2' : 'ขั้นตอนที่ 1 จาก 2'}
                        </span>
                        <button
                          onClick={handleNextStep}
                          className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-6 transition-colors duration-200"
                          id="btn-next-step"
                        >
                          {lang === 'en' ? 'Continue to Details →' : 'ขั้นตอนถัดไป →'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handlePrevStep}
                          type="button"
                          className="text-foreground/70 hover:text-foreground text-xs font-sans transition-colors"
                          id="btn-prev-step"
                        >
                          {lang === 'en' ? '← Back to Customization' : '← ย้อนกลับขั้นตอนแรก'}
                        </button>
                        <button
                          onClick={handleSubmitBooking}
                          className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-6 transition-colors duration-200 animate-pulse-once"
                          id="btn-submit-booking"
                        >
                          {lang === 'en' ? 'Confirm Reservation →' : 'ยืนยันจองห้องพักเลย →'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* Confirmation Screen */
              <div className="w-full p-8 text-center flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto" id="confirmation-screen">
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center">
                  <Check className="w-8 h-8 text-accent" />
                </div>
                
                <div>
                  <span className="label-caps text-accent">
                    {lang === 'en' ? 'Booking Confirmed' : 'ยืนยันการจองเรียบร้อยแล้ว'}
                  </span>
                  <h3 className="font-serif text-3xl italic text-foreground mt-2 mb-1">
                    {lang === 'en' ? 'Your stay awaits you.' : 'ห้องพักพร้อมต้อนรับคุณแล้ว'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === 'en'
                      ? `Thank you, ${confirmedBooking.customerName}. We are preparing for your arrival.`
                      : `ขอขอบพระคุณ คุณ${confirmedBooking.customerName} ทางเกสท์เฮ้าส์กำลังเริ่มดำเนินการเตรียมสิ่งอำนวยความสะดวกสำหรับทริปของท่าน`}
                  </p>
                </div>

                <div className="w-full bg-surface-raised border border-border p-4 font-mono text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">{lang === 'en' ? 'Confirmation Code:' : 'รหัสอ้างอิงการจอง:'}</span>
                    <span className="text-accent font-medium">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{lang === 'en' ? 'Room:' : 'ประเภทห้องพัก:'}</span>
                    <span>{confirmedBooking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{lang === 'en' ? 'Dates:' : 'วันที่เดินทาง:'}</span>
                    <span>{confirmedBooking.checkIn} to {confirmedBooking.checkOut} ({confirmedBooking.nights} {lang === 'en' ? 'nights' : 'คืน'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{lang === 'en' ? 'Guests:' : 'จำนวนผู้เข้าพัก:'}</span>
                    <span>{confirmedBooking.guests}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-2 font-sans font-medium text-sm text-accent">
                    <span>{lang === 'en' ? 'Total Estimate:' : 'ค่าใช้จ่ายประเมินรวมทั้งสิ้น:'}</span>
                    <span>฿{confirmedBooking.totalAmount}</span>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground max-w-sm">
                  {lang === 'en'
                    ? "We have saved this reservation under your browser's history logs. A separate itinerary confirmation details card has been synchronized to your local profile."
                    : "ข้อมูลการจองนี้ถูกเก็บบันทึกบนประวัติเบราว์เซอร์ของท่านแล้ว ท่านสามารถกดตรวจสอบดูรหัสการจองส่วนตัวได้ในแถบตัวเลือกด้านบนของหน้าเว็บได้ตลอดเวลา"}
                </p>

                <button
                  onClick={onClose}
                  className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-8 transition-colors duration-200"
                  id="btn-conf-close"
                >
                  {lang === 'en' ? 'Close & View Estate' : 'ปิดหน้านี้และกลับสู่หลัก'}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
