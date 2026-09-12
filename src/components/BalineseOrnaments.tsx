import React from 'react';

/**
 * Sacred Balinese Ongkara (Om) symbol
 */
export const BalineseOmSymbol: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#D4AF37]' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-label="Simbol Ongkara Bali">
    <path d="M50,15 C55,15 60,18 62,22 C64,20 67,19 70,19 C76,19 81,24 81,30 C81,37 75,43 68,46 C67,52 62,58 56,61 C63,61 70,64 74,69 C79,75 80,83 77,90 C74,96 66,100 58,100 C48,100 40,94 38,85 C37,80 39,76 43,73 C46,71 50,71 53,74 C55,76 56,79 55,82 C55,85 52,88 48,88 C46,88 45,87 45,86 C46,84 48,83 49,81 C48,79 46,78 44,79 C41,80 40,83 41,87 C43,92 48,96 55,96 C62,96 68,92 70,86 C72,81 71,75 67,70 C63,66 57,64 51,64 C45,64 39,67 35,71 C31,76 29,82 29,88 C29,91 27,93 24,93 C21,93 19,91 19,88 C19,79 23,70 30,64 C35,59 42,56 49,56 C53,53 56,48 57,43 C51,45 45,43 41,39 C36,34 35,27 38,21 C41,16 45,15 50,15 Z M68,36 C72,34 75,31 75,27 C75,24 72,22 69,22 C66,22 64,24 64,27 C64,29 65,32 68,36 Z M50,21 C47,21 44,23 43,26 C41,29 42,34 45,37 C48,39 52,39 55,36 C57,33 57,28 55,25 C54,22 52,21 50,21 Z M50,2 C53,2 55,4 55,7 C55,10 53,12 50,12 C47,12 45,10 45,7 C45,4 47,2 50,2 Z" />
    {/* Crescent Moon (Ardhachandra) and Bindu */}
    <path d="M40,9 C46,14 54,14 60,9 C57,11 52,12 48,11 C44,10 41,9 40,9 Z" />
    <circle cx="50" cy="5" r="3" />
  </svg>
);

/**
 * Balinese Frangipani / Bunga Kamboja SVG
 */
export const FrangipaniFlower: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <g transform="translate(50,50)">
      {/* 5 petals */}
      {[0, 72, 144, 216, 288].map((rot, idx) => (
        <path
          key={idx}
          d="M0,0 C-15,-20 -22,-45 0,-50 C22,-45 15,-20 0,0"
          fill="url(#frangipaniGradient)"
          stroke="#E5C378"
          strokeWidth="0.8"
          transform={`rotate(${rot})`}
        />
      ))}
      {/* Golden floral center */}
      <circle cx="0" cy="0" r="14" fill="url(#centerYellow)" />
      <circle cx="0" cy="0" r="6" fill="#F59E0B" />
    </g>
    <defs>
      <linearGradient id="frangipaniGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="35%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
      <radialGradient id="centerYellow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="60%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.4" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Intricate Balinese Patra Carving divider
 */
export const PatraDivider: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md my-4' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
    <div className="flex items-center gap-1.5 text-[#B45309]">
      <svg className="w-5 h-5 fill-[#D4AF37]" viewBox="0 0 24 24">
        <path d="M12 2L14.4 7.6L20 10L15.6 14.4L17 20.2L12 17L7 20.2L8.4 14.4L4 10L9.6 7.6L12 2Z" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
      <svg className="w-6 h-6 fill-[#B45309]" viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
      <svg className="w-5 h-5 fill-[#D4AF37]" viewBox="0 0 24 24">
        <path d="M12 2L14.4 7.6L20 10L15.6 14.4L17 20.2L12 17L7 20.2L8.4 14.4L4 10L9.6 7.6L12 2Z" />
      </svg>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
  </div>
);

/**
 * Balinese Candi Bentar split gate ornament framing
 */
export const BalineseGateOrnament: React.FC<{ className?: string }> = ({ className = 'w-full h-12 text-[#D4AF37]' }) => (
  <svg viewBox="0 0 400 40" fill="currentColor" preserveAspectRatio="none" className={className}>
    {/* Left Gate Wing */}
    <path d="M0,40 L0,15 L25,15 L25,8 L50,8 L50,0 L180,0 L180,40 Z" opacity="0.9" />
    <path d="M10,25 L35,25 L35,18 L60,18 L60,6 L175,6 L175,35 L10,35 Z" fill="#FAF7EE" />
    
    {/* Center Sacred Gap */}
    <circle cx="200" cy="20" r="5" fill="#D4AF37" />
    <path d="M195,10 L205,10 L200,0 Z" fill="#881337" />
    
    {/* Right Gate Wing */}
    <path d="M400,40 L400,15 L375,15 L375,8 L350,8 L350,0 L220,0 L220,40 Z" opacity="0.9" />
    <path d="M390,25 L365,25 L365,18 L340,18 L340,6 L225,6 L225,35 L390,35 Z" fill="#FAF7EE" />
  </svg>
);

/**
 * Balinese Poleng (Black & White checkered cloth) decorative accent bar
 */
export const PolengBorder: React.FC<{ className?: string }> = ({ className = 'h-2.5 w-full' }) => (
  <div className={`overflow-hidden flex border-y border-[#D4AF37]/40 ${className}`}>
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `
          linear-gradient(45deg, #18181B 25%, transparent 25%), 
          linear-gradient(-45deg, #18181B 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #18181B 75%), 
          linear-gradient(-45deg, transparent 75%, #18181B 75%)
        `,
        backgroundSize: '12px 12px',
        backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
        backgroundColor: '#FFFFFF',
      }}
    />
  </div>
);

/**
 * Balinese Corner Ornament
 */
export const BalineseCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({
  position,
  className = 'w-10 h-10 text-[#D4AF37]/70',
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1)';
      default: return 'none';
    }
  };

  return (
    <div style={{ transform: getTransform() }} className={className}>
      <svg viewBox="0 0 60 60" fill="currentColor">
        <path d="M0,0 L60,0 C45,10 30,25 25,45 L25,60 C20,40 10,20 0,0 Z" />
        <circle cx="12" cy="12" r="3" fill="#881337" />
        <path d="M5,5 Q18,8 20,20 Q8,18 5,5" fill="#FAF7EE" />
      </svg>
    </div>
  );
};
