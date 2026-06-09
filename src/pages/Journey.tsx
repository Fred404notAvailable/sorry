import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Intro entrance
    tl.from('.intro-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
      .from('.intro-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6")
      .from('.floating-sparkle', {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(2)"
      }, "-=0.8");

    // Draw SVG Path on Scroll
    const path = document.querySelector('.handwritten-path') as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: '.timeline-container',
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      });
    }

    // Timeline Cards Scroll Reveal
    const cards = gsap.utils.toArray('.timeline-card-wrapper');
    cards.forEach((card: any, index: number) => {
      const isEven = index % 2 === 0;
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        x: isEven ? 50 : -50,
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Particle Hover Effect
    const timelineCards = gsap.utils.toArray('.timeline-card');
    timelineCards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        const heart = document.createElement('div');
        heart.innerHTML = '🌸';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 80 + 10 + '%';
        heart.style.top = '100%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '50';
        card.appendChild(heart);

        gsap.to(heart, {
          y: -60,
          opacity: 0,
          rotation: Math.random() * 60 - 30,
          duration: 1.5,
          ease: "power1.out",
          onComplete: () => heart.remove()
        });
      });
    });

    // Final Seal Animation
    gsap.from('.final-seal', {
      scrollTrigger: {
        trigger: '.final-seal-container',
        start: "top 90%",
      },
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.4)"
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-transparent -mx-container-padding px-container-padding -mt-32 pt-32 pb-section-margin z-0 relative">
      <div className="max-w-[800px] mx-auto relative z-10">

        {/* Background doodles */}
        <div className="absolute top-40 left-0 text-primary-container opacity-40 animate-float" style={{ animationDelay: '0s' }}>
          <span className="material-symbols-outlined text-5xl floating-sparkle">auto_awesome</span>
        </div>
        <div className="absolute top-96 right-0 text-primary-container opacity-40 animate-float" style={{ animationDelay: '1s' }}>
          <span className="material-symbols-outlined text-4xl floating-sparkle" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <div className="absolute bottom-40 left-10 text-primary-container opacity-40 animate-float" style={{ animationDelay: '2s' }}>
          <span className="material-symbols-outlined text-5xl floating-sparkle">potted_plant</span>
        </div>

        <section className="text-center mb-16 relative z-10">
          <h1 className="intro-title font-headline-xl text-headline-xl text-primary mb-2">Our Journey Together</h1>
          <p className="intro-subtitle text-on-surface-variant italic">Every step, every laugh, and every lesson led us here.</p>
        </section>

        {/* The Timeline Path SVG */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[400px] h-[1800px] pointer-events-none z-0 hidden md:block">
          <svg fill="none" height="100%" viewBox="0 0 400 1800" width="100%" xmlns="http://www.w3.org/2000/svg">
            <path
              className="handwritten-path"
              d="M200 0 C200 100 230 150 230 300 C230 450 170 500 170 650 C170 800 230 850 230 1000 C230 1150 170 1200 170 1350 C170 1500 200 1600 200 1800"
              stroke="#d4787d"
              strokeDasharray="12 12"
              strokeLinecap="round"
              strokeWidth="3"
              opacity="0.6"
            ></path>
          </svg>
        </div>

        {/* Timeline Items */}
        <div className="timeline-container space-y-32 md:space-y-0 md:relative z-10">

          {/* Milestone 1 (Right) */}
          <div className="timeline-card-wrapper flex flex-col md:flex-row items-center md:justify-end md:mb-40">
            <div className="md:w-1/2 md:pl-12 text-left">
              <div className="timeline-card bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-xl p-8 shadow-[0_8px_30px_rgb(134,78,90,0.15)] relative hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-8 -left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 md:hidden">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm text-primary rounded-full text-label-md font-label-md mb-4 border border-dashed border-white/60">May 1, 2025</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">Mayandi Kudumbathar</h3>
                <p className="text-on-surface-variant">The day we saw our first movie together na periya puluthi mari english la pesitu ierundhen punda mari .</p>
              </div>
            </div>
          </div>

          {/* Milestone 2 (Left) - NEW PLACEHOLDER */}
          <div className="timeline-card-wrapper flex flex-col md:flex-row items-center md:justify-start md:mb-40">
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <div className="timeline-card bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-xl p-8 shadow-[0_8px_30px_rgb(134,78,90,0.15)] relative hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-8 -right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <div className="absolute -top-4 -left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 md:hidden">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm text-primary rounded-full text-label-md font-label-md mb-4 border border-dashed border-white/60">Nov 29, 2025</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">The big day</h3>
                <p className="text-on-surface-variant">The day you said you love me too parandhen vanathula en akka paktahla thaan ierundha sirichutu ierundhe apo yarume kannuku therla only you</p>
              </div>
            </div>
          </div>

          {/* Milestone 3 (Right) - Old M2 "First meet" */}
          <div className="timeline-card-wrapper flex flex-col md:flex-row items-center md:justify-end md:mb-40">
            <div className="md:w-1/2 md:pl-12 text-left">
              <div className="timeline-card bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-xl p-8 shadow-[0_8px_30px_rgb(134,78,90,0.15)] relative hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-8 -left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex">
                  <span className="material-symbols-outlined">park</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 md:hidden">
                  <span className="material-symbols-outlined">park</span>
                </div>
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm text-primary rounded-full text-label-md font-label-md mb-4 border border-dashed border-white/60">Jan 11, 2026</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">First meet</h3>
                <p className="text-on-surface-variant">The day i came to my home for the first time. Easily the best day in my whole life and always will be </p>
              </div>
            </div>
          </div>

          {/* Milestone 4 (Left) - Old M3 "Second meet" */}
          <div className="timeline-card-wrapper flex flex-col md:flex-row items-center md:justify-start md:mb-40">
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <div className="timeline-card bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-xl p-8 shadow-[0_8px_30px_rgb(134,78,90,0.15)] relative hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-8 -right-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <div className="absolute -top-4 -left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 md:hidden">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm text-primary rounded-full text-label-md font-label-md mb-4 border border-dashed border-white/60">Jan 31, 2026</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">Second meet</h3>
                <p className="text-on-surface-variant">I would've peacefully died in that ukadam lake. everytime when i leave you i feel like someone stabbing my throat apdiyee pudikura mari ierukum.</p>
              </div>
            </div>
          </div>

          {/* Milestone 5 (Right) - Old M4 "KCT" (Image Focus) */}
          <div className="timeline-card-wrapper flex flex-col md:flex-row items-center md:justify-end md:mb-40">
            <div className="md:w-1/2 md:pl-12 text-left">
              <div className="timeline-card bg-white/90 backdrop-blur-xl border-2 border-white/60 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(134,78,90,0.15)] relative hover:-translate-y-2 hover:scale-[1.02] transition-transform duration-300 text-left">
                <div className="absolute top-32 -left-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 hidden md:flex">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 md:hidden">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <img
                  src="/images/journey-hero.jpeg"
                  alt="Soft moments"
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm text-primary rounded-full text-label-md font-label-md mb-4 border border-dashed border-white/60">Mar 6, 2026</span>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">KCT</h3>
                  <p className="text-on-surface-variant">Perfect day. un madi la toonguna apo ve apdi yee sethurupen it was the perfect and that gift you gave me i cried in my room while keeping it in my bag.</p>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* The Seal (Sign-off) */}
        <div className="final-seal-container flex justify-center mt-32 relative z-10">
          <div className="final-seal relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-lg overflow-hidden">
              {/* Scalloped Edge Effect */}
              <div className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="text-center text-white px-2 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl block" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <p className="font-[Dancing Script] text-xl">Always</p>
              </div>
            </div>
            {/* Wax seal drips style doodles */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-[Dancing Script] text-primary text-2xl">I'm so sorry, truly.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
