import React, { useState } from 'react';
import { GitBranch, CheckCircle2, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroState } from '../types';
import { sounds } from '../utils/sound';

interface SkillTreeProps {
  hero: HeroState;
  onSelectTrack: (track: 'fullstack' | 'frontend' | 'backend') => void;
  onClose: () => void;
}

interface SkillNode {
  id: string;
  name: string;
  track: 'foundation' | 'frontend' | 'backend' | 'mastery';
  tier: number;
  icon: string;
  description: string;
  unlocked: boolean;
  mastered: boolean;
  prereq?: string;
}

export const SkillTreeModal: React.FC<SkillTreeProps> = ({
  hero,
  onSelectTrack,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend'>('all');

  const nodes: SkillNode[] = [
    {
      id: 'skill-html',
      name: 'Semantic Architecture',
      track: 'foundation',
      tier: 1,
      icon: '🏛️',
      description: 'Master HTML5 semantic tags, accessibility landmarks, and form protocols.',
      unlocked: true,
      mastered: hero.completedQuests.includes('html-q1') && hero.completedQuests.includes('html-q2'),
    },
    {
      id: 'skill-css',
      name: 'Fluid Box Sorcery',
      track: 'frontend',
      tier: 2,
      icon: '🎨',
      description: 'Command modern Flexbox alignment, CSS Grid matrices, and GPU keyframes.',
      unlocked: hero.completedBosses.includes('boss-html') || hero.unlockedRegions.includes('css-kingdom'),
      mastered: hero.completedQuests.includes('css-q1') && hero.completedQuests.includes('css-q3'),
      prereq: 'Semantic Architecture',
    },
    {
      id: 'skill-js',
      name: 'Asynchronous Arcana',
      track: 'frontend',
      tier: 3,
      icon: '⚡',
      description: 'Tame Promises, async/await pipelines, closures, and the browser Event Loop.',
      unlocked: hero.completedBosses.includes('boss-css'),
      mastered: false,
      prereq: 'Fluid Box Sorcery',
    },
    {
      id: 'skill-ts',
      name: 'Type Contract Shielding',
      track: 'frontend',
      tier: 4,
      icon: '🛡️',
      description: 'Eradicate runtime exceptions with strict algebraic data types and generics.',
      unlocked: false,
      mastered: false,
      prereq: 'Asynchronous Arcana',
    },
    {
      id: 'skill-react',
      name: 'Reactive Componentry',
      track: 'frontend',
      tier: 5,
      icon: '⚛️',
      description: 'Architect modular component trees with custom hooks and optimized rendering.',
      unlocked: false,
      mastered: false,
      prereq: 'Type Contract Shielding',
    },
    {
      id: 'skill-db',
      name: 'Relational & Document Mines',
      track: 'backend',
      tier: 2,
      icon: '💾',
      description: 'Command SQL indexing, multi-table joins, transactions, and NoSQL stores.',
      unlocked: hero.completedBosses.includes('boss-html'),
      mastered: false,
      prereq: 'Semantic Architecture',
    },
    {
      id: 'skill-api',
      name: 'REST & Authentication Citadel',
      track: 'backend',
      tier: 3,
      icon: '🏰',
      description: 'Build hardened Express API endpoints with JWT tokens, middleware, and rate limits.',
      unlocked: false,
      mastered: false,
      prereq: 'Relational & Document Mines',
    },
    {
      id: 'skill-devops',
      name: 'Orbital CI/CD Automation',
      track: 'mastery',
      tier: 6,
      icon: '🚀',
      description: 'Containerize microservices with Docker, automate GitHub Actions, and deploy to cloud.',
      unlocked: false,
      mastered: false,
      prereq: 'Reactive Componentry & REST Citadel',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-slate-900 border border-purple-500/40 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">The Hero Skill Constellation</h2>
            </div>
            <p className="text-xs text-slate-400">
              Choose your specialization track. Unlock abilities by defeating dungeon bosses.
            </p>
          </div>

          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="self-end sm:self-auto px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
          >
            Close Tree
          </button>
        </div>

        {/* Track Filter */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg w-fit border border-slate-800">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('all'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Complete Constellation
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('frontend'); onSelectTrack('frontend'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'frontend' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Frontend Specialist
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('backend'); onSelectTrack('backend'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'backend' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Backend & Systems
          </button>
        </div>

        {/* Skill Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nodes
            .filter((n) => activeTab === 'all' || n.track === activeTab || n.track === 'foundation' || n.track === 'mastery')
            .map((node) => (
              <div
                key={node.id}
                className={`p-4 rounded-xl border transition-all text-left space-y-2 ${
                  node.mastered
                    ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : node.unlocked
                    ? 'bg-slate-950/80 border-slate-700 hover:border-purple-400/50'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {node.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{node.name}</span>
                        {node.mastered && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </h4>
                      <span className="text-[11px] text-purple-400 capitalize">
                        Tier {node.tier} · {node.track}
                      </span>
                    </div>
                  </div>

                  <div>
                    {node.mastered ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Mastered
                      </span>
                    ) : node.unlocked ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        In Progress
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {node.description}
                </p>

                {node.prereq && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <span>Prerequisite:</span>
                    <span className="text-slate-400 font-medium">{node.prereq}</span>
                  </div>
                )}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};
