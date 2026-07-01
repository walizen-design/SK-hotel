/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  nameTh?: string;
  type: 'classic' | 'deluxe' | 'suite';
  description: string;
  descriptionTh?: string;
  longDescription: string;
  longDescriptionTh?: string;
  features: string[];
  featuresTh?: string[];
  size: string;
  view: string;
  viewTh?: string;
  price: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleTh?: string;
  category: string;
  categoryTh?: string;
  image: string;
  aspect: 'portrait' | 'landscape';
}

export interface Experience {
  id: string;
  title: string;
  titleTh?: string;
  description: string;
  descriptionTh?: string;
  longDescription: string;
  longDescriptionTh?: string;
  details: string;
  detailsTh?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  quoteTh?: string;
  author: string;
  authorTh?: string;
  roomType: string;
  roomTypeTh?: string;
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
