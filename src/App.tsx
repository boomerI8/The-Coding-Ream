import React, { useState, useEffect } from 'react';
import { REGIONS_DATA } from './data/regions';
import { HeroState, Quest, BossFight } from './types';
import { loadHeroState, saveHeroState, calculateLevel } from './utils/storage';
import { sounds } from './utils/sound';
import { TopBar } from './components/TopBar';
import { WorldMap } from './components/WorldMap';
import { QuestEngine } from './components/QuestEngine';
import { BossFightArena } from './components/BossFightArena';
import { SkillTreeModal } from './components/SkillTreeModal';
import { InventoryModal } from './components/InventoryModal';
import { PortfolioModal } from './components/PortfolioModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { HeroCustomizerModal } from './components/HeroCustomizerModal';
import { MascotGuide } from './components/MascotGuide';

export default function App() {
  const [hero, setHero] = useState<HeroState>(loadHeroState);
  const [activeTab, setActiveTab] = useState<'map' | 'quest' | 'boss' | 'skills' | 'inventory' | 'portfolio' | 'leaderboard'>('map');
  const [activeQuestId, setActiveQuestId] = useState<string>('html-q1');
  const [activeBossId, setActiveBossId] = useState<string>('boss-html');

  // Modal states
  const [isDailyOpen, setIsDailyOpen] = useState<boolean>(false);
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Sync sound setting
  useEffect(() => {
    sounds.enabled = hero.soundEnabled;
  }, [hero.soundEnabled]);

  // Persist hero updates
  const updateHero = (updater: (prev: HeroState) => HeroState) => {
    setHero((prev) => {
      const next = updater(prev);
      saveHeroState(next);
      return next;
    });
  };

  const handleToggleSound = () => {
    updateHero((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleSelectQuest = (questId: string) => {
    setActiveQuestId(questId);
    setActiveTab('quest');
  };

  const handleSelectBoss = (bossId: string) => {
    setActiveBossId(bossId);
    setActiveTab('boss');
  };

  // Find all available quests across all regions
  const allQuests: Quest[] = REGIONS_DATA.flatMap((r) => r.quests);
  const activeQuest = allQuests.find((q) => q.id === activeQuestId) || allQuests[0];

  // Find active boss
  const allBosses: BossFight[] = REGIONS_DATA.map((r) => r.boss);
  const activeBoss = allBosses.find((b) => b.id === activeBossId) || allBosses[0];

  const handleCompleteQuest = (questId: string, xpEarned: number) => {
    updateHero((prev) => {
      const prevLvl = calculateLevel(prev.xp).level;
      const isFirstTime = !prev.completedQuests.includes(questId);
      const newXp = prev.xp + (isFirstTime ? xpEarned : Math.round(xpEarned * 0.25));
      const nextLvl = calculateLevel(newXp).level;

      if (nextLvl > prevLvl) {
        sounds.playLevelUp();
      }

      return {
        ...prev,
        xp: newXp,
        completedQuests: isFirstTime ? [...prev.completedQuests, questId] : prev.completedQuests,
      };
    });
  };

  const handleDefeatBoss = (
    bossId: string,
    xpReward: number,
    badge: { id: string; name: string; icon: string; description: string },
    portfolioProject: { title: string; description: string; fileName: string; code: string }
  ) => {
    updateHero((prev) => {
      const isFirst = !prev.completedBosses.includes(bossId);
      const newBosses = isFirst ? [...prev.completedBosses, bossId] : prev.completedBosses;

      // Unlock next region logic
      const regionIndex = REGIONS_DATA.findIndex((r) => r.boss.id === bossId);
      const nextRegion = REGIONS_DATA[regionIndex + 1];
      const newUnlocked = [...prev.unlockedRegions];
      if (nextRegion && !newUnlocked.includes(nextRegion.id)) {
        newUnlocked.push(nextRegion.id);
      }

      // Add badge to inventory if not already owned
      const inventory = [...prev.inventory];
      if (!inventory.some((i) => i.id === badge.id)) {
        inventory.push({
          id: badge.id,
          name: badge.name,
          type: 'badge',
          icon: badge.icon,
          description: badge.description,
          count: 1,
        });
      }

      // Add portfolio artifact
      const portfolio = [
        ...prev.portfolio,
        {
          id: `proj-${Date.now()}`,
          title: portfolioProject.title,
          description: portfolioProject.description,
          regionName: REGIONS_DATA[regionIndex]?.name || 'Realm',
          date: 'Just now',
          code: portfolioProject.code,
          language: 'html',
        },
      ];

      return {
        ...prev,
        xp: prev.xp + xpReward,
        completedBosses: newBosses,
        unlockedRegions: newUnlocked,
        inventory,
        portfolio,
        hearts: prev.maxHearts, // restore hearts on victory!
      };
    });
  };

  const handleDeductHeart = () => {
    updateHero((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  const handleSurpriseMe = () => {
    // Choose random quest from unlocked regions
    const unlockedQuests = REGIONS_DATA.filter((r) =>
      hero.unlockedRegions.includes(r.id)
    ).flatMap((r) => r.quests);

    const pool = unlockedQuests.length > 0 ? unlockedQuests : allQuests;
    const randomQuest = pool[Math.floor(Math.random() * pool.length)];
    if (randomQuest) {
      handleSelectQuest(randomQuest.id);
    }
  };

  const handleUsePotion = (potionId: string, bonusXp: number) => {
    updateHero((prev) => {
      const inv = prev.inventory
        .map((i) => (i.id === potionId ? { ...i, count: i.count - 1 } : i))
        .filter((i) => i.count > 0);

      return {
        ...prev,
        xp: prev.xp + bonusXp,
        inventory: inv,
      };
    });
  };

  const handleClaimDailyBonus = (xp: number) => {
    updateHero((prev) => ({
      ...prev,
      xp: prev.xp + xp,
      streak: prev.streak + 1,
    }));
  };

  // Find next quest in sequence
  const currentQuestIdx = allQuests.findIndex((q) => q.id === activeQuestId);
  const nextQuest = allQuests[currentQuestIdx + 1];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Bar Contract (Wordmark · Links · Action HUD) */}
      <TopBar
        hero={hero}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'skills') setIsSkillTreeOpen(true);
          else if (tab === 'inventory') setIsInventoryOpen(true);
          else if (tab === 'portfolio') setIsPortfolioOpen(true);
          else if (tab === 'leaderboard') setIsLeaderboardOpen(true);
          else setActiveTab(tab);
        }}
        onToggleSound={handleToggleSound}
        onSurpriseMe={handleSurpriseMe}
        onOpenDaily={() => setIsDailyOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'map' && (
          <WorldMap
            regions={REGIONS_DATA}
            hero={hero}
            onSelectQuest={handleSelectQuest}
            onSelectBoss={handleSelectBoss}
          />
        )}

        {activeTab === 'quest' && activeQuest && (
          <QuestEngine
            quest={activeQuest}
            hero={hero}
            onCompleteQuest={handleCompleteQuest}
            onBackToMap={() => setActiveTab('map')}
            onNextQuest={nextQuest ? () => handleSelectQuest(nextQuest.id) : undefined}
          />
        )}

        {activeTab === 'boss' && activeBoss && (
          <BossFightArena
            boss={activeBoss}
            hero={hero}
            onDefeatBoss={handleDefeatBoss}
            onDeductHeart={handleDeductHeart}
            onBackToMap={() => setActiveTab('map')}
          />
        )}
      </main>

      {/* Persistent Mascot Guide Widget */}
      <MascotGuide />

      {/* Modals */}
      {isDailyOpen && (
        <DailyChallengeModal
          hero={hero}
          quests={allQuests}
          onStartQuest={handleSelectQuest}
          onClaimDailyBonus={handleClaimDailyBonus}
          onClose={() => setIsDailyOpen(false)}
        />
      )}

      {isSkillTreeOpen && (
        <SkillTreeModal
          hero={hero}
          onSelectTrack={(track) => updateHero((prev) => ({ ...prev, selectedTrack: track }))}
          onClose={() => setIsSkillTreeOpen(false)}
        />
      )}

      {isInventoryOpen && (
        <InventoryModal
          hero={hero}
          onUsePotion={handleUsePotion}
          onClose={() => setIsInventoryOpen(false)}
        />
      )}

      {isPortfolioOpen && (
        <PortfolioModal
          hero={hero}
          onClose={() => setIsPortfolioOpen(false)}
        />
      )}

      {isLeaderboardOpen && (
        <LeaderboardModal
          hero={hero}
          onClose={() => setIsLeaderboardOpen(false)}
        />
      )}

      {isProfileOpen && (
        <HeroCustomizerModal
          hero={hero}
          onUpdateHeroProfile={(name, track) => {
            updateHero((prev) => ({
              ...prev,
              name,
              selectedTrack: track,
            }));
          }}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

    </div>
  );
}
