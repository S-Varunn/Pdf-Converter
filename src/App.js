/*global chrome*/

function App() {
  function totalPdfExport() {
    let params = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs.query(params, currentTabs);
    function currentTabs(tabs) {
      let message = {
        element: "table",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        console.log(response);
      });
    }
  }

  return (
    <div>
      PDF Export! Webpage Export:
      <p>Choose a element to Export</p>
      <button
        onClick={() => {
          totalPdfExport();
        }}
        type="button"
        id="button"
      >
        Export
      </button>
      <div id="test"></div>
    </div>
  );
}

export default App;
