// Tạo menu chuột phải khi tiện ích được cài đặt hoặc khởi động
chrome.runtime.onInstalled.addListener(() => {
    createContextMenus();
});

// Xử lý thông điệp từ popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "createContextMenus") {
        createContextMenus();
    }
});

// Tạo hoặc cập nhật menu chuột phải với ngôn ngữ đã chọn
function createContextMenus() {
    chrome.storage.local.get(["selectedLanguage", "customLanguage"], (data) => {
        const language = data.customLanguage || data.selectedLanguage || "VI-VN";

        // Lấy tên ngôn ngữ từ mã ngôn ngữ
        const languageNames = {
            "VI-VN": "Tiếng Việt",
            "EN-US": "Tiếng Anh (Mỹ)",
            "EN-GB": "Tiếng Anh (Vương quốc Anh)",
            "FR-FR": "Tiếng Pháp (Pháp)",
            "FR-CA": "Tiếng Pháp (Canada)",
            "ES-ES": "Tiếng Tây Ban Nha (Tây Ban Nha)",
            "ES-MX": "Tiếng Tây Ban Nha (Mexico)",
            "DE-DE": "Tiếng Đức",
            "IT-IT": "Tiếng Ý",
            "PT-PT": "Tiếng Bồ Đào Nha (Bồ Đào Nha)",
            "PT-BR": "Tiếng Bồ Đào Nha (Brazil)",
            "JA-JP": "Tiếng Nhật",
            "ZH-CN": "Tiếng Trung (Giản thể)",
            "ZH-TW": "Tiếng Trung (Phồn thể)",
            "RU-RU": "Tiếng Nga",
            "AR-SA": "Tiếng Ả Rập (Saudi Arabia)",
            "KO-KR": "Tiếng Hàn",
            "TR-TR": "Tiếng Thổ Nhĩ Kỳ",
            "NL-NL": "Tiếng Hà Lan",
            "SV-SE": "Tiếng Thụy Điển",
            "DA-DK": "Tiếng Đan Mạch",
            "NO-NO": "Tiếng Na Uy",
            "FI-FI": "Tiếng Phần Lan"
        };
  
        // Lấy tên ngôn ngữ tương ứng
        const languageName = languageNames[language] || "Ngôn ngữ không xác định, đang sử dụng VI-VN";
  
        // Cập nhật tiêu đề menu theo ngôn ngữ đã chọn
        const textMenuTitleChatGPT = chrome.i18n.getMessage("contextMenuTextChatGPT").replace("{language}", languageName + " \"" + language + "\"");
        const linkMenuTitleChatGPT = chrome.i18n.getMessage("contextMenuLinkChatGPT").replace("{language}", languageName + " \"" + language + "\"");
  
        const textMenuTitleGemini = chrome.i18n.getMessage("contextMenuTextGemini").replace("{language}", languageName + " \"" + language + "\"");
        const linkMenuTitleGemini = chrome.i18n.getMessage("contextMenuLinkGemini").replace("{language}", languageName + " \"" + language + "\"");
  
        const textMenuTitleClaude = chrome.i18n.getMessage("contextMenuTextClaude").replace("{language}", languageName + " \"" + language + "\"");
        const linkMenuTitleClaude = chrome.i18n.getMessage("contextMenuLinkClaude").replace("{language}", languageName + " \"" + language + "\"");
  
        // Xóa các menu cũ trước khi tạo mới
        chrome.contextMenus.removeAll(() => {
            chrome.contextMenus.create({
                id: "sendToChatGPTText",
                title: textMenuTitleChatGPT,
                contexts: ["selection"]
            });
  
            chrome.contextMenus.create({
                id: "sendToChatGPTLink",
                title: linkMenuTitleChatGPT,
                contexts: ["page", "link"]
            });
  
            chrome.contextMenus.create({
              id: "sendToGeminiText",
              title: textMenuTitleGemini,
              contexts: ["selection"]
            });
  
            chrome.contextMenus.create({
              id: "sendToGeminiLink",
              title: linkMenuTitleGemini,
              contexts: ["page", "link"]
            });
  
            chrome.contextMenus.create({
                id: "sendToClaudeText",
                title: textMenuTitleClaude,
                contexts: ["selection"]
            });
  
            chrome.contextMenus.create({
                id: "sendToClaudeLink",
                title: linkMenuTitleClaude,
                contexts: ["page", "link"]
            });
  
            chrome.contextMenus.create({
                id: "translateWithChatGPT",
                title: "Dịch với ChatGPT",
                contexts: ["selection"]
            });
        });
    });
}

// Theo dõi sự thay đổi trong chrome.storage
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
        if (changes.selectedLanguage || changes.customLanguage || changes.customChatGPTLink || changes.customGeminiLink || changes.customClaudeLink) {
            createContextMenus();
        }
    }
});

