class MenuHandler {
  constructor() {
    this.currentLanguage = 'VI-VN';
  }

  async initialize() {
    const data = await chrome.storage.local.get(['selectedLanguage', 'customLanguage']);
    this.currentLanguage = data.customLanguage || data.selectedLanguage || 'VI-VN';
  }

  createContextMenu(id, title, contexts, parentId = null) {
    chrome.contextMenus.create({
      id,
      title,
      contexts,
      parentId
    });
  }

  handleMenuClick(info, tab) {
    const [platform, action, promptType] = info.menuItemId.split('_');
    if (!platform || !action || !promptType) return;
    // ...handle menu click logic...
  }
}

export const menuHandler = new MenuHandler();
