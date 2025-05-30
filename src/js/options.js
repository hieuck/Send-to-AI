document.addEventListener("DOMContentLoaded", () => {
    initI18n();
    initPromptSection(); // Thêm hàm khởi tạo prompt
    setupPlaceholders();
    loadSettings();
    bindUIEvents();
    initTheme();
});

// Added global getMessage function
function getMessage(messageKey) {
    return chrome.i18n.getMessage(messageKey) || messageKey;
}

// Hàm khởi tạo i18n và cập nhật nhãn, tiêu đề,...
function initI18n() {
    const i18nMessages = {
        extensionName: 'extensionName',
        // Language labels
        languageLabel: 'languageLabel',
        languageVietnamese: 'languageVietnamese',
        languageEnglishUS: 'languageEnglishUS',
        languageEnglishGB: 'languageEnglishGB',
        languageFrenchFR: 'languageFrenchFR',
        languageFrenchCA: 'languageFrenchCA',
        languageSpanishES: 'languageSpanishES',
        languageSpanishMX: 'languageSpanishMX',
        languageGerman: 'languageGerman',
        languageItalian: 'languageItalian',
        languagePortuguesePT: 'languagePortuguesePT',
        languagePortugueseBR: 'languagePortugueseBR',
        languageJapanese: 'languageJapanese',
        languageChineseSimp: 'languageChineseSimp',
        languageChineseTrad: 'languageChineseTrad',
        languageRussian: 'languageRussian',
        languageArabic: 'languageArabic',
        languageKorean: 'languageKorean',
        languageTurkish: 'languageTurkish',
        languageDutch: 'languageDutch',
        languageSwedish: 'languageSwedish',
        languageDanish: 'languageDanish',
        languageNorwegian: 'languageNorwegian',
        languageFinnish: 'languageFinnish',
        
        // Custom inputs
        customLanguageLabel: 'customLanguageLabel',
        customLanguagePlaceholder: 'customLanguagePlaceholder',
        customPromptLabel: 'customPromptLabel',
        customPromptPlaceholder: 'customPromptPlaceholder',
        
        // AI Service Links
        customChatGPTLinkLabel: 'customChatGPTLinkLabel',
        chatGPTPlaceholder: 'chatGPTPlaceholder',
        customGeminiLinkLabel: 'customGeminiLinkLabel',
        geminiPlaceholder: 'geminiPlaceholder',
        customClaudeLinkLabel: 'customClaudeLinkLabel',
        claudePlaceholder: 'claudePlaceholder',
        customPOELinkLabel: 'customPOELinkLabel',
        poePlaceholder: 'poePlaceholder',
        customDeepSeekLinkLabel: 'customDeepSeekLinkLabel',
        deepSeekPlaceholder: 'deepSeekPlaceholder',
        customPerplexityLinkLabel: 'customPerplexityLinkLabel',
        perplexityPlaceholder: 'perplexityPlaceholder',
        customGrokLinkLabel: 'customGrokLinkLabel',
        grokPlaceholder: 'grokPlaceholder',
        
        // Theme
        themeDropdownLabel: 'themeDropdownLabel',
        themeLightLabel: 'themeLightLabel',
        themeDarkLabel: 'themeDarkLabel',
        themeAutoLabel: 'themeAutoLabel',
        
        // Buttons & Messages
        openLinkButton: 'openLinkButton',
        saveButton: 'saveButton',
        settingsSaved: 'settingsSaved',
        urlInvalid: 'urlInvalid'
    };

    // Cập nhật tiêu đề chính
    document.querySelector('h1').innerText = getMessage('extensionName');
    // ...existing code for labels updates...
    const labels = [
        // Headers
        { selector: "h1", message: "extensionName" },
        { selector: ".prompt-section > h2", message: "prompt_section_title" },
        { selector: ".prompt-group > h3:first-child", message: "prompt_answer_title" },
        { selector: ".prompt-group > h3:last-child", message: "prompt_rewrite_title" },

        // Prompts placeholders
        { selector: "#answerPrompt", message: "customPromptPlaceholder", type: "placeholder" },
        { selector: "#rewritePrompt", message: "customPromptRewritePlaceholder", type: "placeholder" },

        // Language options
        { for: "languageDropdown", message: "languageLabel" },
        { selector: "option[value='VI-VN']", message: "languageVietnamese" },
        { selector: "option[value='EN-US']", message: "languageEnglishUS" },
        { selector: "option[value='EN-GB']", message: "languageEnglishGB" },
        { selector: "option[value='FR-FR']", message: "languageFrenchFR" },
        { selector: "option[value='FR-CA']", message: "languageFrenchCA" },
        { selector: "option[value='ES-ES']", message: "languageSpanishES" },
        { selector: "option[value='ES-MX']", message: "languageSpanishMX" },
        { selector: "option[value='DE-DE']", message: "languageGerman" },
        { selector: "option[value='IT-IT']", message: "languageItalian" },
        { selector: "option[value='PT-PT']", message: "languagePortuguesePT" },
        { selector: "option[value='PT-BR']", message: "languagePortugueseBR" },
        { selector: "option[value='JA-JP']", message: "languageJapanese" },
        { selector: "option[value='ZH-CN']", message: "languageChineseSimp" },
        { selector: "option[value='ZH-TW']", message: "languageChineseTrad" },
        { selector: "option[value='RU-RU']", message: "languageRussian" },
        { selector: "option[value='AR-SA']", message: "languageArabic" },
        { selector: "option[value='KO-KR']", message: "languageKorean" },
        { selector: "option[value='TR-TR']", message: "languageTurkish" },
        { selector: "option[value='NL-NL']", message: "languageDutch" },
        { selector: "option[value='SV-SE']", message: "languageSwedish" },
        { selector: "option[value='DA-DK']", message: "languageDanish" },
        { selector: "option[value='NO-NO']", message: "languageNorwegian" },
        { selector: "option[value='FI-FI']", message: "languageFinnish" },

        // Custom inputs and URLs
        { for: "customLanguage", message: "customLanguageLabel" },
        { for: "customChatGPTLink", message: "customChatGPTLinkLabel" },
        { for: "customGeminiLink", message: "customGeminiLinkLabel" },
        { for: "customClaudeLink", message: "customClaudeLinkLabel" },
        { for: "customPOELink", message: "customPOELinkLabel" },
        { for: "customDeepSeekLink", message: "customDeepSeekLinkLabel" },
        { for: "customPerplexityLink", message: "customPerplexityLinkLabel" },
        { for: "customGrokLink", message: "customGrokLinkLabel" },

        // Theme options
        { for: "themeDropdown", message: "themeDropdownLabel" },
        { selector: "option[value='light']", message: "themeLight" },
        { selector: "option[value='dark']", message: "themeDark" },
        { selector: "option[value='auto']", message: "themeAuto" },

        // Buttons
        { selector: ".open-link-btn", message: "openLinkButton" },
        { selector: "#saveButton", message: "saveButton" }
    ];

    // Cập nhật nội dung cho thẻ h1
    document.querySelector('h1').innerText = getMessage('extensionName');

    // Cập nhật các nhãn khác bằng forEach
    labels.forEach(label => {
        if (label.for) {
            // Update labels using 'for' attribute
            const labelElement = document.querySelector(`label[for="${label.for}"]`);
            if (labelElement) {
                labelElement.textContent = chrome.i18n.getMessage(label.message);
            }
        } else if (label.selector) {
            // Update elements using custom selector
            const elements = document.querySelectorAll(label.selector);
            elements.forEach(element => {
                if (label.type === "value") {
                    element.value = getMessage(label.message);
                } else if (label.type === "placeholder") {
                    element.placeholder = getMessage(label.message);
                } else {
                    element.textContent = chrome.i18n.getMessage(label.message);
                }
            });
        }
    });
}

