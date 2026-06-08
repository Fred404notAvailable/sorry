export default function BackgroundFlowers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -10 }}>
      {/* Original Flowers (Very faint globally) */}
      <img 
        src="/images/flower-tl.png" 
        alt="" 
        className="absolute top-0 left-0 w-[40vw] max-w-[400px] opacity-[0.15] mix-blend-multiply object-contain"
        style={{ transformOrigin: 'top left' }}
      />
      <img 
        src="/images/flower-br.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-[45vw] max-w-[450px] opacity-[0.15] mix-blend-multiply object-contain"
        style={{ transformOrigin: 'bottom right' }}
      />
      
      {/* Generated Variation 1: Elegant curve acting as a subtle side border */}
      <img 
        src="/images/flower-var-1.png" 
        alt="" 
        className="absolute top-[30vh] -right-[15vw] w-[60vw] max-w-[600px] opacity-10 mix-blend-multiply rotate-12 object-contain" 
      />
      
      {/* Generated Variation 2: Scattered petal cluster acting as a soft bottom anchor */}
      <img 
        src="/images/flower-var-2.png" 
        alt="" 
        className="absolute bottom-[20vh] -left-[10vw] w-[40vw] max-w-[400px] opacity-10 mix-blend-multiply -rotate-12 object-contain" 
      />
    </div>
  );
}
