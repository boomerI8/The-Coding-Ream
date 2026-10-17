import React from 'react';
import { Trophy, Flame, Zap, Shield, Crown, X, ArrowUpRight, Medal } from 'lucide-react';
import { HeroState } from '../types';
import { calculateLevel } from '../utils/storage';
import { sounds } from '../utils/sound';

interface LeaderboardModalProps {
  hero: HeroState;
  onClose: () => void;
}

interface Competitor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  level: number;
  xp: number;
  streak: number;
  favoriteTrack: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ hero, onClose }) => {
  const { level, rank } = calculateLevel(hero.xp);

  // Simulated peer competitors in learner's league
  const competitors: Competitor[] = [
    {
      id: 'c1',
      name: 'Ada Lovelace',
      avatar: '🧙‍♀️',
      title: 'Algorithm Weaver',
      level: level + 2,
      xp: hero.xp + 340,
      streak: 14,
      favoriteTrack: 'DSA Dungeon',
    },
    {
      id: 'c2',
      name: 'Linus_T',
      avatar: '🐧',
      title: 'Kernel Paladin',
      level: level + 1,
      xp: hero.xp + 180,
      streak: 9,
      favoriteTrack: 'DevOps Citadel',
    },
    {
      id: 'hero-user',
      name: hero.name || 'You (Hero)',
      avatar: '⚡',
      title: `${rank} Wayfarer`,
      level: level,
      xp: hero.xp,
      streak: hero.streak,
      favoriteTrack: 'Web Development',
    },
    {
      id: 'c3',
      name: 'Grace Hopper',
      avatar: '⚓',
      title: 'Compiler Warden',
      level: Math.max(1, level - 1),
      xp: Math.max(80, hero.xp - 110),
      streak: 5,
      favoriteTrack: 'Backend Citadel',
    },
    {
      id: 'c4',
      name: 'Satoshi_N',
      avatar: '🐉',
      title: 'Cryptographic Ghost',
      level: Math.max(1, level - 1),
      xp: Math.max(50, hero.xp - 220),
      streak: 4,
      favoriteTrack: 'TypeScript Outpost',
    },
    {
      id: 'c5',
      name: 'Margaret_H',
      avatar: '🚀',
      title: 'Orbital Guide',
      level: Math.max(1, level - 2),
      xp: Math.max(30, hero.xp - 310),
      streak: 3,
      favoriteTrack: 'React Realm',
    },
  ].sort((a, b) => b.xp - a.xp);

  const heroIndex = competitors.findIndex((c) => c.id === 'hero-user');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Guild Leaderboard</h2>
              <span className="text-xs text-slate-400">Weekly League: {rank} Tier II</span>
            </div>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Promotion banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-transparent border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs text-slate-200">
              <strong className="text-amber-400">Top 3 Rank Promotion:</strong> Finishing top 3 by Sunday promotes you to the next League tier with bonus satchel potions!
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-400 shrink-0">Ends in 2d 14h</span>
        </div>

        {/* Competitor Standings Table */}
        <div className="space-y-2">
          {competitors.map((c, idx) => {
            const isUser = c.id === 'hero-user';
            return (
              <div
                key={c.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isUser
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank badge */}
                  <div className="w-6 text-center font-bold text-xs font-mono">
                    {idx === 0 ? (
                      <span className="text-amber-400 text-sm">🥇</span>
                    ) : idx === 1 ? (
                      <span className="text-slate-300 text-sm">🥈</span>
                    ) : idx === 2 ? (
                      <span className="text-amber-600 text-sm">🥉</span>
                    ) : (
                      <span className="text-slate-500">{idx + 1}</span>
                    )}
                  </div>

                  <span className="text-2xl p-1 rounded-lg bg-slate-900 border border-slate-800">
                    {c.avatar}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {c.name}
                      </span>
                      {isUser && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Lv.{c.level} · {c.title} · {c.favoriteTrack}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold" title="Daily streak">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{c.streak}d</span>
                  </div>

                  <div className="min-w-[80px]">
                    <div className="text-xs font-bold text-white font-mono tabular-nums">
                      {c.xp} XP
                    </div>
                    <div className="text-[10px] text-slate-400">Total Score</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User standing summary footer */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
          Currently ranked <strong className="text-amber-400">#{heroIndex + 1}</strong> in your league. Solve more quests and defeat region bosses to claim the crown!
        </div>

      </div>
    </div>
  );
};
