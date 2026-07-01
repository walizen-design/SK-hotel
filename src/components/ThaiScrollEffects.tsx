import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Wind, 
  Compass, 
  AlertCircle 
} from 'lucide-react';

interface ColorPalette {
  name: string;
  desc: string;
  background: string;
  surface: string;
  surfaceRaised: string;
  accent: string;
  border: string;
}

const TRADITIONAL_PALETTES: ColorPalette[] = [
  {
    name: "Phra Nakhon Indigo",
    desc: "Royal Blue & Warm Gold",
    background: "215 16% 9%",     // hsl(215 16% 9%)
    surface: "215 14% 13%",       // hsl(215 14% 13%)
    surfaceRaised: "215 12% 17%", // hsl(215 12% 17%)
    accent: "38 46% 56%",         // hsl(38 46% 56%)
    border: "215 10% 22%"         // hsl(215 10% 22%)
  },
  {
    name: "Sukhothai Vermilion",
    desc: "Terracotta Clay & Polished Bronze",
    background: "5 25% 8%",       // hsl(5 25% 8%)
    surface: "5 20% 12%",         // hsl(5 20% 12%)
    surfaceRaised: "5 18% 16%",   // hsl(5 18% 16%)
    accent: "28 52% 54%",         // hsl(28 52% 54%)
    border: "5 15% 19%"           // hsl(5 15% 19%)
  },
  {
    name: "Andaman Emerald",
    desc: "Deep Forest Sea & Glowing Brass",
    background: "165 24% 8%",     // hsl(165 24% 8%)
    surface: "165 18% 12%",       // hsl(165 18% 12%)
    surfaceRaised: "165 15% 16%", // hsl(165 15% 16%)
    accent: "36 50% 55%",         // hsl(36 50% 55%)
    border: "165 15% 18%"         // hsl(165 15% 18%)
  }
];

