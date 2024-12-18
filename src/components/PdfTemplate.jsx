import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import jsPDF autoTable plugin

const PdfTemplate = ({ data }) => {
  const [pdfBlob, setPdfBlob] = useState(null); // State to store the PDF blob for preview

  // Function to generate the PDF and update the preview
  useEffect(() => {
    if (data && data.length > 0) {
      generatePDFPreview();
    }
  }, [data]);

  // Function to generate the PDF and set the preview
  const generatePDFPreview = () => {
    const doc = new jsPDF();
    let yOffset = 20; // Initial Y offset for the content

    // Loop through the data (questions)
    data.forEach((item) => {
      doc.setFontSize(14);
      doc.text(` ${item.title}`, 14, yOffset);
      yOffset += 10; // Adjust Y offset

      // Parse the data for the table (assumed to be a stringified JSON)
      const tableData = JSON.parse(item.data);

      // Define table columns
      const columns = Object.keys(tableData[0]).map((key) => ({
        title: key,  // Column titles from the object keys
        dataKey: key, // Data key for mapping the data
      }));

      // Generate the table in the PDF
      doc.autoTable({
        startY: yOffset, // Position of the table in the PDF
        columns,
        body: tableData, // Table data from the API
        styles: { fontSize: 10 },
      });

      // Adjust Y offset after the table
      yOffset = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      const pageWidth = doc.internal.pageSize.getWidth() - 28; // Adjust for margins
    
      // Clean and properly encode the summary text
      const summaryText = `Summary: ${item.summary}`.replace(/\s+/g, ' '); // Remove extra spaces
    
      // Split text for proper wrapping
      const summaryLines = doc.splitTextToSize(summaryText, pageWidth);
    
      // Add each line of the summary text
      summaryLines.forEach((line) => {
        doc.text(line, 14, yOffset);
        yOffset += 10;
      });
    
      // Add padding after the summary
      yOffset += 10;

      // Check if content exceeds one page, and add a new page if necessary
      if (yOffset > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yOffset = 20; // Reset Y offset for the new page
      }
    });

    // Save the PDF blob for preview
    const pdfData = doc.output("blob");
    setPdfBlob(URL.createObjectURL(pdfData)); // Store the generated PDF as a URL for preview
  };

  // Function to download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 20; // Initial Y offset for the content

    // Loop through the data (questions)
    data.forEach((item, index) => {
      doc.setFontSize(14);
      doc.text(`Question ${item.question_number}: ${item.question}`, 14, yOffset);
      yOffset += 10; // Adjust Y offset

      // Parse the data for the table (assumed to be a stringified JSON)
      const tableData = JSON.parse(item.data);

      // Define table columns
      const columns = Object.keys(tableData[0]).map((key) => ({
        title: key,  // Column titles from the object keys
        dataKey: key, // Data key for mapping the data
      }));

      // Generate the table in the PDF
      doc.autoTable({
        startY: yOffset, // Position of the table in the PDF
        columns,
        body: tableData, // Table data from the API
        styles: { fontSize: 10 },
      });

      // Adjust Y offset after the table
      yOffset = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(12);
  const pageWidth = doc.internal.pageSize.getWidth() - 28; // Adjust for margins

  // Clean and properly encode the summary text
  const summaryText = `Summary: ${item.summary}`.replace(/\s+/g, ' '); // Remove extra spaces

  // Split text for proper wrapping
  const summaryLines = doc.splitTextToSize(summaryText, pageWidth);

  // Add each line of the summary text
  summaryLines.forEach((line) => {
    doc.text(line, 14, yOffset);
    yOffset += 10;
  });

  // Add padding after the summary
  yOffset += 10;

      // Check if content exceeds one page, and add a new page if necessary
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20; // Reset Y offset for the new page
      }
    });

    // Save the PDF with a filename
    doc.save("Report.pdf");
  };

  return (
    <div>
      {/* PDF Preview */}
      {pdfBlob && (
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
      )}

      {/* Button to download PDF */}
      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </div>
  );
};

export default PdfTemplate;
