import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial Page Load Animations (Hero Section)
    tl.from('.hero-img', {
      scale: 0.8,
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
      .from('.hero-badge', {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(2)"
      }, "-=0.8")
      .from('.hero-title-word', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      }, "-=0.6")
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");

    // 2. Parallax Hover Effect for Hero Image
    const heroImgContainer = document.querySelector('.hero-img-container') as HTMLElement;
    const heroImg = document.querySelector('.hero-img') as HTMLElement;

    if (heroImgContainer && heroImg) {
      heroImgContainer.addEventListener('mousemove', (e) => {
        const rect = heroImgContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;

        gsap.to(heroImg, {
          x: x,
          y: y,
          rotationY: x,
          rotationX: -y,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      heroImgContainer.addEventListener('mouseleave', () => {
        gsap.to(heroImg, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });
      });
    }

    // 3. Scroll Reveal for Bento Grid with complex staggering
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: '.bento-grid',
        start: "top 85%",
      },
      y: 100,
      opacity: 0,
      rotation: 2,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // 4. Bento Card Hover Effects (using GSAP instead of pure CSS)
    const cards = gsap.utils.toArray('.bento-card');
    cards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
      });
    });

    // 5. Stamp Animation on scroll (Wax Seal)
    gsap.fromTo('.wax-seal',
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.seal-section',
          start: "top 85%",
        },
        scale: 1,
        rotation: 12,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }
    );



  }, { scope: container });

  // Split title into words for staggered animation
  const titleWords = "I'm So Sorry, Rasathi".split(' ');

  return (
    <div ref={container} className="pt-8 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-base mb-section-margin relative z-10">
        <div className="hero-img-container relative w-full max-w-md aspect-square mb-element-gap group perspective-1000">
          <img
            src="/images/home-hero.jpeg"
            alt="Heart Illustration"
            className="hero-img w-full h-full object-contain rounded-xl shadow-sm"
          />
          <div className="hero-badge absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center bg-primary-container rounded-full shadow-md">
            <span className="material-symbols-outlined text-on-primary-container animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-primary md:font-headline-xl md:text-headline-xl text-headline-xl-mobile font-headline-xl-mobile flex flex-wrap justify-center gap-x-3 overflow-hidden">
          {titleWords.map((word, index) => (
            <span key={index} className="hero-title-word inline-block">{word}</span>
          ))}
        </h1>

        <p className="hero-subtitle font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-4 leading-relaxed">
          I know words can't always fix the hurt, but I wanted to build this little corner of the world just for you. You are the most important person in my life, and I'll do whatever it takes to make things right.
        </p>


      </section>

      {/* Bento Apology Grid */}
      <section className="bento-grid grid grid-cols-1 md:grid-cols-2 gap-element-gap mb-section-margin relative z-10">
        {/* Large Card */}
        <div className="bento-card bg-surface-container p-container-padding rounded-xl flex flex-col justify-between min-h-[300px] shadow-sm relative overflow-hidden border border-outline-variant/30">
          <span className="material-symbols-outlined absolute top-4 right-4 text-primary/40 transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/20 rounded-full px-3 py-1 mb-4 bg-white/50 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
              <span className="font-label-md text-[12px] text-primary uppercase tracking-widest">Our Story</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-primary mb-2">The Moments That Matter</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Every laugh we shared and every day we spent together is a treasure to me.</p>
          </div>
          <div className="mt-6 flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-primary shadow-sm z-30">🌸</div>
            <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-primary shadow-sm z-20">✨</div>
            <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-primary shadow-sm z-10">🧸</div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-element-gap">
          {/* Promise Card */}
          <div className="bento-card bg-white p-6 rounded-xl hand-drawn-border border-outline-variant/40 flex flex-col justify-center gap-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-surface-container-highest p-3 rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-primary">A Sincere Promise</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">To listen more, react less, and always cherish you.</p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 text-[120px] pointer-events-none material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</div>
          </div>

          {/* Mood Tag Card */}
          <div className="bento-card bg-primary-fixed p-6 rounded-xl flex flex-wrap gap-3 content-center justify-center items-center shadow-sm border border-primary/10">
            <span className="hand-drawn-border border-primary/30 px-4 py-2 rounded-full font-label-md text-[13px] text-primary flex items-center gap-2 bg-surface-bright shadow-sm">
              🥺 Sincere
            </span>
            <span className="hand-drawn-border border-primary/30 px-4 py-2 rounded-full font-label-md text-[13px] text-primary flex items-center gap-2 bg-surface-bright shadow-sm">
              🌸 Sweet
            </span>
            <span className="hand-drawn-border border-primary/30 px-4 py-2 rounded-full font-label-md text-[13px] text-primary flex items-center gap-2 bg-surface-bright shadow-sm">
              💖 Devoted
            </span>
            <span className="hand-drawn-border border-primary/30 px-4 py-2 rounded-full font-label-md text-[13px] text-primary flex items-center gap-2 bg-surface-bright shadow-sm">
              🎀 Princess
            </span>
          </div>
        </div>
      </section>

      {/* The Stamp (Wax Seal) Section */}
      <section className="seal-section flex flex-col items-center gap-element-gap py-section-margin relative z-10">
        <div className="wax-seal w-32 h-32 scalloped-seal flex items-center justify-center shadow-xl cursor-pointer">
          <div className="text-center">
            <span className="material-symbols-outlined text-white text-4xl block" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-display-handwritten text-white text-sm tracking-wider">Love</span>
          </div>
        </div>
        <p className="font-display-handwritten text-display-handwritten text-primary text-center mt-6 text-2xl">
          "Forever &amp; Always, Yours."
        </p>
      </section>
    </div>
  );
}
