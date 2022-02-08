let pageLog = {};

//on page load, update page visited
chrome.storage.local
  .get("fullLog")
  .then((ret) => {
    pageLog = ret["fullLog"];
    console.log(pageLog);
    if (pageLog == undefined) {
      return;
    } else {
      pageLog.logArray.push({
        timestamp: new Date().toString(),
        url: document.URL,
        eventType: "URL",
        event: "Page Visited",
      });
      console.log(pageLog);
      chrome.storage.local.set({ fullLog: pageLog }, function () {});
    }
  })
  .catch((err) => {
    alert(err + "Error Occured Getting Log From Local Storage!");
  });
