var initialize = true;

var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    var checkbox = document.querySelector('input[type="checkbox"]');
    output.innerHTML = slider.value; // Display the default slider value
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
        sendMessage({ value: -1, isCheck: checkbox.checked});
        initialize = false;
        
    }

    slider.oninput = function () {
        output.innerHTML = this.value;
        sendMessage({ value: this.value })
    }

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            chrome.storage.sync.set({ "checkbox": true }, function () {
            });
        } else {
            chrome.storage.sync.set({ "checkbox": false }, function () {
            });
        }
    });
}



chrome.tabs.getSelected(null, getSelectedTab);
