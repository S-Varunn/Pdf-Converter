/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import ExportContent from "../ExportContent";
import "./Table.css";
import { goTo } from "react-chrome-extension-router";

function Table() {
  const [iteration, setIteration] = useState(0);
  const [preIteration, setPreIteration] = useState(0);
  const [tableExist, setTableExist] = useState(false);
  const [numberOfTables, setNumberOfTables] = useState(0);
  let params = {
    active: true,
    currentWindow: true,
  };
  useEffect(() => {
    if (tableExist) {
      chrome.tabs.query(params, currentTabs);
      function currentTabs(tabs) {
        let message = {
          element: "table",
          value: iteration,
          prevValue: preIteration,
          check: false,
          export: false,
        };
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          console.log(response);
        });
      }
    } else {
      chrome.tabs.query(params, currentTabs);
      function currentTabs(tabs) {
        let message = {
          element: "table",
          check: true,
        };
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          setTableExist(response.result);
          if (response.result === true) {
            setNumberOfTables(response.numberOfTables);
          }
          console.log(response);
        });
      }
    }
  }, [iteration, tableExist]);
  function exportTable() {
    chrome.tabs.query(params, currentTabs);
    function currentTabs(tabs) {
      let message = {
        element: "table",
        value: iteration,
        check: false,
        export: true,
      };
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        goTo(ExportContent, {
          message: response.result.html,
        });
      });
    }
  }
  function unWrap() {
    chrome.tabs.query(params, currentTabs);
    function currentTabs(tabs) {
      let message = {
        element: "unWrap",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        console.log(response);
      });
    }
  }
  function increment() {
    setPreIteration(iteration);
    setIteration((prevIteration) =>
      prevIteration + 1 >= numberOfTables ? 0 : prevIteration + 1
    );
    unWrap();
  }
  function decrement() {
    setPreIteration(iteration);
    setIteration((prevIteration) =>
      prevIteration - 1 < 0 ? numberOfTables - 1 : prevIteration - 1
    );
    unWrap();
  }
  return (
    <div className="grid">
      <div className="arrow-up" onClick={decrement} />
      <button className="button" onClick={exportTable}>
        Export
      </button>
      <div className="arrow-down" onClick={increment} />
    </div>
  );
}

export default Table;
