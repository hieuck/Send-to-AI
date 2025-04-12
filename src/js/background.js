/**
 * Send to AI v0.2.0
 * Background script for handling context menu and AI interactions
 */
const AI_PLATFORMS = {
  chatgpt: {
    name: 'ChatGPT',
    defaultUrl: 'https://chatgpt.com/?model=auto',
    selector: {
      input: '#prompt-textarea',
      button: 'button[data-testid="send-button"]'
    }
  },
  gemini: {
    name: 'Gemini',
    defaultUrl: 'https://gemini.google.com/app',
    selector: {
      input: '.ql-editor',
      button: '.send-button'
    }
  },
  claude: {
    name: 'Claude',
    defaultUrl: 'https://claude.ai/new',
    selector: {
      input: 'p.is-empty.is-editor-empty',
      button: 'button[aria-label="Send Message"]'
    }
  },
  poe: {
    name: 'POE',
    defaultUrl: 'https://poe.com/',
    selector: {
      input: 'textarea.GrowingTextArea_textArea__ZWQbP',
      button: 'button.ChatMessageSendButton_sendButton__4ZyI4'
    }
  },
  deepseek: {
    name: 'DeepSeek',
    defaultUrl: 'https://chat.deepseek.com/',
    selector: {
      input: '#chat-input',
      button: 'div[role="button"][aria-disabled="false"]'
    }
  }
};

// Tạo menu chuột phải khi extension được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

// Cập nhật menu khi ngôn ngữ thay đổi
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createContextMenus") {
    createContextMenus();
  }
});

function createContextMenus() {
  chrome.storage.local.get(["selectedLanguage", "customLanguage"], (data) => {
    const language = data.customLanguage || data.selectedLanguage || "VI-VN";

    // Xóa menu cũ
    chrome.contextMenus.removeAll(() => {
      // Tạo menu root
      chrome.contextMenus.create({
        id: 'root',
        title: chrome.i18n.getMessage('menuRoot'),
        contexts: ['selection', 'link']
      });

      // Tạo menu cho từng nền tảng AI
      Object.entries(AI_PLATFORMS).forEach(([platformId, platform]) => {
        chrome.contextMenus.create({
          id: platformId,
          parentId: 'root',
          title: platform.name,
          contexts: ['selection', 'link']
        });

        // Menu hành động (trả lời, viết lại, dịch)
        const actions = ['answer', 'rewrite', 'translate'];
        actions.forEach(action => {
          const actionId = `${platformId}_${action}`;
          chrome.contextMenus.create({
            id: actionId,
            parentId: platformId,
            title: chrome.i18n.getMessage(`action_${action}`),
            contexts: ['selection', 'link']
          });

          // Menu prompt cho mỗi hành động
          const promptTypes = ['default', 'p1', 'p2', 'p3'];
          promptTypes.forEach(promptType => {
            const promptId = `${actionId}_${promptType}`;
            const promptTemplate = chrome.i18n.getMessage(`prompt_${action}_${promptType}`);
            chrome.contextMenus.create({
              id: promptId,
              parentId: actionId,
              title: promptTemplate.replace('{language}', language),
              contexts: ['selection', 'link']
            });
          });
        });
      });
    });
  });
}

// Xử lý khi click vào menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.local.get(["selectedLanguage", "customLanguage"], async (data) => {
    const language = data.customLanguage || data.selectedLanguage || "VI-VN";
    
    // Parse menu item ID: platform_action_promptType
    const [platform, action, promptType] = info.menuItemId.split('_');
    
    if (!platform || !action || !promptType) return;

    const config = AI_PLATFORMS[platform];
    if (!config) return;

    // Get custom URL if available
    const customUrlKey = `custom${platform.charAt(0).toUpperCase() + platform.slice(1)}Link`;
    const customUrl = await chrome.storage.local.get(customUrlKey);
    const url = customUrl[customUrlKey] || config.defaultUrl;

    // Get selected text or link URL
    const text = info.selectionText || info.linkUrl || tab.url;

    // Get prompt template and create final prompt
    const promptTemplate = chrome.i18n.getMessage(`prompt_${action}_${promptType}`);
    const finalPrompt = `${promptTemplate.replace('{language}', language)}\n\n${text}`;

    // Create new tab and inject prompt
    createTab(url, finalPrompt, config.selector);
  });
});

function createTab(url, prompt, selector) {
  chrome.tabs.create({ url }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        injectPrompt(tab.id, prompt, selector);
      }
    });
  });
}

function injectPrompt(tabId, prompt, selector) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: (prompt, selector) => {
      const checkElement = setInterval(() => {
        const input = document.querySelector(selector.input);
        if (input) {
          clearInterval(checkElement);
          
          // Set input value
          if (input.tagName.toLowerCase() === 'textarea') {
            input.value = prompt;
          } else {
            input.textContent = prompt;
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));

          // Click send button after short delay
          setTimeout(() => {
            const button = document.querySelector(selector.button);
            if (button && !button.disabled) {
              button.click();
            }
          }, 500);
        }
      }, 500);
    },
    args: [prompt, selector]
  });
}
