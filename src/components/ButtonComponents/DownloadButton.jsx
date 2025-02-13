import React from 'react';
import styled from 'styled-components';

const DownloadButton = ({onClick}) => {
  return (
    <StyledWrapper>
      <button className="download-btn pixel-corners" onClick={onClick}>
        <div className="button-content">
          <div className="svg-container">
            <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479 6.908l-4-4h3v-4h2v4h3l-4 4z" />
            </svg>
          </div>
          <div className="text-container">
            <div className="text">Download</div>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .download-btn {
    height: 45px;
    width: 95px;
    cursor: pointer;
    background: white;
    border: none;
    background: #14213D;
    border-radius: 30px;
    overflow: hidden;
    margin-right: 5px;
  }

  .button-content {
    transform: translateY(-45px);
    transition: all 250ms ease-in-out;
  }

  .svg-container,
  .text-container {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-container .text {
    font-size: 13px;
    color: #fff;
    font-weight: 600;
    opacity: 1;
    transition: opacity ease-in-out 250ms;
  }

  .download-icon {
    height: 25px;
    width: 25px;
    fill: #fff;
    opacity: 0;
    transition: opacity ease-in-out 250ms;
  }

  /* hover state for the button */
  .download-btn:hover .button-content {
    transform: translateY(0px);
  }

  .download-btn:hover .text {
    opacity: 0;
  }

  .download-btn:hover .download-icon {
    opacity: 1;
  }

  .download-btn:focus .download-icon {
    -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
    animation: heartbeat 1.5s ease-in-out infinite both;
  }

  @-webkit-keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  /* hover state for the button */`;

export default DownloadButton;
