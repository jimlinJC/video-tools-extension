var initialize = true;

var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    output.innerHTML = slider.value; // Display the default slider value
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj, function (response) {
        if (response.content != "success!") {
            output.innerHTML = response.content;
            slider.value = response.content;
        }
    });

    if (initialize) {
        sendMessage({ value: -1 });
        initialize = false;
    }
    
    slider.oninput = function () {
        output.innerHTML = this.value;
        sendMessage({ value: this.value })
    }
}

chrome.tabs.getSelected(null, getSelectedTab);
