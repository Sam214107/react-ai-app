
// import React, { useState, useEffect, useMemo } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import axios from "axios";
// import DownloadButton from "./ButtonComponents/DownloadButton";
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);

// const PdfTemplate = ({ data }) => {
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [showSaveModal, setShowSaveModal] = useState(false);
//   const [saveTitle, setSaveTitle] = useState("");
//   const [saveDescription, setSaveDescription] = useState("");
//   const [plotString, setPlotString] = useState("");

//   // 🚀 Generate PDF and Create Blob URL
//   const generatePDFPreview = useMemo(() => {
//     return async () => {
//       try {
//         if (!data || data.length === 0) {
//           console.warn("No data available for PDF generation.");
//           return;
//         }
  
//         const doc = new jsPDF();
//         let yOffset = 20;
  
//         for (const item of data) {
//           if (!item) {
//             console.warn("Skipping invalid data item:", item);
//             continue;
//           }
  
//           doc.setFontSize(14);
//           doc.text(` ${item.title || "No Title"}`, 14, yOffset);
//           yOffset += 10;
  
//           if (item.visualization_required?.toLowerCase() === "yes" && item.vis_object && item.vis_object.length > 0) {
//             console.log("📊 Visualization Required for this item");
//             const vis = item.vis_object[0];
//             const chartType = vis.type || "bar";
//             const chartLabels = vis.labels || [];
//             const chartData = vis.data || [];
  
//             // Create a Chart.js visualization
//             const canvas = document.createElement('canvas');
//             canvas.width = 500;
//             canvas.height = 300;
//             const ctx = canvas.getContext('2d');
  
//             new Chart(ctx, {
//               type: chartType,
//               data: {
//                 labels: chartLabels,
//                 datasets: [{
//                   label: item.title || "Visualization",
//                   data: chartData,
//                   backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                   borderColor: 'rgba(75, 192, 192, 1)',
//                   borderWidth: 1,
//                 }]
//               },
//               options: {
//                 responsive: false,
//                 maintainAspectRatio: false,
//               }
//             });
  
//             // Convert the canvas to base64 image and embed in PDF
//             setTimeout(() => {
//               const chartImage = canvas.toDataURL('image/png');
//               setPlotString(chartImage);
//               console.log(chartImage);
//               console.log(typeof(chartImage));
//               doc.addImage(chartImage, 'PNG', 14, yOffset, 180, 100);
//               yOffset += 110;
//             }, 500);
  
//           } else if (item.data) {
//             try {
//               const tableData = JSON.parse(item.data);
//               if (!Array.isArray(tableData)) {
//                 console.warn("Invalid table data format, skipping.");
//                 continue;
//               }
  
//               const columns = Object.keys(tableData[0]).map((key) => ({
//                 title: key,
//                 dataKey: key,
//               }));
  
//               doc.autoTable({
//                 startY: yOffset,
//                 columns,
//                 body: tableData,
//                 styles: { fontSize: 10 },
//               });
  
//               yOffset = doc.lastAutoTable.finalY + 10;
//             } catch (parseError) {
//               console.warn("Error parsing table data:", parseError);
//             }
//           }
  
//           const pageWidth = doc.internal.pageSize.getWidth() - 28;
//           doc.setFontSize(12);
//           const summaryText = `Summary: ${item.summary || "No Summary"}`.replace(/\s+/g, " ");
//           const summaryLines = doc.splitTextToSize(summaryText, pageWidth);
  
//           summaryLines.forEach((line) => {
//             doc.text(line, 14, yOffset);
//             yOffset += 10;
//           });
  
//           if (yOffset > doc.internal.pageSize.getHeight() - 20) {
//             doc.addPage();
//             yOffset = 20;
//           }
//         }
  
//         // Generate PDF Blob and URL
//         const pdfBlob = doc.output("blob");
//         const pdfUrl = URL.createObjectURL(pdfBlob);
  
//         setPdfUrl((prevUrl) => {
//           if (prevUrl) {
//             URL.revokeObjectURL(prevUrl); // Clean up old URL
//           }
//           return pdfUrl;
//         });
//       } catch (error) {
//         console.error("Error generating PDF:", error);
//       }
//     };
//   }, [data]);

