/**
 * Send to AI v0.2.0
 * Background script for handling context menu and AI interactions
 */

const AI_PLATFORMS = {
  chatgpt: {
    name: '🤖 ChatGPT',
    defaultUrl: 'https://chatgpt.com/?model=auto',
    selector: {
      input: '#prompt-textarea',
      button: 'button[data-testid="send-button"]'
    }
  },
  claude: {
    name: '🎭 Claude',
    defaultUrl: 'https://claude.ai/new',
    selector: {
      input: 'p.is-empty.is-editor-empty',
      button: 'button[aria-label="Send message"].bg-accent-main-000, button[aria-label="Send Message"]'
    }
  },
  deepseek: {
    name: '🔍 DeepSeek',
    defaultUrl: 'https://chat.deepseek.com/',
    selector: {
      input: '#chat-input',
      button: 'div[role="button"][aria-disabled="false"]'
    }
  },
  gemini: {
    name: '🌟 Gemini',
    defaultUrl: 'https://gemini.google.com/app',
    selector: {
      input: '.ql-editor',
      button: '.send-button'
    }
  },
  perplexity: {
    name: '💡 Perplexity',
    defaultUrl: 'https://www.perplexity.ai/',
    selector: {
      input: '.TextArea_textArea__GrWvD, textarea[placeholder="Ask anything..."], .ProseMirror[contenteditable="true"]',
      button: 'button[aria-label="Submit"][type="button"], button[type="submit"], button.Button_button__GWnx9, .bg-super button[aria-label="Submit"]'
    }
  },
  poe: {
    name: '📚 POE',
    defaultUrl: 'https://poe.com/',
    selector: {
      input: 'textarea.GrowingTextArea_textArea__ZWQbP',
      button: 'button[aria-label="Send message"], button.ChatMessageSendButton_sendButton__4ZyI4'
    }
  },
  grok: {
    name: '🧠 Grok',
    defaultUrl: 'https://grok.com/',
    selector: {
      input: 'textarea[aria-label="Hỏi Grok bất cứ điều gì"]',
      button: 'button[aria-label="Gửi"]'
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

    chrome.contextMenus.removeAll(() => {
      ['selection', 'page'].forEach(context => {
        const contextId = `root_${context}`;
        const rootTitle = chrome.i18n.getMessage(context === 'selection' ? 'menuRoot' : 'menuRootPage');
        
        if (rootTitle) {  // Check if title exists
          chrome.contextMenus.create({
            id: contextId,
            title: rootTitle,
            contexts: [context]
          });

          Object.entries(AI_PLATFORMS).forEach(([platformId, platform]) => {
            if (platform.name) {  // Check if platform name exists
              chrome.contextMenus.create({
                id: `${platformId}_${context}`,
                parentId: contextId,
                title: platform.name,
                contexts: [context]
              });

              const actions = ['answer', 'rewrite', 'translate'];
              actions.forEach(action => {
                const actionTitle = chrome.i18n.getMessage(`action_${action}`);
                if (actionTitle) {  // Check if action title exists
                  const actionId = `${platformId}_${action}_${context}`;
                  chrome.contextMenus.create({
                    id: actionId,
                    parentId: `${platformId}_${context}`,
                    title: actionTitle,
                    contexts: [context]
                  });

                  // Thay đổi phần tạo custom prompts menu
                  if ((action === 'answer' || action === 'rewrite')) {
                    const customTitle = chrome.i18n.getMessage(`custom_prompt_menu_${action}`);
                    if (customTitle) {
                      chrome.contextMenus.create({
                        id: `${actionId}_custom`,
                        parentId: actionId,
                        title: customTitle,
                        contexts: [context]
                      });
                    }
                  }

                  // Only create default prompts if template exists
                  const promptTypes = ['default', 'p1', 'p2', 'p3'];
                  promptTypes.forEach(promptType => {
                    const messageKey = `prompt_${action}_${promptType}`;
                    const promptTemplate = chrome.i18n.getMessage(messageKey);
                    if (promptTemplate) {
                      const promptId = `${actionId}_${promptType}`;
                      chrome.contextMenus.create({
                        id: promptId,
                        parentId: actionId,
                        title: promptTemplate.replace('{language}', language),
                        contexts: [context]
                      });
                    }
                  });

                  // Add new translation submenu items
                  if (action === 'translate') {
                    const translationTypes = [
                      {id: 'default', messageKey: 'translate_default_title'},
                      {id: 'literary', messageKey: 'translate_literary_title'},
                      {id: 'technical', messageKey: 'translate_technical_title'},
                      {id: 'localize', messageKey: 'translate_localize_title'}
                    ];

                    translationTypes.forEach(type => {
                      const title = chrome.i18n.getMessage(type.messageKey);
                      if (title) {
                        chrome.contextMenus.create({
                          id: `${actionId}_${type.id}`,
                          parentId: actionId,
                          title: title,
                          contexts: [context]
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
  });
}

// Xử lý khi click vào menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.local.get(null, async (data) => {
    const language = data.customLanguage || data.selectedLanguage || "VI-VN";
    
    // Parse menu item ID with context
    const [platform, action, context, promptType, customKey] = info.menuItemId.split('_');
    
    if (!platform || !action) return;

    const config = AI_PLATFORMS[platform];
    if (!config) return;

    // Get custom URL if available
    const customUrlKey = `custom${platform.charAt(0).toUpperCase() + platform.slice(1)}Link`;
    const url = data[customUrlKey] || config.defaultUrl;

    // Get text based on context
    const text = context === 'selection' 
      ? (info.selectionText || info.linkUrl)
      : tab.url;

    // Get prompt template
    let promptTemplate;
    if (action === 'translate') {
      const promptMessageKey = `translate_${promptType}_prompt`;
      promptTemplate = chrome.i18n.getMessage(promptMessageKey) || 
                      chrome.i18n.getMessage('translate_default_prompt');
    } else if (promptType === 'custom') {
        promptTemplate = action === 'rewrite' 
            ? chrome.i18n.getMessage('customPromptRewritePlaceholder')
            : chrome.i18n.getMessage('customPromptPlaceholder');
    } else {
        promptTemplate = chrome.i18n.getMessage(`prompt_${action}_${promptType}`);
    }

    const finalPrompt = `${promptTemplate.replace('{language}', language)}\n\n${text}`;
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
          
          if (input.tagName.toLowerCase() === 'textarea') {
            input.value = prompt;
          } else {
            input.textContent = prompt;
            if (input.getAttribute('contenteditable') === 'true') {
              input.innerHTML = prompt.replace(/\n/g, '<br>');
            }
          }
          
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));

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
