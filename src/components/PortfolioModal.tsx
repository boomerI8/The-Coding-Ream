import React, { useState } from 'react';
import { FolderGit2, Download, Copy, Eye, ExternalLink, X, Code, Check } from 'lucide-react';
import { HeroState } from '../types';
import { sounds } from '../utils/sound';

interface PortfolioModalProps {
  hero: HeroState;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ hero, onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Pre-seed completed or unlockable projects
  const defaultProjects = [
    {
      id: 'proj-guild',
      title: 'Hero Guild Hall - Semantic Portal',
      regionName: 'HTML Village',
      date: 'Recent',
      language: 'html',
      description: 'A fully accessible, semantic guild registry with accessible forms, tables, and nav anchors.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hero Guild Hall</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #0f172a; color: #f8fafc; }
    header { border-bottom: 2px solid #38bdf8; padding-bottom: 12px; margin-bottom: 24px; }
    form { display: flex; flex-direction: column; gap: 12px; background: #1e293b; padding: 20px; border-radius: 8px; }
    input, button { padding: 10px; border-radius: 6px; border: 1px solid #475569; font-size: 14px; }
    button { background: #38bdf8; color: #0f172a; font-weight: bold; cursor: pointer; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>Hero Guild Hall</h1>
    <nav><a href="#join" style="color: #38bdf8;">Enlist</a> · <a href="#roster" style="color: #38bdf8;">Roster</a></nav>
  </header>
  <main>
    <section id="join">
      <h2>Enlist Today</h2>
      <form>
        <label for="name">Hero Name:</label>
        <input type="text" id="name" placeholder="Sir Codington" required>
        <button type="submit">Join Guild</button>
      </form>
    </section>
  </main>
  <footer style="margin-top: 40px; font-size: 12px; color: #94a3b8;">
    <small>© 2026 CodeQuest Hero Guild</small>
  </footer>
</body>
</html>`,
    },
    {
      id: 'proj-stat-card',
      title: 'Adaptive Hero Stat Card Component',
      regionName: 'CSS Kingdom',
      date: 'Recent',
      language: 'css',
      description: 'A production-grade, responsive CSS card component with smooth transitions and layout switches.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaptive Hero Stat Card</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0b0f17; margin: 0; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; width: 320px; color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2); }
    .title { font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #38bdf8; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; text-align: center; }
    .slot { background: #0f172a; padding: 10px; border-radius: 6px; font-size: 12px; border: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="title">Knight of the Web</div>
    <p style="font-size: 13px; color: #94a3b8; margin: 0;">Specialized in responsive DOM defense and layout agility.</p>
    <div class="stats">
      <div class="slot"><strong style="color: #4ade80;">100</strong><br>HP</div>
      <div class="slot"><strong style="color: #60a5fa;">50</strong><br>Mana</div>
      <div class="slot"><strong style="color: #facc15;">240</strong><br>XP</div>
    </div>
  </div>
</body>
</html>`,
    },
  ];

  const projects = hero.portfolio.length > 0 ? hero.portfolio : defaultProjects;
  const current = projects[selectedIdx] || projects[0];

  const handleCopyCode = () => {
    sounds.playCoin();
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    sounds.playCoin();
    const blob = new Blob([current.code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Hero Build-As-You-Learn Portfolio</h2>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Every region capstone creates a standalone, deployable project. Learners graduate with 10+ deployable projects.
        </p>

        {/* Project Selector & Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          <div className="md:col-span-5 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Completed Artifacts ({projects.length})
            </div>
            {projects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => { sounds.playClick(); setSelectedIdx(idx); }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedIdx === idx
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-bold text-white">{p.title}</div>
                <div className="text-[11px] text-indigo-400">{p.regionName}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div className="md:col-span-7 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{current.title}</h4>
                <span className="text-[11px] text-slate-400">{current.regionName}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .html</span>
                </button>
              </div>
            </div>

            {/* Code Inspector */}
            <div className="rounded-lg overflow-hidden border border-slate-800 font-mono text-[11px] max-h-56 overflow-y-auto bg-[#0a0f18] p-3 text-slate-300 leading-relaxed whitespace-pre-wrap">
              {current.code}
            </div>

            {/* Live Render Preview */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">Live Rendered Viewport:</span>
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-white">
                <iframe
                  title="Portfolio Live Preview"
                  srcDoc={current.code}
                  sandbox="allow-scripts"
                  className="w-full h-44 border-0"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