//   // Trigger PDF generation when data changes
//   useEffect(() => {
//     if (data && data.length > 0) {
//       generatePDFPreview();
//     }
//     return () => {
//       if (pdfUrl) {
//         URL.revokeObjectURL(pdfUrl); // Clean up on unmount
//       }
//     };
//   }, [data, generatePDFPreview]);

//   // 🧩 Save Report Handler
//   const handleSave = async () => {
//     try {
//       const UserId = localStorage.getItem("UserId");
//       if (!UserId) {
//         alert("User is not logged in!");
//         return;
//       }

//       const reportData = {
//         UserID: UserId,
//         Title: saveTitle,
//         Description: saveDescription,
//         ReportData: pdfUrl,
//       };

//       const response = await axios.post("http://127.0.0.1:8000/save_report/", reportData, {
//         withCredentials: true,
//       });

//       if (response.status === 200 && response.data.isSucess) {
//         alert("Data saved successfully!");
//         setShowSaveModal(false);
//       } else {
//         alert(response.data.message || "Failed to save report.");
//       }
//     } catch (err) {
//       console.error("Error saving data:", err);
//       alert("An error occurred while saving the data. Please try again.");
//     }
//   };

//   // 📥 Download PDF Handler
//   const downloadPDF = () => {
//     if (pdfUrl) {
//       const link = document.createElement("a");
//       link.href = pdfUrl;
//       link.download = "Report.pdf";
//       link.click();
//     }
//   };

//   return (<>
//     <div className="container">
//       {plotString ? (
//           <img src={plotString} alt="chartImage" />
//       ) : (<></>)}

//     </div>
//     <div>
//       {/* PDF Preview */}
//       {pdfUrl ? (
//         <div>
//           <h3>PDF Preview</h3>
//           <iframe
//             src={pdfUrl}
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
//       <DownloadButton onClick={downloadPDF} />

//       {/* Save Report Modal */}
//       <div className="text-center mt-4">
//         <button
//           className="btn btn-success"
//           onClick={() => setShowSaveModal(true)}
//           style={{
//             height: "45px",
//             width: "120px",
//             cursor: "pointer",
//             backgroundColor: "#14213D",
//             border: "none",
//             borderRadius: "30px",
//             overflow: "hidden",
//           }}
//         >
//           Save Report
//         </button>
//       </div>

//       {showSaveModal && (
//         <div
//           className="modal-backdrop"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1050,
//           }}
//         >
//           <div className="card p-4 shadow-lg w-50">
//             <h4 className="text-center mb-4">Save Report</h4>
//             <div className="form-group mb-3">
//               <label htmlFor="saveTitle">Title</label>
//               <input
//                 type="text"
//                 id="saveTitle"
//                 className="form-control"
//                 value={saveTitle}
//                 onChange={(e) => setSaveTitle(e.target.value)}
//               />
//             </div>
//             <div className="form-group mb-3">
//               <label htmlFor="saveDescription">Description</label>
//               <textarea
//                 id="saveDescription"
//                 className="form-control"
//                 rows="3"
//                 value={saveDescription}
//                 onChange={(e) => setSaveDescription(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="text-center">
//               <button className="btn btn-primary" onClick={handleSave}>
//                 Save
//               </button>
//               <button className="btn btn-secondary ms-3" onClick={() => setShowSaveModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>);
// };

// export default PdfTemplate;

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ChartRenderer from "./ChartRenderer";
import DownloadButton from "./ButtonComponents/DownloadButton"

