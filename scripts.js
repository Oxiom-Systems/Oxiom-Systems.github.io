const demos = {
  vibe: {
    kicker: "Fast agent pass",
    title: "Prompt-only build",
    summary:
      "A direct coding-agent build can move quickly, but assumptions, acceptance decisions, and delivery claims become difficult to review later.",
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
      "The same work moves through a clear goal, approved scope, task boundaries, trace checks, and test or review evidence.",
    metrics: ["Approved scope", "Trace record", "Delivery proof"],
    prompt: `Stakeholder goal:
Deliver the feature without losing the reason it exists.

Approved scope:
REQ-001 The behavior must map to the accepted need.
REQ-002 Delivery claims require test evidence.
REQ-003 Unclear decisions must return to a human or be marked pending.

Review question:
Can a reviewer trace the delivered behavior back to the original need?`,
    code: `const traceRecord = {
  behavior: "Feature path added by the agent",
  approvedBy: ["REQ-001", "REQ-002"],
  verification: "focused-test-output",
  review: "stakeholder-need-still-satisfied",
  pendingClaims: ["production readiness"]
};

assertReviewTrail(traceRecord);
releaseOnlyAfterReview(traceRecord);`,
    hud: ["Goal", "Trace: REQ-001", "Proof needed"],
    status: "Trace record",
    tiles: ["player", "path", "reveal", "path", "block", "monster", "path", "goal"]
  },
  antigravity: {
    kicker: "Antigravity SDK pass",
    title: "Multi-Agent Verification",
    summary:
      "Build multi-agent workflows using the Google Antigravity Python SDK. Agent delegation checks requirements, applies safety rules, and writes review logs.",
    metrics: ["Antigravity SDK", "Safety checks", "Multi-agent review"],
    prompt: `from google.antigravity import LocalAgentConfig, Agent

config = LocalAgentConfig(
    model="gemini-2.5-pro",
    system_instruction="Follow TraceWeaver review rules."
)
agent = Agent(config)
# Run workflow with requirements checks`,
    code: `const traceSession = await antigravity.run({
  intent: "Integrate billing processor",
  requirements: "requirements.md",
  safety: "safety_policies.md",
  gates: ["tw-authority-gate", "tw-traceability-check"]
});

// Agent checks requirements and reports status`,
    hud: ["Antigravity", "Multi-agent", "Reviewed workflow"],
    status: "Reviewed workflow",
    tiles: ["player", "reveal", "path", "goal", "reveal", "path", "path", "goal"]
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

const onboards = {
  codex: {
    code: `# Install the marketplace and plugin
codex plugin marketplace add Oxiom-Systems/traceweaver
codex plugin install traceweaver-core@traceweaver

# Start TraceWeaver for your project
tw-auto "bootstrap TraceWeaver for this project"`,
    tree: `my-project/
├── requirements.md               [NEW]  <- Requirements baseline
├── traceability-matrix.md        [NEW]  <- Links code and verification paths
└── .traceweaver/
    └── intent-contract.yml       [NEW]  <- Baseline hash and active checks`,
    docsUrl: "https://github.com/Oxiom-Systems/traceweaver#codex",
    docsText: "Read the Codex guide"
  },
  claude: {
    code: `# Add the marketplace and install the plugin
claude plugin marketplace add Oxiom-Systems/traceweaver
claude plugin install traceweaver-core@traceweaver

# Reload active plugins
/reload-plugins

# Run trace check on a specific goal
tw-auto "implement user auth with verification"`,
    tree: `my-project/
├── requirements.md               [NEW]  <- Requirements baseline
├── traceability-matrix.md        [NEW]  <- Matrix linking needs and code
└── .traceweaver/
    └── intent-contract.yml       [NEW]  <- Scope and baseline hash`,
    docsUrl: "https://github.com/Oxiom-Systems/traceweaver#claude",
    docsText: "Read the Claude Code guide"
  },
  cursor: {
    code: `# Copy the Cursor rules peer manifest locally
mkdir -p .cursor-rules
cp plugins/traceweaver-core/.cursor-plugin/plugin.json .cursor-rules/

# Bootstrap TraceWeaver rules for Cursor
tw-auto "bootstrap TraceWeaver rules"`,
    tree: `my-project/
├── requirements.md               [NEW]  <- Requirements baseline
├── traceability-matrix.md        [NEW]  <- Links code and verification paths
└── .cursor-rules/
    └── plugin.json               [NEW]  <- Cursor rules peer manifest`,
    docsUrl: "https://github.com/Oxiom-Systems/traceweaver#cursor",
    docsText: "Read the Cursor guide"
  },
  antigravity: {
    code: `# Install the Python SDK
pip install google-antigravity

# Verify dependencies and active GEMINI_API_KEY
export GEMINI_API_KEY="your-api-key"
python -c "import google.antigravity; print('Antigravity Ready!')"

# Run trace audit in your workflow
tw-audit "verify requirements coverage"`,
    tree: `my-project/
├── requirements.md               [NEW]  <- Requirements baseline
├── traceability-matrix.md        [NEW]  <- Traceability matrix
├── .traceweaver/
│   └── intent-contract.yml       [NEW]  <- Project intent details
└── main.py                       [NEW]  <- Python agent script using Antigravity SDK`,
    docsUrl: "https://github.com/Oxiom-Systems/traceweaver#antigravity",
    docsText: "Read the Antigravity guide"
  }
};

const onboardTabs = document.querySelectorAll("[data-onboard]");

function applyOnboard(name) {
  const onboard = onboards[name];
  setText("onboard-code", onboard.code);
  setText("tree-code", onboard.tree);
  
  const docsBtn = document.getElementById("onboard-docs-btn");
  if (docsBtn) {
    docsBtn.href = onboard.docsUrl;
    docsBtn.textContent = onboard.docsText;
  }

  onboardTabs.forEach((tab) => {
    const active = tab.dataset.onboard === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

document.addEventListener("click", async (event) => {
  const demoButton = event.target.closest("[data-demo]");
  if (demoButton) applyDemo(demoButton.dataset.demo);

  const onboardTab = event.target.closest("[data-onboard]");
  if (onboardTab) applyOnboard(onboardTab.dataset.onboard);

  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;

  let source;
  if (copyButton.dataset.copy === "prompt") {
    source = document.getElementById("prompt-code");
  } else if (copyButton.dataset.copy === "code") {
    source = document.getElementById("sample-code");
  } else if (copyButton.dataset.copy === "onboard-cmd") {
    source = document.getElementById("onboard-code");
  }

  if (!source) return;

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
applyOnboard("codex");
