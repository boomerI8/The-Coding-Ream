import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Swords, Clock, Heart, Play, RotateCcw, Trophy, Download, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { BossFight, HeroState } from '../types';
import { sounds } from '../utils/sound';

interface BossFightArenaProps {
  boss: BossFight;
  hero: HeroState;
  onDefeatBoss: (bossId: string, xpReward: number, badge: { id: string; name: string; icon: string; description: string }, portfolioProject: { title: string; description: string; fileName: string; code: string }) => void;
  onDeductHeart: () => void;
  onBackToMap: () => void;
}

export const BossFightArena: React.FC<BossFightArenaProps> = ({
  boss,
  hero,
  onDefeatBoss,
  onDeductHeart,
  onBackToMap,
}) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const currentPhase = boss.phases[currentPhaseIndex] || boss.phases[0];

  const [code, setCode] = useState<string>(currentPhase?.starterCode || '');
  const [bossHp, setBossHp] = useState<number>(boss.totalHp);
  const [timeLeft, setTimeLeft] = useState<number>(boss.timeLimitSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean }[]>([]);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [isDefeatModalOpen, setIsDefeatModalOpen] = useState<boolean>(false);
  const [bossDamageFlash, setBossDamageFlash] = useState<boolean>(false);
  const [accumulatedCode, setAccumulatedCode] = useState<string>('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update starter code when phase changes
  useEffect(() => {
    if (currentPhase) {
      setCode(currentPhase.starterCode);
      setTestResults([]);
    }
  }, [currentPhaseIndex, currentPhase]);

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDefeatModalOpen(true);
          sounds.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Handle Tab indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPhaseEvaluation();
    }
  };

  const runPhaseEvaluation = () => {
    sounds.playClick();
    if (!currentPhase) return;

    // Sandbox execution
    const sandboxDoc = document.createElement('html');
    sandboxDoc.innerHTML = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><style>body{font-family:sans-serif;padding:12px;background:#fff;color:#000;}</style></head>
        <body>${code}</body>
      </html>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = sandboxDoc.innerHTML;
    }

    const results: { id: string; passed: boolean }[] = [];
    let allPassed = true;

    currentPhase.testCases.forEach((tc) => {
      try {
        const doc = sandboxDoc;
        const currentCode = code;
        const cleanJs = code
          .replace(/interface\s+[A-Za-z0-9_]+\s*\{[^}]*\}/g, '')
          .replace(/type\s+[A-Za-z0-9_]+\s*=[^;]+;/g, '')
          .replace(/<[A-Za-z0-9_,\s]+>/g, '');

        const evalFn = new Function('doc', 'code', 'getComputedStyle', `
          try {
            ${cleanJs}
            return Boolean(${tc.validator});
          } catch(e) {
            return false;
          }
        `);
        const passed = evalFn(doc, currentCode, (el: Element) => {
          if (el instanceof HTMLElement) {
            return {
              display: el.style.display || (currentCode.includes('display: flex') ? 'flex' : currentCode.includes('display: grid') ? 'grid' : 'block'),
              justifyContent: el.style.justifyContent || (currentCode.includes('justify-content: center') ? 'center' : 'flex-start'),
              alignItems: el.style.alignItems || (currentCode.includes('align-items: center') ? 'center' : 'stretch'),
              gridTemplateColumns: currentCode.includes('repeat(3, 1fr)') ? '1fr 1fr 1fr' : '1fr',
            };
          }
          return {};
        });
        if (!passed) allPassed = false;
        results.push({ id: tc.id, passed });
      } catch {
        allPassed = false;
        results.push({ id: tc.id, passed: false });
      }
    });

    setTestResults(results);

    if (allPassed) {
      sounds.playSuccess();
      // Boss takes damage
      const phaseDamage = Math.round(boss.totalHp / boss.phases.length);
      setBossDamageFlash(true);
      setTimeout(() => setBossDamageFlash(false), 500);
      setBossHp((prev) => Math.max(0, prev - phaseDamage));

      const newAccumulated = accumulatedCode + '\n' + code;
      setAccumulatedCode(newAccumulated);

      // Check if final phase completed
      if (currentPhaseIndex + 1 >= boss.phases.length) {
        // Boss Defeated!
        setIsTimerRunning(false);
        setIsVictoryModalOpen(true);
        sounds.playBossVictory();
        try {
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
        } catch {
          // Fallback
        }
        onDefeatBoss(boss.id, boss.xpReward, boss.rewardBadge, {
          title: boss.portfolioProject.title,
          description: boss.portfolioProject.description,
          fileName: boss.portfolioProject.fileName,
          code: newAccumulated,
        });
      } else {
        // Advance to next phase
        setCurrentPhaseIndex((prev) => prev + 1);
      }
    } else {
      sounds.playError();
      onDeductHeart();
      if (hero.hearts <= 1) {
        setIsDefeatModalOpen(true);
        setIsTimerRunning(false);
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const hpPercent = Math.max(0, Math.round((bossHp / boss.totalHp) * 100));

  const handleDownloadProject = () => {
    sounds.playCoin();
    const blob = new Blob([accumulatedCode || code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = boss.portfolioProject.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Combat HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
        <button
          onClick={() => { sounds.playClick(); onBackToMap(); }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Flee to World Map</span>
        </button>

        {/* Boss HP Bar */}
        <div className="flex-1 max-w-md mx-auto space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-rose-400 flex items-center gap-1.5">
              <Swords className="w-3.5 h-3.5" />
              <span>{boss.bossName}</span>
            </span>
            <span className="font-mono tabular-nums text-slate-300">
              {bossHp} / {boss.totalHp} HP
            </span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                bossDamageFlash ? 'bg-white shadow-[0_0_15px_#fff]' : 'bg-gradient-to-r from-red-600 via-rose-500 to-orange-500'
              }`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Combat Timers & Lives */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono tabular-nums">{timeFormatted}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="tabular-nums font-mono">{hero.hearts} Lives</span>
          </div>
        </div>
      </div>

      {/* Main Encounter Stage (Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Boss Lore & Current Phase Objective (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-center gap-3">
              <span className={`text-4xl p-2 rounded-xl bg-rose-950/50 border border-rose-800/40 ${bossDamageFlash ? 'animate-bounce' : ''}`}>
                {boss.avatarIcon}
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                  Phase {currentPhaseIndex + 1} of {boss.phases.length}
                </span>
                <h2 className="text-lg font-bold text-white">
                  {currentPhase?.title}
                </h2>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
              "{boss.lore}"
            </div>

            {/* Phase Instructions */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Phase Objective:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentPhase?.instruction}
              </p>
            </div>

            {/* Test Criteria */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Combat Test Criteria:</div>
              <div className="space-y-1.5">
                {currentPhase?.testCases.map((tc) => {
                  const res = testResults.find((r) => r.id === tc.id);
                  return (
                    <div
                      key={tc.id}
                      className={`flex items-center gap-2 p-2 rounded-md text-xs border ${
                        res?.passed
                          ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${res?.passed ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span>{tc.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Reward Notice */}
            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-300 space-y-1">
              <div className="font-semibold text-indigo-200 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Portfolio Deliverable:</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Defeating this boss exports: <strong className="text-slate-200">{boss.portfolioProject.title}</strong>
              </p>
            </div>

          </div>
        </div>

        {/* Right: Combat Code Editor & Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-rose-400">
                boss_battle_phase_{currentPhaseIndex + 1}.html
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setCode(currentPhase.starterCode);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Phase</span>
                </button>

                <button
                  onClick={runPhaseEvaluation}
                  className="flex items-center gap-1.5 px-4 py-1 text-xs font-bold rounded bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Strike Boss!</span>
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              rows={13}
              className="w-full bg-[#090d16] text-slate-200 p-4 font-mono text-xs leading-relaxed outline-none resize-y border-none focus:ring-1 focus:ring-rose-500"
              placeholder="Code your boss counter-attack..."
            />
          </div>

          {/* Sandbox Live Viewport */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-400">Combat Preview Stage:</div>
            <div className="rounded-lg overflow-hidden border border-slate-800 bg-white">
              <iframe
                ref={iframeRef}
                title="Boss Battle Output Preview"
                sandbox="allow-scripts"
                className="w-full h-40 border-0"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Victory Celebration Modal */}
      {isVictoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-slate-900 border border-amber-500/60 shadow-2xl space-y-6 text-center">
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              {boss.rewardBadge.icon}
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Boss Vanquished!
              </span>
              <h2 className="text-2xl font-bold text-white">
                {boss.bossName} Has Fallen!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                You earned the <strong className="text-amber-400">{boss.rewardBadge.name}</strong> badge and <strong className="text-amber-400">+{boss.xpReward} XP</strong>!
              </p>
            </div>

            {/* Portfolio Artifact Box */}
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">New Portfolio Artifact Added</span>
                <span className="text-[11px] font-mono text-slate-400">{boss.portfolioProject.fileName}</span>
              </div>
              <p className="text-xs text-slate-300">
                {boss.portfolioProject.description}
              </p>
              <button
                onClick={handleDownloadProject}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Project Code (.html)</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { sounds.playClick(); setIsVictoryModalOpen(false); onBackToMap(); }}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                Claim Rewards & Return to Map
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Defeat Modal */}
      {isDefeatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-rose-500/50 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-3xl">
              💀
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">You Were Defeated!</h2>
              <p className="text-xs text-slate-300">
                The boss overwhelmed your defenses or your combat timer expired. Regain your focus and try again!
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { sounds.playClick(); onBackToMap(); }}
                className="px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Retreat to Map
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsDefeatModalOpen(false);
                  setCurrentPhaseIndex(0);
                  setBossHp(boss.totalHp);
                  setTimeLeft(boss.timeLimitSeconds);
                  setIsTimerRunning(true);
                }}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Retry Battle
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
