import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const PdfCard = ({title, description, onViewReport, onDeleteReport }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="img">
          <div className="delete">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={onDeleteReport}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="text">
          <p className="h3">{title}</p>
          <p className="p">{description}</p>
          <div className="icon-box">
            <button className="view-button" onClick={onViewReport}>
              View Report
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 252px;
    height: 265px;
    background: white;
    border-radius: 30px;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    transition: 0.2s ease-in-out;
  }

  .img {
    width: 100%;
    height: 50%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: linear-gradient(#e66465, #14213D);
    display: flex;
    align-items: top;
    justify-content: right;
  }

  .delete {
    transition: 0.2s ease-in-out;
    border-radius: 10px;
    margin: 20px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
  }

  .icon-box {
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }

  .view-button {
    background-color: #14213D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    font-family: 'Lucida Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
  }

  .view-button:hover {
    background-color: #7a87d7;
  }

  .text .h3 {
    font-family: 'Lucida Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: black;
  }

  .text .p {
    font-family: 'Lucida Sans', sans-serif;
  color: #999999;
  font-size: 13px;
  line-height: 1.2em; /* Adjust line height for better spacing */
  max-height: 2.4em; /* Allows up to 2 lines of text (line-height * 2) */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Ensure text truncation happens in one line */
  }
`;

export default PdfCard;
