import { menuHandler } from './js/menu.js';
import { utils } from './js/utils.js';

// Initialize context menus
chrome.runtime.onInstalled.addListener(() => {
  menuHandler.initialize();
});

// Handle menu updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateMenus") {
    menuHandler.initialize();
  }
});

// Handle background tasks
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // ...background task handling...
});
