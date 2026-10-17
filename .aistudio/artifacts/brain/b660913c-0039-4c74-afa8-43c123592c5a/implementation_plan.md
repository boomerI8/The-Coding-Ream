# CodeQuest: Gamified Coding-Learning Adventure Platform

An interactive fantasy-sci-fi coding adventure platform where learners progress from complete beginners to full-stack engineers through an explorable world map of skill regions, bite-sized interactive quests, hands-on browser code execution, and high-stakes boss battles.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation will proceed step-by-step strictly upon your trigger ("start step 1"). No application source code is modified during this planning phase.

- **Execution Environment & Stack**: The sandbox environment is preconfigured with **React 19 + Vite + TypeScript + Tailwind CSS v4** (with `motion` and `lucide-react`). We will deliver a responsive, client-side routed Single Page Application with persistent `localStorage` progress store, structured to support future Supabase/Firebase sync cleanly.
- **Phased Rollout Plan**:
  - **Step 1 (World Map & Hub Foundation)**: Explorable interactive world map, region progression nodes, hero profile HUD (XP, level, rank, streak, hearts), audio synthesizer, and mascot dialogue companion.
  - **Step 2 (Interactive Quest Engine & Code Editor)**: Split-screen stage with bite-sized lesson cards, live code runner (HTML/CSS/JS sandbox + automated test runner), multi-format mechanics (write code, fix bug, fill blank, predict output), and 3-level hint system.
  - **Step 3 (Boss Battle & Capstone Project System)**: Timed multi-stage boss fight challenges with live boss HP bar, heart management, portfolio project submission, and victory celebration.
  - **Step 4 (Complete Curriculum & Content Expansion)**: Fully playable HTML Village (3 quests + boss) and CSS Kingdom (3 quests + boss), extensible JSON quest schema, "Surprise Me" daily quest generator, and review potions.

---

### 1. Overview & Core Concept

CodeQuest transforms traditional coding curricula into an RPG progression system:
- **World Map of Regions**:
  - *HTML Village* (Foundations, semantics, markup)
  - *CSS Kingdom* (Flexbox, Grid, animations, styling)
  - *JavaScript Jungle* (Variables, functions, DOM, async)
  - *TypeScript Outpost* (Types, interfaces, generics)
  - *Java Fortress* (OOP, collections, Spring concepts)
  - *Python Swamp* (Scripting, data manipulation)
  - *Database Caves* (SQL queries, relational joins, document models)
  - *React Realm* (Components, state, hooks, effects)
  - *Backend Citadel* (Node/Express, REST, auth, security)
  - *DevOps Sky-Port* (Git, Docker, CI/CD, cloud basics)
  - *DSA Dungeon* (Arrays, trees, graphs, algorithms)
- **Anti-Boredom Rules Enforced in UI**:
  - Max 3 short text blocks per quest before an interactive task.
  - Hands-on execution first, concise rationale second.
  - Rotating challenge formats so no two consecutive quests feel identical.
  - Mascot companion ("Bit the Cyber-Sprite") delivering humorous quips and error coaching.
  - Web Audio API synthesizer for instant chimes, level-up fanfares, and error hums (with one-click mute).

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Aesthetic Direction**: Neo-retro fantasy adventure meets clean modern developer tools (dark slate aesthetic with glowing gem accents, crisp borders, and zero-pill metadata).
- **Color Palette**:
  - *Canvas (60%)*: Deep obsidian slate (`#0B0F17` / `#0F172A`)
  - *Surfaces & Borders (30%)*: Midnight panels (`#1E293B`) with hairline borders (`#334155`)
  - *Accents & Progress (10%)*: Radiant amber (`#F59E0B`) for XP/Gold, Mana Cyan (`#06B6D4`) for logic/tests, Emerald (`#10B981`) for passing tests, Ruby (`#EF4444`) for boss battle hearts.
- **Typography & Hierarchy**:
  - Display titles: *Plus Jakarta Sans* / *Outfit* with balanced headlines
  - Code & telemetry: Tabular numerals with clean monospaced font
- **Top Bar Contract**:
  - Zone 1: Single-line brand mark `CodeQuest` with hero level badge
  - Zone 2: Navigation tabs (`World Map`, `Current Quest`, `Boss Arena`, `Skill Tree`, `Achievements`)
  - Zone 3: Hero status HUD (Streak flame, XP counter, Hearts indicator, Sound toggle)

