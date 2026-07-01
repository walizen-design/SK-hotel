/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  lang: 'en' | 'th';
  setLang: (lang: 'en' | 'th') => void;
  onOpenBooking: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ lang, setLang, onOpenBooking, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load local bookings
    const loadBookings = () => {
      const b = JSON.parse(localStorage.getItem('aldwick_bookings') || '[]');
      setLocalBookings(b);
    };
    
    loadBookings();
    window.addEventListener('storage', loadBookings);
    
    // Check for storage updates on interval or clicks
    const interval = setInterval(loadBookings, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', loadBookings);
      clearInterval(interval);
    };
  }, []);

  const menuItems = lang === 'en' ? [
    { label: 'Rooms', id: 'rooms' },
    { label: 'Dining', id: 'dining' },
    { label: 'Experiences', id: 'experiences' },
    { label: 'Location', id: 'location' },
    { label: '💼 Business Pitch', id: 'owner-pitch' },
  ] : [
    { label: 'ห้องพัก', id: 'rooms' },
    { label: 'อาหารและเครื่องดื่ม', id: 'dining' },
    { label: 'กิจกรรมนำเที่ยว', id: 'experiences' },
    { label: 'ตำแหน่งที่ตั้ง', id: 'location' },
    { label: '💼 แผนเสนอโครงการ', id: 'owner-pitch' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  const handleRemoveBooking = (index: number) => {
    const b = [...localBookings];
    b.splice(index, 1);
    localStorage.setItem('aldwick_bookings', JSON.stringify(b));
    setLocalBookings(b);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border py-4' : 'bg-transparent py-6'
        }`}
        id="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl md:text-3xl italic font-bold text-accent tracking-wide hover:opacity-90 transition-opacity"
              id="nav-logo"
            >
              SK Hotel
            </a>
            <span className="text-[8px] tracking-[0.2em] text-accent/80 uppercase -mt-1 block font-sans font-medium">
              {lang === 'en' ? 'Guesthouse · Trat Town' : 'เกสท์เฮ้าส์ · เมืองตราด'}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 font-sans">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-[11px] tracking-widest uppercase text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            {/* Quick check bookings button */}
            {localBookings.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowBookingsDropdown(!showBookingsDropdown)}
                  className="relative text-foreground/80 hover:text-accent transition-colors flex items-center space-x-1.5"
                  title="View Your Bookings"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest">
                    {lang === 'en' ? `My Stay (${localBookings.length})` : `การจอง (${localBookings.length})`}
                  </span>
                  <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                </button>

                {/* Bookings dropdown popup */}
                <AnimatePresence>
                  {showBookingsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-80 bg-surface-raised border border-border p-4 shadow-xl z-50 space-y-3 font-sans text-xs"
                    >
                      <div className="flex justify-between items-center border-b border-border/40 pb-2">
                        <span className="font-semibold text-accent uppercase tracking-wider">
                          {lang === 'en' ? 'Your Active Bookings' : 'รายการจองห้องพักของคุณ'}
                        </span>
                        <button
                          onClick={() => setShowBookingsDropdown(false)}
                          className="text-foreground/50 hover:text-foreground"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                        {localBookings.map((b, idx) => (
                          <div key={b.id || idx} className="bg-surface p-3 border border-border/60 relative">
                            <button
                              onClick={() => handleRemoveBooking(idx)}
                              className="absolute top-2 right-2 text-foreground/40 hover:text-accent"
                              title="Cancel visual card"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <p className="font-medium text-foreground text-sm font-serif italic mb-1">{b.roomName}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">Code: {b.id}</p>
                            <p className="text-muted-foreground mt-1">
                              {lang === 'en' ? 'Check-in' : 'วันเข้าพัก'}: <span className="text-foreground">{b.checkIn}</span>
                            </p>
                            <p className="text-muted-foreground">
                              {lang === 'en' ? 'Check-out' : 'วันเช็คเอาท์'}: <span className="text-foreground">{b.checkOut}</span>
                            </p>
                            <p className="text-muted-foreground">
                              {lang === 'en' ? 'Guests' : 'ผู้เข้าพัก'}: <span className="text-foreground">{b.guests}</span> · {lang === 'en' ? 'Total' : 'ยอดรวม'}: <span className="text-accent font-medium">฿{b.totalAmount}</span>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-border/40 text-center">
                        <p className="text-[10px] text-muted-foreground mb-2">
                          {lang === 'en' ? 'Book directly with best rate guarantee' : 'จองตรงราคาประหยัดที่สุด รับประกันคุณภาพ'}
                        </p>
                        <button
                          onClick={() => {
                            setShowBookingsDropdown(false);
                            onOpenBooking();
                          }}
                          className="w-full bg-accent hover:bg-accent/90 text-background text-center py-1.5 font-medium tracking-wide uppercase text-[10px]"
                        >
                          {lang === 'en' ? 'Book another room' : 'จองห้องพักเพิ่มเติม'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 border border-accent/20 hover:border-accent text-[11px] tracking-wider uppercase transition-all duration-300 font-mono font-medium rounded-none text-accent"
            >
              <span>🌐</span>
              <span>{lang === 'en' ? 'TH' : 'EN'}</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="border border-accent text-accent hover:bg-accent hover:text-background text-[11px] uppercase tracking-widest px-4 py-2.5 transition-all duration-300 font-medium"
              id="desktop-book-btn"
            >
              {lang === 'en' ? 'Book a stay →' : 'จองห้องพักเลย →'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="flex items-center justify-center px-2 py-1 border border-accent/20 text-accent text-[10px] font-mono font-bold uppercase"
            >
              🌐 {lang === 'en' ? 'TH' : 'EN'}
            </button>

            {localBookings.length > 0 && (
              <button
                onClick={() => {
                  setShowBookingsDropdown(!showBookingsDropdown);
                  if (isOpen) setIsOpen(false);
                }}
                className="text-accent flex items-center justify-center p-2 border border-accent/20"
                aria-label="View stays"
              >
                <CalendarDays className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setShowBookingsDropdown(false);
              }}
              className="text-foreground p-1 hover:text-accent transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Active Bookings Sheet overlay */}
      <AnimatePresence>
        {showBookingsDropdown && (
          <div className="fixed inset-0 z-30 md:hidden bg-black/50" onClick={() => setShowBookingsDropdown(false)}>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-surface border-b border-border p-6 pt-24 font-sans text-xs w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
                <span className="font-semibold text-accent uppercase tracking-wider text-sm">
                  {lang === 'en' ? 'Your Local Reservations' : 'รายการจองของท่าน'}
                </span>
                <button onClick={() => setShowBookingsDropdown(false)} className="text-foreground/70">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {localBookings.map((b, idx) => (
                  <div key={b.id || idx} className="bg-surface-raised p-4 border border-border relative">
                    <button
                      onClick={() => handleRemoveBooking(idx)}
                      className="absolute top-2 right-2 text-foreground/40 hover:text-accent p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="font-medium text-foreground text-base font-serif italic mb-1">{b.roomName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">Code: {b.id}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-muted-foreground">
                      <p>{lang === 'en' ? 'Check-in' : 'วันเข้าพัก'}: <span className="text-foreground">{b.checkIn}</span></p>
                      <p>{lang === 'en' ? 'Check-out' : 'วันเช็คเอาท์'}: <span className="text-foreground">{b.checkOut}</span></p>
                      <p>{lang === 'en' ? 'Guests' : 'ผู้เข้าพัก'}: <span className="text-foreground">{b.guests}</span></p>
                      <p>{lang === 'en' ? 'Total' : 'ยอดรวม'}: <span className="text-accent font-medium">฿{b.totalAmount}</span></p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowBookingsDropdown(false);
                  onOpenBooking();
                }}
                className="w-full mt-4 bg-accent text-background py-3 font-medium text-xs tracking-wider uppercase text-center block"
              >
                {lang === 'en' ? 'Book another room' : 'จองห้องพักเพิ่มเติม'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-30 bg-surface border-b border-border pt-24 pb-8 px-6 shadow-xl md:hidden flex flex-col space-y-6 text-center font-sans"
            id="mobile-drawer"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm tracking-widest uppercase text-foreground/90 hover:text-accent transition-colors font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="bg-accent text-background font-sans font-semibold text-xs tracking-widest uppercase py-3 px-6 hover:bg-accent/95 transition-colors w-full"
              id="mobile-book-btn"
            >
              {lang === 'en' ? 'Book a stay →' : 'จองห้องพักเลย →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
