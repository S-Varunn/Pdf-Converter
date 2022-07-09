console.log("Hi content script");
// window.alert("Hi");
chrome.runtime.onMessage.addListener(executeRequest);

async function executeRequest(request, sender, sendResponse) {
  console.log(request);
  if (request.element === "table") {
    let tableCollection = document.getElementsByTagName("table");
    if (request.check === true) {
      if (tableCollection.length == 0) await sendResponse({ result: false });
      else
        await sendResponse({
          result: true,
          numberOfTables: tableCollection.length,
        });
    } else {
      if (request.export === true) {
        tableCollection[request.value].style.boxShadow = "";
        tableCollection[request.value].style.zIndex = "";
        await sendResponse({
          result: { html: tableCollection[request.value].innerHTML, css: "" },
        });
      } else {
        tableCollection[request.prevValue].style.boxShadow = "";
        tableCollection[request.prevValue].style.zIndex = "";
        let el = tableCollection[request.value];
        let wrapper = document.createElement("div");
        wrapper.className = "custom-wrap-container";
        wrapper.style.zIndex = "9999";
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        el.style.boxShadow = "500px 10px 0px 100vw #7c70707d";
        el.style.zIndex = "9999";
        el.scrollIntoView({ behaviour: "smooth", block: "center" });
        await sendResponse({
          result: "Done",
        });
      }
    }
  } else if (request.element === "getCss") {
    let urls = document.getElementsByTagName("link");
    let hrefs = [];
    let rels = [];
    let type = [];

    for (let index = 0; index < urls.length; index++) {
      hrefs.push(urls[index].href);
      rels.push(urls[index].rel);
      type.push(urls[index].type);
    }
    await sendResponse({
      hrefs,
      rels,
      type,
    });
  } else if (request.element === "unWrap") {
    let el = document.querySelector(".custom-wrap-container");
    let parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }
}

// col[1].scrollIntoView({behaviour:"smooth",block:"center"})
//    box-shadow: 500px 10px 0px 100vw #7c70707d;
//    z-index: 1;
//wrap in div
// var wrapper = document.createElement("div");
// el.parentNode.insertBefore(wrapper, el);
// wrapper.appendChild(el);
