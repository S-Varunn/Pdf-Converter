console.log("Hi content script");
chrome.runtime.onMessage.addListener(executeRequest);

async function executeRequest(request, sender, sendResponse) {
  console.log(request);
  if (request.element === "table") {
    let tableCollection = document.getElementsByTagName("table");
    for (let i = 0; i < tableCollection.length; i++) {
      let el = tableCollection[i];
      var wrapper = document.createElement("div");
      let button = document.createElement("button");
      let buttonId = Math.floor(Math.random() * 10000000000);
      button.setAttribute("id", buttonId);
      button.setAttribute(
        "onclick",
        "sendClosestTableToExtension(" + buttonId + ")"
      );
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      button.innerHTML = "Export";
      let parentDiv = tableCollection[i].parentNode;
      parentDiv.appendChild(button);
    }
    await sendResponse({
      result: "Done",
    });
  }
  sendResponse({ result: "Not yet" });
}
