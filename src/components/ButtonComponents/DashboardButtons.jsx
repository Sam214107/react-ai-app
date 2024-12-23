import React from 'react';
import styled from 'styled-components';

const DashboardButton = ({label,onClick}) => {
  return (
    <StyledWrapper>
      <button className="btn" onClick={onClick}>
        <span className="text">{label}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
   width: 7.0em;
   height: 2.3em;
   background: #14213D;
   color: white;
   border: none;
   border-radius: 0.625em;
   font-size: 15px;
   cursor: pointer;
   position: relative;
   z-index: 1;
   overflow: hidden;
  }

  button:hover {
   color: black;
  }

  button:after {
   content: "";
   background: white;
   position: absolute;
   z-index: -1;
   left: -20%;
   right: -20%;
   top: 0;
   bottom: 0;
   transform: skewX(-45deg) scale(0, 1);
   transition: all 0.5s;
  }

  button:hover:after {
   transform: skewX(-45deg) scale(1, 1);
   -webkit-transition: all 0.5s;
   transition: all 0.5s;
  }`;

export default DashboardButton;
