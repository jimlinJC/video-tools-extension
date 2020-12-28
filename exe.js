
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

chrome.runtime.onMessage.addListener(onMessage);