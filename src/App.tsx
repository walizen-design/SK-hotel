/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomsSection from './components/RoomsSection';
import GallerySection from './components/GallerySection';
import DiningSection from './components/DiningSection';
import ExperiencesSection from './components/ExperiencesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PitchSection from './components/PitchSection';
import LocationSection from './components/LocationSection';
import BookCTA from './components/BookCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState('classic');
  const [preselectedDates, setPreselectedDates] = useState<{ checkIn: string; checkOut: string } | undefined>(undefined);

  const handleOpenBooking = () => {
    setPreselectedRoomId('classic');
    setPreselectedDates(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectRoomToBook = (roomId: string) => {
    setPreselectedRoomId(roomId);
    setPreselectedDates(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithDates = (dates: { checkIn: string; checkOut: string }) => {
    setPreselectedRoomId('classic');
    setPreselectedDates(dates);
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-background min-h-screen flex flex-col justify-between" id="app-root">
      
      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Layout */}
      <main>
        {/* 1. Hero */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollToRooms={() => scrollToSection('rooms')}
        />

        {/* 2. Rooms */}
        <RoomsSection onSelectRoom={handleSelectRoomToBook} />

        {/* 3. Gallery */}
        <GallerySection />

        {/* 4. Dining */}
        <DiningSection />

        {/* 5. Experiences */}
        <ExperiencesSection />

        {/* 6. Testimonials */}
        <TestimonialsSection />

        {/* Executive Proposal / Pitch for SK Hotel Owner */}
        <PitchSection />

        {/* 7. Location */}
        <LocationSection />

        {/* 8. Booking Call to Action */}
        <BookCTA onOpenBookingWithDates={handleOpenBookingWithDates} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Room Booking Wizard Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialRoomId={preselectedRoomId}
        initialDates={preselectedDates}
      />
    </div>
  );
}
