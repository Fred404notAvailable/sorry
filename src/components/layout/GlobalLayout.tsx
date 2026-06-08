import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FloatingHearts from '../animations/FloatingHearts';
import BackgroundFlowers from './BackgroundFlowers';

export default function GlobalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const mainRef = useRef<HTMLElement>(null);

  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/reasons', icon: 'favorite', label: 'Reasons' },
    { path: '/promises', icon: 'auto_stories', label: 'Promises' },
    { path: '/forgive', icon: 'volunteer_activism', label: 'Forgive' },
    { path: '/journey', icon: 'timeline', label: 'Journey' },
    { path: '/letter', icon: 'drafts', label: 'Letter' }
  ];

  // Incoming animation on route change
  useGSAP(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    }
  }, { dependencies: [location.pathname] });

  // Intercept navigation for outgoing animation
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (path === currentPath) return;

    if (mainRef.current) {
      gsap.to(mainRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          navigate(path);
          window.scrollTo(0, 0);
        }
      });
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <FloatingHearts />
      <BackgroundFlowers />
      
      {/* Main Content */}
      <main ref={mainRef} className="max-w-[800px] mx-auto px-container-padding pt-12 pb-section-margin relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center gap-base w-full pb-32 py-section-margin bg-transparent">
        <span className="font-display-handwritten text-display-handwritten text-primary">Heartfelt</span>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-60">Made with all my love and a million apologies</p>
      </footer>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 max-w-[800px] mx-auto left-1/2 -translate-x-1/2 bg-surface-container dark:bg-on-background border-t border-outline-variant/20 rounded-t-xl shadow-[0_-4px_12px_rgba(134,78,90,0.1)]">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a 
              href={item.path}
              key={item.path} 
              onClick={(e) => handleNavigation(e, item.path)}
              className={`flex flex-col items-center justify-center px-4 py-1 transition-all duration-300 cursor-pointer ${isActive ? 'bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-full scale-110 active:scale-95' : 'text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed-dim'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
