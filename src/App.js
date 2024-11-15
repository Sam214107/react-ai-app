// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import PromptInput from './components/PromptInput';
import DateInput from './components/DateInput';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import './styles/App.scss';
import Navbar from './components/Navbar';
import HeroComponent from './components/HeroComponent';

function App() {
  
  // const [messages, setMessages] = useState(() => {
  //   const savedMessages = localStorage.getItem('chatMessages');
  //   return savedMessages ? JSON.parse(savedMessages) : [];
  // });
  // const [isTyping, setIsTyping] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('chatMessages', JSON.stringify(messages));
  // }, [messages]);

  // const handleSend = async (userInput) => {
  //   const newMessages = [...messages, { sender: 'user', text: userInput, timestamp: new Date() }];
  //   setMessages(newMessages);
  //   setIsTyping(true);

  //   try {
  //     const response = await axios.post(
  //       'https://api.openai.com/v1/chat/completions',
  //       {
  //         model: 'gpt-3.5-turbo',
  //         messages: [{ role: 'user', content: userInput }],
  //       },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     const botResponse = response.data.choices[0].message.content;
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { sender: 'bot', text: botResponse, timestamp: new Date() },
  //     ]);
  //   } catch (error) {
  //     console.error('Error fetching from OpenAI:', error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { sender: 'bot', text: 'Sorry, I encountered an error.', timestamp: new Date() },
  //     ]);
  //   } finally {
  //     setIsTyping(false);
  //   }
  // };

  // const clearChat = () => {
  //   setMessages([]);
  // };

  // return (
  //   <Container maxWidth="sm" className="app-container">
  //     <Typography variant="h4" className="app-title">Generate Report</Typography>
  //     <Box className="chat-box">
  //       <ChatWindow messages={messages} />
  //       {isTyping && <CircularProgress size={24} />}
  //     </Box>
  //     <PromptInput onSend={handleSend} />
  //     <Button variant="outlined" color="error" className="clear-chat-button" onClick={clearChat}>
  //       Clear Chat
  //     </Button>
  //   </Container>
  // );
  return (
    // <div className="App">
    <>
      <Navbar />
      <HeroComponent/>
      <DateInput />
    </>
    // </div>
  );

}

export default App;
