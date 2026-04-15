const toggleDifficulty = document.getElementById("toggleDifficulty");
const toggleTables = document.getElementById("toggleTables");

// load state (persist defaults)
chrome.storage.local.get(
  ["hideDifficulty", "betterTables"],
  (res) => {
    if (res.hideDifficulty === undefined) {
      chrome.storage.local.set({ hideDifficulty: true });
      toggleDifficulty.checked = true;
    } else {
      toggleDifficulty.checked = res.hideDifficulty;
    }

    if (res.betterTables === undefined) {
      chrome.storage.local.set({ betterTables: true });
      toggleTables.checked = true;
    } else {
      toggleTables.checked = res.betterTables;
    }
  }
);

// update state
toggleDifficulty.addEventListener("change", () => {
  chrome.storage.local.set({ hideDifficulty: toggleDifficulty.checked });
});

toggleTables.addEventListener("change", () => {
  chrome.storage.local.set({ betterTables: toggleTables.checked });
});