export default function ThaiScrollEffects() {
  // --- SCROLL LOGIC ---
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);

      // Determine which palette to use based on scroll progress
      // 0.0 - 0.33: Phra Nakhon Indigo
      // 0.33 - 0.66: Sukhothai Vermilion
      // 0.66 - 1.0: Andaman Emerald
      let index = 0;
      if (progress > 0.33 && progress <= 0.68) {
        index = 1;
      } else if (progress > 0.68) {
        index = 2;
      }
      
      if (index !== activePaletteIndex) {
        setActivePaletteIndex(index);
        applyPalette(TRADITIONAL_PALETTES[index]);
      }
    };

    const applyPalette = (palette: ColorPalette) => {
      const root = document.documentElement;
      root.style.setProperty('--color-background', `hsl(${palette.background})`);
      root.style.setProperty('--color-surface', `hsl(${palette.surface})`);
      root.style.setProperty('--color-surface-raised', `hsl(${palette.surfaceRaised})`);
      root.style.setProperty('--color-accent', `hsl(${palette.accent})`);
      root.style.setProperty('--color-border', `hsl(${palette.border})`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePaletteIndex]);


  // --- AUDIO SYNTHESIZER STATE & REFS ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<'both' | 'ocean' | 'ranat'>('both');
  const [volume, setVolume] = useState(0.4);
  const [showNotification, setShowNotification] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const oceanGainRef = useRef<GainNode | null>(null);
  const ranatGainRef = useRef<GainNode | null>(null);
  
  const waveIntervalRef = useRef<any>(null);
  const melodyTimeoutRef = useRef<any>(null);
  const isMusicRunningRef = useRef(false);

  // Traditional Thai pentatonic scale frequencies (Ranat Ek tuning in G/E pentatonic)
  const THAI_SCALE = [
    392.00, // G4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    987.77, // B5
    1174.66 // D6
  ];

  // Initialize Audio Context on click
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      // Create new AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(volume, ctx.currentTime);
      mainGain.connect(ctx.destination);
      mainGainRef.current = mainGain;

      // Sub-gains for individual elements
      const oceanGain = ctx.createGain();
      oceanGain.gain.setValueAtTime(audioMode === 'ranat' ? 0 : 0.6, ctx.currentTime);
      oceanGain.connect(mainGain);
      oceanGainRef.current = oceanGain;

      const ranatGain = ctx.createGain();
      ranatGain.gain.setValueAtTime(audioMode === 'ocean' ? 0 : 0.8, ctx.currentTime);
      ranatGain.connect(mainGain);
      ranatGainRef.current = ranatGain;

      // Generate Ocean Wave Noise
      setupOceanSynthesis(ctx, oceanGain);

      // Start Procedural Melody Loop
      isMusicRunningRef.current = true;
      startMelodyLoop(ctx, ranatGain);

    } catch (e) {
      console.error("Failed to initialize audio context:", e);
    }
  };

  // 1. Synthesize Tropical Ocean Waves
  const setupOceanSynthesis = (ctx: AudioContext, destGain: GainNode) => {
    // Generate white noise buffer
    const bufferSize = 4 * ctx.sampleRate; // 4 seconds of unique noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Source Node
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter node to create the "breeze/water" whoosh sound (Low-pass & Band-pass)
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    waveFilter.Q.value = 1.5;
    waveFilter.frequency.setValueAtTime(250, ctx.currentTime);

    // Dynamic Swell gain
    const swellGain = ctx.createGain();
    swellGain.gain.setValueAtTime(0.1, ctx.currentTime);

    // Connections
    noiseSource.connect(waveFilter);
    waveFilter.connect(swellGain);
    swellGain.connect(destGain);

    noiseSource.start(0);

    // Program a natural tidal rise and fall (modulating filter and volume)
    let swell = true;
    const cycleTime = 4500; // 4.5 seconds swell, 4.5 seconds back
    
    const runSwell = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
      
      const now = ctx.currentTime;
      if (swell) {
        // High tide: open filter, increase volume
        waveFilter.frequency.linearRampToValueAtTime(550, now + 4.2);
        swellGain.gain.linearRampToValueAtTime(0.45, now + 4.2);
      } else {
        // Low tide: close filter, lower volume
        waveFilter.frequency.linearRampToValueAtTime(150, now + 4.2);
        swellGain.gain.linearRampToValueAtTime(0.08, now + 4.2);
      }
      swell = !swell;
    };

    // Run first swell
    runSwell();
    waveIntervalRef.current = setInterval(runSwell, cycleTime);
  };

  // 2. Synthesize Ranat Ek (Thai Wooden Xylophone) percussion
  const playRanatNote = (ctx: AudioContext, freq: number, time: number, destGain: GainNode) => {
    // Tone 1: Wooden Bar Fundamental (Triangle wave)
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    // Tone 2: Warm Resonance Overtone (Sine wave)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.006, time); // slightly detuned for organic wooden drift

    // Tone 3: Mallet Strike Tick (High-frequency click)
    const strike = ctx.createOscillator();
    strike.type = 'triangle';
    strike.frequency.setValueAtTime(freq * 5.2, time);

    // Envelope gain nodes
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const strikeGain = ctx.createGain();

    // Attack / Decay Envelopes
    // Ranat Ek has an immediate striking attack and rapid wood-damping decay
    gain1.gain.setValueAtTime(0, time);
    gain1.gain.linearRampToValueAtTime(0.16, time + 0.003); // Instant attack
    gain1.gain.exponentialRampToValueAtTime(0.0001, time + 1.0); // Medium bar release

    gain2.gain.setValueAtTime(0, time);
    gain2.gain.linearRampToValueAtTime(0.08, time + 0.006);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + 0.6); // Shorter resonance

    strikeGain.gain.setValueAtTime(0, time);
    strikeGain.gain.linearRampToValueAtTime(0.24, time + 0.001);
    strikeGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.025); // Extremely short tick

    // Spatial Delay (Eco pavilion reverb vibe)
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.38; // 380ms delay
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.28; // Subtle feedback reflections

    // Connect oscillators to envelopes
    osc1.connect(gain1);
    osc2.connect(gain2);
    strike.connect(strikeGain);

    // Connect envelopes to destination
    gain1.connect(destGain);
    gain2.connect(destGain);
    strikeGain.connect(destGain);

    // Route fundamental to delay line for ambient feedback
    gain1.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay); // feedback loop
    delayGain.connect(destGain);

    // Fire nodes
    osc1.start(time);
    osc2.start(time);
    strike.start(time);

    // Stop nodes cleanly after decay to prevent memory leaks
    osc1.stop(time + 1.2);
    osc2.stop(time + 0.8);
    strike.stop(time + 0.1);
  };

  // 3. Procedural Meditative Melody Loop
  const startMelodyLoop = (ctx: AudioContext, destGain: GainNode) => {
    if (!isMusicRunningRef.current) return;

    const scheduleNextPhrase = () => {
      if (!isMusicRunningRef.current) return;

      const now = ctx.currentTime;
      
      // Determine a beautiful short phrase
      // Randomly choose between a solo slow note, a double strike, or a soft melodic roll
      const patternType = Math.random();
      let delayNext = 2500; // default delay to next pattern (2.5s)

      if (patternType < 0.35) {
        // Simple elegant single note
        const noteIndex = Math.floor(Math.random() * THAI_SCALE.length);
        playRanatNote(ctx, THAI_SCALE[noteIndex], now, destGain);
        delayNext = 1800 + Math.random() * 1400;

      } else if (patternType >= 0.35 && patternType < 0.70) {
        // Peaceful double strike (octave or adjacent harmony)
        const rootIndex = Math.floor(Math.random() * (THAI_SCALE.length - 2));
        const firstNote = THAI_SCALE[rootIndex];
        // Either octave (+5 steps in pentatonic) or harmonic third
        const secondNote = THAI_SCALE[rootIndex + 2] || THAI_SCALE[rootIndex + 1];
        
        playRanatNote(ctx, firstNote, now, destGain);
        playRanatNote(ctx, secondNote, now + 0.22, destGain);
        delayNext = 2200 + Math.random() * 1800;

      } else {
        // Traditional ascending or descending calming chime roll
        const ascending = Math.random() > 0.5;
        const startIndex = Math.floor(Math.random() * (THAI_SCALE.length - 4));
        const notes = [
          THAI_SCALE[startIndex],
          THAI_SCALE[startIndex + (ascending ? 1 : 2)],
          THAI_SCALE[startIndex + (ascending ? 2 : 1)],
          THAI_SCALE[startIndex + 3]
        ];

        notes.forEach((freq, idx) => {
          playRanatNote(ctx, freq, now + idx * 0.28, destGain);
        });
        delayNext = 3200 + Math.random() * 1500;
      }

      // Schedule next event
      melodyTimeoutRef.current = setTimeout(scheduleNextPhrase, delayNext);
    };

    scheduleNextPhrase();
  };

  // Toggle play-pause state
  const handleTogglePlay = async () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      triggerNotification();
      return;
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      await ctx.resume();
      setIsPlaying(true);
      triggerNotification();
    } else if (ctx.state === 'running') {
      await ctx.suspend();
      setIsPlaying(false);
    }
  };

  // Helper notification bubble
  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };

  // Handle master volume sliders
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (mainGainRef.current && audioCtxRef.current) {
      mainGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  // Change soundscape mode
  const handleModeChange = (mode: 'both' | 'ocean' | 'ranat') => {
    setAudioMode(mode);
    if (!audioCtxRef.current) return;
    
    const now = audioCtxRef.current.currentTime;
    if (oceanGainRef.current) {
      oceanGainRef.current.gain.linearRampToValueAtTime(
        mode === 'ranat' ? 0 : 0.6,
        now + 0.8
      );
    }
    if (ranatGainRef.current) {
      ranatGainRef.current.gain.linearRampToValueAtTime(
        mode === 'ocean' ? 0 : 0.8,
        now + 0.8
      );
    }
  };

  // Cleanup synthesizer on component unmount
  useEffect(() => {
    return () => {
      isMusicRunningRef.current = false;
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
      if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);


  return (
    <>
      {/* 1. VISUAL ORNAMENTS: TRADITIONAL LAI THAI LOTUS MOTIFS */}
      {/* Left side vertical watermarks */}
      <div 
        className="fixed left-0 top-1/4 h-[50vh] w-24 pointer-events-none z-0 hidden lg:block overflow-hidden opacity-[0.04] transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateY(${scrollProgress * -30}px) rotate(${scrollProgress * 15}deg)`,
          color: 'var(--color-accent)'
        }}
      >
        <svg viewBox="0 0 100 300" className="w-full h-full fill-current">
          {/* Handdrawn styled kranok curves */}
          <path d="M50,0 C80,50 90,120 50,180 C10,120 20,50 50,0 Z" />
          <path d="M50,40 C75,80 80,140 50,190 C20,140 25,80 50,40 Z" />
          <path d="M50,90 C68,120 72,165 50,210 C28,165 32,120 50,90 Z" />
          {/* Flame loops */}
          <path d="M10,150 C30,170 10,210 40,240 C20,240 10,220 5,190 Z" />
          <path d="M90,150 C70,170 90,210 60,240 C80,240 90,220 95,190 Z" />
          {/* Lotus base */}
          <path d="M50,220 C70,250 85,280 50,300 C15,280 30,250 50,220 Z" />
        </svg>
      </div>

      {/* Right side vertical watermarks */}
      <div 
        className="fixed right-0 top-1/3 h-[50vh] w-24 pointer-events-none z-0 hidden lg:block overflow-hidden opacity-[0.04] transition-all duration-1000 ease-in-out"
        style={{
          transform: `translateY(${scrollProgress * 30}px) rotate(${scrollProgress * -15}deg)`,
          color: 'var(--color-accent)'
        }}
      >
        <svg viewBox="0 0 100 300" className="w-full h-full fill-current">
          <path d="M50,0 C20,50 10,120 50,180 C90,120 80,50 50,0 Z" />
          <path d="M50,40 C25,80 20,140 50,190 C80,140 75,80 50,40 Z" />
          <path d="M50,90 C32,120 28,165 50,210 C72,165 68,120 50,90 Z" />
          <path d="M90,150 C70,170 90,210 60,240 C80,240 90,220 95,190 Z" />
          <path d="M10,150 C30,170 10,210 40,240 C20,240 10,220 5,190 Z" />
          <path d="M50,220 C30,250 15,280 50,300 C85,280 70,250 50,220 Z" />
        </svg>
      </div>

      {/* 2. PERSISTENT COLOR PRESET STATUS BAR (BOTTOM-LEFT) */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-1 select-none pointer-events-none">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur-md border border-border px-3 py-1.5 rounded-sm shadow-xl">
          <Compass className="w-3.5 h-3.5 text-accent animate-spin-slow" />
          <div className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
            <span>Theme:</span>
            <span className="text-foreground font-semibold">{TRADITIONAL_PALETTES[activePaletteIndex].name}</span>
          </div>
        </div>
        <div className="text-[8px] text-muted-foreground/50 font-mono pl-1">
          {TRADITIONAL_PALETTES[activePaletteIndex].desc}
        </div>
      </div>


      {/* 3. DYNAMIC AMBIENT AUDIO WIDGET (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
        
        {/* Notification Bubble */}
        {showNotification && (
          <div className="bg-surface border border-accent/40 px-4 py-3 shadow-2xl rounded-sm max-w-xs animate-fade-in text-xs font-sans relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            <p className="font-serif italic text-foreground font-semibold mb-1">
              Ambient Audio Initialized
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Playing custom synthesized tropical beach waves and a slow traditional Ranat Ek melody in your browser.
            </p>
          </div>
        )}

        {/* Audio Floating Board */}
        <div className="bg-background/95 backdrop-blur-md border border-accent/40 p-4 rounded-sm shadow-2xl flex flex-col gap-3 min-w-[190px] w-[210px] relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-full ${isPlaying ? 'bg-accent/10 text-accent animate-pulse' : 'bg-muted/10 text-muted-foreground'}`}>
                <Music className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif text-[11px] italic font-semibold text-foreground">
                Thai Soundscape
              </span>
            </div>
            
            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="p-1.5 bg-accent hover:bg-accent/90 text-background rounded-full transition-colors cursor-pointer"
              title={isPlaying ? "Mute Background Sound" : "Play Peaceful Background Music"}
              id="btn-toggle-soundscape"
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Sound State Visualizer (Sine representation) */}
          <div className="h-6 flex items-center justify-between px-1 bg-surface-raised/40 border border-border/40 rounded-sm overflow-hidden relative">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 w-full h-4">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-accent/80 rounded-t-sm"
                    style={{
                      height: `${10 + Math.sin(i * 0.5) * 40}%`,
                      animation: `wave-rise-fall 1.2s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.08}s`
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center text-[9px] font-mono text-muted-foreground/60 italic uppercase tracking-wider">
                Audio is muted
              </div>
            )}
          </div>

          {/* Mode Selectors */}
          <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
            <button
              onClick={() => handleModeChange('both')}
              className={`py-1 px-1.5 border transition-colors cursor-pointer text-center ${
                audioMode === 'both' 
                  ? 'bg-accent/10 border-accent/50 text-accent font-semibold' 
                  : 'bg-surface border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => handleModeChange('ocean')}
              className={`py-1 px-1.5 border transition-colors cursor-pointer text-center ${
                audioMode === 'ocean' 
                  ? 'bg-accent/10 border-accent/50 text-accent font-semibold' 
                  : 'bg-surface border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Ocean
            </button>
            <button
              onClick={() => handleModeChange('ranat')}
              className={`py-1 px-1.5 border transition-colors cursor-pointer text-center ${
                audioMode === 'ranat' 
                  ? 'bg-accent/10 border-accent/50 text-accent font-semibold' 
                  : 'bg-surface border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Ranat
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 pt-1 border-t border-border/40">
            <VolumeX className="w-3 h-3 text-muted-foreground shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-surface-raised accent-accent rounded-lg cursor-pointer transition-all appearance-none"
              title="Adjust Volume"
            />
            <Volume2 className="w-3 h-3 text-muted-foreground shrink-0" />
          </div>

          {/* Prompt Message */}
          {!isPlaying && (
            <div className="text-[8px] leading-snug text-accent/80 font-mono text-center flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5 animate-pulse" />
              <span>Click to play meditative ambience</span>
            </div>
          )}
        </div>
      </div>

      {/* Inject custom visual keyframe animations directly to style tag */}
      <style>{`
        @keyframes wave-rise-fall {
          0% { height: 15%; }
          100% { height: 85%; }
        }
        .animate-spin-slow {
          animation: spin 16s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
