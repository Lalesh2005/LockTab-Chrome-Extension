// For future features (auto-lock, tab tracking)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'lock') {
    chrome.storage.local.set({ isLocked: true })
  }
})