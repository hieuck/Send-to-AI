export const utils = {
  getCustomUrl: async (platform) => {
    const key = `custom${platform.charAt(0).toUpperCase() + platform.slice(1)}Link`;
    const result = await chrome.storage.local.get(key);
    return result[key];
  },

  injectPrompt: async (tabId, prompt, selector) => {
    return chrome.scripting.executeScript({
      target: { tabId },
      func: (prompt, selector) => {
        // ...injection logic...
      },
      args: [prompt, selector]
    });
  },

  createTab: async (url, prompt, selector) => {
    // ...tab creation logic...
  }
};
