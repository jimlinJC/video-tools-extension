const onMessage = (message, sender, sendResponse) => {
  if (message.value == -1) {
    sendResponse({
      content: document.querySelector("video").playbackRate.toString(),
    });
  } else {
    document.querySelector("video").playbackRate = message.value;
    sendResponse({
      content: 'success!',
    });
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector('video').addEventListener('ended', (event) => {
    chrome.storage.sync.get(["checkbox"], function (items) {
      if (items.checkbox) {
        document.querySelector('video').play()
      }
    });
  });
})


chrome.runtime.onMessage.addListener(onMessage);