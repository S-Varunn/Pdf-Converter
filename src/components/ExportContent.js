import React from "react";
import parse from "html-react-parser";
import JsPDF from "jspdf";
import { useEffect } from "react";
import "./ExportContent.css";

function ExportContent({ html, css, cssMapping }) {
  // const ref = React.createRef();
  const cssArray = JSON.parse(css);
  const cssMappingArray = JSON.parse(cssMapping);
  useEffect(() => {
    helper(document.getElementById("report"), 0);
  }, [html, css, cssMapping]);
  function helper(root, i) {
    if (!root) {
      return;
    }
    let comp = cssArray[cssMappingArray[i]];
    root.style.cssText = comp;
    for (let child of root.children) {
      helper(child, i + 1);
    }
    return;
  }

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("report.pdf");
    });
  };

  return (
    <div className="tableViewer">
      {/* <ReactToPrint
        content={() => ref.current}
        trigger={() => <a href="#">Print this out!</a>}
      /> */}
      <button onClick={generatePDF} type="button">
        Export PDF
      </button>
      <div id="report">
        <table>{parse(html)}</table>
      </div>
    </div>
  );
}

export default ExportContent;
