const demos = {
  vibe: {
    kicker: "Fast agent pass",
    title: "Prompt-only build",
    summary:
      "A direct coding-agent build can move quickly, but assumptions, acceptance decisions, and unsupported release claims become difficult to audit.",
    metrics: ["Prompt", "Manual", "Exploration"],
    prompt: `Build the requested feature with tests.
Use your judgement where the brief is unclear.
Ship the smallest working version.`,
    code: `const result = await agent.implement(featureBrief);

// Fast path: inspect the diff and run tests,
// then infer whether the feature is acceptable.`,
    hud: ["Brief", "Agent", "Assumptions hidden"],
    status: "Unbound work",
    tiles: ["player", "path", "block", "path", "path", "monster", "path", "goal"]
  },
  trace: {
    kicker: "TraceWeaver pass",
    title: "Controlled agent work",
    summary:
      "The same work moves through intent capture, approved authority, bounded task capsules, traceability checks, and verification or validation evidence.",
    metrics: ["Intent Contract", "Bound trace", "Defensible delivery"],
    prompt: `Stakeholder intent:
Deliver the feature without losing the reason it exists.

Approved authority:
REQ-001 The behavior must map to the accepted need.
REQ-002 Implementation claims require verification evidence.
REQ-003 Unclear decisions must be held or returned to a human.

Validation question:
Can a reviewer trace the delivered behavior back to the original need?`,
    code: `const traceRecord = {
  behavior: "Feature path added by the agent",
  authorizedBy: ["REQ-001", "REQ-002"],
  verification: "focused-test-output",
  validation: "stakeholder-need-still-satisfied",
  heldClaims: ["production readiness"]
};

assertAuthority(traceRecord);
publishOnlyAfterReview(traceRecord);`,
    hud: ["Intent", "Trace: REQ-001", "Evidence required"],
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