// Hàm thiết lập placeholder và cập nhật nút mở link
function setupPlaceholders() {
    const placeholders = {
        customLanguage: 'customLanguagePlaceholder',
        customPrompt: 'customPromptPlaceholder',
        customChatGPTLink: 'chatGPTPlaceholder',
        customGeminiLink: 'geminiPlaceholder',
        customClaudeLink: 'claudePlaceholder',
        customPOELink: 'poePlaceholder',
        customDeepSeekLink: 'deepSeekPlaceholder',
        customPerplexityLink: 'perplexityPlaceholder',
        customGrokLink: 'grokPlaceholder'
    };

    Object.entries(placeholders).forEach(([id, messageKey]) => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = getMessage(messageKey);
        }
    });

    // Cập nhật nút mở liên kết
    document.querySelectorAll('.open-link-btn').forEach(button => {
        button.innerText = getMessage('openLinkButton');
    });
}

// Hàm tải settings lưu và cập nhật giá trị cho input
function loadSettings() {
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompts", "customChatGPTLink", "customGeminiLink", "customClaudeLink", "customPOELink", "customDeepSeekLink", "customPerplexityLink", "customGrokLink"], (data) => {
        const languageDropdown = document.getElementById("languageDropdown");
        const customLanguageInput = document.getElementById("customLanguage");
        const customPromptInput = document.getElementById("customPrompt");
        const customChatGPTLinkInput = document.getElementById("customChatGPTLink");
        const customGeminiLinkInput = document.getElementById("customGeminiLink");
        const customClaudeLinkInput = document.getElementById("customClaudeLink");
        const customPOELinkInput = document.getElementById("customPOELink");
        const customDeepSeekLinkInput = document.getElementById("customDeepSeekLink");
        const statusMessage = document.getElementById("statusMessage");

        // Clear previous messages
        statusMessage.innerHTML = '';

        // Add messages one by one with proper spacing
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            const msg = document.createElement('div');
            msg.textContent = `${getMessage('selectedLanguageMsg')}: ${data.selectedLanguage}`;
            statusMessage.appendChild(msg);
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            const msg = document.createElement('div');
            msg.textContent = `${getMessage('customLanguageSaved')}: ${data.customLanguage}`;
            statusMessage.appendChild(msg);
        }
        if (data.customPrompt) {
            customPromptInput.value = data.customPrompt;
            const msg = document.createElement('div');
            msg.textContent = `${getMessage('customPromptSaved')}: ${data.customPrompt}`;
            statusMessage.appendChild(msg);
        }

        // Handle AI platform links separately
        const platforms = {
            'ChatGPT': data.customChatGPTLink,
            'Gemini': data.customGeminiLink, 
            'Claude': data.customClaudeLink,
            'POE': data.customPOELink,
            'DeepSeek': data.customDeepSeekLink
        };

        Object.entries(platforms).forEach(([platform, link]) => {
            if (link) {
                const msg = document.createElement('div');
                msg.textContent = `${getMessage('linkSaved')} - ${platform}: ${link}`;
                statusMessage.appendChild(msg);
            }
        });

        // Load link values
        ['ChatGPT', 'Gemini', 'Claude', 'POE', 'DeepSeek', 'Perplexity', 'Grok'].forEach(platform => {
            const input = document.getElementById(`custom${platform}Link`);
            if (input && data[`custom${platform}Link`]) {
                input.value = data[`custom${platform}Link`];
            }
        });

        // Load prompt values
        if (data.customPrompts) {
            const answerPrompt = document.getElementById('answerPrompt');
            const rewritePrompt = document.getElementById('rewritePrompt');
            
            if (answerPrompt && data.customPrompts.answer?.default?.prompt) {
                answerPrompt.value = data.customPrompts.answer.default.prompt;
            }
            if (rewritePrompt && data.customPrompts.rewrite?.default?.prompt) {
                rewritePrompt.value = data.customPrompts.rewrite.default.prompt;
            }
        }
    });
}

