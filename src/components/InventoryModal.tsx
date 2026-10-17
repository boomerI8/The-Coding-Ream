import React, { useState } from 'react';
import { Backpack, Sparkles, CheckCircle2, X } from 'lucide-react';
import { HeroState, InventoryItem } from '../types';
import { sounds } from '../utils/sound';

interface InventoryModalProps {
  hero: HeroState;
  onUsePotion: (potionId: string, bonusXp: number) => void;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  hero,
  onUsePotion,
  onClose,
}) => {
  const [activeQuizStep, setActiveQuizStep] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Spaced repetition review potion rapid quiz
  const reviewQuestions = [
    {
      q: 'Which semantic element should enclose primary navigation links?',
      options: ['<nav>', '<header>', '<menu>', '<section>'],
      correct: 0,
      expl: '<nav> is reserved for primary navigational blocks.',
    },
    {
      q: 'In Flexbox, which property aligns items along the cross axis?',
      options: ['justify-content', 'align-items', 'flex-direction', 'gap'],
      correct: 1,
      expl: 'align-items controls cross-axis alignment.',
    },
    {
      q: 'What is the required image attribute for visually impaired screen readers?',
      options: ['title', 'alt', 'caption', 'role'],
      correct: 1,
      expl: 'The alt attribute provides alternative text for accessibility.',
    },
  ];

  const handleStartReview = () => {
    sounds.playCoin();
    setActiveQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswerQuestion = (idx: number) => {
    sounds.playClick();
    setSelectedAnswer(idx);
    const isCorrect = idx === reviewQuestions[activeQuizStep || 0].correct;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if ((activeQuizStep || 0) + 1 >= reviewQuestions.length) {
        // Complete review potion
        setActiveQuizStep(null);
        const bonus = (quizScore + (isCorrect ? 1 : 0)) * 25;
        onUsePotion('potion-review-1', bonus);
      } else {
        setActiveQuizStep((prev) => (prev !== null ? prev + 1 : 0));
      }
    }, 1200);
  };

  const reviewPotion = hero.inventory.find((i) => i.id === 'potion-review-1');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Backpack className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Hero Satchel & Inventory</h2>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spaced Repetition Potion Section */}
        {activeQuizStep !== null ? (
          <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Memory Elixir: Spaced Repetition ({activeQuizStep + 1} / {reviewQuestions.length})</span>
              <span>Score: {quizScore}</span>
            </div>
            <h3 className="text-base font-bold text-white">
              {reviewQuestions[activeQuizStep].q}
            </h3>
            <div className="space-y-2">
              {reviewQuestions[activeQuizStep].options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === reviewQuestions[activeQuizStep].correct;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800';
                if (selectedAnswer !== null) {
                  if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                  else if (isSelected) btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerQuestion(oIdx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-xl bg-emerald-900/40 border border-emerald-800/40">
                🧪
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Spaced Repetition: Memory Elixir</h4>
                <p className="text-xs text-slate-300">
                  Resurface previous concepts in a 3-question rapid drill. Refreshes memory and earns bonus XP!
                </p>
                <div className="text-[11px] text-emerald-400 mt-0.5">
                  Available in satchel: {reviewPotion?.count || 0}
                </div>
              </div>
            </div>

            <button
              onClick={handleStartReview}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              Drink Elixir
            </button>
          </div>
        )}

        {/* Collectibles Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Collected Artifacts & Badges ({hero.inventory.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hero.inventory.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800"
              >
                <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {item.icon}
                </span>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white">{item.name}</h5>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      {item.type} {item.count > 1 ? `x${item.count}` : ''}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
