import React, { useState } from 'react';
import { Flame, Sparkles, Trophy, Clock, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { HeroState, Quest } from '../types';
import { sounds } from '../utils/sound';

interface DailyChallengeModalProps {
  hero: HeroState;
  quests: Quest[];
  onStartQuest: (questId: string) => void;
  onClaimDailyBonus: (xp: number) => void;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  hero,
  quests,
  onStartQuest,
  onClaimDailyBonus,
  onClose,
}) => {
  const [claimed, setClaimed] = useState<boolean>(false);

  // Pick a fast 5-minute quest
  const dailyQuest = quests[0] || null;

  const handleClaimLoginReward = () => {
    sounds.playCoin();
    setClaimed(true);
    onClaimDailyBonus(40);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-2xl space-y-6 text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <h2 className="text-lg font-bold text-white">Daily Streak & 5-Minute Quest</h2>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Streak Stats */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex items-center justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
              {hero.streak} Days
            </div>
            <div className="text-[11px] text-slate-400">Current Streak</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">
              +40 XP
            </div>
            <div className="text-[11px] text-slate-400">Login Tribute</div>
          </div>
        </div>

        {/* Claim Tribute Button */}
        {!claimed ? (
          <button
            onClick={handleClaimLoginReward}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] cursor-pointer"
          >
            Claim Today's +40 XP Daily Tribute
          </button>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
            <span>Tribute Claimed! Streak Maintained!</span>
          </div>
        )}

        {/* 5-Minute Low-Energy Quest Feature */}
        {dailyQuest && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 5-Minute Low-Energy Quest
              </span>
              <span className="text-xs font-semibold text-amber-400">+{dailyQuest.xpReward} XP</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">{dailyQuest.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                {dailyQuest.taskPrompt}
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
                onStartQuest(dailyQuest.id);
              }}
              className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Play 5-Minute Quest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
