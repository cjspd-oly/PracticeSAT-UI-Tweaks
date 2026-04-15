const STYLE_DIFF_ID = "hide-difficulty-style";
const STYLE_TABLE_ID = "better-table-style";

// -------- Difficulty --------
function applyDifficulty(enabled) {
  let el = document.getElementById(STYLE_DIFF_ID);

  if (enabled) {
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_DIFF_ID;
      el.textContent = `
        /* keep element in DOM; avoid breaking app logic */
        div.inline-flex.rounded-full {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(el);
    }
  } else if (el) {
    el.remove();
  }
}

// -------- Tables --------
function applyTables(enabled) {
  let el = document.getElementById(STYLE_TABLE_ID);

  if (enabled) {
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_TABLE_ID;
      el.textContent = `
        table {
          border-collapse: separate !important;
          border-spacing: 12px 8px !important;
        }

        th, td {
          padding: 10px 14px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px;
          background: #ffffff !important;
        }

        th {
          background: #f8fafc !important;
          font-weight: 600;
        }

        td:hover {
          background: #f1f5f9;
        }
      `;
      document.head.appendChild(el);
    }
  } else if (el) {
    el.remove();
  }
}

// -------- Init (persist defaults) --------
chrome.storage.local.get(
  ["hideDifficulty", "betterTables"],
  (res) => {
    const hideDifficulty =
      res.hideDifficulty === undefined ? true : res.hideDifficulty;
    const betterTables =
      res.betterTables === undefined ? true : res.betterTables;

    if (res.hideDifficulty === undefined) {
      chrome.storage.local.set({ hideDifficulty: true });
    }
    if (res.betterTables === undefined) {
      chrome.storage.local.set({ betterTables: true });
    }

    applyDifficulty(hideDifficulty);
    applyTables(betterTables);
  }
);

// -------- Live updates --------
chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideDifficulty) {
    applyDifficulty(changes.hideDifficulty.newValue);
  }
  if (changes.betterTables) {
    applyTables(changes.betterTables.newValue);
  }
});