import React from 'react';
import { RANKS } from '../types';
import { ChevronUp, ChevronDown, Trophy, RotateCcw } from 'lucide-react';
import { RankDisplay } from './RankDisplay';

interface ScorePanelProps {
  teamName: string;
  rankIndex: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isRedTheme: boolean;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({ 
  teamName, 
  rankIndex, 
  onIncrement, 
  onDecrement,
  isRedTheme 
}) => {
  const currentRank = RANKS[rankIndex];
  const isMax = rankIndex === RANKS.length - 1;
  const isMin = rankIndex === 0;

  return (
    <div className="relative flex flex-col items-center h-full w-full max-w-lg mx-auto py-4 md:py-8">
      
      {/* Team Header */}
      <div className="flex flex-col items-center mb-4 z-10">
        <div className="flex items-center gap-3 mb-2 opacity-90">
          <Trophy className={`w-4 h-4 ${isRedTheme ? 'text-amber-400' : 'text-blue-400'}`} />
          <h2 className={`
            font-display text-xl md:text-2xl font-bold tracking-widest uppercase
            ${isRedTheme ? 'text-red-50' : 'text-blue-50'}
          `}>
            {teamName}
          </h2>
          <Trophy className={`w-4 h-4 ${isRedTheme ? 'text-amber-400' : 'text-blue-400'}`} />
        </div>
        <div className={`h-px w-24 ${isRedTheme ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400 to-transparent'}`} />
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[300px]">
         <RankDisplay rank={currentRank} isRedTheme={isRedTheme} />
      </div>

      {/* Rank Progress Dots */}
      <div className="w-full px-8 mb-8">
        <div className="flex justify-between items-center gap-1 opacity-60">
          {RANKS.map((_, idx) => (
            <div 
              key={idx}
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${idx === rankIndex 
                  ? `w-4 ${isRedTheme ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]'}` 
                  : `w-1.5 ${idx < rankIndex ? (isRedTheme ? 'bg-amber-800' : 'bg-blue-800') : 'bg-white/10'}`
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 w-full px-6 z-10">
        {/* Primary Action */}
        <button
          onClick={onIncrement}
          className={`
            group relative w-full h-16 md:h-20 rounded-2xl overflow-hidden
            flex items-center justify-center gap-3
            transition-all duration-200 active:scale-[0.98]
            shadow-xl border hover:shadow-2xl
            ${isRedTheme 
              ? 'bg-gradient-to-b from-red-800 to-red-950 border-red-500/30 shadow-red-900/40 text-red-50' 
              : 'bg-gradient-to-b from-blue-700 to-slate-900 border-blue-400/30 shadow-blue-900/40 text-blue-50'
            }
          `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          
          {isMax ? (
             <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
             <ChevronUp className="w-6 h-6 md:w-8 md:h-8" />
          )}
          
          <span className="font-display font-bold text-xl md:text-2xl tracking-wider">
            {isMax ? 'CYCLE TO 2' : 'LEVEL UP'}
          </span>
        </button>

        {/* Secondary Action */}
        <button
          onClick={onDecrement}
          disabled={isMin}
          className={`
            h-12 flex items-center justify-center gap-2 rounded-xl text-sm font-medium tracking-wide uppercase transition-all
            ${isMin ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100 hover:bg-white/5'}
            ${isRedTheme ? 'text-red-200' : 'text-blue-200'}
          `}
        >
          <ChevronDown className="w-4 h-4" />
          <span>Step Back</span>
        </button>
      </div>
    </div>
  );
};