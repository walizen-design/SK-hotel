/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Calendar } from 'lucide-react';

interface BookCTAProps {
  lang: 'en' | 'th';
  onOpenBookingWithDates: (dates: { checkIn: string; checkOut: string }) => void;
}

export default function BookCTA({ lang, onOpenBookingWithDates }: BookCTAProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleCheckAvailability = (e: FormEvent) => {
    e.preventDefault();

    onOpenBookingWithDates({
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    });
  };

  return (
    <section className="bg-[#c9a55a] text-[#13181f] py-20 px-6 relative overflow-hidden" id="book-cta">
      {/* Decorative clean line markings */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-3">
          <span className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-black/60 block">
            {lang === 'en' ? 'Reservations Desk' : 'ฝ่ายบริการจองห้องพัก'}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic font-bold leading-tight">
            {lang === 'en' ? 'Is Your Date Available?' : 'ห้องพักพร้อมให้บริการในวันที่ท่านต้องการหรือไม่?'}
          </h2>
          <p className="font-sans font-light text-sm md:text-base text-black/80 max-w-xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'We take a limited number of bookings each month — check availability and reserve your room directly for our best rate.'
              : 'ห้องพักริมคลองยอดนิยมได้รับการสำรองอย่างรวดเร็ว — กรุณาเลือกวันและเข้าตรวจสอบสถานะห้องว่างพร้อมจองตรงราคาสุดพิเศษ'}
          </p>
        </div>

        {/* Inline Date Selector Bar */}
        <form
          onSubmit={handleCheckAvailability}
          className="bg-black/5 p-3 border border-black/10 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto items-center"
        >
          {/* Check-In Date */}
          <div className="flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-black/10 text-left">
            <Calendar className="w-4 h-4 text-black/60 shrink-0" />
            <div className="w-full">
              <label className="block text-[8px] uppercase tracking-wider text-black/50 font-semibold">
                {lang === 'en' ? 'Arriving' : 'วันเข้าพัก'}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent border-0 text-xs font-sans text-black focus:ring-0 p-0 w-full cursor-pointer focus:outline-none"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-black/10 text-left">
            <Calendar className="w-4 h-4 text-black/60 shrink-0" />
            <div className="w-full">
              <label className="block text-[8px] uppercase tracking-wider text-black/50 font-semibold">
                {lang === 'en' ? 'Departing' : 'วันเช็คเอาท์'}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent border-0 text-xs font-sans text-black focus:ring-0 p-0 w-full cursor-pointer focus:outline-none"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#13181f] text-[#e9e5db] hover:bg-[#1d242e] transition-colors py-3.5 px-6 font-sans font-semibold text-xs uppercase tracking-widest"
            id="cta-check-btn"
          >
            {lang === 'en' ? 'Check Availability' : 'ตรวจสอบสถานะห้องว่าง'}
          </button>
        </form>

        {/* Small details line */}
        <div className="pt-2">
          <p className="font-sans text-xs font-medium text-black/70 tracking-widest uppercase">
            {lang === 'en' 
              ? 'Best rate direct · Pet friendly · Free parking'
              : 'ราคาตรงดีที่สุด · ยินดีต้อนรับสัตว์เลี้ยง · บริการที่จอดรถฟรี'}
          </p>
        </div>
      </div>
    </section>
  );
}
