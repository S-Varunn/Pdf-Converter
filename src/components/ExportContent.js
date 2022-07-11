import React from "react";
import parse from "html-react-parser";
import JsPDF from "jspdf";
import { useEffect } from "react";
import "./ExportContent.css";

function ExportContent({ html, css, cssMapping }) {
  // const ref = React.createRef();
  const cssArray = JSON.parse(css);
  const cssMappingArray = JSON.parse(cssMapping);
  let i = 0;
  useEffect(() => {
    i = 0;
    helper(document.getElementById("report"));
    document.body.style.width = "1000px";
  }, [html, css, cssMapping]);
  function helper(root) {
    if (!root) {
      return;
    }
    let comp = cssArray[cssMappingArray[i]];
    root.style.cssText = comp;
    for (let child of root.children) {
      i++;
      helper(child);
    }
    return;
  }

  const generatePDF = () => {
    const report = new JsPDF("l", "pt", "a4");

    report
      .html(document.querySelector("#report"), {
        // Adjust your margins here (left, top, right ,bottom)
        margin: [40, 60, 40, 60],
      })
      .then(() => {
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
