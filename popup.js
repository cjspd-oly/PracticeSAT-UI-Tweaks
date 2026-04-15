const toggles = [
  { key: "hideDifficulty", el: "toggleDifficulty", default: true },
  { key: "betterTables", el: "toggleTables", default: true },
  { key: "stopBlink", el: "toggleBlink", default: true }
];

// init
chrome.storage.local.get(
  toggles.map(t => t.key),
  (res) => {
    toggles.forEach(t => {
      const el = document.getElementById(t.el);

      if (!el) return;

      if (res[t.key] === undefined) {
        chrome.storage.local.set({ [t.key]: t.default });
        el.checked = t.default;
      } else {
        el.checked = res[t.key];
      }

      // bind listener
      el.addEventListener("change", () => {
        chrome.storage.local.set({
          [t.key]: el.checked
        });
      });
    });
  }
);