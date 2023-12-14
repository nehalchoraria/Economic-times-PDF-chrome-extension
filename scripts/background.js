chrome.action.onClicked.addListener((tab) => {
    console.log('clicked')
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: ["scripts/jspdf.min.js", "scripts/content.js"],
    });
});