---

### 3. Key Product Decisions & Trade-Offs

- **Code Runner & Sandbox Strategy**:
  - *Decision*: In-browser iframe sandbox with synthetic unit test validation for HTML/CSS/JS and safe evaluated sandbox for algorithms.
  - *Why*: Delivers zero-latency execution, works 100% offline without remote compilation cold starts, and prevents arbitrary code exploits in the parent frame.
- **Audio & Sound Effects**:
  - *Decision*: Native Web Audio API procedural sound engine with fallback audio clips.
  - *Why*: Eliminates large binary asset downloads or missing audio CDN links while providing retro 8-bit chimes, level-up flourishes, and coin effects.
- **Curriculum & Extensibility**:
  - *Decision*: Declarative TypeScript/JSON quest schemas with built-in validation.
  - *Why*: Allows anyone to add a new quest in 2 minutes simply by declaring prompt, starter code, test assertions, and hints.

---

### 4. Technical Architecture & Data Strategy

#### System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CodeQuest Main App Shell                        │
├────────────────────────────────┬───────────────────────────────────────┤
│ Hero HUD (XP · Level · Streak) │ Sound FX & Audio Synthesizer (Mute)   │
└────────────────────────────────┴───────────────────────────────────────┘
                                   │
         ┌─────────────────────────┴────────────────────────┐
         ▼                                                  ▼
┌─────────────────────────┐                        ┌───────────────────────┐
│     World Map View      │                        │  Active Quest Engine  │
│  - 10 Region Biomes     │                        │  - Split-screen stage │
│  - Prerequisite Nodes   │                        │  - Bite-sized slides  │
│  - Region Progress %    │                        │  - Multi-format tasks │
│  - Boss Lock / Unlock   │                        │  - 3-tier Hint system │
└─────────────────────────┘                        └───────────┬───────────┘
                                                               │
                                       ┌───────────────────────┴───────────┐
                                       ▼                                   ▼
                            ┌─────────────────────┐             ┌─────────────────────┐
                            │ Code Editor Sandbox │             │  Automated Tests &  │
                            │ - Syntax highlight  │             │    Live Preview     │
                            │ - Run / Reset       │             │ - DOM assertions    │
                            │ - Solution reveal   │             │ - Output log        │
                            └─────────────────────┘             └─────────────────────┘
                                       │                                   │
                                       └───────────────────────┬───────────┘
                                                               ▼
                                                    ┌─────────────────────┐
                                                    │ Boss Battle Arena   │
                                                    │ - Timed boss fight  │
                                                    │ - Multi-phase tasks │
                                                    │ - Capstone project  │
                                                    └─────────────────────┘
```

#### Step-by-Step Implementation Roadmap

1. **Step 1: World Map & Hero HUD Hub**
   - Interactive SVG/Canvas map rendering 10 distinct biomes with path connectors and unlock states.
   - Hero state store with XP calculation, hero ranks (*Newbie* $\to$ *Apprentice* $\to$ *Dev* $\to$ *Architect* $\to$ *Legend*), daily streak, and heart meter.
   - Mascot companion ("Bit") with dialog bubbles and advice.
   - Sound synthesizer engine with volume toggle.

2. **Step 2: Quest Engine & Code Sandbox**
   - Dual-pane quest layout: Lesson brief + instructions on left, code editor + output preview on right.
   - Live runner for HTML/CSS/JS with realtime test validation engine.
   - Rotating quest types (Standard code, Fix-the-bug, Predict output, Fill-in-the-blank).
   - 3-tier hint reveal system with XP penalty logic.

3. **Step 3: Boss Battle Arena & Portfolio Projects**
   - Timed boss encounter with phase mechanics and health gauges.
   - Heart loss on failed submissions and victory sequence with confetti and sound fanfares.
   - Capstone project generator exporting downloadable standalone HTML/CSS/JS project files.

4. **Step 4: Sample Content & Full Polish**
   - HTML Village (3 complete quests: *The Skeleton Grove*, *The Semantic Scroll*, *The Form Cavern* + Boss *The Tag Colossus*).
   - CSS Kingdom (3 complete quests: *The Flexbox Meadow*, *The Grid Labyrinth*, *The Keyframe Cascade* + Boss *The Responsive Overlord*).
   - "Surprise Me" quick quest button, Review Potions modal, and local storage backup/export.
