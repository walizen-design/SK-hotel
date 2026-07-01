/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, GalleryItem, Experience, Testimonial } from './types';

export const ROOMS: Room[] = [
  {
    id: 'classic',
    name: 'Classic Fan Room',
    nameTh: 'ห้องพัดลมแบบคลาสสิก',
    type: 'classic',
    description: 'Comfortable fan room, perfect for budget travelers',
    descriptionTh: 'ห้องพัดลมแสนสบาย เหมาะอย่างยิ่งสำหรับผู้เข้าพักที่ต้องการประหยัดงบประมาณ',
    longDescription: 'Our Classic Fan Rooms offer standard budget-friendly comfort with natural ventilation and cooling fans. Featuring twin or double beds, local Thai decor, and clean private bathrooms, it is perfect for backpackers and travelers exploring Trat town or on transit to Koh Chang.',
    longDescriptionTh: 'ห้องพัดลมสไตล์คลาสสิก มอบความสบายและประหยัดด้วยระบบระบายอากาศตามธรรมชาติและพัดลมติดผนัง ตกแต่งในสไตล์ไทยท้องถิ่นพร้อมห้องน้ำส่วนตัวที่สะอาด เหมาะสำหรับนักท่องเที่ยวสะพายเป้ และผู้เดินทางที่มาสำรวจเมืองตราดหรือต้องการพักผ่อนระหว่างเดินทางไปเกาะช้าง',
    features: ['Cooling wall fan', 'Private ensuite bathroom', 'Twin or double bedding option', 'Free high-speed Wi-Fi', 'Complimentary bottled water', 'Traditional local town views'],
    featuresTh: ['พัดลมติดผนังปรับระดับได้', 'ห้องน้ำส่วนตัวในตัวห้อง', 'ตัวเลือกเตียงคู่หรือเตียงเดี่ยวสองหลัง', 'ฟรี Wi-Fi ความเร็วสูง', 'บริการน้ำดื่มบรรจุขวดฟรี', 'วิวชุมชนเมืองตราดแบบดั้งเดิม'],
    size: '22 m²',
    view: 'Trat Town Street',
    viewTh: 'ถนนเมืองตราดดั้งเดิม',
    price: 300,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Air-Conditioned Room',
    nameTh: 'ห้องปรับอากาศดีลักซ์',
    type: 'deluxe',
    description: 'Modern air-conditioned room, town or canal views',
    descriptionTh: 'ห้องแอร์ทันสมัย พร้อมวิวย่านชุมชนเมืองตราดหรือคลองน้ำใสอันแสนเงียบสงบ',
    longDescription: 'Enjoy cool, modern comfort in our Deluxe Air-Conditioned Rooms. Perfect for relaxing after a warm day in the Trat sun or hiking in the mangrove forest. Equipped with a clean private bathroom, refrigerator, flat-screen TV, and pristine linens.',
    longDescriptionTh: 'พักผ่อนอย่างเย็นสบายและทันสมัยในห้องพักแอร์ดีลักซ์ เหมาะสำหรับการพักผ่อนหลังจากลุยแดดเมืองตราด หรือเดินป่าชายเลนพันปีมาทั้งวัน ครบครันด้วยห้องน้ำส่วนตัว เครื่องทำน้ำอุ่น ตู้เย็น ทีวีจอแบน และชุดเครื่องนอนที่สะอาดหมดจด',
    features: ['Whisper-quiet Air-Conditioner', 'Private bathroom with hot shower', 'Double bed with clean linens', 'In-room refrigerator', 'Flat-screen cable TV', 'Complimentary local coffee'],
    featuresTh: ['เครื่องปรับอากาศทำงานเงียบสนิท', 'ห้องน้ำส่วนตัวพร้อมเครื่องทำน้ำอุ่น', 'เตียงเดี่ยวขนาดใหญ่พร้อมเครื่องนอนพรีเมียม', 'ตู้เย็นขนาดเล็กในห้องพัก', 'ทีวีจอแบนช่องเคเบิลท้องถิ่น', 'ฟรีชากาแฟท้องถิ่นบริการตนเอง'],
    size: '28 m²',
    view: 'Tranquil Canal / Garden',
    viewTh: 'ลำคลองแสนสงบหรือสวนหย่อม',
    price: 400,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800'
  },
  {
    id: 'suite',
    name: 'Premium Family AC Room',
    nameTh: 'ห้องแอร์สำหรับครอบครัวพรีเมียม',
    type: 'suite',
    description: 'Spacious family layout, private balcony',
    descriptionTh: 'ห้องพักขนาดใหญ่พิเศษสำหรับครอบครัว พร้อมระเบียงส่วนตัวชมทัศนียภาพริมน้ำ',
    longDescription: 'Our premium offering for families or small groups of up to three guests. Features extra space, a cozy lounge nook, a private balcony overlooking Trat’s historic waterfront neighborhood, and comprehensive amenities for a secure and comfortable stay.',
    longDescriptionTh: 'ห้องพักระดับพรีเมียมสำหรับครอบครัวหรือกลุ่มเพื่อนไม่เกิน 3 ท่าน มีพื้นที่กว้างขวางเป็นพิเศษ มุมนั่งเล่นพักผ่อนแสนสบาย และระเบียงส่วนตัวที่ยื่นออกไปให้ท่านได้รับลมและชมวิวชุมชนริมน้ำประวัติศาสตร์ท่าระแนะ/ธนเจริญ พร้อมสิ่งอำนวยความสะดวกที่ปลอดภัยและครบครัน',
    features: ['Powerful Air-Conditioner', 'Private balcony with chairs', 'Double bed and additional single bed', 'Hot water shower & toiletries', 'Mini-bar fridge & electric kettle', 'Priority local tour booking assistance'],
    featuresTh: ['เครื่องปรับอากาศกำลังสูง', 'ระเบียงส่วนตัวพร้อมเก้าอี้นั่งรับลม', 'เตียงใหญ่และเตียงเดี่ยวเพิ่มหนึ่งหลัง', 'เครื่องทำน้ำอุ่นพร้อมของใช้ในห้องน้ำ', 'ตู้เย็นมินิบาร์และกาต้มน้ำไฟฟ้า', 'สิทธิ์จองทัวร์เรือบ้านท่าระแนะล่วงหน้า'],
    size: '38 m²',
    view: 'Historic Thoncharoen Canal & Town View',
    viewTh: 'วิวคลองโบราณธนเจริญและชุมชนเมืองตราด',
    price: 500,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?q=80&w=800'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cozy Fan Room Interior',
    titleTh: 'บรรยากาศภายในห้องพักพัดลมแสนอบอุ่น',
    category: 'Bedroom',
    categoryTh: 'ห้องพัก',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-2',
    title: 'Comfortable Deluxe Bedding',
    titleTh: 'ชุดเครื่องนอนแอร์ดีลักซ์แสนนุ่มสบาย',
    category: 'Bedroom',
    categoryTh: 'ห้องพัก',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    aspect: 'landscape'
  },
  {
    id: 'gal-3',
    title: 'Authentic Local Trat Dishes',
    titleTh: 'อาหารพื้นบ้านและรสชาติเมืองตราดดั้งเดิม',
    category: 'Dining',
    categoryTh: 'อาหารท้องถิ่น',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-4',
    title: 'Trat Canal Waterfront Lounge',
    titleTh: 'ลานระเบียงนั่งพักผ่อนรับลมริมคลองตราด',
    category: 'Lounge',
    categoryTh: 'มุมพักผ่อน',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
    aspect: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Sunrise over Thoncharoen Canal',
    titleTh: 'ชมแสงเช้าแสนสงบริมคลองธนเจริญ',
    category: 'Grounds',
    categoryTh: 'รอบกสท์เฮ้าส์',
    image: 'https://images.unsplash.com/photo-1500627869374-13cd993b1115?q=80&w=800',
    aspect: 'portrait'
  },
  {
    id: 'gal-6',
    title: 'Relaxing Balcony View',
    titleTh: 'มุมมองระเบียงเพื่อความผ่อนคลายอย่างแท้จริง',
    category: 'Terrace',
    categoryTh: 'ระเบียงพัก',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800',
    aspect: 'landscape'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'walk-cycle',
    title: 'Mangrove & Canal Tours',
    titleTh: 'กิจกรรมทัวร์ป่าชายเลนและพายเรือริมคลอง',
    description: 'We arrange scenic longtail boat excursions to the famous ancient mangrove forests of Ban Tha Ranae.',
    descriptionTh: 'เราบริการจองเรือหางยาวนำเที่ยวผจญภัยในป่าชายเลนพันปีบ้านท่าระแนะอันเลื่องชื่อ',
    longDescription: 'Explore Trat’s legendary ecological wonders. Take an intimate boat ride along the peaceful canals, glide beneath dense green canopies, and step onto the marvelous wooden root-networks of the thousand-year mangrove forests.',
    longDescriptionTh: 'สัมผัสความมหัศจรรย์ทางธรรมชาติเชิงอนุรักษ์ของจังหวัดตราด นั่งเรือหางยาวชมคลองธรรมชาติที่เงียบสงบ ลอดอุโมงค์ต้นไม้ และเดินบนรากไม้โกงกางอายุนับพันปีที่ลานตะบูน',
    details: 'Daily departures. Booking through the lobby or website is highly recommended.',
    detailsTh: 'บริการออกเรือทุกวัน สามารถติดต่อสอบถามล่วงหน้าได้ที่ล็อบบี้หรือเจ้าหน้าที่รีเซปชั่น',
    icon: 'Map'
  },
  {
    id: 'private-dining',
    title: 'Local QR Food Delivery',
    titleTh: 'ระบบสั่งอาหารท้องถิ่นผ่าน QR Code',
    description: 'Scan our in-room QR codes to order delivery from top-rated Trat restaurants directly to your doorstep.',
    descriptionTh: 'เพียงสแกน QR Code ในห้องพักเพื่อสั่งอาหารพื้นบ้านชื่อดังของเมืองตราดส่งตรงถึงห้อง',
    longDescription: 'Dine like a local. Instead of running an expensive in-house restaurant, we partner with the finest street food stalls and historic eateries in Trat to bring genuine local flavors straight to your room.',
    longDescriptionTh: 'อิ่มอร่อยในสไตล์คนท้องถิ่นโดยไม่ต้องจ่ายแพง เราได้รวบรวมร้านอาหารชุมชนรสเด็ด ทั้งก๋วยเตี๋ยวกั้ง ข้าวผัดพริกเกลือ และแกงมัสมั่นตราด ให้บริการเดลิเวอรี่ส่งตรงถึงระเบียงห้องพัก',
    details: 'Available daily from 11:00 to 22:00. Fast and cash-on-delivery options available.',
    detailsTh: 'เปิดบริการทุกวันเวลา 11:00 น. ถึง 22:00 น. จ่ายเงินปลายทางหรือโอนผ่านระบบธนาคารได้สะดวก',
    icon: 'Utensils'
  },
  {
    id: 'spa-treatments',
    title: 'Koh Chang Ferry Transit',
    titleTh: 'บริการรถและตั๋วเรือเฟอร์รี่เกาะช้าง',
    description: 'Pre-book your speedboat and ferry transfers directly to the magnificent islands of the Koh Chang archipelago.',
    descriptionTh: 'จองตั๋วเรือเฟอร์รี่และรถตู้รับส่งเพื่อเดินทางไปยังหมู่เกาะอันงดงามในตราดล่วงหน้า',
    longDescription: 'Streamline your island getaway. We facilitate direct taxi bookings and priority ferry tickets to Koh Chang, Koh Kood, or Koh Mak, so you spend less time waiting and more time on the beach.',
    longDescriptionTh: 'เพิ่มความสะดวกสบายในการท่องเที่ยวเกาะช้าง เกาะกูด หรือเกาะหมาก เราช่วยอำนวยความสะดวกเรื่องตั๋วเรือและรถรับส่ง เพื่อประหยัดเวลาการรอคอย และช่วยเพิ่มเวลาพักผ่อนบนหาดทรายขาวของท่าน',
    details: 'Ticket sales close 2 hours before ferry departure times.',
    detailsTh: 'เปิดจำหน่ายตั๋วทุกวัน ปิดการรับจองล่วงหน้าอย่างน้อย 2 ชั่วโมงก่อนเวลาเรือออก',
    icon: 'Sparkles'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "SK Hotel was the perfect base! Super affordable, clean, and right by the historic waterfront. The staff booked our Koh Chang ferry tickets directly.",
    quoteTh: "SK Hotel คือจุดพักที่ดีที่สุด! ราคาประหยัด สะอาดมาก และตั้งอยู่ติดริมน้ำชุมชนโบราณ พนักงานยังจองตั๋วเรือข้ามฟากเกาะช้างให้พวกเราได้สะดวกมากเลยค่ะ",
    author: "Charlotte & Ben W.",
    roomType: "Premium Family AC Room",
    roomTypeTh: "ห้องแอร์ครอบครัวระดับพรีเมียม",
    rating: 5
  },
  {
    id: 't-2',
    quote: "At only 400 Baht a night, the air-conditioned room was incredibly good value. Spotlessly clean with a wonderful view over the peaceful canal.",
    quoteTh: "ในราคาเพียง 400 บาทต่อคืน ห้องแอร์ถือว่าคุ้มค่าเกินราคามากๆ ห้องสะอาดสะอ้านและมีวิวคลองที่เงียบสงบสวยงามมากครับ",
    author: "Julian de M.",
    roomType: "Deluxe Air-Conditioned Room",
    roomTypeTh: "ห้องพักดีลักซ์ปรับอากาศ",
    rating: 5
  },
  {
    id: 't-3',
    quote: "Very cozy fan room and lovely staff. Ordering delivery from local restaurants via their QR code was super easy and delicious!",
    quoteTh: "ห้องพัดลมสบายมาก อากาศระบายดีและพนักงานน่ารักสุดๆ การสั่งของกินท้องถิ่นส่งถึงห้องผ่านรหัส QR ก็ง่ายและรสชาติอร่อยมาก!",
    author: "Sophia & Robert K.",
    roomType: "Classic Fan Room",
    roomTypeTh: "ห้องพักคลาสสิกพัดลม",
    rating: 5
  }
];
