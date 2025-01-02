// import React, { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const PdfTemplate = ({ data }) => {
//   const [pdfBlob, setPdfBlob] = useState(null);

//   // Function to generate the PDF and set the preview
//   const generatePDFPreview = () => {
//     try {
//       const doc = new jsPDF();
//       let yOffset = 20; // Initial Y offset for the content

//       // Loop through the data (questions)
//       data.forEach((item) => {
//         doc.setFontSize(14);
//         doc.text(` ${item.title}`, 14, yOffset);
//         yOffset += 10;

//         // Parse the data for the table
//         const tableData = JSON.parse(item.data); // Validate `item.data` is a JSON string
//         const columns = Object.keys(tableData[0]).map((key) => ({
//           title: key,
//           dataKey: key,
//         }));

//         doc.autoTable({
//           startY: yOffset,
//           columns,
//           body: tableData,
//           styles: { fontSize: 10 },
//         });

//         yOffset = doc.lastAutoTable.finalY + 10;

//         const pageWidth = doc.internal.pageSize.getWidth() - 28;
//         const summaryText = `Summary: ${item.summary}`.replace(/\s+/g, " ");
//         const summaryLines = doc.splitTextToSize(summaryText, pageWidth);

//         summaryLines.forEach((line) => {
//           doc.text(line, 14, yOffset);
//           yOffset += 10;
//         });

//         if (yOffset > doc.internal.pageSize.getHeight() - 20) {
//           doc.addPage();
//           yOffset = 20;
//         }
//       });

//       // Generate and store the PDF blob
//       const pdfData = doc.output("blob");
//       const blobUrl = URL.createObjectURL(pdfData);
//       setPdfBlob(blobUrl);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   // Trigger PDF generation when data changes
//   useEffect(() => {
//     if (data && data.length > 0) {
//       generatePDFPreview();
//     }

//     return () => {
//       // Cleanup Blob URL to avoid memory leaks
//       if (pdfBlob) {
//         URL.revokeObjectURL(pdfBlob);
//       }
//     };
//   }, [data]); // Dependency array includes `data`

//   const downloadPDF = () => {
//     if (pdfBlob) {
//       const link = document.createElement("a");
//       link.href = pdfBlob;
//       link.download = "Report.pdf";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       {/* PDF Preview */}
//       {pdfBlob ? (
//         <div>
//           <h3>PDF Preview</h3>
//           <iframe
//             src={pdfBlob}
//             width="100%"
//             height="500px"
//             style={{ border: "none", marginBottom: "20px" }}
//             title="PDF Preview"
//           />
//         </div>
//       ) : (
//         <p>No data available for preview.</p>
//       )}

//       {/* Button to download PDF */}
//       <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default PdfTemplate;
import React, { useState, useEffect, useMemo } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import DownloadButton from "./ButtonComponents/DownloadButton";

const PdfTemplate = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");

  // 🚀 Generate PDF and Create Blob URL
  const generatePDFPreview = useMemo(() => {
    return () => {
      try {
        if (!data || data.length === 0) {
          console.warn("No data available for PDF generation.");
          return;
        }

        const doc = new jsPDF();
        let yOffset = 20;

        data.forEach((item) => {
          if (!item || !item.data) {
            console.warn("Skipping invalid data item:", item);
            return;
          }

          doc.setFontSize(14);
          doc.text(` ${item.title || "No Title"}`, 14, yOffset);
          yOffset += 10;

          try {
            const tableData = JSON.parse(item.data);
            if (!Array.isArray(tableData)) {
              console.warn("Invalid table data format, skipping.");
              return;
            }

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
          } catch (parseError) {
            console.warn("Error parsing table data:", parseError);
          }

          const pageWidth = doc.internal.pageSize.getWidth() - 28;
          doc.setFontSize(12);
          const summaryText = `Summary: ${item.summary || "No Summary"}`.replace(/\s+/g, " ");
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

        // 📝 Generate PDF Blob and URL
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl((prevUrl) => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl); // Clean up the old URL
          }
          return pdfUrl;
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
  }, [data]);

  // Trigger PDF generation when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      generatePDFPreview();
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl); // Clean up on unmount
      }
    };
  }, [data, generatePDFPreview]);

  // 🧩 Save Report Handler
  const handleSave = async () => {
    try {
      const UserId = localStorage.getItem("UserId");
      if (!UserId) {
        alert("User is not logged in!");
        return;
      }

      const reportData = {
        UserID: UserId,
        Title: saveTitle,
        Description: saveDescription,
        ReportData: pdfUrl,
      };

      const response = await axios.post("http://127.0.0.1:8000/save_report/", reportData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.isSucess) {
        alert("Data saved successfully!");
        setShowSaveModal(false);
      } else {
        alert(response.data.message || "Failed to save report.");
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("An error occurred while saving the data. Please try again.");
    }
  };

  // 📥 Download PDF Handler
  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Report.pdf";
      link.click();
    }
  };

  return (
    <div>
      {/* PDF Preview */}
      {pdfUrl ? (
        <div>
          <h3>PDF Preview</h3>
          <iframe
            src={pdfUrl}
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
      <DownloadButton onClick={downloadPDF} />

      {/* Save Report Modal */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={() => setShowSaveModal(true)}
          style={{
            height: "45px",
            width: "120px",
            cursor: "pointer",
            backgroundColor: "#14213D",
            border: "none",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          Save Report
        </button>
      </div>

      {showSaveModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div className="card p-4 shadow-lg w-50">
            <h4 className="text-center mb-4">Save Report</h4>
            <div className="form-group mb-3">
              <label htmlFor="saveTitle">Title</label>
              <input
                type="text"
                id="saveTitle"
                className="form-control"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="saveDescription">Description</label>
              <textarea
                id="saveDescription"
                className="form-control"
                rows="3"
                value={saveDescription}
                onChange={(e) => setSaveDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary ms-3" onClick={() => setShowSaveModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfTemplate;
