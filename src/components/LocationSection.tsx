/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Car, Train, MapPin, Compass } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-24 px-6 bg-background" id="location">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="label-caps text-accent mb-2 block">SK Hotel Location</span>
          <h2 className="font-serif text-4xl md:text-5xl italic font-bold text-foreground inline-block relative pb-4">
            Finding SK Hotel in Trat
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
            />
          </h2>
          <p className="font-sans font-light text-muted-foreground mt-4 text-base max-w-2xl leading-relaxed">
            Situated in the historic waterfront district of Trat town along the tranquil Thoncharoen canal — the perfect, quiet gateway to Koh Chang and the mangrove forests.
          </p>
        </div>

        {/* Directions Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="location-grid">
          {/* Directions Details */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* By Car or Bus */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-medium italic text-foreground">From Bangkok</h3>
              </div>
              <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                Take Sukhumvit Road (Route 3) all the way to Trat (approx. 315 km, 4-5 hours). Alternatively, convenient direct air-conditioned buses leave daily from Bangkok's Eastern Bus Terminal (Ekkamai) straight to the Trat Bus Station. From Trat Bus Terminal, we are a short 5-minute songthaew (local taxi) ride away.
              </p>
              <div className="bg-surface p-3 border border-border text-[11px] font-sans text-foreground/80">
                <p className="font-medium text-accent">Estimated Travel Times:</p>
                <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Bangkok (Ekkamai / Suvarnabhumi) — 4h 30m</li>
                  <li>Chanthaburi — 1h 15m</li>
                  <li>Trat Bus Station — 5m</li>
                </ul>
              </div>
            </div>

            {/* Island Ferry Connections */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl font-medium italic text-foreground">Ferry to Koh Chang</h3>
              </div>
              <p className="font-sans font-light text-xs text-muted-foreground leading-relaxed">
                Trat is the essential springboard to Koh Chang, Koh Kood, and Koh Mak. We are strategically situated just 25 minutes from Ao Thammachat Ferry Pier and Center Point Pier, where comfortable passenger & car ferries depart hourly to Koh Chang.
              </p>
              <div className="bg-surface p-3 border border-border text-[11px] font-sans text-foreground/80">
                <p className="font-medium text-accent">Island Transit Connections:</p>
                <p className="text-muted-foreground mt-1">
                  Once your modern, multi-language website is live, international guests will easily book unified guesthouse stays and ferry transfers in a single, high-converting digital package on their phones.
                </p>
              </div>
            </div>
          </div>

          {/* Map details panel / info card */}
          <div className="lg:col-span-5 bg-surface border border-border p-8 space-y-6">
            <div className="flex items-center gap-2 text-accent">
              <MapPin className="w-4 h-4" />
              <span className="label-caps text-[9px]">Location & Coordinates</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl italic font-semibold text-foreground">SK Hotel Trat</h3>
              
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                12/22 Thoncharoen Road, Bang Phra <br />
                Mueang Trat District, Trat Province <br />
                23000, Thailand
              </p>
            </div>

            <div className="aspect-[4/3] bg-background border border-border relative overflow-hidden flex flex-col items-center justify-center text-center p-6 group">
              {/* Minimalist Grid Pattern matching our elegant design style */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#323c4a_1px,transparent_1px),linear-gradient(to_bottom,#323c4a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
              <Compass className="w-10 h-10 text-accent/30 mb-3 animate-spin-slow group-hover:text-accent/60 transition-colors" />
              <p className="font-serif italic text-sm text-foreground mb-1">Trat Riverside Canal</p>
              <p className="font-sans text-[10px] text-muted-foreground max-w-[200px]">Quiet community guesthouse street near traditional wooden houses.</p>
              
              <div className="absolute bottom-3 right-3 bg-accent/10 border border-accent/20 px-2.5 py-1 text-[9px] font-mono text-accent">
                12.2418° N, 102.5113° E
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=SK+Guesthouse+Trat+Thailand"
              target="_blank"
              rel="noreferrer"
              className="block bg-accent hover:bg-accent/90 text-background text-center py-3 font-sans font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
