/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, ShieldCheck, Check, Info, Dog, Sparkles, Coffee } from 'lucide-react';
import { Room } from '../types';
import { ROOMS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialDates?: { checkIn: string; checkOut: string };
}

export default function BookingModal({ isOpen, onClose, initialRoomId = 'classic', initialDates }: BookingModalProps) {
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
    const confCode = `ALD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: confCode,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      roomName: selectedRoom.name,
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
                    <span className="label-caps text-accent mb-2 block">Your Stay at SK Hotel</span>
                    <h3 className="font-serif text-2xl italic text-foreground mb-4">{selectedRoom.name}</h3>
                    
                    <div className="aspect-video w-full overflow-hidden mb-4 relative">
                      <img
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-background/95 border border-border px-3 py-1">
                        <p className="text-xs font-mono text-accent">฿{selectedRoom.price} / night</p>
                      </div>
                    </div>

                    <div className="space-y-3 font-sans text-xs text-foreground/80 border-b border-border/50 pb-4 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Suite Size:</span>
                        <span>{selectedRoom.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Outlook:</span>
                        <span>{selectedRoom.view}</span>
                      </div>
                    </div>

                    {/* Stay Detail Summary */}
                    <div className="space-y-2 text-sm font-sans">
                      <h4 className="label-caps text-accent/80 mb-2">Estimate Summary</h4>
                      <div className="flex justify-between text-xs text-foreground/70">
                        <span>฿{selectedRoom.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>฿{roomTotal}</span>
                      </div>
                      
                      {dogFriendly && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>Dog Friendly Room Surcharge</span>
                          <span>฿{dogFee}</span>
                        </div>
                      )}

                      {breakfast && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>Traditional Thai Breakfast ({guests} guests)</span>
                          <span>฿{breakfastTotal}</span>
                        </div>
                      )}

                      {spaTreatment && (
                        <div className="flex justify-between text-xs text-foreground/70">
                          <span>Ban Tha Ranae Mangrove Tour ({guests} guests)</span>
                          <span>฿{spaFee}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-6">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-serif italic text-base">Total Due</span>
                      <span className="text-2xl font-sans font-medium text-accent">฿{finalTotal}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Rate includes VAT. Free cancellation up to 72 hours prior to arrival. Pay in full upon arrival.
                    </p>
                  </div>
                </div>

                {/* Right Side: Inputs Forms */}
                <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Steps Indicator */}
                    <div className="flex items-center space-x-4 mb-6">
                      <span className={`text-xs ${step === 1 ? 'text-accent font-medium' : 'text-muted-foreground'}`}>01 Stay Details</span>
                      <div className="h-[1px] w-8 bg-border"></div>
                      <span className={`text-xs ${step === 2 ? 'text-accent font-medium' : 'text-muted-foreground'}`}>02 Guest Information</span>
                    </div>

                    {step === 1 ? (
                      <div className="space-y-5">
                        <h4 className="font-serif text-xl italic text-foreground border-b border-border/40 pb-2">Select Dates & Customizations</h4>
                        
                        {/* Room Selector */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Select Room Type</label>
                          <div className="grid grid-cols-3 gap-2">
                            {ROOMS.map(r => (
                              <button
                                key={r.id}
                                onClick={() => setSelectedRoomId(r.id)}
                                className={`py-2 px-3 text-xs border font-sans text-center transition-all ${
                                  selectedRoomId === r.id
                                    ? 'bg-accent/10 border-accent text-accent'
                                    : 'border-border text-foreground/70 hover:border-foreground/40'
                                }`}
                              >
                                {r.id.charAt(0).toUpperCase() + r.id.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Dates Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Check In</label>
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
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Check Out</label>
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
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Number of Guests</label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                          >
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                            <option value={3}>3 Guests (Includes roll-away single bed)</option>
                          </select>
                        </div>

                        {/* Addon details */}
                        <div className="space-y-3 pt-3 border-t border-border/30">
                          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">SK Hotel Add-ons (Optional)</span>
                          
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
                                <h5 className="text-xs font-medium">Dog Friendly Welcome</h5>
                                <p className="text-[10px] text-muted-foreground">Dog-bed & special treats in room (+฿150 flat)</p>
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
                                <h5 className="text-xs font-medium">Traditional Thai Breakfast</h5>
                                <p className="text-[10px] text-muted-foreground">Local Trat coffee, dynamic seasonal fruits & hot dishes (+฿80/guest/night)</p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 border flex items-center justify-center ${breakfast ? 'border-accent bg-accent text-background' : 'border-border'}`}>
                              {breakfast && <Check className="w-3 h-3" />}
                            </div>
                          </div>

                          {/* Spa treatments */}
                          <div
                            onClick={() => setSpaTreatment(!spaTreatment)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                              spaTreatment ? 'bg-accent/5 border-accent' : 'border-border hover:border-border/80'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Sparkles className={`w-4 h-4 ${spaTreatment ? 'text-accent' : 'text-muted-foreground'}`} />
                              <div>
                                <h5 className="text-xs font-medium">Ban Tha Ranae Mangrove Tour</h5>
                                <p className="text-[10px] text-muted-foreground">Guided mangrove eco-tour with boat transfer (+฿350/guest)</p>
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
                        <h4 className="font-serif text-xl italic text-foreground border-b border-border/40 pb-2">Your Contact Details</h4>
                        
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Elizabeth Bennet"
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="elizabeth@example.com"
                              className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Phone Number *</label>
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
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Special Requests or Dietary Requirements</label>
                          <textarea
                            rows={3}
                            value={specialRequest}
                            onChange={(e) => setSpecialRequest(e.target.value)}
                            placeholder="Let us know if you require a cot, have food allergies, or if you are celebrating a special occasion..."
                            className="w-full bg-surface-raised border border-border text-xs px-3 py-2 text-foreground focus:outline-none focus:border-accent resize-none"
                          />
                        </div>

                        <div className="bg-accent/5 border border-accent/20 p-3 flex items-start space-x-3">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p className="text-[10px] text-muted-foreground leading-normal">
                            No immediate charge will be made. Standard rates authorize payment upon check-out. You can modify or cancel this booking for free up to 3 days before arrival.
                          </p>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
                    {step === 1 ? (
                      <>
                        <span className="text-[10px] text-muted-foreground">Step 1 of 2</span>
                        <button
                          onClick={handleNextStep}
                          className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-6 transition-colors duration-200"
                          id="btn-next-step"
                        >
                          Continue to Details →
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
                          ← Back to Customization
                        </button>
                        <button
                          onClick={handleSubmitBooking}
                          className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-6 transition-colors duration-200"
                          id="btn-submit-booking"
                        >
                          Confirm Reservation →
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
                  <span className="label-caps text-accent">Booking Confirmed</span>
                  <h3 className="font-serif text-3xl italic text-foreground mt-2 mb-1">Aplace Awaits You.</h3>
                  <p className="text-sm text-muted-foreground">Thank you, {confirmedBooking.customerName}. We are preparing for your arrival.</p>
                </div>

                <div className="w-full bg-surface-raised border border-border p-4 font-mono text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Confirmation Code:</span>
                    <span className="text-accent font-medium">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room:</span>
                    <span>{confirmedBooking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates:</span>
                    <span>{confirmedBooking.checkIn} to {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests:</span>
                    <span>{confirmedBooking.guests}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-2 font-sans font-medium text-sm text-accent">
                    <span>Total Estimate:</span>
                    <span>฿{confirmedBooking.totalAmount}</span>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground max-w-sm">
                  We have saved this reservation under your browser's history logs. A separate itinerary confirmation details card has been synchronized to your local profile.
                </p>

                <button
                  onClick={onClose}
                  className="bg-accent hover:bg-accent/90 text-background font-sans font-medium text-xs py-2.5 px-8 transition-colors duration-200"
                  id="btn-conf-close"
                >
                  Close & View Estate
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
