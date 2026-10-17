import React from 'react';
import { Volume2, VolumeX, Flame, Zap, Heart, Sparkles, Map, Swords, GitBranch, Backpack, FolderGit2 } from 'lucide-react';
import { HeroState } from '../types';
import { calculateLevel } from '../utils/storage';
import { sounds } from '../utils/sound';

interface TopBarProps {
  hero: HeroState;
  activeTab: 'map' | 'quest' | 'boss' | 'skills' | 'inventory' | 'portfolio' | 'leaderboard';
  onSelectTab: (tab: 'map' | 'quest' | 'boss' | 'skills' | 'inventory' | 'portfolio' | 'leaderboard') => void;
  onToggleSound: () => void;
  onSurpriseMe: () => void;
  onOpenDaily: () => void;
  onOpenProfile: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  hero,
  activeTab,
  onSelectTab,
  onToggleSound,
  onSurpriseMe,
  onOpenDaily,
  onOpenProfile,
}) => {
  const { level, rank, xpInCurrentLevel, xpForNextLevel, progressPercent } = calculateLevel(hero.xp);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single text element wordmark with Hero level indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            title="Click to view & customize Hero Profile"
          >
            <span className="font-pixel text-amber-400 text-sm md:text-base tracking-wider group-hover:text-amber-300 transition-colors">
              CodeQuest
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400/50 transition-colors">
              Lv.{level} {rank}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation tabs with single-line whitespace-nowrap links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs md:text-sm font-medium">
          <button
            onClick={() => { sounds.playClick(); onSelectTab('map'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>World Map</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('quest'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quest'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Active Quest</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('boss'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'boss'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Boss Arena</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('skills'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Skill Tree</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('inventory'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Backpack className="w-4 h-4" />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('portfolio'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onSelectTab('leaderboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'leaderboard'
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>
        </nav>

        {/* Zone 3: Hero status HUD & primary quick actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Hearts / Lives indicator */}
          <div className="flex items-center gap-0.5 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800 text-xs text-rose-400" title={`${hero.hearts}/${hero.maxHearts} Hearts remaining for Boss Fights`}>
            {Array.from({ length: hero.maxHearts }).map((_, i) => (
              <Heart
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < hero.hearts
                    ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Streak Flame */}
          <div 
            onClick={() => { sounds.playCoin(); onOpenDaily(); }}
            className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-amber-400 text-xs font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
            title="Current Daily Coding Streak - Click to view daily quest"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="tabular-nums">{hero.streak}d</span>
          </div>

          {/* XP Progress Bar */}
          <div className="hidden sm:flex flex-col gap-0.5 min-w-[90px] xl:min-w-[120px]">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-amber-400 font-medium">XP</span>
              <span className="font-mono tabular-nums text-slate-300">{xpInCurrentLevel}/{xpForNextLevel}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
            title={hero.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label={hero.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {hero.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* "Surprise Me" Button */}
          <button
            onClick={() => {
              sounds.playCoin();
              onSurpriseMe();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation bar for touch screens */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950/95 py-2 px-2 text-xs">
        <button
          onClick={() => { sounds.playClick(); onSelectTab('map'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'map' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Map className="w-4 h-4" />
          <span>Map</span>
        </button>
        <button
          onClick={() => { sounds.playClick(); onSelectTab('quest'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'quest' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          <Zap className="w-4 h-4" />
          <span>Quest</span>
        </button>
        <button
          onClick={() => { sounds.playClick(); onSelectTab('boss'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'boss' ? 'text-rose-400 font-semibold' : 'text-slate-400'}`}
        >
          <Swords className="w-4 h-4" />
          <span>Boss</span>
        </button>
        <button
          onClick={() => { sounds.playClick(); onSelectTab('skills'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'skills' ? 'text-purple-400 font-semibold' : 'text-slate-400'}`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Tree</span>
        </button>
        <button
          onClick={() => { sounds.playClick(); onSelectTab('inventory'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'inventory' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          <Backpack className="w-4 h-4" />
          <span>Gear</span>
        </button>
        <button
          onClick={() => { sounds.playClick(); onSelectTab('portfolio'); }}
          className={`flex flex-col items-center gap-1 px-2 py-1 rounded ${activeTab === 'portfolio' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Works</span>
        </button>
      </div>
    </header>
  );
};
