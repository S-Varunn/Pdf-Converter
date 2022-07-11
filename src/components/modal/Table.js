/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";
import ExportContent from "../ExportContent";
import "./Table.css";
import { goTo, goBack } from "react-chrome-extension-router";
import errorImg from "../../assets/error.png";

function Table() {
  const [iteration, setIteration] = useState(0);
  const [preIteration, setPreIteration] = useState(0);
  const [tableExist, setTableExist] = useState(false);
  const [numberOfTables, setNumberOfTables] = useState(0);
  let params = {
    active: true,
    currentWindow: true,
  };
  function executeRequest(payload, handleResponse) {
    chrome.tabs.query(params, currentTabs);
    function currentTabs(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, payload, function (response) {
        handleResponse(response);
      });
    }
  }
  function logIt() {
    console.log("Done processing");
  }
  function handleCheck(response) {
    setTableExist(response.result);
    if (response.result === true) {
      setNumberOfTables(response.numberOfTables);
    }
  }
  function handleExportTable(response) {
    goTo(ExportContent, {
      html: response.result.html,
      css: response.result.css,
      cssMapping: response.result.cssMapping,
    });
  }
  useEffect(() => {
    if (tableExist) {
      executeRequest(
        {
          element: "table",
          value: iteration,
          prevValue: preIteration,
          check: false,
          export: false,
        },
        logIt
      );
    } else {
      executeRequest(
        {
          element: "table",
          check: true,
        },
        handleCheck
      );
    }
  }, [iteration, tableExist, preIteration]);
  function exportTable() {
    executeRequest(
      {
        element: "table",
        value: iteration,
        check: false,
        export: true,
      },
      handleExportTable
    );
  }
  function unWrap() {
    executeRequest(
      {
        element: "unWrap",
      },
      logIt
    );
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
  function removeFocus() {
    executeRequest({ element: "removeFocus", value: iteration }, logIt);
  }
  return (
    <div className="grid">
      <div
        className="close"
        onClick={() => {
          removeFocus();
          goBack();
        }}
      />

      {tableExist ? (
        <div>
          <div className="arrow-up" onClick={decrement} />
          <button className="button" onClick={exportTable}>
            Export
          </button>
          <div className="arrow-down" onClick={increment} />
        </div>
      ) : (
        <div className="error-page">
          <img
            className="error-img"
            alt="error to load tables"
            src={errorImg}
          />
          <div className="error-message">
            Uh oh! We can't seem to find any Tables
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
