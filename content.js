const STYLE_ID = "hide-difficulty-style";

function applyStyle(enabled) {
  let existing = document.getElementById(STYLE_ID);

  if (enabled) {
    if (!existing) {
      const style = document.createElement("style");
      style.id = STYLE_ID;

      style.textContent = `
        div.inline-flex.rounded-full {
          visibility: hidden !important;
        }
      `;

      document.head.appendChild(style);
    }
  } else {
    if (existing) existing.remove();
  }
}

// ensure default is saved
chrome.storage.local.get("hideDifficulty", (res) => {
  if (res.hideDifficulty === undefined) {
    chrome.storage.local.set({ hideDifficulty: true });
    applyStyle(true);
  } else {
    applyStyle(res.hideDifficulty);
  }
});

// listen for changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideDifficulty) {
    applyStyle(changes.hideDifficulty.newValue);
  }
});