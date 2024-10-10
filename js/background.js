// Tạo menu chuột phải khi tiện ích được cài đặt hoặc khởi động
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

// Tạo hoặc cập nhật menu chuột phải với ngôn ngữ đã chọn
function createContextMenus() {
  chrome.storage.local.get(["selectedLanguage", "customLanguage"], (data) => {
      const language = data.customLanguage || data.selectedLanguage || "VI"; // Ưu tiên ngôn ngữ tùy chỉnh, nếu không có thì lấy từ dropdown
      updateContextMenu(language);
  });
}

// Hàm cập nhật tiêu đề của menu chuột phải
function updateContextMenu(language) {
  const textMenuTitle = `Gửi văn bản đã chọn tới ChatGPT bằng ngôn ngữ "${language}"`;
  const linkMenuTitle = `Gửi liên kết tới ChatGPT bằng ngôn ngữ "${language}`;

  // Tạo/cập nhật menu chuột phải
  chrome.contextMenus.create({
      id: "sendToChatGPTText",
      title: textMenuTitle,
      contexts: ["selection"]
  });

  chrome.contextMenus.create({
      id: "sendToChatGPTLink",
      title: linkMenuTitle,
      contexts: ["page", "link"]
  });
}

// Xử lý khi người dùng nhấp vào menu chuột phải
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.local.get(["selectedLanguage", "customLanguage"], (data) => {
      const language = data.customLanguage || data.selectedLanguage || "VI"; // Dùng ngôn ngữ tùy chỉnh nếu có, nếu không thì dùng từ dropdown

      if (info.menuItemId === "sendToChatGPTText" && info.selectionText) {
          sendTextToChatGPT(info.selectionText, language);
      } else if (info.menuItemId === "sendToChatGPTLink") {
          const pageUrl = info.linkUrl || tab.url;
          sendTextToChatGPT(pageUrl, language);
      }
  });
});

// Hàm gửi văn bản hoặc liên kết tới ChatGPT với ngôn ngữ đã chọn
function sendTextToChatGPT(text, language) {
  chrome.tabs.create({ url: "https://chatgpt.com/?model=auto" }, (newTab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === 'complete') {
              chrome.scripting.executeScript({
                  target: { tabId: newTab.id },
                  func: (text, language) => {
                      const checkTextarea = setInterval(() => {
                          const inputFieldXPath = '//*[@id="prompt-textarea"]';
                          const inputField = document.evaluate(inputFieldXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                          if (inputField) {
                              const fullText = `Answer in ${language}. \n\n${text}`;
                              inputField.innerText = fullText;
                              inputField.dispatchEvent(new Event('input', { bubbles: true }));

                              const sendButtonXPath = '//*[@data-testid="send-button"]';
                              const sendButton = document.evaluate(sendButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                              if (sendButton) {
                                  setTimeout(() => {
                                      sendButton.click();
                                      clearInterval(checkTextarea);
                                  }, 500);
                              }
                          }
                      }, 100);
                  },
                  args: [text, language]
              });
              chrome.tabs.onUpdated.removeListener(listener);
          }
      });
  });
}
