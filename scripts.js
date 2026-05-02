const demos = {
  vibe: {
    kicker: "Unbound weave",
    title: "Arcweaver-Vibe",
    summary:
      "A direct agent build from the product brief. The result can appear quickly, but hidden assumptions may become part of the game without a visible authority chain.",
    metrics: ["Prompt", "Loose thread", "Exploration"],
    prompt: `Build a browser-based game called Arcweaver.
Use Flame, Tide, Gale, Stone, and Aether.
Create five compact levels with puzzles, combat, XP, restart, and win state.
Prioritize a working playable MVP over perfect art.`,
    code: `function cast(element, target) {
  if (element === "Flame") target.burn();
  if (element === "Tide") target.extinguish();
  if (element === "Gale") target.push();
}

// Fast path: weave the visible game loop first,
// then inspect behavior manually.`,
    hud: ["Level 1", "Flame", "Unbound"],
    status: "Vibe weave",
    tiles: ["player", "path", "block", "path", "path", "monster", "path", "goal"]
  },
  trace: {
    kicker: "Bound weave",
    title: "Arcweaver-TraceWeaver",
    summary:
      "The same game brief, routed through intent capture, approved requirements, task capsules, trace records, and validation evidence.",
    metrics: ["Intent Contract", "Bound trace", "Auditable MVP"],
    prompt: `Stakeholder intent:
Build Arcweaver as a five-level browser MVP that demonstrates elemental gameplay.

Approved requirements:
REQ-ARC-001 Movement, combat, XP, restart, and win state.
REQ-ARC-002 Exactly five elements: Flame, Tide, Gale, Stone, Aether.
REQ-ARC-003 Each level teaches a distinct mechanic.

Validation question:
Can a reviewer trace every major game behavior back to the brief?`,
    code: `const traceRecord = {
  behavior: "Flame burns vines and damages monsters",
  authorizedBy: ["REQ-ARC-002", "REQ-ARC-L1"],
  verification: "playtest-level-1-flame-obstacle",
  validation: "Player learns Flame can damage and burn"
};

function castFlame(target) {
  assertAuthority(traceRecord);
  target.apply(["burning", "damage"]);
}`,
    hud: ["Level 1", "Trace: REQ-ARC-002", "Evidence required"],
    status: "Bound trace",
    tiles: ["player", "path", "reveal", "path", "block", "monster", "path", "goal"]
  }
};

const buttons = document.querySelectorAll("[data-demo]");
const grid = document.querySelector("#level-grid");

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderGrid(tileHighlights) {
  grid.innerHTML = "";
  for (let index = 0; index < 64; index += 1) {
    const tile = document.createElement("span");
    tile.className = "tile";
    if (index % 9 === 0 || index % 7 === 0) tile.classList.add("path");
    const highlight = tileHighlights[index % tileHighlights.length];
    if ([2, 10, 19, 28, 37, 46, 55, 63].includes(index)) {
      tile.classList.add(highlight);
    }
    grid.appendChild(tile);
  }
}

function applyDemo(name) {
  const demo = demos[name];
  setText("demo-kicker", demo.kicker);
  setText("demo-title", demo.title);
  setText("demo-summary", demo.summary);
  setText("metric-control", demo.metrics[0]);
  setText("metric-trace", demo.metrics[1]);
  setText("metric-fit", demo.metrics[2]);
  setText("prompt-code", demo.prompt);
  setText("sample-code", demo.code);
  setText("hud-level", demo.hud[0]);
  setText("hud-element", demo.hud[1]);
  setText("hud-state", demo.hud[2]);
  setText("preview-status", demo.status);
  renderGrid(demo.tiles);

  buttons.forEach((button) => {
    const active = button.dataset.demo === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

document.addEventListener("click", async (event) => {
  const demoButton = event.target.closest("[data-demo]");
  if (demoButton) applyDemo(demoButton.dataset.demo);

  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;

  const source =
    copyButton.dataset.copy === "prompt"
      ? document.getElementById("prompt-code")
      : document.getElementById("sample-code");

  try {
    await navigator.clipboard.writeText(source.textContent);
    copyButton.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  } catch {
    copyButton.textContent = "Select";
  }
});

applyDemo("vibe");
