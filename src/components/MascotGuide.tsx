import React, { useState } from 'react';
import { MessageSquare, X, Sparkles, BookOpen, Download } from 'lucide-react';
import { sounds } from '../utils/sound';

export const MascotGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);

  const quips = [
    "A computer will do what you tell it to do, not what you want it to do. Tragic, isn't it?",
    "If it works on the first try, don't celebrate yet. Check if you accidentally commented out the whole file.",
    "CSS is like an energetic puppy: you tell it to sit in the center, and it runs out the front door.",
    "Remember: 1fr means 1 fraction of free space. Don't let your elements starve!",
    "When in doubt: inspect element, drink water, and check if you closed that </div> tag.",
  ];

  const handleNextQuip = () => {
    sounds.playClick();
    setQuoteIndex((prev) => (prev + 1) % quips.length);
  };

  const handleDownloadCheatSheet = () => {
    sounds.playCoin();
    const content = `# CodeQuest Full-Stack Cheat Sheet

## HTML5 Semantics
- <header>: Introductory content or navigational aids
- <nav>: Set of navigation links
- <main>: Dominant content unique to the document
- <article>: Self-contained composition (blog post, card, forum entry)
- <section>: Standalone generic section
- <footer>: Authorship, copyright, legal disclaimer

## CSS Flexbox
- display: flex; (turns parent into flex container)
- justify-content: flex-start | center | flex-end | space-between | space-around; (main axis)
- align-items: stretch | flex-start | center | flex-end; (cross axis)
- flex-direction: row | column;
- gap: 16px;

## CSS Grid
- display: grid;
- grid-template-columns: repeat(3, 1fr);
- grid-template-rows: auto;
- gap: 12px;

## JavaScript Essentials
- const (block-scoped immutable binding) / let (mutable binding)
- array.map(fn) / array.filter(fn) / array.reduce(fn, initial)
- async function / await Promise
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codequest-cheat-sheet.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      
      {/* Speech Bubble / Dialogue Box */}
      {isOpen && (
        <div className="mb-3 w-80 p-4 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-3 animate-in slide-in-from-bottom-2 fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <span>👾 Bit the Cyber-Sprite</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-200 italic leading-relaxed">
            "{quips[quoteIndex]}"
          </p>

          <div className="flex items-center justify-between pt-1 text-[11px]">
            <button
              onClick={handleNextQuip}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              Another tip ↻
            </button>

            <button
              onClick={handleDownloadCheatSheet}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Cheat Sheet (.md)</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Mascot Button */}
      <button
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-slate-950"
        title="Chat with Bit the Cyber-Sprite"
        aria-label="Open Mascot Companion Guide"
      >
        👾
      </button>

    </div>
  );
};
