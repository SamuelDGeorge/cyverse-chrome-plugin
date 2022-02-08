document.addEventListener("DOMContentLoaded", pageSetup);

let fullLog = {};

function pageSetup() {
  chrome.storage.local
    .get("fullLog")
    .then((ret) => {
      fullLog = ret["fullLog"];
      restorePage(fullLog);
    })
    .catch((err) => {
      alert("Error Occured Getting From Local Storage!");
    });
}

function restorePage(fullLog) {
  document.getElementById("input-field").value = fullLog.user;
  document.getElementById("input-field").readOnly = true;
  document.getElementById("change-button").disabled = false;
  document.getElementById("submit-button").disabled = true;
  addButtonListeners();
}

function addButtonListeners() {
  var button = document.getElementById("submit-button");
  button.addEventListener("click", function () {
    var username = document.getElementById("input-field").value;
    if (username == "") {
      alert("Please Enter a Valid ID!");
      return;
    }
    chrome.storage.local
      .get("fullLog")
      .then((ret) => {
        fullLog = ret["fullLog"];
        const logNum = Math.floor(Math.random() * 100000000);
        const logID = username + "-" + String(logNum);
        fullLog.user = username;
        fullLog.logID = logID;
        chrome.storage.local.set({ fullLog: fullLog }, function () {});
      })
      .catch((err) => {
        alert("Error Occured Getting From Local Storage!");
      });

    document.getElementById("submit-button").disabled = true;
    document.getElementById("change-button").disabled = false;
    document.getElementById("input-field").readOnly = true;
  });

  var buttonC = document.getElementById("change-button");
  buttonC.addEventListener("click", function () {
    document.getElementById("input-field").readOnly = false;
    document.getElementById("submit-button").disabled = false;
    document.getElementById("change-button").disabled = true;
  });
}
