/*global chrome*/
import "./App.css";
import { goTo } from "react-chrome-extension-router";
import Table from "./components/modal/Table";
function App() {
  let params = {
    active: true,
    currentWindow: true,
  };
  function webpageExport() {
    chrome.tabs.query(params, currentTabs);
    function currentTabs(tabs) {
      let message = {
        element: "webpage",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        console.log(response);
      });
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="zi-1 m-auto fs-30 font-bebas">Export Pdf</h1>
        <p className="zi-1 fs-20 font-z">Choose an element to Export</p>
      </div>
      <div className="body">
        <div className="options">
          <h3 className="zi-1 m15 fs-20 font-oswald">Webpage Export</h3>
          <button
            className="zi-1 button"
            onClick={() => {
              webpageExport();
            }}
            type="button"
            id="button"
          >
            Export
          </button>
        </div>

        <div className="options">
          <h3 className="zi-1 m15 fs-20 font-oswald">Table Export</h3>
          <button
            className="zi-1 button"
            onClick={() => {
              goTo(Table);
            }}
            type="button"
            id="button"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
