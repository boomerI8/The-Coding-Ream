import { Region } from '../types';

export const REGIONS_DATA: Region[] = [
  {
    id: 'html-village',
    name: 'HTML Village',
    slug: 'html-village',
    subtitle: 'The Cradle of the Web',
    description: 'Learn the architectural bones of every web page. Master elements, semantic hierarchy, forms, and accessibility.',
    biome: 'Ancient Forest Hamlet',
    icon: '🏰',
    accentColor: '#E44D26',
    bgGradient: 'from-orange-950/40 via-slate-900 to-slate-950',
    levelPrereq: 1,
    estimatedHours: '2 hours',
    boss: {
      id: 'boss-html',
      regionId: 'html-village',
      bossName: 'The Tag Colossus',
      title: 'Architect of the Chaos DOM',
      subtitle: 'Defeat the Colossus by constructing a semantic, accessible Hero Guild Recruitment Portal!',
      lore: 'The Tag Colossus tears semantic structures apart and converts them into an unruly soup of empty nested divs. Restore semantic balance to banish him!',
      avatarIcon: '🗿',
      color: '#F97316',
      totalHp: 300,
      timeLimitSeconds: 300,
      xpReward: 350,
      rewardBadge: {
        id: 'badge-html-master',
        name: 'Semantic Sovereign',
        icon: '👑',
        description: 'Conquered HTML Village and built an accessible, production-ready web foundation.',
      },
      portfolioProject: {
        title: 'Hero Guild Hall - Semantic Portal',
        description: 'A fully accessible, semantic guild registry with accessible forms, tables, and nav anchors.',
        fileName: 'hero-guild-portal.html',
      },
      phases: [
        {
          id: 'boss-p1',
          phaseNumber: 1,
          title: 'Phase 1: Semantic Framework',
          instruction: 'The Colossus strips the page structure! Replace the messy layout by adding a <header> with an <h1> tag, a <main> element, and a <footer> containing a <small> copyright notice.',
          starterCode: `<!-- Phase 1: Rebuild the Semantic Skeleton -->
<div>
  <!-- Add header with h1 "Hero Guild Hall" -->
  
  <!-- Add main with a p "Welcome adventurer" -->
  
  <!-- Add footer with small "© 2026 CodeQuest Guild" -->
</div>`,
          solutionCode: `<header>
  <h1>Hero Guild Hall</h1>
</header>
<main>
  <p>Welcome adventurer</p>
</main>
<footer>
  <small>© 2026 CodeQuest Guild</small>
</footer>`,
          testCases: [
            {
              id: 'tp1-1',
              description: 'Contains a semantic <header> tag with an <h1> element',
              validator: 'Boolean(doc.querySelector("header h1"))',
            },
            {
              id: 'tp1-2',
              description: 'Contains a semantic <main> element',
              validator: 'Boolean(doc.querySelector("main"))',
            },
            {
              id: 'tp1-3',
              description: 'Contains a <footer> tag with a <small> tag inside',
              validator: 'Boolean(doc.querySelector("footer small"))',
            },
          ],
        },
        {
          id: 'boss-p2',
          phaseNumber: 2,
          title: 'Phase 2: The Recruitment Form',
          instruction: 'The Colossus attempts to block incoming recruits! Inside the <main> element, create a <form> with an <input type="text" placeholder="Hero Name" required> and a <button type="submit">Join Guild</button>.',
          starterCode: `<main>
  <h2>Enlist Today</h2>
  <!-- Construct an accessible form with required text input and submit button -->
  
</main>`,
          solutionCode: `<main>
  <h2>Enlist Today</h2>
  <form>
    <label for="hero-name">Hero Name</label>
    <input type="text" id="hero-name" placeholder="Hero Name" required />
    <button type="submit">Join Guild</button>
  </form>
</main>`,
          testCases: [
            {
              id: 'tp2-1',
              description: 'Contains a <form> element',
              validator: 'Boolean(doc.querySelector("form"))',
            },
            {
              id: 'tp2-2',
              description: 'Form contains a text input marked as required',
              validator: 'Boolean(doc.querySelector("form input[type=\'text\'][required]") || doc.querySelector("form input[required]"))',
            },
            {
              id: 'tp2-3',
              description: 'Form contains a submit button',
              validator: 'Boolean(doc.querySelector("form button") && doc.querySelector("form button").textContent.trim().length > 0)',
            },
          ],
        },
        {
          id: 'boss-p3',
          phaseNumber: 3,
          title: 'Phase 3: The Artifact Showcase',
          instruction: 'Deliver the finishing blow! Add an <article> containing an <img> tag with an "src" and a non-empty "alt" attribute describing the guild crest.',
          starterCode: `<main>
  <!-- Add an <article> with an <img> including src and descriptive alt attribute -->
  
</main>`,
          solutionCode: `<main>
  <article>
    <h3>Guild Crest</h3>
    <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300" alt="Golden sword emblem representing the Hero Guild" width="200" />
    <p>Honoring bravery in the digital realm.</p>
  </article>
</main>`,
          testCases: [
            {
              id: 'tp3-1',
              description: 'Contains an <article> element',
              validator: 'Boolean(doc.querySelector("article"))',
            },
            {
              id: 'tp3-2',
              description: 'Article has an <img> with both src and alt attributes',
              validator: 'Boolean(doc.querySelector("article img[src][alt]") && doc.querySelector("article img").getAttribute("alt").length > 3)',
            },
          ],
        },
      ],
    },
    quests: [
      {
        id: 'html-q1',
        regionId: 'html-village',
        order: 1,
        title: 'The Skeleton Grove',
        subtitle: 'Unlocking the Sacred Page Hierarchy',
        durationMinutes: 3,
        xpReward: 80,
        format: 'write_code',
        language: 'html',
        storyBlocks: [
          'Every living creature has bones, and every web page has HTML tags.',
          'Instead of wrapping everything in generic containers, browsers and screen readers crave semantic meaning.',
          'Summon an <h1> headline for your hero title and an <article> with a <p> description.',
        ],
        mascotQuip: "Listen closely, rookie! If you just use <div> for everything, a web browser cries in binary.",
        taskPrompt: 'Write an <h1> element saying "Hero Codex" and a <p> element describing your starting hero ability.',
        starterCode: `<!-- Welcome to CodeQuest! Write your markup below: -->
`,
        solutionCode: `<h1>Hero Codex</h1>
<p>Starting ability: Fast Syntax casting and infinite curiosity.</p>`,
        hints: [
          {
            level: 1,
            title: 'Semantic Tags',
            content: 'HTML headings range from <h1> (highest rank) to <h6>. Use <h1> for the main page title.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Paragraph Element',
            content: 'Paragraphs use opening <p> and closing </p> tags around your descriptive text.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Direct Code Solution',
            content: '<h1>Hero Codex</h1>\n<p>Starting ability: Fast Syntax casting.</p>',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'tc1',
            description: 'Contains an <h1> tag with text',
            validator: 'Boolean(doc.querySelector("h1") && doc.querySelector("h1").textContent.trim().length > 0)',
          },
          {
            id: 'tc2',
            description: 'Contains a <p> tag with descriptive text',
            validator: 'Boolean(doc.querySelector("p") && doc.querySelector("p").textContent.trim().length > 0)',
          },
        ],
        tags: ['HTML5', 'Semantics', 'Typography'],
      },
      {
        id: 'html-q2',
        regionId: 'html-village',
        order: 2,
        title: 'The Mystic Hyperlink',
        subtitle: 'Fixing Broken Portals & Corrupted Altars',
        durationMinutes: 4,
        xpReward: 90,
        format: 'fix_bug',
        language: 'html',
        storyBlocks: [
          'A corrupted portal sits before you! The image is missing its source, and the portal link leads nowhere.',
          'Images without an alt attribute leave visually impaired adventurers stranded.',
          'Repair the image src, provide an alt description, and link the portal to "#quest-board".',
        ],
        mascotQuip: 'Broken links are worse than stepping on a digital Lego. Let us fix these tags!',
        taskPrompt: 'Fix the bug: Add the href attribute to the <a> tag and add a descriptive alt attribute to the <img> tag.',
        starterCode: `<!-- FIX THE BUGS IN THIS PORTAL CARD: -->
<section class="portal-card">
  <h2>The Gateway to CSS Kingdom</h2>
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300">
  <a>Step Through Portal</a>
</section>`,
        solutionCode: `<section class="portal-card">
  <h2>The Gateway to CSS Kingdom</h2>
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300" alt="Mystic glowing circuit archway glowing with blue energy">
  <a href="#quest-board">Step Through Portal</a>
</section>`,
        hints: [
          {
            level: 1,
            title: 'Inspecting Missing Attributes',
            content: 'Look at the <a> tag and the <img> tag. What required attributes are missing?',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Attribute Syntax',
            content: 'Add alt="A glowing portal" to the image, and href="#quest-board" to the link.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Direct Solution',
            content: '<img src="..." alt="Mystic portal">\n<a href="#quest-board">Step Through Portal</a>',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'tc2-1',
            description: 'The <a> tag has a valid href attribute',
            validator: 'Boolean(doc.querySelector("a[href]") && doc.querySelector("a").getAttribute("href").trim().length > 0)',
          },
          {
            id: 'tc2-2',
            description: 'The <img> tag has a non-empty alt attribute',
            validator: 'Boolean(doc.querySelector("img[alt]") && doc.querySelector("img").getAttribute("alt").trim().length > 2)',
          },
        ],
        tags: ['Debugging', 'Accessibility', 'Hyperlinks'],
      },
      {
        id: 'html-q3',
        regionId: 'html-village',
        order: 3,
        title: 'The Scroll of Inputs',
        subtitle: 'Crafting the Hero Registration Parchment',
        durationMinutes: 4,
        xpReward: 100,
        format: 'fill_blank',
        language: 'html',
        storyBlocks: [
          'The village registrar demands your credentials before opening the dungeon gates.',
          'Forms allow heroes to send data across the realm using inputs, labels, and buttons.',
          'Complete the missing HTML tokens to forge a working signup parchment.',
        ],
        mascotQuip: 'A form without labels is like a potion bottle with no name. Nobody knows what they are drinking!',
        taskPrompt: 'Fill in the blanks to correctly configure the form, input types, and submit button.',
        starterCode: `<!-- Complete the blanks in the form: -->
<form action="/register" method="POST">
  <label for="hero-class">Hero Class:</label>
  <input type="___BLANK_1___" id="hero-class" name="hero-class" required />

  <label for="hero-level">Level:</label>
  <input type="___BLANK_2___" id="hero-level" min="1" max="99" />

  <___BLANK_3___ type="submit">Sign Codex</___BLANK_3___>
</form>`,
        solutionCode: `<form action="/register" method="POST">
  <label for="hero-class">Hero Class:</label>
  <input type="text" id="hero-class" name="hero-class" required />

  <label for="hero-level">Level:</label>
  <input type="number" id="hero-level" min="1" max="99" />

  <button type="submit">Sign Codex</button>
</form>`,
        fillBlanks: [
          {
            id: 'blank1',
            label: 'Input type for hero class name',
            options: ['text', 'checkbox', 'password', 'color'],
            correctAnswer: 'text',
          },
          {
            id: 'blank2',
            label: 'Input type for numerical level',
            options: ['number', 'date', 'url', 'radio'],
            correctAnswer: 'number',
          },
          {
            id: 'blank3',
            label: 'Form submission element',
            options: ['button', 'span', 'header', 'section'],
            correctAnswer: 'button',
          },
        ],
        hints: [
          {
            level: 1,
            title: 'Input Types',
            content: 'Text is for strings of words; numbers are for numeric counts.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Submitting',
            content: 'Forms use the <button> tag with type="submit".',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'All Answers',
            content: 'Blank 1: text | Blank 2: number | Blank 3: button',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'tc3-1',
            description: 'Contains a text input for hero class',
            validator: 'Boolean(doc.querySelector("input[type=\'text\']"))',
          },
          {
            id: 'tc3-2',
            description: 'Contains a number input for level',
            validator: 'Boolean(doc.querySelector("input[type=\'number\']"))',
          },
          {
            id: 'tc3-3',
            description: 'Contains a submit button',
            validator: 'Boolean(doc.querySelector("button[type=\'submit\']"))',
          },
        ],
        tags: ['Forms', 'Inputs', 'Accessibility'],
      },
    ],
  },
  {
    id: 'css-kingdom',
    name: 'CSS Kingdom',
    slug: 'css-kingdom',
    subtitle: 'The Realm of Visual Sorcery',
    description: 'Transform bare skeletons into breathtaking creations. Master modern Flexbox alignment, CSS Grid matrices, and fluid responsive styling.',
    biome: 'Enchanted Crystalline Citadel',
    icon: '🎨',
    accentColor: '#2965F1',
    bgGradient: 'from-blue-950/40 via-slate-900 to-slate-950',
    levelPrereq: 2,
    prereqRegionId: 'html-village',
    estimatedHours: '3 hours',
    boss: {
      id: 'boss-css',
      regionId: 'css-kingdom',
      bossName: 'The Responsive Overlord',
      title: 'Tyrant of the Fixed Viewport',
      subtitle: 'Defeat the Overlord by building an adaptive, fluid Quest Card with Flexbox, Grid, and smooth hover state!',
      lore: 'The Overlord forces all devices into an immovable 800px table layout! Overthrow him using modern fluid CSS design.',
      avatarIcon: '👾',
      color: '#3B82F6',
      totalHp: 350,
      timeLimitSeconds: 300,
      xpReward: 400,
      rewardBadge: {
        id: 'badge-css-master',
        name: 'Flexbox Knight',
        icon: '🛡️',
        description: 'Vanquished the Responsive Overlord and mastered modern fluid layouts.',
      },
      portfolioProject: {
        title: 'Adaptive Hero Stat Card Component',
        description: 'A production-grade, responsive CSS card component with smooth transitions and layout switches.',
        fileName: 'hero-stat-card.html',
      },
      phases: [
        {
          id: 'boss-css-p1',
          phaseNumber: 1,
          title: 'Phase 1: Center the Combat Arena',
          instruction: 'The Overlord disorients your layout. Use Flexbox on the .arena container to center its child perfectly: display: flex, justify-content: center, and align-items: center.',
          starterCode: `<style>
  .arena {
    height: 180px;
    background: #0f172a;
    /* Add flexbox centering properties here: */
    
  }
  .orb {
    width: 60px;
    height: 60px;
    background: #3b82f6;
    border-radius: 50%;
  }
</style>
<div class="arena">
  <div class="orb"></div>
</div>`,
          solutionCode: `<style>
  .arena {
    height: 180px;
    background: #0f172a;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .orb {
    width: 60px;
    height: 60px;
    background: #3b82f6;
    border-radius: 50%;
  }
</style>
<div class="arena">
  <div class="orb"></div>
</div>`,
          testCases: [
            {
              id: 'css-b1-1',
              description: '.arena has display: flex',
              validator: 'getComputedStyle(doc.querySelector(".arena")).display === "flex"',
            },
            {
              id: 'css-b1-2',
              description: '.arena has justify-content: center',
              validator: 'getComputedStyle(doc.querySelector(".arena")).justifyContent === "center"',
            },
            {
              id: 'css-b1-3',
              description: '.arena has align-items: center',
              validator: 'getComputedStyle(doc.querySelector(".arena")).alignItems === "center"',
            },
          ],
        },
        {
          id: 'boss-css-p2',
          phaseNumber: 2,
          title: 'Phase 2: The Grid Defense Matrix',
          instruction: 'The Overlord summons falling shards! Organize the .inventory-grid into a 3-column CSS Grid: display: grid, grid-template-columns: repeat(3, 1fr), and a gap of 12px.',
          starterCode: `<style>
  .inventory-grid {
    /* Define grid columns and gap: */
    
  }
  .slot {
    background: #1e293b;
    padding: 16px;
    text-align: center;
    border: 1px solid #334155;
    color: #94a3b8;
  }
</style>
<div class="inventory-grid">
  <div class="slot">Potion</div>
  <div class="slot">Blade</div>
  <div class="slot">Shield</div>
</div>`,
          solutionCode: `<style>
  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .slot {
    background: #1e293b;
    padding: 16px;
    text-align: center;
    border: 1px solid #334155;
    color: #94a3b8;
  }
</style>
<div class="inventory-grid">
  <div class="slot">Potion</div>
  <div class="slot">Blade</div>
  <div class="slot">Shield</div>
</div>`,
          testCases: [
            {
              id: 'css-b2-1',
              description: '.inventory-grid has display: grid',
              validator: 'getComputedStyle(doc.querySelector(".inventory-grid")).display === "grid"',
            },
            {
              id: 'css-b2-2',
              description: '.inventory-grid has 3 equal columns',
              validator: 'getComputedStyle(doc.querySelector(".inventory-grid")).gridTemplateColumns.split(" ").length === 3',
            },
          ],
        },
        {
          id: 'boss-css-p3',
          phaseNumber: 3,
          title: 'Phase 3: The Enchanted Kinetic Strike',
          instruction: 'Charge the spell! Add a transition on .hero-btn (transition: transform 0.2s ease) and a hover state (.hero-btn:hover { transform: translateY(-4px); }) to strike the Overlord!',
          starterCode: `<style>
  .hero-btn {
    background: #2563eb;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    /* Add transition here: */
    
  }
  /* Add hover state here: */
  
</style>
<button class="hero-btn">Unleash Ultimate</button>`,
          solutionCode: `<style>
  .hero-btn {
    background: #2563eb;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .hero-btn:hover {
    transform: translateY(-4px);
  }
</style>
<button class="hero-btn">Unleash Ultimate</button>`,
          testCases: [
            {
              id: 'css-b3-1',
              description: '.hero-btn includes a transition rule',
              validator: 'code.includes("transition") && code.includes("transform")',
            },
            {
              id: 'css-b3-2',
              description: 'CSS contains a hover rule for .hero-btn with transform',
              validator: 'code.includes(":hover") && code.includes("transform")',
            },
          ],
        },
      ],
    },
    quests: [
      {
        id: 'css-q1',
        regionId: 'css-kingdom',
        order: 1,
        title: 'The Flexbox Meadow',
        subtitle: 'Harnessing the Flow of Alignment',
        durationMinutes: 3,
        xpReward: 90,
        format: 'write_code',
        language: 'css',
        storyBlocks: [
          'In ancient times, web sorcerers used floats and table tags to position items, suffering endless layout headaches.',
          'Then the gods gifted Flexbox: a 1-dimensional layout model that distributes space effortlessly.',
          'Turn the .stats-bar into a flex container and space its items evenly using justify-content: space-between.',
        ],
        mascotQuip: 'Remember: justify-content controls the main axis, while align-items commands the cross axis. Do not cross the streams!',
        taskPrompt: 'Add "display: flex;" and "justify-content: space-between;" to the .stats-bar CSS selector.',
        starterCode: `<style>
  .stats-bar {
    background: #1e293b;
    padding: 16px;
    border-radius: 8px;
    /* Add Flexbox properties below: */
    
  }
  .stat {
    color: #38bdf8;
    font-weight: bold;
  }
</style>
<div class="stats-bar">
  <span class="stat">HP: 100</span>
  <span class="stat">Mana: 50</span>
  <span class="stat">XP: 240</span>
</div>`,
        solutionCode: `<style>
  .stats-bar {
    background: #1e293b;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
  }
  .stat {
    color: #38bdf8;
    font-weight: bold;
  }
</style>
<div class="stats-bar">
  <span class="stat">HP: 100</span>
  <span class="stat">Mana: 50</span>
  <span class="stat">XP: 240</span>
</div>`,
        hints: [
          {
            level: 1,
            title: 'Activating Flex',
            content: 'Set display to flex on the parent container (.stats-bar).',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Spacing Items',
            content: 'Use justify-content: space-between; to push items to the edges with equal room.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Direct CSS',
            content: 'display: flex;\njustify-content: space-between;',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'cq1-1',
            description: '.stats-bar has display: flex',
            validator: 'getComputedStyle(doc.querySelector(".stats-bar")).display === "flex"',
          },
          {
            id: 'cq1-2',
            description: '.stats-bar has justify-content: space-between',
            validator: 'getComputedStyle(doc.querySelector(".stats-bar")).justifyContent === "space-between"',
          },
        ],
        tags: ['CSS3', 'Flexbox', 'Layout'],
      },
      {
        id: 'css-q2',
        regionId: 'css-kingdom',
        order: 2,
        title: 'The Grid Labyrinth',
        subtitle: 'Deciphering the 2D Layout Matrix',
        durationMinutes: 4,
        xpReward: 95,
        format: 'predict_output',
        language: 'css',
        storyBlocks: [
          'Before stepping onto the rune tiles, you inspect the enchanted blueprint.',
          'The dungeon floor uses CSS Grid to orchestrate columns and rows simultaneously.',
          'Analyze the CSS rules and predict the resulting layout of the chamber.',
        ],
        mascotQuip: 'Flexbox is for 1-dimensional lines; CSS Grid is for 2-dimensional boards. Pick the right weapon for the beast!',
        taskPrompt: 'Given the code below, what is the exact visual arrangement of the 4 chamber tiles?',
        starterCode: `.labyrinth {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 16px;
}`,
        solutionCode: `/* Answer is a 2x2 grid with 2 equal-width columns and 2 rows of 100px height each */`,
        predictOptions: [
          {
            id: 'opt1',
            text: 'A 2x2 square grid: 2 equal-width columns with 2 rows of 100px each, separated by 16px gaps.',
            isCorrect: true,
            explanation: 'Correct! "1fr 1fr" produces two equal fractions (columns), and "100px 100px" creates two fixed rows.',
          },
          {
            id: 'opt2',
            text: 'A single vertical column with 4 rows stacked on top of each other.',
            isCorrect: false,
            explanation: 'grid-template-columns: 1fr 1fr explicitly specifies two columns.',
          },
          {
            id: 'opt3',
            text: '4 columns side-by-side in one horizontal row.',
            isCorrect: false,
            explanation: 'grid-template-rows specifies 2 distinct row tracks.',
          },
        ],
        hints: [
          {
            level: 1,
            title: 'Interpreting 1fr',
            content: '1fr stands for one fraction of the available space. Two "1fr" values create two equal columns.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Rows Breakdown',
            content: 'The two 100px values in grid-template-rows create two horizontal rows.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Selection',
            content: 'Select the 2x2 square grid option.',
            xpCost: 20,
          },
        ],
        testCases: [
          {
            id: 'cq2-1',
            description: 'Correct prediction option selected',
            validator: 'true',
          },
        ],
        tags: ['CSS Grid', 'Mental Model', 'Layout'],
      },
      {
        id: 'css-q3',
        regionId: 'css-kingdom',
        order: 3,
        title: 'The Keyframe Cascade',
        subtitle: 'Breathing Life into Static Relics',
        durationMinutes: 4,
        xpReward: 110,
        format: 'write_code',
        language: 'css',
        storyBlocks: [
          'An ancient magical rune sits dormant upon a stone pillar.',
          'By applying CSS @keyframes, you can pulsate its glow continuously without writing any JavaScript.',
          'Attach the provided pulse animation to the .magic-orb element so it loops infinitely.',
        ],
        mascotQuip: 'Smooth 60fps animations use transform and opacity! The GPU will thank you.',
        taskPrompt: 'Add "animation: pulse 2s infinite ease-in-out;" to the .magic-orb selector.',
        starterCode: `<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 10px #38bdf8;
    }
    50% {
      transform: scale(1.15);
      box-shadow: 0 0 25px #0284c7;
    }
  }

  .magic-orb {
    width: 80px;
    height: 80px;
    background: #0284c7;
    border-radius: 50%;
    margin: 40px auto;
    /* Apply the animation here: */
    
  }
</style>
<div class="magic-orb"></div>`,
        solutionCode: `<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 10px #38bdf8;
    }
    50% {
      transform: scale(1.15);
      box-shadow: 0 0 25px #0284c7;
    }
  }

  .magic-orb {
    width: 80px;
    height: 80px;
    background: #0284c7;
    border-radius: 50%;
    margin: 40px auto;
    animation: pulse 2s infinite ease-in-out;
  }
</style>
<div class="magic-orb"></div>`,
        hints: [
          {
            level: 1,
            title: 'Animation Shorthand',
            content: 'The animation property takes: name, duration, iteration-count, and timing-function.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Syntax Template',
            content: 'animation: pulse 2s infinite ease-in-out;',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Exact Solution',
            content: 'animation: pulse 2s infinite ease-in-out;',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'cq3-1',
            description: '.magic-orb has an animation name matching "pulse"',
            validator: 'getComputedStyle(doc.querySelector(".magic-orb")).animationName.includes("pulse")',
          },
          {
            id: 'cq3-2',
            description: '.magic-orb repeats animation infinitely',
            validator: 'getComputedStyle(doc.querySelector(".magic-orb")).animationIterationCount === "infinite"',
          },
        ],
        tags: ['Keyframes', 'Animations', 'Performance'],
      },
    ],
  },
  {
    id: 'js-jungle',
    name: 'JavaScript Jungle',
    slug: 'js-jungle',
    subtitle: 'The Dynamic Wilderness',
    description: 'Master functional programming, DOM manipulation, asynchronous promises, and modern ESNext capabilities.',
    biome: 'Bioluminescent Canopy',
    icon: '⚡',
    accentColor: '#F7DF1E',
    bgGradient: 'from-yellow-950/40 via-slate-900 to-slate-950',
    levelPrereq: 3,
    prereqRegionId: 'css-kingdom',
    estimatedHours: '4 hours',
    boss: {
      id: 'boss-js',
      regionId: 'js-jungle',
      bossName: 'The Callback Hydra',
      title: 'Beast of Callback Hell',
      subtitle: 'Slay the Hydra with clean Async/Await promises and functional array pipelines!',
      lore: 'The Callback Hydra wraps asynchronous logic in infinitely nested pyramids. Unravel the callback doom with modern Async/Await!',
      avatarIcon: '🐉',
      color: '#EAB308',
      totalHp: 400,
      timeLimitSeconds: 300,
      xpReward: 450,
      rewardBadge: {
        id: 'badge-js-master',
        name: 'Async Vanguard',
        icon: '⚡',
        description: 'Tamed the Callback Hydra and conquered the JavaScript Jungle.',
      },
      portfolioProject: {
        title: 'Real-time Quest Tracker with LocalStorage',
        description: 'An interactive quest log with filter pipelines, state persistence, and instant DOM updates.',
        fileName: 'quest-tracker.html',
      },
      phases: [
        {
          id: 'boss-js-p1',
          phaseNumber: 1,
          title: 'Phase 1: Sever the Callback Pyramid',
          instruction: 'Convert the pyramid into a clean Promise! Write a function `fetchHeroRune(id)` that returns a `Promise.resolve({ id, power: 100 })`.',
          starterCode: `// Phase 1: Return a Promise instead of nesting callbacks
function fetchHeroRune(id) {
  // Return Promise.resolve({ id, power: 100 })
  
}`,
          solutionCode: `function fetchHeroRune(id) {
  return Promise.resolve({ id, power: 100 });
}`,
          testCases: [
            {
              id: 'js-b1-1',
              description: 'fetchHeroRune returns a Promise',
              validator: 'Boolean(fetchHeroRune(1) instanceof Promise)',
            },
            {
              id: 'js-b1-2',
              description: 'fetchHeroRune resolves with object containing id and power',
              validator: 'fetchHeroRune(42).then(r => r.id === 42 && r.power === 100)',
            },
          ],
        },
        {
          id: 'boss-js-p2',
          phaseNumber: 2,
          title: 'Phase 2: The Energy Pipeline Aggregator',
          instruction: 'The Hydra strikes with multiple heads! Use `.reduce()` on an array of numbers to sum up total boss damage.',
          starterCode: `function calculateTotalDamage(attacks) {
  // Use attacks.reduce((sum, curr) => sum + curr, 0)
  return 0;
}`,
          solutionCode: `function calculateTotalDamage(attacks) {
  return attacks.reduce((sum, curr) => sum + curr, 0);
}`,
          testCases: [
            {
              id: 'js-b2-1',
              description: 'calculateTotalDamage sums an array of numbers correctly',
              validator: 'calculateTotalDamage([10, 20, 30, 40]) === 100 && calculateTotalDamage([5, 5]) === 10',
            },
          ],
        },
        {
          id: 'boss-js-p3',
          phaseNumber: 3,
          title: 'Phase 3: The Async/Await Finisher',
          instruction: 'Deliver the final strike! Write an async function `strikeHydra(power)` that awaits `Promise.resolve(power * 2)` and returns the doubled damage.',
          starterCode: `async function strikeHydra(power) {
  // Await the resolved value and return power * 2
  
}`,
          solutionCode: `async function strikeHydra(power) {
  const result = await Promise.resolve(power * 2);
  return result;
}`,
          testCases: [
            {
              id: 'js-b3-1',
              description: 'strikeHydra is an async function returning doubled power',
              validator: 'strikeHydra(50).then(res => res === 100)',
            },
          ],
        },
      ],
    },
    quests: [
      {
        id: 'js-q1',
        regionId: 'js-jungle',
        order: 1,
        title: 'The Scope Sanctum',
        subtitle: 'Unlocking Modern Arrow Functions & Template Strings',
        durationMinutes: 3,
        xpReward: 90,
        format: 'write_code',
        language: 'javascript',
        storyBlocks: [
          'In ancient JavaScript, function declarations and "var" leaked variables across boundaries.',
          'Modern developers wield const, let, and concise arrow functions.',
          'Construct an arrow function calculatePower that takes (level, bonus) and returns level * 10 + bonus.',
        ],
        mascotQuip: 'Arrow functions give you concise syntax and lexical "this"! Say goodbye to var and var headaches.',
        taskPrompt: 'Write an arrow function: const calculatePower = (level, bonus) => level * 10 + bonus;',
        starterCode: `// Write your arrow function below:
const calculatePower = 
`,
        solutionCode: `const calculatePower = (level, bonus) => level * 10 + bonus;`,
        hints: [
          {
            level: 1,
            title: 'Arrow Syntax',
            content: 'Arrow functions use (params) => expression.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Parameters',
            content: 'Provide two parameters: level and bonus.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Exact Solution',
            content: 'const calculatePower = (level, bonus) => level * 10 + bonus;',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'js1-1',
            description: 'calculatePower is defined as a function',
            validator: 'typeof calculatePower === "function"',
          },
          {
            id: 'js1-2',
            description: 'calculatePower(5, 20) returns 70',
            validator: 'calculatePower(5, 20) === 70',
          },
        ],
        tags: ['JavaScript', 'Arrow Functions', 'ES6'],
      },
      {
        id: 'js-q2',
        regionId: 'js-jungle',
        order: 2,
        title: 'The Purifying Pipeline',
        subtitle: 'Taming Array Filter and Map Transformations',
        durationMinutes: 4,
        xpReward: 100,
        format: 'fix_bug',
        language: 'javascript',
        storyBlocks: [
          'A corrupted relic chest contains equipment with negative durability.',
          'Instead of mutating the array with for-loops, purify the dataset using functional array chaining.',
          'Filter out items where durability <= 0, then map to return only the uppercase item names.',
        ],
        mascotQuip: 'Chaining .filter() and .map() transforms messy data into crystal-clear pipelines!',
        taskPrompt: 'Fix the bug: ensure getCleanItemNames filters items with durability > 0, then returns their uppercase names.',
        starterCode: `// FIX THE BUG: Return uppercase names of items where durability > 0
function getCleanItemNames(items) {
  return items
    .filter(item => item.durability < 0) // Bug here!
    .map(item => item.name); // Should be uppercase!
}`,
        solutionCode: `function getCleanItemNames(items) {
  return items
    .filter(item => item.durability > 0)
    .map(item => item.name.toUpperCase());
}`,
        hints: [
          {
            level: 1,
            title: 'Filter Condition',
            content: 'To keep usable items, check durability > 0 rather than < 0.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Uppercase String',
            content: 'Use item.name.toUpperCase() inside the map callback.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Complete Solution',
            content: 'return items.filter(i => i.durability > 0).map(i => i.name.toUpperCase());',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'js2-1',
            description: 'Filters out items with durability <= 0',
            validator: 'getCleanItemNames([{ name: "sword", durability: 10 }, { name: "broken", durability: 0 }]).length === 1',
          },
          {
            id: 'js2-2',
            description: 'Transforms remaining item names to uppercase',
            validator: 'getCleanItemNames([{ name: "blade", durability: 5 }])[0] === "BLADE"',
          },
        ],
        tags: ['Arrays', 'Functional Programming', 'ES6'],
      },
      {
        id: 'js-q3',
        regionId: 'js-jungle',
        order: 3,
        title: 'The Async Spring',
        subtitle: 'Flowing with Promises and Async/Await',
        durationMinutes: 4,
        xpReward: 110,
        format: 'fill_blank',
        language: 'javascript',
        storyBlocks: [
          'An ancient oracle communicates across an asynchronous telepathic channel.',
          'Blocking execution freezes the user interface. We must handle the Promise smoothly.',
          'Fill in the missing async/await tokens to receive the prophecy without locking the browser.',
        ],
        mascotQuip: 'async functions always return a Promise, and await unwraps it gracefully!',
        taskPrompt: 'Fill in the blanks to correctly define the async function, await the promise, and return the resolved data.',
        starterCode: `___BLANK_1___ function fetchProphecy(telepathicChannel) {
  const result = ___BLANK_2___ telepathicChannel();
  return result.___BLANK_3___;
}`,
        solutionCode: `async function fetchProphecy(telepathicChannel) {
  const result = await telepathicChannel();
  return result.text;
}`,
        fillBlanks: [
          {
            id: 'blank1',
            label: 'Keyword to mark an asynchronous function',
            options: ['async', 'defer', 'promise', 'await'],
            correctAnswer: 'async',
          },
          {
            id: 'blank2',
            label: 'Keyword to pause execution until Promise resolves',
            options: ['await', 'yield', 'pause', 'hold'],
            correctAnswer: 'await',
          },
          {
            id: 'blank3',
            label: 'Property containing message text',
            options: ['text', 'body', 'data', 'buffer'],
            correctAnswer: 'text',
          },
        ],
        hints: [
          {
            level: 1,
            title: 'Async Syntax',
            content: 'Functions using await must be declared with async.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Waiting for Promises',
            content: 'Use await before calling the asynchronous channel function.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Direct Answers',
            content: 'Blank 1: async | Blank 2: await | Blank 3: text',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'js3-1',
            description: 'fetchProphecy is an async function that awaits channel output',
            validator: 'fetchProphecy(() => Promise.resolve({ text: "Victory" })).then(r => r === "Victory")',
          },
        ],
        tags: ['Async/Await', 'Promises', 'ESNext'],
      },
    ],
  },
  {
    id: 'ts-outpost',
    name: 'TypeScript Outpost',
    slug: 'ts-outpost',
    subtitle: 'The Fortress of Strong Contracts',
    description: 'Eliminate runtime bugs before they exist. Wield type inference, union types, interfaces, and generics.',
    biome: 'Frozen Glacial Spires',
    icon: '🛡️',
    accentColor: '#3178C6',
    bgGradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
    levelPrereq: 4,
    prereqRegionId: 'js-jungle',
    estimatedHours: '3.5 hours',
    boss: {
      id: 'boss-ts',
      regionId: 'ts-outpost',
      bossName: 'The Any Demon',
      title: 'Devourer of Types',
      subtitle: 'Defeat the Any Demon with strict discrimination unions and generic constraints!',
      lore: 'The Any Demon replaces every type contract with "any", introducing silent runtime crashes across the realm.',
      avatarIcon: '👿',
      color: '#06B6D4',
      totalHp: 450,
      timeLimitSeconds: 300,
      xpReward: 500,
      rewardBadge: {
        id: 'badge-ts-master',
        name: 'Type Guardian',
        icon: '💎',
        description: 'Enforced zero "any" discipline and mastered TypeScript compiler contracts.',
      },
      portfolioProject: {
        title: 'Type-Safe State Machine Library',
        description: 'A bulletproof generic state machine with strict union transitions.',
        fileName: 'state-machine.ts',
      },
      phases: [
        {
          id: 'boss-ts-p1',
          phaseNumber: 1,
          title: 'Phase 1: Banish "any" with Generics',
          instruction: 'The Demon attempts to cast everything to any! Write a generic function `wrap<T>(value: T): { value: T }` that preserves exact type safety.',
          starterCode: `// Replace any with a generic type parameter T:
function wrap(value) {
  return { value };
}`,
          solutionCode: `function wrap<T>(value: T): { value: T } {
  return { value };
}`,
          testCases: [
            {
              id: 'ts-b1-1',
              description: 'wrap is a function returning { value }',
              validator: 'wrap("shield").value === "shield" && wrap(100).value === 100',
            },
            {
              id: 'ts-b1-2',
              description: 'Code contains generic type parameter <T>',
              validator: 'code.includes("<T>") || code.includes("<T,")',
            },
          ],
        },
        {
          id: 'boss-ts-p2',
          phaseNumber: 2,
          title: 'Phase 2: The Discriminated Union Shield',
          instruction: 'Define a function `describeAction(action)` that checks `action.type`. If "attack", return `Attack for ${action.damage}`; if "heal", return `Healed ${action.amount}`.',
          starterCode: `function describeAction(action) {
  if (action.type === 'attack') {
    return \`Attack for \${action.damage}\`;
  }
  if (action.type === 'heal') {
    return \`Healed \${action.amount}\`;
  }
  return 'Unknown';
}`,
          solutionCode: `function describeAction(action) {
  if (action.type === 'attack') {
    return \`Attack for \${action.damage}\`;
  }
  if (action.type === 'heal') {
    return \`Healed \${action.amount}\`;
  }
  return 'Unknown';
}`,
          testCases: [
            {
              id: 'ts-b2-1',
              description: 'Handles attack action',
              validator: 'describeAction({ type: "attack", damage: 45 }) === "Attack for 45"',
            },
            {
              id: 'ts-b2-2',
              description: 'Handles heal action',
              validator: 'describeAction({ type: "heal", amount: 20 }) === "Healed 20"',
            },
          ],
        },
        {
          id: 'boss-ts-p3',
          phaseNumber: 3,
          title: 'Phase 3: The Immutable Record Rune',
          instruction: 'Deliver the finishing blow! Define a `freezeHero(hero)` function that returns `Object.freeze({ ...hero, active: true })`.',
          starterCode: `function freezeHero(hero) {
  // Return Object.freeze with { ...hero, active: true }
  
}`,
          solutionCode: `function freezeHero(hero) {
  return Object.freeze({ ...hero, active: true });
}`,
          testCases: [
            {
              id: 'ts-b3-1',
              description: 'freezeHero returns a frozen object with active: true',
              validator: 'Object.isFrozen(freezeHero({ name: "Aria" })) && freezeHero({ name: "Aria" }).active === true',
            },
          ],
        },
      ],
    },
    quests: [
      {
        id: 'ts-q1',
        regionId: 'ts-outpost',
        order: 1,
        title: 'The Interface Anvil',
        subtitle: 'Forging Strict Object Contracts',
        durationMinutes: 3,
        xpReward: 95,
        format: 'write_code',
        language: 'typescript',
        storyBlocks: [
          'In the frozen spires, untyped JavaScript objects frequently produce "cannot read properties of undefined".',
          'TypeScript interfaces act as unbreakable contracts for shapes of data.',
          'Define an interface HeroContract with name (string), level (number), and optional guild (string).',
        ],
        mascotQuip: 'Optional properties use the "?" mark! Don\'t let undefined surprise your heroes.',
        taskPrompt: 'Define interface HeroContract with name: string; level: number; guild?: string;',
        starterCode: `// Forge the HeroContract interface:
interface HeroContract {
  
}
`,
        solutionCode: `interface HeroContract {
  name: string;
  level: number;
  guild?: string;
}`,
        hints: [
          {
            level: 1,
            title: 'Interface Properties',
            content: 'Declare name: string; and level: number;',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Optional Field',
            content: 'Use guild?: string; for optional properties.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Complete Solution',
            content: 'interface HeroContract {\n  name: string;\n  level: number;\n  guild?: string;\n}',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'ts1-1',
            description: 'Declares interface HeroContract',
            validator: 'code.includes("interface HeroContract")',
          },
          {
            id: 'ts1-2',
            description: 'Includes name: string and level: number',
            validator: 'code.includes("name: string") && code.includes("level: number")',
          },
          {
            id: 'ts1-3',
            description: 'Includes optional guild property with "?"',
            validator: 'code.includes("guild?:") || code.includes("guild?: string")',
          },
        ],
        tags: ['TypeScript', 'Interfaces', 'Types'],
      },
      {
        id: 'ts-q2',
        regionId: 'ts-outpost',
        order: 2,
        title: 'The Union Gate',
        subtitle: 'Deciphering Discriminated Union Types',
        durationMinutes: 3,
        xpReward: 100,
        format: 'predict_output',
        language: 'typescript',
        storyBlocks: [
          'The icy gates evaluate union types to ensure every possibility is handled safely.',
          'When two types share a common literal discriminator (like "status"), TypeScript narrows the type automatically.',
          'Analyze the discriminated union below and determine what the compiler guarantees inside the "success" branch.',
        ],
        mascotQuip: 'Discriminated unions make invalid states unrepresentable! That is true software poetry.',
        taskPrompt: 'What does TypeScript guarantee about result when result.status === "success"?',
        starterCode: `type QuestResult = 
  | { status: 'success'; xpEarned: number; badgeId: string }
  | { status: 'failure'; reason: string };

function processResult(result: QuestResult) {
  if (result.status === 'success') {
    // What properties are guaranteed accessible here?
  }
}`,
        solutionCode: `/* Answer: result is guaranteed to have xpEarned and badgeId, but NOT reason */`,
        predictOptions: [
          {
            id: 'ts-opt1',
            text: 'result has xpEarned (number) and badgeId (string), but reason does not exist.',
            isCorrect: true,
            explanation: 'Correct! TypeScript narrows the union based on status === "success", guaranteeing xpEarned and badgeId.',
          },
          {
            id: 'ts-opt2',
            text: 'result has all properties: xpEarned, badgeId, and reason.',
            isCorrect: false,
            explanation: 'The "reason" property only exists on the failure branch of the union.',
          },
          {
            id: 'ts-opt3',
            text: 'TypeScript throws a compile-time error because QuestResult is ambiguous.',
            isCorrect: false,
            explanation: 'Discriminated unions with shared literal tags are fully supported and idiomatic.',
          },
        ],
        hints: [
          {
            level: 1,
            title: 'Type Narrowing',
            content: 'Notice how the if-check filters out the failure branch.',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Exhaustive Branching',
            content: 'Only properties belonging to the success branch can be accessed.',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Select First Option',
            content: 'Choose the option stating xpEarned and badgeId exist without reason.',
            xpCost: 20,
          },
        ],
        testCases: [
          {
            id: 'ts2-1',
            description: 'Correct prediction selected',
            validator: 'true',
          },
        ],
        tags: ['TypeScript', 'Unions', 'Type Narrowing'],
      },
      {
        id: 'ts-q3',
        regionId: 'ts-outpost',
        order: 3,
        title: 'The Generic Forge',
        subtitle: 'Crafting Reusable Type-Safe Containers',
        durationMinutes: 4,
        xpReward: 115,
        format: 'write_code',
        language: 'typescript',
        storyBlocks: [
          'Why rewrite containers for numbers, strings, and swords separately?',
          'Generics allow you to write functions that operate on any type while maintaining total type safety.',
          'Craft a generic function wrapInScroll<T>(data: T) that returns an object { payload: data, timestamp: Date.now() }.',
        ],
        mascotQuip: 'Generics are like type variables! You pass the type in just like an argument.',
        taskPrompt: 'Write function wrapInScroll<T>(data: T) returning { payload: data, timestamp: Date.now() }.',
        starterCode: `// Write your generic function:
function wrapInScroll<T>(data: T) {
  
}
`,
        solutionCode: `function wrapInScroll<T>(data: T) {
  return {
    payload: data,
    timestamp: Date.now()
  };
}`,
        hints: [
          {
            level: 1,
            title: 'Function Syntax',
            content: 'function wrapInScroll<T>(data: T) { ... }',
            xpCost: 0,
          },
          {
            level: 2,
            title: 'Return Value',
            content: 'return { payload: data, timestamp: Date.now() };',
            xpCost: 10,
          },
          {
            level: 3,
            title: 'Exact Solution',
            content: 'function wrapInScroll<T>(data: T) {\n  return { payload: data, timestamp: Date.now() };\n}',
            xpCost: 25,
          },
        ],
        testCases: [
          {
            id: 'ts3-1',
            description: 'wrapInScroll is a function returning object with payload and timestamp',
            validator: 'typeof wrapInScroll === "function" && wrapInScroll("test").payload === "test" && typeof wrapInScroll("test").timestamp === "number"',
          },
          {
            id: 'ts3-2',
            description: 'Preserves number and object payloads',
            validator: 'wrapInScroll(999).payload === 999',
          },
        ],
        tags: ['TypeScript', 'Generics', 'Advanced Types'],
      },
    ],
  },
  {
    id: 'java-fortress',
    name: 'Java Fortress',
    slug: 'java-fortress',
    subtitle: 'The Bastion of Object Supremacy',
    description: 'Master object-oriented design, encapsulation, inheritance, the Java Collections framework, and Spring Boot microservices.',
    biome: 'Volcanic Obsidian Citadel',
    icon: '☕',
    accentColor: '#EA2D2E',
    bgGradient: 'from-red-950/40 via-slate-900 to-slate-950',
    levelPrereq: 5,
    estimatedHours: '5 hours',
    boss: {
      id: 'boss-java',
      regionId: 'java-fortress',
      bossName: 'The NullPointer Golem',
      title: 'Terror of the Uninstantiated',
      subtitle: 'Overcome the Golem using Optional wrappers, Stream pipelines, and defensive encapsulation!',
      lore: 'One unhandled null pointer exception brings down entire production fortresses. Build defensive Java code to survive.',
      avatarIcon: '🤖',
      color: '#EF4444',
      totalHp: 500,
      timeLimitSeconds: 300,
      xpReward: 550,
      rewardBadge: {
        id: 'badge-java-master',
        name: 'Enterprise Paladin',
        icon: '🏆',
        description: 'Mastered Java OOP, streams, and Spring architecture.',
      },
      portfolioProject: {
        title: 'Spring Boot REST Hero Service',
        description: 'A production-ready RESTful service with JPA repositories and OpenAPI documentation.',
        fileName: 'HeroApplication.java',
      },
      phases: [],
    },
    quests: [],
  },
  {
    id: 'python-swamp',
    name: 'Python Swamp',
    slug: 'python-swamp',
    subtitle: 'The Marsh of Elegant Scripts',
    description: 'Harness Pythonic simplicity. Master list comprehensions, generators, data manipulation, and web scraping.',
    biome: 'Misty Mangrove Marsh',
    icon: '🐍',
    accentColor: '#3776AB',
    bgGradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
    levelPrereq: 5,
    estimatedHours: '4 hours',
    boss: {
      id: 'boss-python',
      regionId: 'python-swamp',
      bossName: 'The Indentation Serpent',
      title: 'Devourer of Whitespace',
      subtitle: 'Defeat the Serpent with pure Pythonic list comprehensions and clean PEP 8 styling!',
      lore: 'The Serpent twists tabs and spaces to induce syntax madness. Restore structural zen to prevail.',
      avatarIcon: '🐊',
      color: '#10B981',
      totalHp: 480,
      timeLimitSeconds: 300,
      xpReward: 520,
      rewardBadge: {
        id: 'badge-python-master',
        name: 'Pythonic Alchemist',
        icon: '🧪',
        description: 'Mastered data manipulation, decorators, and clean Python design.',
      },
      portfolioProject: {
        title: 'Automated Real-Time Web Scraper & Analyzer',
        description: 'Clean Python pipeline extracting, parsing, and summarizing live web feeds.',
        fileName: 'scraper_pipeline.py',
      },
      phases: [],
    },
    quests: [],
  },
  {
    id: 'database-caves',
    name: 'Database Caves',
    slug: 'database-caves',
    subtitle: 'The Caverns of Persistent Truth',
    description: 'Unlock structured query language (SQL), schema normalization, relational joins, indexing, and NoSQL document stores.',
    biome: 'Subterranean Crystal Mines',
    icon: '💾',
    accentColor: '#00758F',
    bgGradient: 'from-teal-950/40 via-slate-900 to-slate-950',
    levelPrereq: 6,
    estimatedHours: '4.5 hours',
    boss: {
      id: 'boss-db',
      regionId: 'database-caves',
      bossName: 'The N+1 Chimera',
      title: 'Consumer of Query Budgets',
      subtitle: 'Defeat the Chimera by replacing looped queries with indexed INNER JOIN aggregations!',
      lore: 'The Chimera multiplies single database reads into thousands of blocking queries, crippling servers everywhere.',
      avatarIcon: '🦇',
      color: '#14B8A6',
      totalHp: 520,
      timeLimitSeconds: 300,
      xpReward: 560,
      rewardBadge: {
        id: 'badge-db-master',
        name: 'Master of Schema',
        icon: '🗝️',
        description: 'Mastered SQL joins, relational indices, and resilient query design.',
      },
      portfolioProject: {
        title: 'E-Commerce Analytics Query Suite',
        description: 'Complex SQL queries calculating retention, lifetime value, and sales cohorts with window functions.',
        fileName: 'analytics_schema.sql',
      },
      phases: [],
    },
    quests: [],
  },
  {
    id: 'react-realm',
    name: 'React Realm',
    slug: 'react-realm',
    subtitle: 'The Empire of Reactive Components',
    description: 'Deconstruct interfaces into composable components. Master hooks (useState, useEffect, useMemo), virtual DOM reconciliation, and Next.js SSR.',
    biome: 'Celestial Floating Islands',
    icon: '⚛️',
    accentColor: '#61DAFB',
    bgGradient: 'from-sky-950/40 via-slate-900 to-slate-950',
    levelPrereq: 7,
    estimatedHours: '5 hours',
    boss: {
      id: 'boss-react',
      regionId: 'react-realm',
      bossName: 'The Infinite Re-Renderer',
      title: 'Specter of the Missing Dependency',
      subtitle: 'Defeat the Specter with memoized callbacks, derived state, and clean lifecycle hooks!',
      lore: 'One unmemoized object triggers an endless cascade of expensive UI renders. Calm the component tree to win.',
      avatarIcon: '🌀',
      color: '#38BDF8',
      totalHp: 550,
      timeLimitSeconds: 300,
      xpReward: 600,
      rewardBadge: {
        id: 'badge-react-master',
        name: 'Component Warlock',
        icon: '🌌',
        description: 'Commanded the Virtual DOM and mastered React state architecture.',
      },
      portfolioProject: {
        title: 'Full-Featured Interactive Kanban Board',
        description: 'Drag-and-drop task board with optimistic UI updates, keyboard shortcuts, and custom hooks.',
        fileName: 'KanbanBoard.tsx',
      },
      phases: [],
    },
    quests: [],
  },
  {
    id: 'backend-citadel',
    name: 'Backend Citadel',
    slug: 'backend-citadel',
    subtitle: 'The Bastion of Server Logic',
    description: 'Architect secure REST APIs, middleware pipelines, JWT authentication, role-based access control, and rate limiting with Node/Express.',
    biome: 'High-Altitude Steampunk Tower',
    icon: '🛡️',
    accentColor: '#68A063',
    bgGradient: 'from-green-950/40 via-slate-900 to-slate-950',
    levelPrereq: 8,
    estimatedHours: '5 hours',
    boss: {
      id: 'boss-backend',
      regionId: 'backend-citadel',
      bossName: 'The Rogue Infiltrator',
      title: 'Exploiter of Unsanitized Inputs',
      subtitle: 'Defeat the Infiltrator with JWT validation, bcrypt password hashing, and CORS protection!',
      lore: 'The Infiltrator injects malicious payloads into vulnerable endpoints. Harden the API boundaries to triumph.',
      avatarIcon: '🥷',
      color: '#22C55E',
      totalHp: 600,
      timeLimitSeconds: 300,
      xpReward: 650,
      rewardBadge: {
        id: 'badge-backend-master',
        name: 'Citadel Gatekeeper',
        icon: '🏰',
        description: 'Secured production APIs with robust authentication and defense-in-depth.',
      },
      portfolioProject: {
        title: 'Production Auth & API Gateway Microservice',
        description: 'Express API with JWT tokens, refresh tokens, rate limiting, and input validation schemas.',
        fileName: 'server_gateway.ts',
      },
      phases: [],
    },
    quests: [],
  },
  {
    id: 'devops-dsa',
    name: 'DevOps Sky-Port & DSA Dungeon',
    slug: 'devops-dsa',
    subtitle: 'The Pinnacle of Full-Stack Mastery',
    description: 'Master containerization (Docker), CI/CD automation, cloud deployment, and complex data structures & algorithms for interview mastery.',
    biome: 'Stratospheric Cosmic Orbital Station',
    icon: '🚀',
    accentColor: '#8B5CF6',
    bgGradient: 'from-purple-950/40 via-slate-900 to-slate-950',
    levelPrereq: 9,
    estimatedHours: '6 hours',
    boss: {
      id: 'boss-final',
      regionId: 'devops-dsa',
      bossName: 'The Full-Stack Grandmaster',
      title: 'Guardian of the Production Cloud',
      subtitle: 'Deliver your complete Full-Stack Capstone to earn the title of Legend!',
      lore: 'The Grandmaster tests your end-to-end command of architecture, algorithm efficiency, and automated deployment pipelines.',
      avatarIcon: '🧙‍♂️',
      color: '#A855F7',
      totalHp: 750,
      timeLimitSeconds: 360,
      xpReward: 1000,
      rewardBadge: {
        id: 'badge-grandmaster',
        name: 'Full-Stack Legend',
        icon: '⭐',
        description: 'Conquered every region of CodeQuest and proved job-ready engineering supremacy.',
      },
      portfolioProject: {
        title: 'Full-Stack Cloud Capstone Application',
        description: 'End-to-end web application with automated CI/CD pipeline, container manifest, and optimal DSA algorithms.',
        fileName: 'capstone_manifest.yml',
      },
      phases: [],
    },
    quests: [],
  },
];
