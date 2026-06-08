import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const icons = ['favorite', 'favorite_border', 'potted_plant', 'local_florist', 'auto_awesome'];

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<Array<{ id: number; icon: string; left: number; size: number; duration: number; fill: boolean }>>([]);

  useEffect(() => {
    let idCounter = 0;
    
    // Initial burst
    const initialHearts = Array.from({ length: 5 }).map(() => ({
      id: idCounter++,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * window.innerWidth,
      size: Math.random() * 12 + 12,
      duration: Math.random() * 4 + 4,
      fill: Math.random() > 0.5
    }));
    
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => {
        // Keep array small to avoid memory leaks
        const newHearts = prev.filter(h => h.id > idCounter - 30);
        return [...newHearts, {
          id: idCounter++,
          icon: icons[Math.floor(Math.random() * icons.length)],
          left: Math.random() * window.innerWidth,
          size: Math.random() * 12 + 12,
          duration: Math.random() * 4 + 4,
          fill: Math.random() > 0.5
        }];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <HeartElement key={heart.id} heart={heart} />
      ))}
    </div>
  );
}

function HeartElement({ heart }: { heart: any }) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (elRef.current) {
      gsap.fromTo(elRef.current, 
        { y: 50, opacity: 0, rotation: 0 },
        { 
          y: -150, 
          opacity: 0, 
          rotation: 20, 
          duration: heart.duration, 
          ease: "power1.inOut",
          keyframes: {
            "50%": { opacity: 0.6 }
          }
        }
      );
    }
  }, [heart.duration]);

  return (
    <span 
      ref={elRef}
      className="material-symbols-outlined floating-heart text-primary absolute bottom-0"
      style={{
        left: `${heart.left}px`,
        fontSize: `${heart.size}px`,
        fontVariationSettings: heart.fill ? "'FILL' 1" : "'FILL' 0"
      }}
    >
      {heart.icon}
    </span>
  );
}
