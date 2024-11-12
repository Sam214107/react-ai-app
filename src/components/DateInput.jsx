import React, { useState } from 'react';
import '../styles/DateInput.scss';
import axios from 'axios';

function DateInput() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log('inside handle submit')
    event.preventDefault();
    try {
      // Replace `YOUR_API_URL` with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:8000/generate_report/', {
        start_date: dateFrom,
        end_date: dateTo,
      });
      setApiResponse(response.data);
      console.log(response); // Inspect response here
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse('Error fetching data.');
    }
  };

  return (
    <div>
      <form className="date-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dateFrom">Date From:</label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTo">Date To:</label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {apiResponse && (
        <div style={{ marginTop: '20px' }}>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DateInput;
