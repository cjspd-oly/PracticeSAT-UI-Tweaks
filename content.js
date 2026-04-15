const STYLES = [
  {
    key: "hideDifficulty",
    id: "hide-difficulty-style",
    default: true,
    css: `
      div.inline-flex.rounded-full {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `
  },
  {
    key: "betterTables",
    id: "better-table-style",
    default: true,
    css: `
      table {
        border-collapse: collapse !important;
        width: 100%;
      }

      th, td {
        padding: 8px 12px !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 0 !important;
        background: #ffffff !important;
      }

      th {
        background: #f9fafb !important;
        font-weight: 600;
      }

      tr:hover td {
        background: #f8fafc;
      }
    `
  },
  {
    key: "stopBlink",
    id: "stop-blink-style",
    default: true,
    css: `
      .animate-ping {
        animation: none !important;
      }
    `
  }
];

// ---------- Core Apply Function ----------
function applyStyle({ id, css }, enabled) {
  let el = document.getElementById(id);

  if (enabled) {
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      el.textContent = css;
      document.head.appendChild(el);
    }
  } else {
    if (el) el.remove();
  }
}

// ---------- Init ----------
chrome.storage.local.get(
  STYLES.map(s => s.key),
  (res) => {
    STYLES.forEach(s => {
      let value = res[s.key];

      if (value === undefined) {
        value = s.default;
        chrome.storage.local.set({ [s.key]: value });
      }

      applyStyle(s, value);
    });
  }
);

// ---------- Live Updates ----------
chrome.storage.onChanged.addListener((changes) => {
  STYLES.forEach(s => {
    if (changes[s.key]) {
      applyStyle(s, changes[s.key].newValue);
    }
  });
});