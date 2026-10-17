import React, { useState } from 'react';
import { Lock, CheckCircle2, ChevronRight, Swords, Sparkles, Trophy, BookOpen, Compass } from 'lucide-react';
import { Region, HeroState } from '../types';
import { sounds } from '../utils/sound';

interface WorldMapProps {
  regions: Region[];
  hero: HeroState;
  onSelectQuest: (questId: string) => void;
  onSelectBoss: (bossId: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  regions,
  hero,
  onSelectQuest,
  onSelectBoss,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>(hero.unlockedRegions[0] || 'html-village');
  const [filterTrack, setFilterTrack] = useState<'all' | 'frontend' | 'backend'>('all');

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  // Calculate overall stats
  const totalQuests = regions.reduce((acc, r) => acc + r.quests.length, 0);
  const completedQuestsCount = hero.completedQuests.length;
  const completedBossesCount = hero.completedBosses.length;
  const mapCompletionPercent = Math.min(100, Math.round(((completedQuestsCount + completedBossesCount * 2) / (totalQuests + regions.length * 2)) * 100));

  const filteredRegions = regions.filter((r) => {
    if (filterTrack === 'all') return true;
    if (filterTrack === 'frontend') {
      return ['html-village', 'css-kingdom', 'js-jungle', 'ts-outpost', 'react-realm'].includes(r.id);
    }
    if (filterTrack === 'backend') {
      return ['database-caves', 'backend-citadel', 'java-fortress', 'python-swamp', 'devops-dsa'].includes(r.id);
    }
    return true;
  });

  return (
    <div className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Realm Header with Progress Statistics */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              The Grand Code Realm
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Conquer regions, defeat dungeon bosses, and build 10+ real-world portfolio artifacts.
          </p>
        </div>

        {/* Global Progress Metrics */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="text-left shrink-0">
            <div className="text-xs text-slate-400">World Progress</div>
            <div className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">
              {mapCompletionPercent}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800 shrink-0" />
          <div className="text-left shrink-0">
            <div className="text-xs text-slate-400">Quests Solved</div>
            <div className="text-base sm:text-lg font-bold text-cyan-400 tabular-nums">
              {completedQuestsCount} <span className="text-xs text-slate-500 font-normal">/ {totalQuests}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800 shrink-0" />
          <div className="text-left shrink-0">
            <div className="text-xs text-slate-400">Bosses Slain</div>
            <div className="text-base sm:text-lg font-bold text-rose-400 tabular-nums">
              {completedBossesCount} <span className="text-xs text-slate-500 font-normal">/ {regions.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Track Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900/80 border border-slate-800 rounded-lg w-fit">
        <button
          onClick={() => { sounds.playClick(); setFilterTrack('all'); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            filterTrack === 'all' ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          All Regions (10)
        </button>
        <button
          onClick={() => { sounds.playClick(); setFilterTrack('frontend'); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            filterTrack === 'frontend' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Frontend Path
        </button>
        <button
          onClick={() => { sounds.playClick(); setFilterTrack('backend'); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            filterTrack === 'backend' ? 'bg-purple-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Backend & Systems Path
        </button>
      </div>

      {/* Main Interactive World Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Regions Exploration List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Region Atlas & Biomes
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredRegions.map((region, index) => {
              const isUnlocked = hero.unlockedRegions.includes(region.id) || index === 0;
              const isConquered = hero.completedBosses.includes(region.boss.id);
              const isSelected = selectedRegion.id === region.id;
              
              const regionQuestsCompleted = region.quests.filter((q) =>
                hero.completedQuests.includes(q.id)
              ).length;

              return (
                <div
                  key={region.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedRegionId(region.id);
                  }}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer text-left group overflow-hidden ${
                    isSelected
                      ? 'border-amber-400/80 bg-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
                      : isUnlocked
                      ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700'
                      : 'border-slate-800/60 bg-slate-950/40 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none"
                    style={{ backgroundColor: region.accentColor }}
                  />

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
                        {region.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">
                          {region.name}
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          {region.biome}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isConquered ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Conquered
                        </span>
                      ) : isUnlocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                          <Lock className="w-3 h-3" /> Lv.{region.levelPrereq}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {region.description}
                  </p>

                  {/* Progress Indicator */}
                  {isUnlocked && region.quests.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Quests Solved</span>
                        <span className="font-mono tabular-nums text-slate-300">
                          {regionQuestsCompleted} / {region.quests.length}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(regionQuestsCompleted / region.quests.length) * 100}%`,
                            backgroundColor: region.accentColor,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="text-[11px] text-amber-500/80 flex items-center gap-1">
                      <span>Requires: {region.prereqRegionId ? `Beat ${regions.find(r => r.id === region.prereqRegionId)?.name}` : `Level ${region.levelPrereq}`}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Region Detailed Outpost (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Region Dispatch: {selectedRegion.name}
          </div>

          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Region Banner Header */}
            <div className="flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-lg border"
                style={{ backgroundColor: `${selectedRegion.accentColor}20`, borderColor: `${selectedRegion.accentColor}60` }}
              >
                {selectedRegion.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{selectedRegion.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Est. {selectedRegion.estimatedHours}
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-medium">{selectedRegion.subtitle}</p>
                <p className="text-xs text-slate-400">{selectedRegion.description}</p>
              </div>
            </div>

            {/* Quests Accordion / List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Region Quests ({selectedRegion.quests.length})</span>
                </span>
                <span className="text-slate-500 text-[11px]">Anti-Boredom &lt;5m</span>
              </div>

              {selectedRegion.quests.length > 0 ? (
                <div className="space-y-2">
                  {selectedRegion.quests.map((quest, qIdx) => {
                    const isQuestDone = hero.completedQuests.includes(quest.id);
                    return (
                      <div
                        key={quest.id}
                        onClick={() => {
                          sounds.playClick();
                          onSelectQuest(quest.id);
                        }}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                            isQuestDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isQuestDone ? '✓' : qIdx + 1}
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {quest.title}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {quest.format.replace('_', ' ')} · {quest.durationMinutes} min · +{quest.xpReward} XP
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-center space-y-1">
                  <p className="text-xs text-slate-300 font-medium">Ancient Scroll Locked</p>
                  <p className="text-[11px] text-slate-500">
                    Complete HTML Village & CSS Kingdom to generate dynamic quests for this region.
                  </p>
                </div>
              )}
            </div>

            {/* Boss Fight Challenge Gate */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/30 to-slate-950 border border-rose-900/40 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 rounded-lg bg-rose-900/30 border border-rose-800/40">
                    {selectedRegion.boss.avatarIcon}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Boss Encounter</span>
                      <span className="text-[11px] text-slate-400">· {selectedRegion.boss.totalHp} HP</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {selectedRegion.boss.bossName}
                    </div>
                  </div>
                </div>

                {hero.completedBosses.includes(selectedRegion.boss.id) && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 border border-emerald-800 text-emerald-400">
                    SLAIN
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">
                {selectedRegion.boss.subtitle}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <Trophy className="w-3.5 h-3.5" /> +{selectedRegion.boss.xpReward} XP & Badge
                </span>
                <span className="text-slate-400">
                  Deliverable: {selectedRegion.boss.portfolioProject.fileName}
                </span>
              </div>

              <button
                onClick={() => {
                  sounds.playBossAlert();
                  onSelectBoss(selectedRegion.boss.id);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Swords className="w-4 h-4" />
                <span>Enter Boss Battle Arena</span>
              </button>
            </div>

            {/* Quick Action to First Quest */}
            {selectedRegion.quests.length > 0 && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectQuest(selectedRegion.quests[0].id);
                }}
                className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Play First Quest: {selectedRegion.quests[0].title}</span>
              </button>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
