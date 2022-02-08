//reset log
chrome.storage.local.set({ fullLog: {} }, function () {});

//set whitelist
const whitelist = [
  "https://dnasubway.cyverse.org",
  "https://sites.google.com",
  "https://de.cyverse.org",
];

//initialize log and put in local storage
var startDate = new Date();
var oldLink;
var user = "CyVerseDefaultUser";
const logNum = Math.floor(Math.random() * 100000000);
const logID = user + "-" + String(logNum);
let fullLog = {
  logID: logID,
  user: user,
  logStart: startDate.toString(),
  logArray: [
    {
      timestamp: startDate.toString(),
      url: "/",
      event: "Plugin Installed",
      eventType: "System",
    },
  ],
};
chrome.storage.local.set({ fullLog: fullLog }, function () {});
let lastSeen = {};

//listen for URL changes without page loading
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "loading" &&
    changeInfo.url !== undefined &&
    whitelisted(changeInfo.url)
  ) {
    chrome.storage.local
      .get("fullLog")
      .then((ret) => {
        fullLog = ret["fullLog"];
        if (fullLog == undefined) {
          return;
        } else {
          fullLog.logArray.push({
            timestamp: new Date().toString(),
            url: changeInfo.url,
            eventType: "URL",
            event: "Loading",
          });
          chrome.storage.local.set({ fullLog: fullLog }, function () {});
        }
      })
      .catch((err) => {
        alert(err + "Error Occured Getting Log From Local Storage!");
      });
  }
});

// Get latest log and send if changed every 10 seconds
var myVar = setInterval(sendLog, 10000);

async function sendLog() {
  chrome.storage.local
    .get("fullLog")
    .then((ret) => {
      var log = ret["fullLog"];
      if (JSON.stringify(lastSeen) === JSON.stringify(log)) {
        return;
      } else {
        lastSeen = log;
        postLog(log);
      }
    })
    .catch((err) => {
      alert(err + "Error Occured Getting Log From Local Storage!");
    });
}

async function postLog(fullLog) {
  const depositURL =
    "https://us-south.functions.appdomain.cloud/api/v1/web/ORG-UNC-dist-seed-james_dev/cyverse/add-cyverse-log";

  const toSendBody = {
    body: {
      log_id: fullLog.logID,
      machine_id: fullLog.user,
      course_id: "Cyverse_Cloud_Tutorial",
      log_type: "ChromePlugin",
      log: fullLog,
    },
  };

  const toPost = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSendBody),
    method: "POST",
  };

  console.log(fullLog);

  fetch(depositURL, toPost)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}

function whitelisted(url) {
  for (i in whitelist) {
    if (url.includes(whitelist[i])) {
      return true;
    }
  }
  return false;
}
