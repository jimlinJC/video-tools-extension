  
  const onMessage = (message) => {
    document.querySelector("video").playbackRate = message.value;
  }
  
  chrome.runtime.onMessage.addListener(onMessage);