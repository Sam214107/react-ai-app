// ChatWindow.js
import React from 'react';
import '../styles/ChatWindow.scss';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message message--${msg.sender}`}>
          <div className="timestamp">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
          <div>{msg.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
