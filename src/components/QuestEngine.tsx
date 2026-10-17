import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle, ArrowRight, Eye, Sparkles, Terminal, Layers } from 'lucide-react';
import { Quest, HeroState } from '../types';
import { sounds } from '../utils/sound';

interface QuestEngineProps {
  quest: Quest;
  hero: HeroState;
  onCompleteQuest: (questId: string, xpEarned: number) => void;
  onBackToMap: () => void;
  onNextQuest?: () => void;
}

export const QuestEngine: React.FC<QuestEngineProps> = ({
  quest,
  hero,
  onCompleteQuest,
  onBackToMap,
  onNextQuest,
}) => {
  const [code, setCode] = useState<string>(quest.starterCode);
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; message?: string }[]>([]);
  const [outputTab, setOutputTab] = useState<'preview' | 'tests' | 'console'>('tests');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [selectedPredictOption, setSelectedPredictOption] = useState<string | null>(null);
  const [fillBlankValues, setFillBlankValues] = useState<Record<string, string>>({});
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset state when quest changes
  useEffect(() => {
    setCode(quest.starterCode);
    setActiveHintLevel(0);
    setTestResults([]);
    setOutputTab(quest.format === 'predict_output' ? 'preview' : 'tests');
    setConsoleLogs([]);
    setIsSuccessModalOpen(false);
    setSelectedPredictOption(null);
    setFillBlankValues({});
    setHasEvaluated(false);
  }, [quest.id]);

  // Handle Tab key in code textarea for indentations
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
      runEvaluation();
    }
  };

  // Run code evaluation and tests
  const runEvaluation = () => {
    sounds.playClick();
    setHasEvaluated(true);
    const logs: string[] = [];
    logs.push(`[${new Date().toLocaleTimeString()}] Running CodeQuest Test Runner...`);

    // Handle Predict Output format
    if (quest.format === 'predict_output') {
      const selected = quest.predictOptions?.find((o) => o.id === selectedPredictOption);
      if (selected && selected.isCorrect) {
        setTestResults([{ id: 'pred-1', passed: true }]);
        sounds.playSuccess();
        triggerSuccessCelebration();
      } else {
        setTestResults([{ id: 'pred-1', passed: false, message: selected ? selected.explanation : 'Please choose an answer above!' }]);
        sounds.playError();
      }
      setOutputTab('tests');
      return;
    }

    // Handle Fill Blank format
    let activeEvaluatedCode = code;
    if (quest.format === 'fill_blank' && quest.fillBlanks) {
      let allBlanksFilled = true;
      quest.fillBlanks.forEach((b, idx) => {
        const val = fillBlankValues[b.id] || '';
        if (!val) allBlanksFilled = false;
        activeEvaluatedCode = activeEvaluatedCode.replace(`___BLANK_${idx + 1}___`, val);
      });
      if (!allBlanksFilled) {
        logs.push('⚠️ Notice: Some blanks are still unfilled.');
      }
    }

    // Render HTML/CSS/JS in sandboxed iframe
    const sandboxDoc = document.createElement('html');
    sandboxDoc.innerHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, sans-serif; padding: 16px; color: #1e293b; background: #ffffff; }
          </style>
        </head>
        <body>${activeEvaluatedCode}</body>
      </html>
    `;

    // Update sandboxed iframe for visual preview
    if (iframeRef.current) {
      iframeRef.current.srcdoc = sandboxDoc.innerHTML;
    }

    // Evaluate test cases
    const results: { id: string; passed: boolean; message?: string }[] = [];
    let allPassed = true;

    // For JS and TS quests, sanitize lightweight TS types if needed
    const cleanExecutableCode = quest.language === 'typescript'
      ? activeEvaluatedCode
          .replace(/interface\s+[A-Za-z0-9_]+\s*\{[^}]*\}/g, '')
          .replace(/type\s+[A-Za-z0-9_]+\s*=[^;]+;/g, '')
          .replace(/<[A-Za-z0-9_,\s]+>/g, '')
          .replace(/:\s*[A-Za-z0-9_<>\[\]|&\s]+/g, '')
      : activeEvaluatedCode;

    quest.testCases.forEach((tc) => {
      try {
        // Build evaluation scope
        const doc = sandboxDoc;
        const currentCode = activeEvaluatedCode;
        
        // Evaluate user code and test validator together
        const evalFn = new Function('doc', 'code', 'getComputedStyle', `
          try {
            ${quest.language === 'javascript' || quest.language === 'typescript' ? cleanExecutableCode : ''}
            return Boolean(${tc.validator});
          } catch(e) {
            return false;
          }
        `);

        const passed = evalFn(doc, currentCode, (el: Element) => {
          // Fallback basic computed styles from DOM element style attribute or mock
          if (el instanceof HTMLElement) {
            return {
              display: el.style.display || (activeEvaluatedCode.includes('display: flex') ? 'flex' : activeEvaluatedCode.includes('display: grid') ? 'grid' : 'block'),
              justifyContent: el.style.justifyContent || (activeEvaluatedCode.includes('justify-content: space-between') ? 'space-between' : activeEvaluatedCode.includes('justify-content: center') ? 'center' : 'flex-start'),
              alignItems: el.style.alignItems || (activeEvaluatedCode.includes('align-items: center') ? 'center' : 'stretch'),
              gridTemplateColumns: activeEvaluatedCode.includes('repeat(3, 1fr)') || activeEvaluatedCode.includes('1fr 1fr 1fr') ? '1fr 1fr 1fr' : '1fr',
              animationName: activeEvaluatedCode.includes('animation: pulse') || activeEvaluatedCode.includes('animation-name: pulse') ? 'pulse' : 'none',
              animationIterationCount: activeEvaluatedCode.includes('infinite') ? 'infinite' : '1',
            };
          }
          return {};
        });

        if (!passed) allPassed = false;
        results.push({ id: tc.id, passed });
        logs.push(passed ? `✓ Passed: ${tc.description}` : `✗ Failed: ${tc.description}`);
      } catch (err: unknown) {
        allPassed = false;
        results.push({ id: tc.id, passed: false, message: (err as Error).message });
        logs.push(`✗ Error evaluating test: ${(err as Error).message}`);
      }
    });

    setTestResults(results);
    setConsoleLogs(logs);
    setOutputTab('tests');

    if (allPassed && results.length > 0) {
      sounds.playSuccess();
      triggerSuccessCelebration();
    } else {
      sounds.playError();
    }
  };

  const triggerSuccessCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
    setIsSuccessModalOpen(true);
    onCompleteQuest(quest.id, quest.xpReward);
  };

  const handleRevealHint = (level: number) => {
    sounds.playClick();
    setActiveHintLevel(level);
    if (level === 3) {
      // Direct solution peek
      setCode(quest.solutionCode);
    }
  };

  const isCompletedAlready = hero.completedQuests.includes(quest.id);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => { sounds.playClick(); onBackToMap(); }}
            className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            ← World Map
          </button>
          <span>/</span>
          <span className="text-slate-300 font-medium">{quest.regionId}</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{quest.title}</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Format: {quest.format.replace('_', ' ')}
          </span>
          <span className="text-amber-400 font-semibold">
            +{quest.xpReward} XP
          </span>
          {isCompletedAlready && (
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Solved
            </span>
          )}
        </div>
      </div>

      {/* Main 2-Zone Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Zone: Story briefing, Mascot, Task, Hints (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quest Brief Card */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400">
                Quest #{quest.order}
              </span>
              <h1 className="text-lg font-bold text-white tracking-tight">
                {quest.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {quest.subtitle}
              </p>
            </div>

            {/* Anti-Boredom Rule: Max 3 short text blocks */}
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              {quest.storyBlocks.map((block, i) => (
                <p key={i} className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                  {block}
                </p>
              ))}
            </div>

            {/* Mascot Companion Guide Card */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg shrink-0">
                👾
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-amber-400 text-[11px]">Bit the Cyber-Sprite:</div>
                <div className="italic text-slate-200">"{quest.mascotQuip}"</div>
              </div>
            </div>

            {/* Clear Action Prompt */}
            <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Objective:</span>
              </div>
              <p className="text-xs font-medium text-white leading-normal">
                {quest.taskPrompt}
              </p>
            </div>

            {/* Format-Specific Interactive Elements */}
            {quest.format === 'predict_output' && quest.predictOptions && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300">Choose the predicted output:</div>
                {quest.predictOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { sounds.playClick(); setSelectedPredictOption(opt.id); }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedPredictOption === opt.id
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            )}

            {quest.format === 'fill_blank' && quest.fillBlanks && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300">Choose Missing Tokens:</div>
                {quest.fillBlanks.map((b) => (
                  <div key={b.id} className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-medium block">{b.label}:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {b.options.map((opt) => {
                        const isChosen = fillBlankValues[b.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              sounds.playClick();
                              setFillBlankValues((prev) => ({ ...prev, [b.id]: opt }));
                            }}
                            className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer font-mono ${
                              isChosen
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3-Tier Hint System */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Arcane Hints (3 Tiers)</span>
                </span>
                <span className="text-[11px] text-slate-500">Tier 3 deducts XP</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {quest.hints.map((hint) => (
                  <button
                    key={hint.level}
                    onClick={() => handleRevealHint(hint.level)}
                    className={`py-1.5 px-2 rounded text-[11px] font-medium border text-center transition-all cursor-pointer ${
                      activeHintLevel >= hint.level
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Level {hint.level} {hint.xpCost > 0 ? `(-${hint.xpCost}XP)` : '(Free)'}
                  </button>
                ))}
              </div>

              {activeHintLevel > 0 && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 mt-2 space-y-1">
                  <div className="font-bold text-amber-400">
                    Hint {activeHintLevel}: {quest.hints[activeHintLevel - 1].title}
                  </div>
                  <pre className="font-sans text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {quest.hints[activeHintLevel - 1].content}
                  </pre>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Zone: Code Editor & Live Preview / Test Suite (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Code Editor Container */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700 uppercase">
                  {quest.language}
                </span>
                <span className="text-xs text-slate-400">editor.sandbox</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setCode(quest.starterCode);
                    setFillBlankValues({});
                    setSelectedPredictOption(null);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset to starter template"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={runEvaluation}
                  className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>Run (Cmd+Enter)</span>
                </button>
              </div>
            </div>

            {/* Interactive Code Editor Field */}
            <div className="relative font-mono text-xs">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                rows={12}
                className="w-full bg-[#0a0f18] text-slate-200 p-4 font-mono leading-relaxed outline-none resize-y border-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Write your code solution here..."
              />
            </div>
          </div>

          {/* Output / Tests / Console Panel */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Tab Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { sounds.playClick(); setOutputTab('tests'); }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    outputTab === 'tests'
                      ? 'bg-slate-800 text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Test Cases ({testResults.filter(t => t.passed).length}/{quest.testCases.length})</span>
                </button>

                <button
                  onClick={() => { sounds.playClick(); setOutputTab('preview'); }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    outputTab === 'preview'
                      ? 'bg-slate-800 text-amber-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>

                <button
                  onClick={() => { sounds.playClick(); setOutputTab('console'); }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    outputTab === 'console'
                      ? 'bg-slate-800 text-slate-200 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Console</span>
                </button>
              </div>

              {hasEvaluated && (
                <span className={`text-[11px] font-semibold ${
                  testResults.length > 0 && testResults.every(t => t.passed)
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}>
                  {testResults.length > 0 && testResults.every(t => t.passed) ? 'All Tests Passing!' : 'Check Failing Criteria'}
                </span>
              )}
            </div>

            {/* Tab Body */}
            <div className="p-4 min-h-[160px]">
              
              {outputTab === 'tests' && (
                <div className="space-y-2">
                  {quest.testCases.map((tc) => {
                    const res = testResults.find((r) => r.id === tc.id);
                    const isPassed = res?.passed;
                    return (
                      <div
                        key={tc.id}
                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs ${
                          res === undefined
                            ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                            : isPassed
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                            : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                        }`}
                      >
                        {res === undefined ? (
                          <div className="w-4 h-4 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                        ) : isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                        )}

                        <div className="space-y-0.5">
                          <div className="font-medium">{tc.description}</div>
                          {res && !isPassed && res.message && (
                            <div className="text-[11px] text-rose-400 italic">{res.message}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {outputTab === 'preview' && (
                <div className="rounded-lg overflow-hidden border border-slate-800 bg-white min-h-[180px]">
                  <iframe
                    ref={iframeRef}
                    title="Code Output Preview"
                    sandbox="allow-scripts"
                    className="w-full h-48 border-0"
                  />
                </div>
              )}

              {outputTab === 'console' && (
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] text-slate-300 space-y-1 max-h-48 overflow-y-auto">
                  {consoleLogs.length > 0 ? (
                    consoleLogs.map((log, lIdx) => <div key={lIdx}>{log}</div>)
                  ) : (
                    <div className="text-slate-500 italic">No output yet. Click 'Run' to evaluate.</div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Victory Celebration Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-2xl space-y-5 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl">
              🎉
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Quest Complete!
              </span>
              <h2 className="text-xl font-bold text-white">
                {quest.title}
              </h2>
              <p className="text-xs text-slate-300">
                You gained <span className="font-bold text-amber-400">+{quest.xpReward} XP</span> and mastered new digital capabilities!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { sounds.playClick(); setIsSuccessModalOpen(false); onBackToMap(); }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Return to World Map
              </button>

              {onNextQuest && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsSuccessModalOpen(false);
                    onNextQuest();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Next Quest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
