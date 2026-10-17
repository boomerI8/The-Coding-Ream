import React, { useState } from 'react';
import { User, Shield, Sparkles, X, Check, Award } from 'lucide-react';
import { HeroState } from '../types';
import { calculateLevel } from '../utils/storage';
import { sounds } from '../utils/sound';

interface HeroCustomizerModalProps {
  hero: HeroState;
  onUpdateHeroProfile: (name: string, track: 'fullstack' | 'frontend' | 'backend') => void;
  onClose: () => void;
}

export const HeroCustomizerModal: React.FC<HeroCustomizerModalProps> = ({
  hero,
  onUpdateHeroProfile,
  onClose,
}) => {
  const [name, setName] = useState<string>(hero.name);
  const [track, setTrack] = useState<'fullstack' | 'frontend' | 'backend'>(hero.selectedTrack);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🧙‍♂️');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { level, rank } = calculateLevel(hero.xp);

  const avatars = ['🧙‍♂️', '⚔️', '🥷', '🏹', '🧪', '🤖', '👾', '👑'];

  const handleSave = () => {
    sounds.playCoin();
    onUpdateHeroProfile(name, track);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Hero Identity & Customization</h2>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar & Rank Preview Card */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-4xl p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner">
            {selectedAvatar}
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">{name || 'Unnamed Wayfarer'}</div>
            <div className="text-xs text-amber-400 font-semibold">
              Level {level} {rank} · {hero.xp} Total XP
            </div>
            <div className="text-[11px] text-slate-400">
              Quests Mastered: {hero.completedQuests.length} · Bosses Slain: {hero.completedBosses.length}
            </div>
          </div>
        </div>

        {/* Hero Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Adventurer Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium"
            placeholder="e.g. Code Novice, Pixel Paladin..."
          />
        </div>

        {/* Avatar Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Hero Sigil / Sprite:</label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {avatars.map((av) => (
              <button
                key={av}
                onClick={() => { sounds.playClick(); setSelectedAvatar(av); }}
                className={`text-2xl p-2 rounded-xl border transition-all cursor-pointer ${
                  selectedAvatar === av
                    ? 'bg-amber-500/20 border-amber-400 scale-105 shadow-sm'
                    : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Specialization Track */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Specialization Track:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => { sounds.playClick(); setTrack(t.id as 'fullstack' | 'frontend' | 'backend'); }}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  track === t.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>{isSaved ? 'Identity Inscribed!' : 'Inscribe Hero Profile'}</span>
        </button>

      </div>
    </div>
  );
};
