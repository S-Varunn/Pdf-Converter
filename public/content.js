console.log("Hi content script");
chrome.runtime.onMessage.addListener(executeRequest);
async function executeRequest(request, sender, sendResponse) {
  console.log(request);
  if (request.element === "all") {
    // console.log(document.getElementsByTagName("table"));
    await sendResponse({ result: document.body.innerHTML });
  }
  sendResponse({ result: "Not yet" });
}
