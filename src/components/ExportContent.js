import React from "react";
import ReactToPrint from "react-to-print";
import parse from "html-react-parser";
import JsPDF from "jspdf";
import "./ExportContent.css";

function ExportContent({ message }) {
  // const ref = React.createRef();

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
        <table>{parse(message)}</table>
      </div>
    </div>
  );
}

export default ExportContent;