// Hàm ràng buộc các sự kiện giao diện (sự kiện click, input,...)
function bindUIEvents() {
    const saveButton = document.getElementById("saveButton");
    const statusMessage = document.getElementById("statusMessage");
    let isSaving = false;

    saveButton.addEventListener("click", () => {
        if (isSaving) return;
        isSaving = true;

        // Gather all settings
        const settings = {
            selectedLanguage: document.getElementById("languageDropdown").value,
            customLanguage: document.getElementById("customLanguage").value,
            customPrompts: {
                answer: {
                    default: {
                        name: getMessage('my_answer'),
                        prompt: document.getElementById('answerPrompt')?.value
                    }
                },
                rewrite: {
                    default: {
                        name: getMessage('my_style'),
                        prompt: document.getElementById('rewritePrompt')?.value
                    }
                }
            }
        };

        // Add AI platform links with validation
        ['ChatGPT', 'Gemini', 'Claude', 'POE', 'DeepSeek', 'Perplexity', 'Grok'].forEach(platform => {
            const input = document.getElementById(`custom${platform}Link`);
            if (input) {
                const value = input.value.trim();
                if (value) {
                    try {
                        new URL(value); // Validate URL
                        settings[`custom${platform}Link`] = value;
                    } catch (e) {
                        showToast('urlInvalid');
                    }
                }
            }
        });

        // Save all settings at once
        chrome.storage.local.set(settings, () => {
            statusMessage.innerHTML = '';

            // Show success messages
            Object.entries(settings).forEach(([key, value]) => {
                if (key === 'customPrompts') {
                    // Handle custom prompts separately
                    if (value.answer?.default?.prompt) {
                        updateStatusMessage('customPromptSaved', 'answer');
                    }
                    if (value.rewrite?.default?.prompt) {
                        updateStatusMessage('customPromptSaved', 'rewrite');
                    }
                } else if (value) {
                    updateStatusMessage(`${key}Saved`, value);
                }
            });

            showToast('settingsSaved');
            chrome.runtime.sendMessage({ action: "createContextMenus" });
            isSaving = false;
        });
    });

    // Xử lý các nút mở liên kết
    document.querySelectorAll('.open-link-btn').forEach(button => {
        button.addEventListener('click', () => {
            const inputId = button.getAttribute('data-url-input');
            const input = document.getElementById(inputId);
            const url = input.value.trim();

            if (url) {
                // Kiểm tra URL hợp lệ
                try {
                    new URL(url);
                    // Mở URL trong tab mới
                    chrome.tabs.create({ url });
                } catch (e) {
                    showToast('urlInvalid');
                }
            } else {
                // Nếu không có URL, sử dụng URL mặc định từ placeholder
                const defaultUrl = input.placeholder;
                chrome.tabs.create({ url: defaultUrl });
            }
        });

        // Cập nhật trạng thái nút khi input thay đổi
        const inputId = button.getAttribute('data-url-input');
        const input = document.getElementById(inputId);
        input.addEventListener('input', () => {
            const url = input.value.trim();
            try {
                new URL(url || input.placeholder);
                button.disabled = false;
            } catch (e) {
                button.disabled = true;
            }
        });
    });
}

