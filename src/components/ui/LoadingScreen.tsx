import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [isRendered, setIsRendered] = useState(true);
  const [progress, setProgress] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  // Generate random petals and sparkles
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const isPetal = Math.random() > 0.4;
    const size = isPetal ? Math.random() * 15 + 10 : Math.random() * 10 + 5;
    const startX = Math.random() * 100;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * -5; // Negative delay so they are already on screen
    const rotation = Math.random() * 360;
    
    return { id: i, isPetal, size, startX, duration, delay, rotation };
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRendered(false);
      }
    });

    // Animate falling petals
    gsap.utils.toArray('.particle').forEach((particle: any) => {
      gsap.fromTo(particle, 
        { y: '-10vh', rotation: () => Math.random() * 360, opacity: 0 },
        { 
          y: '110vh', 
          rotation: '+=360', 
          opacity: () => Math.random() * 0.5 + 0.3,
          x: `+=${Math.random() * 50 - 25}vw`,
          duration: () => Math.random() * 4 + 4,
          ease: "none",
          repeat: -1,
          delay: () => Math.random() * -5
        }
      );
    });

    // Beating heart icon
    gsap.to('.beating-heart', {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Progress counter animation (runs alongside everything else)
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 3.5,
      delay: 0.5,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].val));
      }
    });

    // 1. Animate the corner flowers blooming / scaling in
    tl.fromTo('.corner-flower-tl', 
      { scale: 0.8, opacity: 0, x: -50, y: -50, rotation: -15 },
      { scale: 1, opacity: 1, x: 0, y: 0, rotation: 0, duration: 2, ease: "power3.out" }
    )
    .fromTo('.corner-flower-br', 
      { scale: 0.8, opacity: 0, x: 50, y: 50, rotation: 15 },
      { scale: 1, opacity: 1, x: 0, y: 0, rotation: 0, duration: 2, ease: "power3.out" },
      "-=1.5" // overlap
    );

    // 2. Gentle continuous sway for the flowers
    gsap.to('.corner-flower-tl', {
      rotation: 3,
      transformOrigin: "top left",
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut"
    });

    gsap.to('.corner-flower-br', {
      rotation: -3,
      transformOrigin: "bottom right",
      repeat: -1,
      yoyo: true,
      duration: 5,
      ease: "sine.inOut"
    });

    // 3. Center text fade in
    tl.fromTo('.loading-text-container',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "-=1.5"
    );

    // 4. Cool exit animation
    tl.to('.particle', { opacity: 0, duration: 1 }, "+=2.5")
      .to('.corner-flower-tl', { x: '-20vw', y: '-20vh', opacity: 0, duration: 1.5, ease: "power3.inOut" }, "<")
      .to('.corner-flower-br', { x: '20vw', y: '20vh', opacity: 0, duration: 1.5, ease: "power3.inOut" }, "<")
      .to('.loading-text-container', { scale: 1.2, opacity: 0, filter: "blur(10px)", duration: 1.2, ease: "power3.in" }, "<")
      .to(container.current, { 
        yPercent: -100, 
        borderBottomLeftRadius: "50%", 
        borderBottomRightRadius: "50%", 
        duration: 1.5, 
        ease: "power4.inOut" 
      }, "-=0.8");

  }, { scope: container });

  if (!isRendered) return null;

  return (
    <div 
      ref={container} 
      className="fixed inset-0 z-[100] bg-[#fffafb] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles (Petals & Sparkles) */}
      {particles.map((p) => (
        <span 
          key={p.id}
          className={`particle absolute material-symbols-outlined pointer-events-none z-0 ${p.isPetal ? 'text-[#d4787d]' : 'text-[#fbb3c1]'}`}
          style={{ 
            left: `${p.startX}vw`,
            fontSize: `${p.size}px`,
            fontVariationSettings: p.isPetal ? "'FILL' 1" : "'FILL' 0",
            opacity: 0 // handled by GSAP
          }}
        >
          {p.isPetal ? 'eco' : 'flare'}
        </span>
      ))}

      {/* Top Left Flower Branch */}
      <img 
        src="/images/flower-tl.png" 
        alt="Cherry Blossom Branch" 
        className="corner-flower-tl absolute top-0 left-0 w-[60vmin] max-w-[500px] object-contain opacity-90 pointer-events-none drop-shadow-sm z-10"
        style={{ transformOrigin: 'top left' }}
      />

      {/* Bottom Right Flower Branch */}
      <img 
        src="/images/flower-br.png" 
        alt="Cherry Blossom Branch" 
        className="corner-flower-br absolute bottom-0 right-0 w-[70vmin] max-w-[600px] object-contain opacity-90 pointer-events-none drop-shadow-sm z-10"
        style={{ transformOrigin: 'bottom right' }}
      />

      {/* Light Leak Overlays for richer atmosphere */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-radial from-[#ffd9df]/40 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-gradient-radial from-[#e4e3db]/40 to-transparent blur-3xl pointer-events-none"></div>

      {/* Center Content */}
      <div className="loading-text-container relative z-20 flex flex-col items-center justify-center h-full gap-8 text-center px-4">
        
        {/* Giant Percentage */}
        <div className="relative">
          <div 
            className="percentage-text text-[#d4787d] tracking-tighter drop-shadow-lg font-medium" 
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '28vmin', lineHeight: 0.8 }}
          >
            {progress}<span className="text-[12vmin] text-[#b78d91]/60 font-light ml-2">%</span>
          </div>
        </div>

        {/* Text Details below the percentage */}
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl text-[#b78d91] leading-tight tracking-tight drop-shadow-sm" style={{ fontFamily: "'Erotique', serif" }}>
            I'm so sorry, <span className="text-[#88a573]">Rasathi.</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 mt-6 opacity-80">
            <span className="material-symbols-outlined text-[#b78d91] beating-heart text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <p className="text-xl md:text-2xl text-[#b78d91] italic tracking-wider" style={{ fontFamily: "'Erotique', serif" }}>
              Loading our special place...
            </p>
            <span className="material-symbols-outlined text-[#b78d91] beating-heart text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        </div>

      </div>
    </div>
  );
}
