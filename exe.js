const onMessage = (message, sender, sendResponse) => {
  if (message.value == -1) {
    sendResponse({
      content: getWhich("video").playbackRate.toString(),
    });
  } else {
    getWhich("video").playbackRate = message.value;
    sendResponse({
      content: 'success!',
    });
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  getWhich('video').addEventListener('ended', (event) => {
    chrome.storage.sync.get(["checkbox"], function (items) {
      if (items.checkbox) {
        getWhich('video').play();
      }
    });
  });
  chrome.storage.sync.get(["checkboxOfQuality"], function (items) {
    changeQuality(items.checkboxOfQuality);
  });

})

function getWhich(component, { isQuerySelectorAll = false } = {}) {
  if (isQuerySelectorAll) {
    return [...document.querySelectorAll(component)];
  }
  return [...document.querySelectorAll(component)].find((e) => {
    return e?.offsetHeight > 0 && e?.offsetWidth > 0;
  });
}

function findLastChildQ() {
  if (!getWhich(".ytp-menuitem:last-child")) return false;
  if (!getWhich(".ytp-menuitem:last-child").querySelector(".ytp-menuitem-content")?.textContent?.match(/\d+/)) return false;
  return getWhich(".ytp-menuitem:last-child").querySelector(".ytp-menuitem-content")?.textContent?.match(/\d+/)[0].length >= 3;
}

function isQuality(e) {
  return Boolean(e.textContent.match(/\d/)) && !(e.children.length > 1);
}

async function changeQuality(highQuality) {
  if (highQuality) {
    if (!getWhich(".ytp-settings-button")?.ariaExpanded) {
      getWhich(".ytp-settings-button")?.click();
    }
    if (!findLastChildQ()) {
      getWhich(".ytp-settings-button")?.click();
      getWhich("video").addEventListener("canplay", changeQuality, { once: true });
      return;
    }
    await getWhich(".ytp-menuitem:last-child").click();
    await getWhich(".ytp-menuitem", { isQuerySelectorAll: true }).filter(isQuality)[0].click();
    if (document.activeElement === getWhich(".ytp-settings-button")) {
      getWhich(".ytp-settings-button").blur();
    }
    getWhich("video").focus();
  }

}


chrome.runtime.onMessage.addListener(onMessage);
chrome.storage.onChanged.addListener(function ({ checkbox, checkboxOfQuality }) {
  if (checkboxOfQuality) {
    changeQuality(checkboxOfQuality.newValue);
    return;
  }
})