const PdfTemplate = ({ data }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  const pdfContentRef = useRef(null);

  // Download PDF
  // const downloadPDF = () => {
  //   if (!pdfContentRef.current) return;
  
  //   const a4Width = 210; // A4 page width in mm
  //   const a4Height = 297; // A4 page height in mm
  //   const margin = 10; // Margin in mm
  //   const headerHeight = 20; // Space reserved for the header
  //   const footerHeight = 10; // Space reserved for the footer
  //   const pageContentHeight = a4Height - headerHeight - footerHeight - 2 * margin; // Usable height for content
  //   const pdf = new jsPDF("p", "mm", "a4");
  
  //   const headerText = "Report"; // Customize your header text
  //   const footerText = "Generated By ReportAI, Page "; // Footer text
  
  //   const contentElements = pdfContentRef.current.children; // Get all child elements
  //   let currentHeight = margin + headerHeight; // Start below the header
  //   let currentPage = 1; // Page counter
  
  //   Array.from(contentElements).forEach((element, index) => {
  //     // Render the element into a canvas
  //     html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const imgWidth = a4Width - 2 * margin;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  //       // If the element doesn't fit on the current page, add a new page
  //       if (currentHeight + imgHeight > margin + pageContentHeight) {
  //         addFooter(pdf, footerText, currentPage, a4Width, a4Height, margin); // Add footer to the current page
  //         pdf.addPage(); // Add a new page
  //         currentHeight = margin; // Reset the height for the new page
  //         currentPage++; // Increment the page counter
  //         // addHeader(pdf, headerText, a4Width, margin); // Add header to the new page
  //       }
  
  //       // Add header on the first page only
  //       if (currentPage === 1 && index === 0) {
  //         addHeader(pdf, headerText, a4Width, margin); // Add header
  //         currentHeight = margin + headerHeight;
  //       }
  
  //       // Add the element to the PDF
  //       pdf.addImage(imgData, "PNG", margin, currentHeight, imgWidth, imgHeight);
  
  //       // Update the current height
  //       currentHeight += imgHeight;
  
  //       // Save the PDF after rendering all elements
  //       if (index === contentElements.length - 1) {
  //         addFooter(pdf, footerText, currentPage, a4Width, a4Height, margin); // Add footer to the last page
  //         pdf.save("Report.pdf");
  //       }
  //     });
  //   });
  // };
  
  // Function to add a header to the page
  const addHeader = (pdf, text, pageWidth, margin) => {
    pdf.setFontSize(14); // Set font size
    pdf.setTextColor(40); // Dark gray color
    pdf.text(text, pageWidth / 2, margin + 10, { align: "center" }); // Centered text
  };
  
  // Function to add a footer to every page
  const addFooter = (pdf, text, pageNumber, pageWidth, pageHeight, margin) => {
    pdf.setFontSize(10); // Set font size
    pdf.setTextColor(100); // Light gray color
    const footerY = pageHeight - margin; // Position footer at the bottom
    pdf.text(`${text} ${pageNumber}`, pageWidth / 2, footerY, { align: "center" }); // Centered text
  };
  const downloadPDF = () => {
    if (!pdfContentRef.current) return;
  
    const a4Width = 210; // A4 page width in mm
    const a4Height = 297; // A4 page height in mm
    const margin = 10; // Margin in mm
    const pageContentHeight = a4Height - 2 * margin; // Usable page height
    const pdf = new jsPDF("p", "mm", "a4");
  
    const contentElements = pdfContentRef.current.children; // Get all child elements
    let currentHeight = 0; // Tracks the current height on the page
  
    Array.from(contentElements).forEach((element, index) => {
      // Render the element into a canvas
      html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = a4Width - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // If the element doesn't fit on the current page, add a new page
        if (currentHeight + imgHeight > pageContentHeight) {
          pdf.addPage();
          currentHeight = 0; // Reset the height for the new page
        }
  
        // Add the element to the PDF
        pdf.addImage(imgData, "PNG", margin, margin + currentHeight, imgWidth, imgHeight);
  
        // Update the current height
        currentHeight += imgHeight;
  
        // Save the PDF after rendering all elements
        if (index === contentElements.length - 1) {
          pdf.save("Report.pdf");
        }
      });
    });
  };
  
  // Save Report Handler
  const handleSave = async () => {
    try {
      const UserId = localStorage.getItem("UserId");
      if (!UserId) {
        alert("User is not logged in!");
        return;
      }
  
      // Generate PDF
      const a4Width = 210; // A4 page width in mm
      const a4Height = 297; // A4 page height in mm
      const margin = 10; // Margin in mm
      const headerHeight = 20; // Space reserved for the header
      const footerHeight = 10; // Space reserved for the footer
      const pageContentHeight = a4Height - headerHeight - footerHeight - 2 * margin; // Usable height for content
      const pdf = new jsPDF("p", "mm", "a4");
  
      const headerText = "Report Header"; // Customize your header text
      const footerText = "Generated by ReportAI,Page "; // Footer text
  
      const contentElements = pdfContentRef.current.children; // Get all child elements
      let currentHeight = margin + headerHeight; // Start below the header
      let currentPage = 1; // Page counter
  
      Array.from(contentElements).forEach((element, index) => {
        html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = a4Width - 2 * margin;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          // If the element doesn't fit on the current page, add a new page
          if (currentHeight + imgHeight > margin + pageContentHeight) {
            addFooter(pdf, footerText, currentPage, a4Width, a4Height, margin); // Add footer to the current page
            pdf.addPage(); // Add a new page
            currentHeight = margin; // Reset the height, below the header
            currentPage++; // Increment the page counter
          }
  
          // Add header on the first page only
          if (currentPage === 1 && index === 0) {
            addHeader(pdf, headerText, a4Width, margin); // Add header
          }
  
          // Add the element to the PDF
          pdf.addImage(imgData, "PNG", margin, currentHeight, imgWidth, imgHeight);
  
          // Update the current height
          currentHeight += imgHeight;
  
          // Convert PDF to Base64 and send to backend
          if (index === contentElements.length - 1) {
            addFooter(pdf, footerText, currentPage, a4Width, a4Height, margin); // Add footer to the last page
            const pdfBase64 = `data:application/pdf;base64,${pdf.output("datauristring").split(",")[1]}`; // Convert to Base64
  
            // Prepare report data
            const reportData = {
              UserID: UserId,
              Title: saveTitle,
              Description: saveDescription,
              ReportData: pdfBase64, // Attach PDF as Base64
            };
  
            // Send report data to the backend
            fetch("http://127.0.0.1:8000/api/report/save_report/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(reportData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to save report.");
                }
                return response.json();
              })
              .then((result) => {
                if (result.isSucess) {
                  alert("Data saved successfully!");
                  setShowSaveModal(false);
                } else {
                  alert(result.message || "Failed to save report.");
                }
              })
              .catch((err) => {
                console.error("Error saving data:", err);
                alert("An error occurred while saving the data. Please try again.");
              });
          }
        });
      });
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while saving the report.");
    }
  };
  
  

  return (
    <>
      <div className="container" style={{display: "grid", placeItems :"center"}}>
        <div
          id="pdf-content"
          ref={pdfContentRef}
          style={{ padding: "30px 50px", border:' solid 2px grey' , fontFamily: "Arial", maxWidth: "800px",borderRadius: "10px",  overflow: "auto"}}
        >
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} style={{ marginBottom: "30px" }}>
                <h3>{item.title || "No Title"}</h3>
                {item.visualization_required?.toLowerCase() === "yes" && item.vis_object && item.vis_object.length > 0 ? (
                  <ChartRenderer
                    chartId={`chart-${index}`}
                    type={item.vis_object[0].type || "bar"}
                    labels={item.vis_object[0].labels || []}
                    data={item.vis_object[0].data || []}
                    title={item.title || "Visualization"}
                  />
                ) : item.data ? (
                  <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                        border: "1px solid #ddd",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#f4f4f4",
                            borderBottom: "2px solid #ddd",
                            textAlign: "left",
                          }}
                        >
                          {Object.keys(JSON.parse(item.data)[0]).map((key) => (
                            <th
                              key={key}
                              style={{
                                padding: "10px",
                                fontWeight: "bold",
                                color: "#333",
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(item.data).map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            style={{
                              backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#fff",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            {Object.values(row).map((value, colIndex) => (
                              <td
                                key={colIndex}
                                style={{
                                  padding: "10px",
                                  color: "#555",
                                  textAlign: "left",
                                }}
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                ) : (
                  <p>No data or visualization available.</p>
                )}
                <p><strong>Summary:</strong> {item.summary || "No Summary"}</p>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="text-center mt-4 d-flex">
          {/* <button className="btn btn-secondary" onClick={downloadPDF}>
            Download PDF
          </button> */}
          <DownloadButton onClick={downloadPDF} />
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
              fontSize: "13px",
              fontWeight: "600"
            }}
          >
            Save Report
          </button>
        </div>
      </div>

      {/* Save Report Modal */}
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
              <button
                className="btn btn-secondary ms-3"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfTemplate;
