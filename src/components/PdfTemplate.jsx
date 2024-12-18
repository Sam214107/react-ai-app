import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PdfTemplate = ({ data }) => {
  const [pdfBlob, setPdfBlob] = useState(null);

  // Function to generate the PDF and set the preview
  const generatePDFPreview = () => {
    try {
      const doc = new jsPDF();
      let yOffset = 20; // Initial Y offset for the content

      // Loop through the data (questions)
      data.forEach((item) => {
        doc.setFontSize(14);
        doc.text(` ${item.title}`, 14, yOffset);
        yOffset += 10;

        // Parse the data for the table
        const tableData = JSON.parse(item.data); // Validate `item.data` is a JSON string
        const columns = Object.keys(tableData[0]).map((key) => ({
          title: key,
          dataKey: key,
        }));

        doc.autoTable({
          startY: yOffset,
          columns,
          body: tableData,
          styles: { fontSize: 10 },
        });

        yOffset = doc.lastAutoTable.finalY + 10;

        const pageWidth = doc.internal.pageSize.getWidth() - 28;
        const summaryText = `Summary: ${item.summary}`.replace(/\s+/g, " ");
        const summaryLines = doc.splitTextToSize(summaryText, pageWidth);

        summaryLines.forEach((line) => {
          doc.text(line, 14, yOffset);
          yOffset += 10;
        });

        if (yOffset > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yOffset = 20;
        }
      });

      // Generate and store the PDF blob
      const pdfData = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfData);
      setPdfBlob(blobUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Trigger PDF generation when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      generatePDFPreview();
    }

    return () => {
      // Cleanup Blob URL to avoid memory leaks
      if (pdfBlob) {
        URL.revokeObjectURL(pdfBlob);
      }
    };
  }, [data]); // Dependency array includes `data`

  const downloadPDF = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = pdfBlob;
      link.download = "Report.pdf";
      link.click();
    }
  };

  return (
    <div>
      {/* PDF Preview */}
      {pdfBlob ? (
        <div>
          <h3>PDF Preview</h3>
          <iframe
            src={pdfBlob}
            width="100%"
            height="500px"
            style={{ border: "none", marginBottom: "20px" }}
            title="PDF Preview"
          />
        </div>
      ) : (
        <p>No data available for preview.</p>
      )}

      {/* Button to download PDF */}
      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </div>
  );
};

export default PdfTemplate;
