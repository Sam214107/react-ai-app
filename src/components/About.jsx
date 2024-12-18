import React from "react";

const About = () => {
  return (
    <div className="container mt-4">
  <div className="bg-light p-4 rounded shadow-sm">
    <h4 className="text-primary mb-1 text-center">About This Application</h4>
    <hr style={{ width: '50%', margin: '0 auto', border: '1px solid gray' }} />
    <p className="text-muted mt-3">
      Welcome to the <strong>"Report AI"</strong> application! This tool allows you to generate custom reports 
      by selecting a date range. Simply choose the start and end dates, and our system will generate a PDF 
      report for you.
    </p>
    <p className="text-muted">
      Before submitting, make sure that the date range is accurate, as it will determine the data included 
      in the generated report.
    </p>
    <p className="text-muted">
      Once you submit the dates, the system will process the request and provide a PDF preview of the report 
      based on your selected criteria.
    </p>
    <hr />
    <h5 className="text-secondary mb-2">Instructions:</h5>
    <ul className="text-muted ps-3">
      <li>Select the <strong>"Date From"</strong> and <strong>"Date To"</strong> fields.</li>
      <li>Ensure the dates are within a valid range.</li>
      <li>Click <strong>"Submit"</strong> to generate the report.</li>
    </ul>
  </div>
</div>

  );
};

export default About;