// Hàm khởi tạo và theo dõi thiết lập theme
function initTheme() {
    const themeDropdown = document.getElementById("themeDropdown");

    function checkAndSetTheme() {
        if (themeDropdown.value === "auto") {
            const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', currentTheme);
        }
    }

    themeDropdown.addEventListener("change", (event) => {
        const selectedTheme = event.target.value;
        localStorage.setItem("theme", selectedTheme);

        if (selectedTheme !== "auto") {
            document.body.setAttribute("data-theme", selectedTheme);
        } else {
            checkAndSetTheme();
        }
    });

    const savedTheme = localStorage.getItem("theme") || "auto";
    themeDropdown.value = savedTheme;

    if (savedTheme !== "auto") {
        document.body.setAttribute("data-theme", savedTheme);
    } else {
        checkAndSetTheme();
    }

    // Theo dõi thay đổi chế độ của hệ thống và chỉ cập nhật khi người dùng chọn "auto"
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkAndSetTheme);
}

// Toast message function
function showToast(messageKey) {
    const message = getMessage(messageKey);
    if (!message) return;

    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// Update status message function
function updateStatusMessage(messageKey, value) {
    const message = getMessage(messageKey);
    if (!message) return;

    const newMessage = document.createElement("div");
    // Replace placeholder with value if exists
    newMessage.textContent = message.replace("$1", value || "");
    statusMessage.appendChild(newMessage);
}

// Thêm hàm khởi tạo prompt section từ options
function initPromptSection() {
    const sectionTitle = document.querySelector('.prompt-section h2');
    if (sectionTitle) {
        sectionTitle.textContent = getMessage('prompt_section_title');
    }

    // Khởi tạo giá trị mặc định cho các textarea prompt
    const answerPrompt = document.getElementById('answerPrompt');
    const rewritePrompt = document.getElementById('rewritePrompt');

    if (answerPrompt && rewritePrompt) {
        // Load mẫu prompt từ storage hoặc dùng mặc định từ messages
        chrome.storage.local.get(['customPrompts'], (data) => {
            if (data.customPrompts?.answer?.default?.prompt) {
                answerPrompt.value = data.customPrompts.answer.default.prompt;
            } else {
                answerPrompt.value = getMessage('customPromptPlaceholder');
            }

            if (data.customPrompts?.rewrite?.default?.prompt) {
                rewritePrompt.value = data.customPrompts.rewrite.default.prompt;
            } else {
                rewritePrompt.value = getMessage('customPromptRewritePlaceholder');
            }
        });
    }
}
