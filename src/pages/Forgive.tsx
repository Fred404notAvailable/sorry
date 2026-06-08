import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Forgive() {
  const container = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [noText, setNoText] = useState("No");
  const [showSeal, setShowSeal] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    // Initial entrance animations
    const tl = gsap.timeline();
    
    tl.from('.puppy-container', {
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)"
    })
    .from('.header-text', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8")
    .from('.action-btn', {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(2)"
    }, "-=0.4");
  }, { scope: container });

  const handleNoClick = () => {
    const phrases = ["Are you sure?", "Really?", "Think again...", "Pretty please?", "I'll be good!", "Don't be mean!", "Pout..."];
    setNoText(phrases[Math.floor(Math.random() * phrases.length)]);
    
    setYesScale(prev => prev + 0.4);
    setNoScale(prev => Math.max(0.2, prev - 0.1));
    
    setNoPosition({
      x: noPosition.x + (Math.random() * 60 - 30),
      y: noPosition.y + (Math.random() * 60 - 30)
    });
  };

  const handleYesClick = () => {
    setShowSeal(true);
  };

  // Animate seal and confetti when showSeal becomes true
  useGSAP(() => {
    if (showSeal && sealRef.current) {
      // Animate the seal pop-in
      gsap.fromTo('.seal-inner', 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );

      // Create GSAP Confetti
      const colors = ['#ffb7c5', '#864e5a', '#fbb3c1', '#ffd9df'];
      for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.borderRadius = '50%';
        conf.style.left = '50%';
        conf.style.top = '50%';
        conf.style.pointerEvents = 'none';
        sealRef.current.appendChild(conf);

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;
        
        gsap.to(conf, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance + 200, // add gravity effect by dropping y more
          opacity: 0,
          rotation: Math.random() * 360,
          duration: 1.5 + Math.random() * 1.5,
          ease: "power2.out",
          onComplete: () => conf.remove()
        });
      }
    }
  }, [showSeal]);

  const resetState = () => {
    gsap.to('.seal-inner', {
      scale: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setShowSeal(false);
        setYesScale(1);
        setNoScale(1);
        setNoText("No");
        setNoPosition({ x: 0, y: 0 });
      }
    });
  };

  return (
    <div ref={container} className="bg-transparent -mx-container-padding px-container-padding -mt-32 pt-32 pb-section-margin z-0 flex flex-col items-center justify-center min-h-screen">
      
      {/* Background Soft Gradient Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-container/30 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-surface-container-highest/40 blur-[120px] rounded-full"></div>
      </div>

      <div className="flex flex-col items-center justify-center max-w-[800px] mx-auto w-full relative z-10">
        
        {/* Character Illustration Container */}
        <div className="puppy-container w-full max-w-[400px] aspect-square relative mb-element-gap animate-float">
          <div className="absolute inset-0 bg-secondary-container/20 rounded-full blur-3xl"></div>
          <img 
            src="/images/forgive-hero.jpeg" 
            alt="Sad puppy looking up with big eyes" 
            className="w-full h-full object-cover rounded-[40px] shadow-sm shadow-primary/10 border-4 border-surface" 
          />
          {/* Hand-drawn Doodle Overlays */}
          <div className="absolute -top-4 -right-4 text-primary opacity-40">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div className="absolute -bottom-2 -left-4 text-primary opacity-40">
            <span className="material-symbols-outlined text-4xl rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        </div>

        <div className="text-center max-w-[600px]">
          <div className="header-text inline-flex items-center gap-2 px-3 py-1 bg-white/40 backdrop-blur-md border border-dashed border-white/50 rounded-full mb-base shadow-sm">
            <span className="text-[14px]">🥺</span>
            <span className="font-label-md text-label-md text-on-surface-variant">Sincere Request</span>
          </div>
          <h1 className="header-text font-headline-xl text-headline-xl text-primary mb-base">Will you forgive me?</h1>
          <p className="header-text font-body-md text-body-md text-on-surface-variant opacity-80 leading-relaxed mb-section-margin">
            I know I messed up, and my heart feels a little heavy. I truly value us more than anything else. Can we start over?
          </p>
        </div>

        {/* Interaction Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-[480px]">
          {/* NO Button */}
          <button 
            onClick={handleNoClick}
            className="action-btn order-2 sm:order-1 px-10 py-4 rounded-full bg-white/60 backdrop-blur-md text-on-surface border border-white/50 font-label-md text-label-md shadow-sm transition-colors duration-300 hover:bg-white/80 hover:shadow-md"
            style={{ 
              transform: `scale(${noScale}) translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {noText}
          </button>
          
          {/* YES Button */}
          <button 
            onClick={handleYesClick}
            className="action-btn order-1 sm:order-2 px-12 py-5 rounded-full bg-primary text-white font-label-md text-headline-lg-mobile shadow-[0_8px_20px_rgba(134,78,90,0.3)] transition-colors duration-300 hover:bg-primary/90 flex items-center gap-2"
            style={{ 
              transform: `scale(${yesScale})`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            Yes
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </button>
        </div>

      </div>

      {/* "The Stamp" - Wax Seal Motif (Initially Hidden) */}
      {showSeal && (
        <div ref={sealRef} className="fixed inset-0 z-[60] flex items-center justify-center bg-surface/60 backdrop-blur-sm overflow-hidden">
          <div className="seal-inner relative">
            <div className="w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative stamp-effect">
              {/* Scalloped Edge Effect */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/30 animate-[spin_20s_linear_infinite]"></div>
              <span className="material-symbols-outlined text-6xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="font-[Dancing Script] text-3xl">Thank You</span>
              <p className="text-[10px] uppercase tracking-widest mt-1 opacity-70">Forever Yours</p>
            </div>
            <button 
              onClick={resetState}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-label-md text-primary underline underline-offset-4 hover:opacity-80"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
