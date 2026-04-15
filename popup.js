const toggle = document.getElementById("toggle");

// load state
chrome.storage.local.get("hideDifficulty", (res) => {
  if (res.hideDifficulty === undefined) {
    chrome.storage.local.set({ hideDifficulty: true });
    toggle.checked = true;
  } else {
    toggle.checked = res.hideDifficulty;
  }
});

// update state
toggle.addEventListener("change", () => {
  chrome.storage.local.set({
    hideDifficulty: toggle.checked
  });
});