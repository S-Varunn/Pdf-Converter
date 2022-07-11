console.log("Hi content script");
chrome.runtime.onMessage.addListener(executeRequest);
let cssArray = [];

async function executeRequest(request, sender, sendResponse) {
  console.log(request);
  if (request.element === "table") {
    let tableCollection = document.getElementsByTagName("table");
    if (request.check === true) {
      if (tableCollection.length === 0) await sendResponse({ result: false });
      else
        await sendResponse({
          result: true,
          numberOfTables: tableCollection.length,
        });
    } else {
      if (request.export === true) {
        cssArray = [];
        removeFocus(tableCollection[request.value]);
        let container = document.getElementsByClassName(
          "custom-wrap-container"
        );
        let ans = helper(container[0], []);
        await sendResponse({
          result: {
            html: tableCollection[request.value].innerHTML,
            css: JSON.stringify(cssArray),
            cssMapping: JSON.stringify(ans),
          },
        });
        unWrap();
      } else {
        removeFocus(tableCollection[request.prevValue]);
        wrap(tableCollection[request.value]);
        focusView(tableCollection[request.value]);
        await sendResponse({
          result: "Done",
        });
      }
    }
  } else if (request.element === "unWrap") {
    unWrap();
  } else if (request.element === "removeFocus") {
    let tableCollection = document.getElementsByTagName("table");
    removeFocus(tableCollection[request.value]);
  }
}

function removeFocus(currentTable) {
  currentTable.style.boxShadow = "";
  currentTable.style.zIndex = "";
}
function focusView(currentTable) {
  currentTable.style.boxShadow = "500px 10px 0px 100vw #7c70707d";
  currentTable.style.zIndex = "9999";
  currentTable.scrollIntoView({ behaviour: "smooth", block: "center" });
}

function wrap(currentTable) {
  let wrapper = document.createElement("div");
  wrapper.className = "custom-wrap-container";
  wrapper.style.zIndex = "9999";
  currentTable.parentNode.insertBefore(wrapper, currentTable);
  wrapper.appendChild(currentTable);
}

function unWrap() {
  let el = document.querySelector(".custom-wrap-container");
  if (el) {
    let parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }
}

const styleToString = (test) => {
  return Object.keys(test).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      test[key] +
      ";",
    ""
  );
};
function helper(root, ans) {
  if (!root) {
    return ans;
  }
  const comp = window.getComputedStyle(root);
  const compCss = Object.keys(comp)
    .filter((key) => !Number(key))
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: comp[key],
      });
    }, {});
  let flag = false;
  for (let i = 0; i < cssArray.length; i++) {
    if (cssArray[i] === styleToString(compCss)) {
      ans.push(i);
      flag = true;
      break;
    }
  }
  if (flag === false) {
    cssArray.push(styleToString(compCss));
    ans.push(cssArray.length - 1);
  }
  for (let child of root.children) {
    helper(child, ans);
  }
  return ans;
}
