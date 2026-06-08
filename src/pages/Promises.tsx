import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Promises() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Header
    tl.from('.header-text', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Letter entrance
    tl.from('.letter-container', {
      y: 50,
      rotation: -3,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.2)"
    }, "-=0.5");

    // List items stagger
    gsap.from('.promise-item', {
      scrollTrigger: {
        trigger: '.letter-container',
        start: "top 70%",
      },
      x: -30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    });

    // Bento Grid Reveal
    gsap.from('.insight-card', {
      scrollTrigger: {
        trigger: '.insights-grid',
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Hover effect for list items using GSAP
    const items = gsap.utils.toArray('.promise-item');
    items.forEach((item: any) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.02, rotation: -1, color: '#864e5a', duration: 0.3 });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, rotation: 0, color: 'inherit', duration: 0.3 });
      });
    });

  }, { scope: container });

  // Signature Pad Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    ctx.strokeStyle = '#864e5a';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      [lastX, lastY] = [x, y];
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      if (e instanceof MouseEvent) {
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
      } else {
        [lastX, lastY] = [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
        e.preventDefault();
      }
    };

    const stopDrawing = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div ref={container} className="pb-section-margin">
      {/* Hero Section / Context */}
      <section className="mb-section-margin text-center">
        <h1 className="header-text font-headline-xl text-headline-xl text-primary mb-4">My Heart on Paper</h1>
        <p className="header-text text-on-surface-variant max-w-lg mx-auto">Sometimes words are easier when they're written down. These are the things I want to hold myself to, just for you.</p>
      </section>

      {/* The Letter Component */}
      <div className="letter-container relative bg-white rounded-xl shadow-[0_10px_30px_rgba(134,78,90,0.15)] overflow-hidden transform rotate-1 mb-section-margin">
        {/* Decorative Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-primary/10 backdrop-blur-sm transform rotate-2 z-10"></div>

        <div className="lined-paper p-10 pt-16 min-h-[600px]">
          <div className="pl-12">
            <p className="font-[Dancing Script] text-3xl text-primary mb-8 opacity-80">Dear You,</p>
            <ul className="space-y-2">
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise to listen more than I speak.</span>
              </li>
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise to always bring you snacks.</span>
              </li>
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>nightlight</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise i will never do that again.</span>
              </li>
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise i will do whatever you say .</span>
              </li>
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise i won't cry.</span>
              </li>
              <li className="promise-item flex items-center gap-4 cursor-default">
                <span className="material-symbols-outlined text-primary/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span className="font-[Dancing Script] text-2xl text-on-surface transition-colors">I promise to choose you, every single day.</span>
              </li>
            </ul>

            <div className="mt-16 text-right pr-4">
              <p className="font-[Dancing Script] text-2xl text-primary mb-2 opacity-80">With all my love,</p>
              {/* Digital Signature Area */}
              <div className="inline-block relative">
                <canvas
                  ref={canvasRef}
                  className="signature-pad border-b-2 border-dashed border-primary/30 w-64 h-32 relative z-10"
                  height="128"
                  width="256"
                ></canvas>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none z-0">
                  <span className="font-[Dancing Script] text-lg">Sign here...</span>
                </div>
                <button
                  onClick={clearSignature}
                  className="absolute -right-8 bottom-2 material-symbols-outlined text-on-surface-variant/40 hover:text-primary transition-colors text-sm z-20"
                >
                  refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wax Seal Decoration */}
        <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-primary flex items-center justify-center stamp-effect transform -rotate-12 border-4 border-primary-container">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
      </div>

      {/* Bento Grid Insights */}
      <div className="insights-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-section-margin">
        <div className="insight-card md:col-span-2 bg-surface-container rounded-xl p-6 relative overflow-hidden group">
          <div className="flex flex-col h-full justify-between relative z-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full border border-primary/20 text-xs font-label-md text-primary mb-4 bg-white/50 backdrop-blur-sm">MOOD: 🌸 SWEET</span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Our Growth</h3>
              <p className="text-on-surface-variant text-sm">Every promise here is a stepping stone toward a better version of us. I'm learning every day.</p>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="w-2 h-2 rounded-full bg-primary/40"></span>
              <span className="w-2 h-2 rounded-full bg-primary/20"></span>
            </div>
          </div>
          <img
            src="/images/promises-hero.jpeg"
            alt="Dried flowers"
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
          />
        </div>
        <div className="insight-card bg-primary text-on-primary rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
          </div>
          <p className="font-[Dancing Script] text-xl italic">"Love is a quiet promise."</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center insight-card">
        <button className="bg-primary text-white font-label-md px-10 py-4 rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2 group">
          Save My Promises
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
