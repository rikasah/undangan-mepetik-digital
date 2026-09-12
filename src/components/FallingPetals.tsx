import React, { useMemo } from 'react';
import { FrangipaniFlower } from './BalineseOrnaments';

interface PetalConfig {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export const FallingPetals: React.FC = () => {
  // Generate random petals memoized
  const petals: PetalConfig[] = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: Math.round((i * 11) + (Math.sin(i * 3) * 8) + 5), // Spread across 0-100%
      duration: 14 + (i % 5) * 3, // 14s - 26s
      delay: (i * 2.2) % 15,
      size: 16 + (i % 4) * 6, // 16px - 34px
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute animate-petal will-change-transform"
          style={{
            left: `${petal.left}%`,
            top: '-40px',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        >
          <FrangipaniFlower className="w-full h-full drop-shadow-sm opacity-65" />
        </div>
      ))}
    </div>
  );
};
