var initialize = true;

var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    var checkbox = document.getElementById('checkboxOfLoop');
    var checkboxOfQuality = document.getElementById('checkboxOfQuality');
    slider.focus();
    output.innerHTML = slider.value;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj, function (response) {
        if (response.content != "success!") {
            output.innerHTML = response.content;
            slider.value = response.content;
        }
    });

    if (initialize) {
        chrome.storage.sync.get(["checkbox"], function (items) {
            checkbox.checked = items.checkbox;
        });
        chrome.storage.sync.get(["checkboxOfQuality"], (items) => {
            checkboxOfQuality.checked = items.checkboxOfQuality;
        });
        sendMessage({ value: -1 });
        initialize = false;

    }

    slider.oninput = function () {
        output.innerHTML = this.value;
        sendMessage({ value: this.value })
    }

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            chrome.storage.sync.set({ "checkbox": true }, () => {
            });
        } else {
            chrome.storage.sync.set({ "checkbox": false }, () => {
            });
        }
    }, { once: false });

    checkboxOfQuality.addEventListener('change', function () {
        if (checkboxOfQuality.checked) {
            chrome.storage.sync.set({ "checkboxOfQuality": true }, () => {
            });
        } else {
            chrome.storage.sync.set({ "checkboxOfQuality": false }, () => {
            });
        }
    }, { once: false });
}



chrome.tabs.getSelected(null, getSelectedTab);
