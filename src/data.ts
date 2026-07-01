/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, GalleryItem, Experience, Testimonial } from './types';

export const ROOMS: Room[] = [
  {
    id: 'classic',
    name: 'Classic Fan Room',
    type: 'classic',
    description: 'Comfortable fan room, perfect for budget travelers',
    longDescription: 'Our Classic Fan Rooms offer standard budget-friendly comfort with natural ventilation and cooling fans. Featuring twin or double beds, local Thai decor, and clean private bathrooms, it is perfect for backpackers and travelers exploring Trat town or on transit to Koh Chang.',
    features: ['Cooling wall fan', 'Private ensuite bathroom', 'Twin or double bedding option', 'Free high-speed Wi-Fi', 'Complimentary bottled water', 'Traditional local town views'],
    size: '22 m²',
    view: 'Trat Town Street',
    price: 300,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Air-Conditioned Room',
    type: 'deluxe',
    description: 'Modern air-conditioned room, town or canal views',
    longDescription: 'Enjoy cool, modern comfort in our Deluxe Air-Conditioned Rooms. Perfect for relaxing after a warm day in the Trat sun or hiking in the mangrove forest. Equipped with a clean private bathroom, refrigerator, flat-screen TV, and pristine linens.',
    features: ['Whisper-quiet Air-Conditioner', 'Private bathroom with hot shower', 'Double bed with clean linens', 'In-room refrigerator', 'Flat-screen cable TV', 'Complimentary local coffee'],
    size: '28 m²',
    view: 'Tranquil Canal / Garden',
    price: 400,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800'
  },
  {
    id: 'suite',
    name: 'Premium Family AC Room',
    type: 'suite',
    description: 'Spacious family layout, private balcony',
    longDescription: 'Our premium offering for families or small groups of up to three guests. Features extra space, a cozy lounge nook, a private balcony overlooking Trat’s historic waterfront neighborhood, and comprehensive amenities for a secure and comfortable stay.',
    features: ['Powerful Air-Conditioner', 'Private balcony with chairs', 'Double bed and additional single bed', 'Hot water shower & toiletries', 'Mini-bar fridge & electric kettle', 'Priority local tour booking assistance'],
    size: '38 m²',
    view: 'Historic Thoncharoen Canal & Town View',
    price: 500,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?q=80&w=800'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cozy Fan Room Interior',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-2',
    title: 'Comfortable Deluxe Bedding',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    aspect: 'landscape'
  },
  {
    id: 'gal-3',
    title: 'Authentic Local Trat Dishes',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-4',
    title: 'Trat Canal Waterfront Lounge',
    category: 'Lounge',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
    aspect: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Sunrise over Thoncharoen Canal',
    category: 'Grounds',
    image: 'https://images.unsplash.com/photo-1500627869374-13cd993b1115?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-6',
    title: 'Relaxing Balcony View',
    category: 'Terrace',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
    aspect: 'landscape'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'walk-cycle',
    title: 'Mangrove & Canal Tours',
    description: 'We arrange scenic longtail boat excursions to the famous ancient mangrove forests of Ban Tha Ranae.',
    longDescription: 'Explore Trat’s legendary ecological wonders. Take an intimate boat ride along the peaceful canals, glide beneath dense green canopies, and step onto the marvelous wooden root-networks of the thousand-year mangrove forests.',
    details: 'Daily departures. Booking through the lobby or website is highly recommended.',
    icon: 'Map'
  },
  {
    id: 'private-dining',
    title: 'Local QR Food Delivery',
    description: 'Scan our in-room QR codes to order delivery from top-rated Trat restaurants directly to your doorstep.',
    longDescription: 'Dine like a local. Instead of running an expensive in-house restaurant, we partner with the finest street food stalls and historic eateries in Trat to bring genuine local flavors straight to your room.',
    details: 'Available daily from 11:00 to 22:00. Fast and cash-on-delivery options available.',
    icon: 'Utensils'
  },
  {
    id: 'spa-treatments',
    title: 'Koh Chang Ferry Transit',
    description: 'Pre-book your speedboat and ferry transfers directly to the magnificent islands of the Koh Chang archipelago.',
    longDescription: 'Streamline your island getaway. We facilitate direct taxi bookings and priority ferry tickets to Koh Chang, Koh Kood, or Koh Mak, so you spend less time waiting and more time on the beach.',
    details: 'Ticket sales close 2 hours before ferry departure times.',
    icon: 'Sparkles'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "SK Hotel was the perfect base! Super affordable, clean, and right by the historic waterfront. The staff booked our Koh Chang ferry tickets directly.",
    author: "Charlotte & Ben W.",
    roomType: "Premium Family AC Room",
    rating: 5
  },
  {
    id: 't-2',
    quote: "At only 400 Baht a night, the air-conditioned room was incredibly good value. Spotlessly clean with a wonderful view over the peaceful canal.",
    author: "Julian de M.",
    roomType: "Deluxe Air-Conditioned Room",
    rating: 5
  },
  {
    id: 't-3',
    quote: "Very cozy fan room and lovely staff. Ordering delivery from local restaurants via their QR code was super easy and delicious!",
    author: "Sophia & Robert K.",
    roomType: "Classic Fan Room",
    rating: 5
  }
];
