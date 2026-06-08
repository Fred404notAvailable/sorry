import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Letter() {
  const container = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline();

    tl.from('.letter-container', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
      .from('.header-element', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from('.letter-paragraph', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out"
      }, "-=0.4")
      .from('.letter-image', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .from('.signature-element', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .from('.action-btn', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.5)"
      }, "-=0.4");
  }, { scope: container });

  // Mousemove parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.parallax-layer', {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => console.log('Audio requires interaction'));
      setIsPlaying(true);
    }
  };

  return (
    <div ref={container} className="-mx-container-padding px-container-padding -mt-32 pt-32 pb-24 relative overflow-hidden flex flex-col items-center">

      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/atmosphere.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle Floating Button (Desktop) */}
      <div className="fixed top-24 right-4 md:right-8 z-40">
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 shadow-md ${isPlaying ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'}`}
        >
          <span className="material-symbols-outlined text-[20px]">{isPlaying ? 'pause' : 'music_note'}</span>
          <span className="font-label-md text-label-md hidden sm:block">Atmosphere</span>
        </button>
      </div>

      <div className="w-full max-w-[800px] relative z-10">
        {/* Whimsical Accents */}
        <div className="absolute top-20 right-4 md:-right-10 opacity-20 pointer-events-none parallax-layer" style={{ zIndex: 0 }}>
          <img
            className="w-48 h-48 object-contain"
            src="/images/letter-1.jpeg"
            alt="Floral watercolor"
          />
        </div>

        {/* Whimsical Doodles */}
        <div className="absolute bottom-10 left-10 opacity-30 select-none parallax-layer" style={{ zIndex: 0 }}>
          <span className="material-symbols-outlined text-primary text-[32px] rotate-12">auto_awesome</span>
        </div>

        {/* The Letter Container */}
        <article className="letter-container bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-lg shadow-primary/5 p-8 md:p-16 relative letter-paper min-h-[1000px] z-10">

          {/* Letter Header */}
          <header className="mb-12 text-center">
            <div className="header-element flex justify-center mb-6">
              <span className="px-4 py-1 rounded-full border border-dashed border-primary/40 bg-primary-container/10 text-primary font-label-md text-label-md flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Sincere Heart
              </span>
            </div>
            <h1 className="header-element font-headline-xl text-headline-xl text-primary mb-2">My Sincerest Apology</h1>
            <div className="header-element scribble-underline mx-auto w-32"></div>
            <p className="header-element mt-8 font-label-md text-label-md text-on-surface-variant italic">Written with love and reflection • June  09th, 2026</p>
          </header>

          {/* Letter Body */}
          <section className="space-y-8 font-[Playfair Display] text-[20px] leading-relaxed text-on-surface-variant">
            <p className="letter-paragraph">
              Dearest LOML,
            </p>
            <p className="letter-paragraph">
              I have spent the last few hours trying to search for the right words cause yk enku ipdi lam perusa elutha varathu but i will try. Ennala sutama mudilya deep inside i feel very very giltey that how can i make smtng soo bad to the girl i loved the most more than anything in this whole fucking world
            </p>

            <div className="letter-image relative py-4">
              <img
                className="w-full h-64 object-cover rounded-xl shadow-inner opacity-90 hover:opacity-100 transition-opacity duration-500"
                src="/images/letter-2.jpeg"
                alt="A serene desk with a letter"
              />
            </div>

            <p className="letter-paragraph">
              I want to start by saying I am truly sorry. I am sorry for the what i did, for the words I left unsaid,atha enku sollave oru mari ieruku im soo sorry sorry kekave oru mari ieruku</p>
            <p className="letter-paragraph">
              Tbh i don't really deserve a girl like you, Lusu punnda mari pannitu ierukenn but you forgave me but i can't forgive me i can't sleep nee sonnathula ierunchu i can't sleep</p>

            <div className="letter-paragraph bg-surface-container-low p-8 rounded-xl border border-primary/10 italic hover:border-primary/30 transition-colors duration-300">
              "I still love you more than anything in this whole world"
            </div>

            <p className="letter-paragraph">
              I can't stop missing you na unna romba hurt panniten ik you can't freely talk to me ellame en thappu thaan i ruined your mental helth i runed eeryting </p>
            <p className="letter-paragraph">
              There is no forgiveness for what i have did but please be yourself that's all i wanted if you can't take it anymore js let me know i'll whatever you want</p>
          </section>

          {/* Signature and Seal */}
          <footer className="mt-20 flex flex-col items-end gap-6">
            <div className="text-right">
              <p className="signature-element font-label-md text-label-md mb-2 text-on-surface-variant">With all my love and sincerity,</p>
              <p className="signature-element font-[Dancing Script] text-[48px] text-primary leading-none">Always yours.</p>
            </div>

            {/* The Stamp (Specialty Component) */}
            <div className="signature-element relative group cursor-pointer active:scale-95 transition-transform duration-300">
              <div className="w-24 h-24 bg-tertiary rounded-full flex items-center justify-center shadow-md relative z-10 animate-[float_4s_ease-in-out_infinite]">
                <span className="material-symbols-outlined text-white text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                {/* Decorative scalloped edge simulated with absolute elements */}
                <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-0 bg-tertiary/20 blur-xl rounded-full scale-125 -z-10 group-hover:bg-primary/30 transition-colors duration-500"></div>
            </div>
          </footer>

        </article>

        {/* Post-Letter Actions */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-6 z-20 relative">
          <button className="action-btn px-12 py-5 bg-primary text-white rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">send</span>
            Send a Response
          </button>
          <button className="action-btn px-12 py-5 bg-surface-container-highest text-primary rounded-full font-label-md text-label-md border border-primary/20 hover:bg-primary-container/20 active:scale-95 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">content_copy</span>
            Save as Draft
          </button>
        </div>

      </div>
    </div>
  );
}
