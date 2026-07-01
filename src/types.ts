/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  type: 'classic' | 'deluxe' | 'suite';
  description: string;
  longDescription: string;
  features: string[];
  size: string;
  view: string;
  price: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'portrait' | 'landscape';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  details: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  roomType: string;
  rating: number;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  dogFriendly: boolean;
  breakfastIncluded: boolean;
  spaTreatment: boolean;
}
