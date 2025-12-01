import React, { useState, useCallback, useEffect } from 'react';
import { RANKS } from './types';
import { ScorePanel } from './components/ScorePanel';
import { RefreshCw, RotateCcw, Swords } from 'lucide-react';

const INITIAL_RANK = 0; // Starts at '2'

export default function App() {
  const [teamARank, setTeamARank] = useState(INITIAL_RANK);
  const [teamBRank, setTeamBRank] = useState(INITIAL_RANK);
  
  // Undo state
  const [prevScores, setPrevScores] = useState<{a: number, b: number} | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const handleReset = () => {
    // Save state for undo
    setPrevScores({ a: teamARank, b: teamBRank });
    
    // Reset immediately
    setTeamARank(INITIAL_RANK);
    setTeamBRank(INITIAL_RANK);
    
    // Show Toast
    setShowUndoToast(true);
  };

  const handleUndoReset = () => {
    if (prevScores) {
      setTeamARank(prevScores.a);
      setTeamBRank(prevScores.b);
      setPrevScores(null);
      setShowUndoToast(false);
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => setShowUndoToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast]);

  const updateRank = useCallback((
    setter: React.Dispatch<React.SetStateAction<number>>, 
    delta: number
  ) => {
    setter(prev => {
      // Cycle logic: If at max and incrementing, go back to 0 (Rank 2)
      if (delta > 0 && prev === RANKS.length - 1) {
        return 0;
      }

      const next = prev + delta;
      
      // Standard bounds checks
      if (next < 0) return 0;
      if (next >= RANKS.length) return RANKS.length - 1;
      
      return next;
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-black text-slate-50 font-sans selection:bg-white/20">
      
      {/* Fixed Glass Header */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 glass-panel border-b border-white/5 flex items-center justify-between px-4 md:px-8 shadow-2xl backdrop-blur-xl bg-black/40">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg border border-white/10">
             <Swords className="w-5 h-5 text-slate-200" />
           </div>
           <div className="flex flex-col">
             <h1 className="font-display font-bold text-lg md:text-xl leading-none text-slate-200">Guandan Royale</h1>
             <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 font-medium mt-1">Versus Mode</span>
           </div>
        </div>

        <button 
          onClick={handleReset}
          className="
            group relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full 
            bg-white/5 hover:bg-white/10 border border-white/10
            transition-all duration-300 hover:scale-105 active:scale-95
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <RefreshCw className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-sm text-slate-200 hidden sm:inline">Reset Match</span>
          <span className="font-bold text-sm text-slate-200 sm:hidden">Reset</span>
        </button>
      </header>

      {/* Main Content - Split Layout */}
      <main className="flex-1 flex flex-col md:flex-row pt-16 md:pt-20">
        
        {/* Host Team - Blue Section */}
        <section className="relative flex-1 flex flex-col items-center justify-center p-2 md:p-6 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden min-h-[50vh]">
           {/* Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-black z-0" />
           
           {/* Noise Texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
           />

           <div className="relative z-10 w-full h-full flex flex-col justify-center">
             <ScorePanel 
               teamName="Host Team" 
               rankIndex={teamARank}
               onIncrement={() => updateRank(setTeamARank, 1)}
               onDecrement={() => updateRank(setTeamARank, -1)}
               isRedTheme={false} // Blue
             />
           </div>
        </section>

        {/* Guest Team - Red Section */}
        <section className="relative flex-1 flex flex-col items-center justify-center p-2 md:p-6 overflow-hidden min-h-[50vh]">
           {/* Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-900 via-rose-950 to-black z-0" />
           
           {/* Noise Texture */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
           />

           <div className="relative z-10 w-full h-full flex flex-col justify-center">
             <ScorePanel 
               teamName="Guest Team" 
               rankIndex={teamBRank}
               onIncrement={() => updateRank(setTeamBRank, 1)}
               onDecrement={() => updateRank(setTeamBRank, -1)}
               isRedTheme={true} // Red
             />
           </div>
        </section>
      </main>

      {/* Undo Toast */}
      <div className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]
        flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl
        border border-white/10 backdrop-blur-xl bg-slate-900/90 text-slate-50
        transition-all duration-500 ease-out
        ${showUndoToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-slate-200">Match Reset</span>
          <span className="text-xs text-slate-400">Scores returned to 2</span>
        </div>
        <button 
          onClick={handleUndoReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors bg-white/10 hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4" />
          Undo
        </button>
      </div>
    </div>
  );
}