// Xử lý khi người dùng nhấp vào menu chuột phải
chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customChatGPTLink", "customGeminiLink", "customClaudeLink"], (data) => {
        const language = data.customLanguage || data.selectedLanguage || "VI";
        const customChatGPTLink = data.customChatGPTLink || "https://chatgpt.com/?model=auto";
        const customGeminiLink = data.customGeminiLink || "https://gemini.google.com/app";
        const customClaudeLink = data.customClaudeLink || "https://claude.ai/new";

        if (info.menuItemId === "sendToChatGPTText" && info.selectionText) {
            sendTextToChatGPT(info.selectionText, language, customChatGPTLink);
        } else if (info.menuItemId === "sendToChatGPTLink") {
            const pageUrl = info.linkUrl || tab.url;
            sendTextToChatGPT(pageUrl, language, customChatGPTLink);
        } else if (info.menuItemId === "sendToGeminiText" && info.selectionText) {
            sendTextToGemini(info.selectionText, language, customGeminiLink);
        } else if (info.menuItemId === "sendToGeminiLink") {
            const pageUrl = info.linkUrl || tab.url;
            sendTextToGemini(pageUrl, language, customGeminiLink);
        } else if (info.menuItemId === "sendToClaudeText" && info.selectionText) {
            sendTextToClaude(info.selectionText, language, customClaudeLink);
        } else if (info.menuItemId === "sendToClaudeLink") {
            const pageUrl = info.linkUrl || tab.url;
            sendTextToClaude(pageUrl, language, customClaudeLink);
        } else if (info.menuItemId === "translateWithChatGPT") {
            const translationPrompt = "Translate the following text to Vietnamese:";
            sendTextToChatGPT(`${translationPrompt} ${info.selectionText}`, "VI", customChatGPTLink, true);
        }
    });
});

// Hàm gửi văn bản hoặc liên kết tới ChatGPT với ngôn ngữ đã chọn
function sendTextToChatGPT(text, language, customChatGPTLink, isTranslation = false) {
    chrome.storage.local.get(["customPrompt"], (data) => {
        const customPrompt = data.customPrompt || "Answer relevant content in";
        const fullText = isTranslation ? text : `${customPrompt} ${language}. \n\n${text}`;

        chrome.tabs.create({ url: customChatGPTLink }, (newTab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === newTab.id && info.status === 'complete') {
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: (text) => {
                            const checkTextarea = setInterval(() => {
                                const inputFieldXPath = '//*[@id="prompt-textarea"]';
                                const inputField = document.evaluate(inputFieldXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                                if (inputField) {
                                    inputField.innerText = text;
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
                        args: [fullText]
                    });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    });
}

// Hàm gửi văn bản hoặc liên kết tới Google Gemini
function sendTextToGemini(text, language, customGeminiLink, isTranslation = false) {
    chrome.storage.local.get(["customPrompt"], (data) => {
        const customPrompt = data.customPrompt || "Answer relevant content in";
        const fullText = isTranslation ? text : `${customPrompt} ${language}. \n\n${text}`;

        chrome.tabs.create({ url: customGeminiLink }, (newTab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === newTab.id && info.status === 'complete') {
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: (text) => {
                            const inputField = document.querySelector(".ql-editor.ql-blank.textarea");
                            const sendButton = document.querySelector(".send-button");

                            if (inputField) {
                                inputField.innerText = text;
                                inputField.dispatchEvent(new Event('input', { bubbles: true }));

                                if (sendButton) {
                                    setTimeout(() => {
                                        sendButton.click();
                                    }, 500);
                                }
                            }
                        },
                        args: [fullText]
                    });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    });
}

// Hàm gửi văn bản hoặc liên kết tới Claude
function sendTextToClaude(text, language, customClaudeLink, isTranslation = false) {
    chrome.storage.local.get(["customPrompt"], (data) => {
        const customPrompt = data.customPrompt || "Answer relevant content in";
        const fullText = isTranslation ? text : `${customPrompt} ${language}. \n\n${text}`;

        chrome.tabs.create({ url: customClaudeLink }, (newTab) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === newTab.id && info.status === 'complete') {
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: (text) => {
                            const checkTextarea = setInterval(() => {
                                // Chọn phần tử input
                                const inputField = document.querySelector('p.is-empty.is-editor-empty.before\\:!text-text-500.before\\:whitespace-nowrap');

                                if (inputField) {
                                    inputField.textContent = text;
                                    inputField.dispatchEvent(new Event('input', { bubbles: true }));

                                    // Chọn nút gửi dựa trên aria-label
                                    const sendButton = document.querySelector('button[aria-label="Send Message"].inline-flex');

                                    if (sendButton) {
                                        setTimeout(() => {
                                            sendButton.click();
                                            clearInterval(checkTextarea);
                                        }, 1000); // Chờ 1000ms để đảm bảo nút đã sẵn sàng
                                    }
                                }
                            }, 100); // Kiểm tra mỗi 100ms
                        },
                        args: [fullText]
                    });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    });
}
