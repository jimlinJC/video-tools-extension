var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    output.innerHTML = slider.value; // Display the default slider value
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
        sendMessage({ value: this.value })
    }
}

chrome.tabs.getSelected(null, getSelectedTab);
