document.addEventListener("DOMContentLoaded", () => {
    // Khai báo các message keys cho i18n
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

    // Hàm helper để lấy message từ i18n
    const getMessage = (key, params = []) => chrome.i18n.getMessage(i18nMessages[key], params);

    const labels = [
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

        // Custom inputs
        { for: "customLanguage", message: "customLanguageLabel" },
        { for: "customPrompt", message: "customPromptLabel" },
        
        // AI Service Links
        { for: "customChatGPTLink", message: "customChatGPTLinkLabel" },
        { for: "customGeminiLink", message: "customGeminiLinkLabel" },
        { for: "customClaudeLink", message: "customClaudeLinkLabel" },
        { for: "customPOELink", message: "customPOELinkLabel" },
        { for: "customDeepSeekLink", message: "customDeepSeekLinkLabel" },
        
        // Theme
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
                element.textContent = chrome.i18n.getMessage(label.message);
            });
        }
    });

    const saveButton = document.getElementById("saveButton");
    if (saveButton) {
        saveButton.innerText = getMessage('saveButton');
    } else {
        console.error("Không tìm thấy nút lưu.");
    }

    // Lấy các phần tử từ HTML
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt");
    const customChatGPTLinkInput = document.getElementById("customChatGPTLink");
    const customGeminiLinkInput = document.getElementById("customGeminiLink");
    const customClaudeLinkInput = document.getElementById("customClaudeLink");
    const customPOELinkInput = document.getElementById("customPOELink");
    const customDeepSeekLinkInput = document.getElementById("customDeepSeekLink");
    const statusMessage = document.getElementById("statusMessage");

    // Cập nhật các placeholder
    customLanguageInput.placeholder = getMessage('customLanguagePlaceholder');
    customPromptInput.placeholder = getMessage('customPromptPlaceholder');

    // Cập nhật nút mở liên kết
    document.querySelectorAll('.open-link-btn').forEach(button => {
        button.innerText = getMessage('openLinkButton');
    });

    // Tải ngôn ngữ, nội dung tùy chỉnh và custom link đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt", "customChatGPTLink", "customGeminiLink", "customClaudeLink", "customPOELink", "customDeepSeekLink"], (data) => {
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            updateStatusMessage('selectedLanguageMsg', data.selectedLanguage);
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            updateStatusMessage('customLanguageSaved', data.customLanguage);
        }
        if (data.customPrompt) {
            customPromptInput.value = data.customPrompt;
            updateStatusMessage('customPromptSaved', data.customPrompt);
        }
        if (data.customChatGPTLink) {
            customChatGPTLinkInput.value = data.customChatGPTLink;
            updateStatusMessage('linkSaved', 'ChatGPT: ' + data.customChatGPTLink);
        }
        if (data.customGeminiLink) {
            customGeminiLinkInput.value = data.customGeminiLink;
            updateStatusMessage('linkSaved', 'Gemini: ' + data.customGeminiLink);
        }
        if (data.customClaudeLink) {
            customClaudeLinkInput.value = data.customClaudeLink;
            updateStatusMessage('linkSaved', 'Claude: ' + data.customClaudeLink);
        }
        if (data.customPOELink) {
            customPOELinkInput.value = data.customPOELink;
            updateStatusMessage('linkSaved', 'POE: ' + data.customPOELink);
        }
        if (data.customDeepSeekLink) {
            customDeepSeekLinkInput.value = data.customDeepSeekLink;
            updateStatusMessage('linkSaved', 'DeepSeek: ' + data.customDeepSeekLink);
        }
    });

    // Cập nhật thông báo trạng thái (gộp các thông báo thành một thông báo duy nhất)
    function updateStatusMessage(type, value) {
        const newMessage = document.createElement("div");
        newMessage.innerHTML = getMessage(type, [value]);
        statusMessage.appendChild(newMessage); // Thêm thông báo vào container
    }

    let isSaving = false; // Biến để kiểm tra nếu đã nhấn lưu trước đó

    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
        if (isSaving) return; // Nếu đã nhấn lưu, không thực hiện lại
        isSaving = true; // Đánh dấu là đã nhấn lưu

        const selectedLanguage = languageDropdown.value;
        const customLanguage = customLanguageInput.value;
        const customPrompt = customPromptInput.value;
        const customChatGPTLink = customChatGPTLinkInput.value;
        const customGeminiLink = customGeminiLinkInput.value;
        const customClaudeLink = customClaudeLinkInput.value;
        const customPOELink = customPOELinkInput.value;
        const customDeepSeekLink = customDeepSeekLinkInput.value;

        // Lưu ngôn ngữ, nội dung tùy chỉnh và custom link vào chrome.storage
        chrome.storage.local.set({
            selectedLanguage,
            customLanguage,
            customPrompt,
            customChatGPTLink,
            customGeminiLink,
            customClaudeLink,
            customPOELink,
            customDeepSeekLink
        }, () => {
            // Xóa các thông báo cũ trước khi thêm mới
            statusMessage.innerHTML = '';

            // Gộp các thông báo lại với nhau thành một thông báo duy nhất
            const allMessages = [
                updateStatusMessage('selectedLanguageMsg', selectedLanguage),
                updateStatusMessage('customLanguageSaved', customLanguage),
                updateStatusMessage('customPromptSaved', customPrompt),
                updateStatusMessage('linkSaved', 'ChatGPT: ' + customChatGPTLink),
                updateStatusMessage('linkSaved', 'Gemini: ' + customGeminiLink),
                updateStatusMessage('linkSaved', 'Claude: ' + customClaudeLink),
                updateStatusMessage('linkSaved', 'POE: ' + customPOELink),
                updateStatusMessage('linkSaved', 'DeepSeek: ' + customDeepSeekLink)
            ].join('<br>');

            // Hiển thị thông báo gộp
            showToast('settingsSaved');
            updateStatusMessage(allMessages);

            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });

            isSaving = false; // Reset lại trạng thái sau khi lưu xong
        });
    });

    // Hàm để hiển thị thông báo toast
    function showToast(messageKey, params = []) {
        const message = getMessage(messageKey, params);
        // Kiểm tra xem có thông báo nào hiện tại hay không
        const existingToast = document.querySelector(".toast");
        if (existingToast) {
            existingToast.remove(); // Nếu có, loại bỏ thông báo cũ
        }

        // Tạo thông báo mới
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerText = message;
        document.body.appendChild(toast);

        // Loại bỏ toast sau 3 giây
        setTimeout(() => toast.remove(), 3000);
    }

    // Hàm để tự động nhận diện và áp dụng chế độ sáng/tối của hệ thống, chỉ khi người dùng chọn "tự động"
    function checkAndSetTheme() {
        // Kiểm tra xem người dùng có chọn chế độ tự động không
        const themeMode = document.getElementById("themeDropdown").value;

        if (themeMode === "auto") {
            // Nếu chọn chế độ tự động, kiểm tra chế độ sáng/tối của hệ thống
            const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', currentTheme); // Gán data-theme cho body
        }
    }

    // Kiểm tra chế độ hiện tại của hệ thống khi tải trang
    checkAndSetTheme();

    // Theo dõi thay đổi chế độ của hệ thống và chỉ cập nhật khi người dùng chọn "auto"
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkAndSetTheme);

    // Lắng nghe thay đổi giao diện từ dropdown
    document.getElementById("themeDropdown").addEventListener("change", (event) => {
        const selectedTheme = event.target.value;
        localStorage.setItem("theme", selectedTheme);

        // Nếu người dùng chọn chế độ sáng/tối thủ công, áp dụng theme đã chọn
        if (selectedTheme !== "auto") {
            document.body.setAttribute("data-theme", selectedTheme);
        } else {
            // Nếu chọn "auto", tự động áp dụng theo chế độ hệ thống
            checkAndSetTheme();
        }
    });

    // Lấy giá trị theme đã lưu và áp dụng
    const savedTheme = localStorage.getItem("theme") || "auto";
    document.getElementById("themeDropdown").value = savedTheme;

    if (savedTheme !== "auto") {
        document.body.setAttribute("data-theme", savedTheme);
    } else {
        checkAndSetTheme();
    }

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
});
