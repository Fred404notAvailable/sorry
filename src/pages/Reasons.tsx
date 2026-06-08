import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Reasons() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Intro text animation
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
      }, "-=0.6");

    // Polaroid scroll reveal
    const cards = gsap.utils.toArray('.polaroid-card');

    gsap.from(cards, {
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: "top 85%",
      },
      y: 100,
      opacity: 0,
      rotation: () => gsap.utils.random(-15, 15),
      stagger: 0.15,
      duration: 1.2,
      ease: "back.out(1.4)"
    });

    // Polaroid hover effects
    cards.forEach((card: any, i) => {
      // Store original rotation to animate back to it
      const initialRotations = [-3, 2, -1, 3];
      const initialRot = initialRotations[i % 4];

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, rotation: 0, zIndex: 20, duration: 0.4, ease: "back.out(2)" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, rotation: initialRot, zIndex: 1, duration: 0.5, ease: "power2.out" });
      });
    });

    // Bottom stamp animation
    gsap.fromTo('.stamp-container',
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.bottom-stamp-section',
          start: "top 90%",
        },
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)"
      }
    );

  }, { scope: container });

  return (
    <div ref={container} className="bg-transparent -mx-container-padding px-container-padding -mt-32 pt-32 pb-8 z-0 rounded-xl relative">
      <div className="max-w-[800px] mx-auto relative z-10">

        {/* Hero Intro */}
        <section className="text-center mb-section-margin">
          <h1 className="intro-title font-headline-xl text-headline-xl mb-base text-primary">Every Little Thing</h1>
          <p className="intro-subtitle text-on-surface-variant max-w-md mx-auto italic">A digital memory board of all the reasons why you're the most special person in my world.</p>
        </section>

        {/* Gallery of Reasons */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Card 1 */}
          <div className="polaroid-card bg-white/70 backdrop-blur-md p-4 pb-12 shadow-[0_8px_30px_rgb(134,78,90,0.12)] -rotate-3 border border-white/50 cursor-pointer">
            <div className="relative w-full aspect-square mb-6 bg-surface-dim overflow-hidden rounded-sm">
              <img
                src="/images/reason-1.jpeg"
                alt="Heart"
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
              />
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
            <p className="font-display-handwritten text-display-handwritten text-center text-on-surface">The way you smile</p>
          </div>

          {/* Card 2 */}
          <div className="polaroid-card bg-white/70 backdrop-blur-md p-4 pb-12 shadow-[0_8px_30px_rgb(134,78,90,0.12)] rotate-2 border border-white/50 cursor-pointer">
            <div className="relative w-full aspect-square mb-6 bg-surface-dim overflow-hidden rounded-sm">
              <img
                src="/images/reason-2.jpeg"
                alt="Hands reaching"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
            <p className="font-display-handwritten text-display-handwritten text-center text-on-surface">Your Hair</p>
          </div>

          {/* Card 3 */}
          <div className="polaroid-card bg-white/70 backdrop-blur-md p-4 pb-12 shadow-[0_8px_30px_rgb(134,78,90,0.12)] -rotate-1 border border-white/50 md:mt-12 cursor-pointer">
            <div className="relative w-full aspect-square mb-6 bg-surface-dim overflow-hidden rounded-sm">
              <img
                src="/images/reason-3.jpeg"
                alt="Coffee mug"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
            <p className="font-display-handwritten text-display-handwritten text-center text-on-surface">The way i can be myself </p>
          </div>

          {/* Card 4 */}
          <div className="polaroid-card bg-white/70 backdrop-blur-md p-4 pb-12 shadow-[0_8px_30px_rgb(134,78,90,0.12)] rotate-3 border border-white/50 cursor-pointer">
            <div className="relative w-full aspect-square mb-6 bg-surface-dim overflow-hidden rounded-sm">
              <img
                src="/images/reason-4.jpeg"
                alt="Landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
            <p className="font-display-handwritten text-display-handwritten text-center text-on-surface">Nee avalo alagu</p>
          </div>
        </div>

        {/* Specialty Component: The Stamp */}
        <div className="bottom-stamp-section flex flex-col items-center mt-section-margin mb-section-margin relative z-10">
          <div className="stamp-container w-24 h-24 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg cursor-pointer overflow-hidden relative group">
            <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <p className="mt-base font-display-handwritten text-primary text-xl">I'm Sorry</p>
          <div className="mt-2 flex gap-2">
            <span className="px-3 py-1 bg-white/40 backdrop-blur-sm border border-dashed border-white/50 text-label-md font-label-md text-primary rounded-full">🥺 Sincere</span>
            <span className="px-3 py-1 bg-white/40 backdrop-blur-sm border border-dashed border-white/50 text-label-md font-label-md text-primary rounded-full">🌸 Sweet</span>
          </div>
        </div>

      </div>
    </div>
  );
}
