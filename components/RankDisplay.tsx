import React from 'react';
import { Rank } from '../types';

interface RankDisplayProps {
  rank: Rank;
  isRedTheme: boolean;
  isActive?: boolean;
}

export const RankDisplay: React.FC<RankDisplayProps> = ({ rank, isRedTheme, isActive = true }) => {
  // Parse special ranks for better display
  const isAcePhase = rank.startsWith('A') && rank.length > 1;
  const mainChar = isAcePhase ? 'A' : rank;
  const subChar = isAcePhase ? rank.substring(1) : null;
  
  // Specific styling flags
  const isTen = rank === '10';
  
  return (
    <div className={`
      relative flex flex-col items-center justify-center 
      transition-all duration-500 transform 
      ${isActive ? 'scale-100 opacity-100 blur-0' : 'scale-95 opacity-60 blur-sm'}
    `}>
      {/* Main Rank Character */}
      <div className="relative flex items-baseline justify-center z-10">
        <span 
          key={rank} // Triggers animation on change
          className={`
            font-rank font-bold leading-none animate-[fadeInScale_0.3s_ease-out]
            ${isTen ? 'text-[6rem] sm:text-[8rem] lg:text-[10rem] tracking-tighter' : 'text-[7rem] sm:text-[9rem] lg:text-[12rem]'}
            ${isRedTheme ? 'text-gold-gradient' : 'text-silver-gradient'}
            filter drop-shadow-2xl select-none
          `}
          style={{
            textShadow: isRedTheme 
              ? '0 4px 30px rgba(180, 83, 9, 0.5)' 
              : '0 4px 30px rgba(59, 130, 246, 0.5)'
          }}
        >
          {mainChar}
        </span>
        
        {/* Subscript for Ace Phases (1, 2, 3) */}
        {subChar && (
          <span className={`
            absolute -right-4 sm:-right-8 top-0
            font-display font-bold italic text-4xl sm:text-5xl lg:text-6xl
            ${isRedTheme ? 'text-amber-400' : 'text-blue-300'}
            drop-shadow-lg animate-[fadeIn_0.5s_ease-out]
          `}>
            {subChar}
          </span>
        )}
      </div>

      {/* Decorative label for A Phases */}
      <div className={`
        h-8 flex items-center justify-center
        transition-opacity duration-300
        ${isAcePhase ? 'opacity-100' : 'opacity-0'}
      `}>
        <span className={`
          font-display text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold
          ${isRedTheme ? 'text-amber-200/80' : 'text-blue-200/80'}
        `}>
          Phase {subChar}
        </span>
      </div>
      
      {/* Background Glow / Aura */}
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-64 h-64 lg:w-96 lg:h-96 rounded-full blur-[80px] opacity-30 pointer-events-none z-0
        transition-colors duration-700
        ${isRedTheme ? 'bg-amber-600' : 'bg-blue-600'}
      `} />
      
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};