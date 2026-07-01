/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Compass, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'th';
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-background border-t border-border py-16 px-6 font-sans text-xs text-muted-foreground" id="footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Left: Branding */}
        <div className="text-center md:text-left space-y-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-3xl italic font-bold text-accent tracking-wide hover:opacity-90 transition-opacity inline-block"
            id="footer-logo"
          >
            SK Hotel
          </a>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {lang === 'en' ? 'Trat Town Riverside Guesthouse & Tours' : 'เกสท์เฮ้าส์ริมแม่น้ำและเรือนำเที่ยวชุมชนเมืองตราด'}
          </p>
        </div>

        {/* Center: Social Channels */}
        <div className="flex items-center gap-6 text-foreground/80 font-medium">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
            id="instagram-link"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
          
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
            id="pinterest-link"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pinterest</span>
          </a>

          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
            id="tripadvisor-link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>TripAdvisor</span>
          </a>
        </div>

        {/* Right: Copyright & Location details */}
        <div className="text-center md:text-right max-w-sm space-y-2 leading-relaxed">
          <p className="text-muted-foreground/80">
            {lang === 'en' ? '© 2026 SK Hotel · Riverside Guesthouse & Tours' : '© 2026 SK Hotel · บริการห้องพักริมคลองนำเที่ยวตราด'}
          </p>
          <p className="text-[10px] text-muted-foreground/50">
            {lang === 'en' 
              ? 'Thoncharoen Canal, Trat Town, Thailand · +66 81 234 5678'
              : 'ชุมชนริมคลองธนเจริญ อำเภอเมืองตราด ประเทศไทย · +66 81 234 5678'}
          </p>
        </div>

      </div>
    </footer>
  );
}
