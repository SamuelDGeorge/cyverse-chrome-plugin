let disLog = {};
var clickList = new Array();
var clickedType = "";
var word = "";
var typing = 0;

function disClickOrigin(e) {
  var target = e.target;
  var tag = [];
  tag.tagType = target.tagName.toLowerCase();
  return tag;
}

document.onclick = clickListener;

function clickListener(e) {
  var clickedElement;
  var click;
  clickedType = disClickOrigin(e).tagType;
  if (clickList[clickList.length - 1] == "User Input" && word != "") {
    click = "Typed: " + word;
    clickList.push("Typed: " + word);
    word = "";
  }
  if (typing == 1 && clickList.length > 0) {
    word =
      "Typed: " +
      document.getElementById(clickList[clickList.length - 1]).value;
    clickList[clickList.length - 1] = word;
    typing = 0;
  }
  clickedElement = e.target.innerText;
  if (clickedType === "input") {
    clickedElement = e.target.value;
    if (e.target.type === "text") {
      if (e.target.placeholder === "Enter a value") {
        click =
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.previousSibling.innerText;
        clickList.push(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.previousSibling.innerText
        );
      } else {
        click = e.target.placeholder;
        clickList.push(e.target.placeholder);
        timeStamps.push(Date.now());
        urlList.push(window.location.toString());
      }
      clickedElement = e.target.id;
      typing = 1;
    }
  }
  if (clickedType == "img") {
    clickedElement = e.target.alt;
  }
  if (clickedType == "li") {
    clickedElement = e.target.id;
  }
  if (clickedType == "textarea") {
    if (
      e.target.parentNode != null &&
      e.target.parentNode.parentNode != null &&
      e.target.parentNode.parentNode.parentNode != null
    ) {
      word =
        e.target.parentNode.parentNode.parentNode.previousSibling.innerText;
    }
    clickList.push(word);
    clickedElement = e.target.id;
    typing = 1;
  }
  clickList.push(clickedElement);
  addDiscoveryEntry(clickedElement, click);
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.from === "popup") {
    chrome.runtime.sendMessage();
  }
});

function typeOfElement(e) {
  if (clickedType == "b") {
    clickedElement = "Log Out";
  } else {
    //alert(String(e.target));
    clickedElement = e.target;
  }

  return clickedElement;
}

function addDiscoveryEntry(clickedElement, click) {
  let event = clickedElement;
  console.log(event);
  if (click !== undefined) {
    event = clickedElement + "-" + click;
  }
  chrome.storage.local
    .get("fullLog")
    .then((ret) => {
      disLog = ret["fullLog"];
      if (disLog === undefined) {
        return;
      } else {
        disLog.logArray.push({
          timestamp: new Date().toString(),
          url: document.URL,
          eventType: "Discovery Click",
          event: event,
        });
        chrome.storage.local.set({ fullLog: disLog }, function () {});
      }
    })
    .catch((err) => {
      alert(err + "Error Occured Getting Log From Local Storage!");
    });
}
