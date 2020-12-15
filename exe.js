  
  const onMessage = (message) => {
    document.querySelector("video").playbackRate = message;
  }
  
  chrome.runtime.onMessage.addListener(onMessage);