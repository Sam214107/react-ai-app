// PromptInput.js
import React, { useState } from 'react';
import '../styles/PromptInput.scss';

const PromptInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-input">
      <input
        type="text"
        className="input-field"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default PromptInput;
