# CodeQuest: Quest & Boss Schema Reference

CodeQuest uses a declarative, type-safe JSON/MDX-compatible schema that allows developers and educators to author new quests and boss encounters in minutes.

---

## 1. Quest Schema

Each quest belongs to a `regionId` and must follow the **Anti-Boredom Rules**:
- **Strict length limit**: $\le 5$ minutes duration.
- **Max 3 short text blocks** in `storyBlocks` before the learner is prompted to code.
- **Learn by doing**: write code in the browser first, explanation second.
- **Rotating formats**: `write_code`, `fix_bug`, `fill_blank`, `predict_output`, or `speed_round`.

```typescript
export interface Quest {
  id: string;               // Unique ID, e.g. "html-q1"
  regionId: string;         // Region ID, e.g. "html-village"
  order: number;            // 1, 2, 3...
  title: string;            // Action-oriented title, e.g. "The Skeleton Grove"
  subtitle: string;         // Narrative kicker
  durationMinutes: number;  // Typically 3 to 5
  xpReward: number;         // Typically 50 to 120
  format: 'write_code' | 'fix_bug' | 'fill_blank' | 'predict_output' | 'speed_round';
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'sql';
  storyBlocks: string[];    // Maximum 3 short text paragraphs
  mascotQuip: string;       // Bit the Cyber-Sprite witty dialogue
  taskPrompt: string;       // Direct instruction
  starterCode: string;      // Initial code in sandbox editor
  solutionCode: string;     // Reference solution
  hints: HintLevel[];       // 3 progressive hints (Level 1: Free, Level 2: 10XP, Level 3: 25XP)
  testCases: TestCase[];    // Array of automated test assertions
  fillBlanks?: FillBlankItem[];    // For format: 'fill_blank'
  predictOptions?: PredictOption[]; // For format: 'predict_output'
  tags: string[];           // Search & filter tags
}
```

### Example: Authoring a New JavaScript Quest in 2 Minutes

```json
{
  "id": "js-q1",
  "regionId": "js-jungle",
  "order": 1,
  "title": "The Variable Totem",
  "subtitle": "Imbuing Memory into the Void",
  "durationMinutes: 3,
  "xpReward": 85,
  "format": "write_code",
  "language": "javascript",
  "storyBlocks": [
    "In the ancient JavaScript jungle, numbers and runes evaporate unless bound to memory.",
    "The const keyword binds an unshakeable contract, while let permits mutability.",
    "Declare a const heroName with your warrior's title and let mana equal 100."
  ],
  "mascotQuip": "Never use var unless you enjoy debugging temporal paradoxes at 3 AM!",
  "taskPrompt": "Declare 'const heroName = \"Aria\";' and 'let mana = 100;' in the editor.",
  "starterCode": "// Bind your hero credentials:\n",
  "solutionCode": "const heroName = \"Aria\";\nlet mana = 100;",
  "hints": [
    { "level": 1, "title": "Binding Keyword", "content": "Use const for immutable bindings.", "xpCost": 0 },
    { "level": 2, "title": "Syntax Pattern", "content": "const heroName = \"...\"; let mana = 100;", "xpCost": 10 },
    { "level": 3, "title": "Direct Solution", "content": "const heroName = \"Aria\";\nlet mana = 100;", "xpCost": 25 }
  ],
  "testCases": [
    {
      "id": "tc1",
      "description": "Declares const heroName as a non-empty string",
      "validator": "code.includes('const heroName') && typeof heroName === 'string'"
    },
    {
      "id": "tc2",
      "description": "Declares let mana with a numeric value",
      "validator": "code.includes('let mana') && typeof mana === 'number'"
    }
  ],
  "tags": ["JavaScript", "Variables", "ES6"]
}
```

---

## 2. Boss Fight Schema

Every region culminates in a timed, multi-phase encounter that produces a shareable portfolio project:

```typescript
export interface BossFight {
  id: string;               // e.g. "boss-html"
  regionId: string;
  bossName: string;         // e.g. "The Tag Colossus"
  title: string;
  subtitle: string;
  lore: string;
  avatarIcon: string;       // Emoji or SVG identifier
  color: string;            // Theme accent
  totalHp: number;          // e.g. 300
  timeLimitSeconds: number; // e.g. 300 (5 minutes)
  xpReward: number;         // e.g. 350
  rewardBadge: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  portfolioProject: {
    title: string;
    description: string;
    fileName: string;
  };
  phases: BossPhase[];      // 3 phases of escalation
}
```
