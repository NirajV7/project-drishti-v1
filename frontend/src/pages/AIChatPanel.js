import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './AIChatPanel.css';

const API_KEY = "AIzaSyBFxnbKs6ALSH-vQ_RBU2XVpvdv_8za7bk";

function AIChatPanel({ context, onClose, setActivePage, setGhostProtocolScenarioId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [showSimulationPrompt, setShowSimulationPrompt] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize the chat session
  useEffect(() => {
    if (!API_KEY) {
        console.error("API key is missing. Please add your API key.");
        setMessages([{ sender: 'ai', text: 'ERROR: API Key not found.' }]);
        return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    const system_instruction = (
      "You are 'The Oracle,' a helpful AI teammate for the 'Project Drishti' security system. " +
      "Your role is to provide clear, concise, and actionable intelligence to event commanders. " +
      "You answer 'what if' questions, summarize complex situations, and recommend strategic actions. " +
      "Maintain a professional, knowledgeable, and calm tone. Your goal is to turn data into wisdom."
    );

    const initialChat = model.startChat({
      history: [
        { role: "user", parts: [{ text: system_instruction }] },
        { role: "model", parts: [{ text: "Understood. I am The Oracle, ready to assist." }] },
        { role: "user", parts: [{ text: `Here is the current situation:\n${context}` }] }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    setChat(initialChat);
    
    // If a specific context (like the summary) is passed, display it immediately.
    // Otherwise, show the default greeting.
    if (context && context !== "General inquiry.") {
        setMessages([{ sender: 'ai', text: context }]);
    } else {
        setMessages([
          {
            sender: 'ai',
            text: "I have analyzed the predictive alert regarding a high-density bottleneck. I have the live data feed. How can I assist you?"
          }
        ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleSend = async (predefinedQuery) => {
    const query = predefinedQuery || input;
    if (query.trim() === '' || isLoading || !chat) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!predefinedQuery) setInput('');
    setIsLoading(true);
    setShowSimulationPrompt(false);

    try {
        const result = await chat.sendMessageStream(query);
        
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        let currentResponse = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            currentResponse += chunkText;
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].text = currentResponse;
                return updatedMessages;
            });
        }

        if (query.toLowerCase().includes("best actions")) {
            setShowSimulationPrompt(true);
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages([...newMessages, { sender: 'ai', text: 'Sorry, I am having trouble connecting to the network.' }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSimulationChoice = (choice) => {
    setShowSimulationPrompt(false);
    if (choice === 'yes' && setActivePage) {
        setGhostProtocolScenarioId(1); // Select "Disperse from Center"
        setActivePage('ghost');
        onClose(); // Close the chat panel
    } else {
        // Optional: Handle 'no' choice by adding a confirmation message
        setMessages(prev => [...prev, { sender: 'ai', text: "Understood. Standing by for further instructions." }]);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-panel" onClick={e => e.stopPropagation()}>
        <div className="ai-chat-header">
          <h3>Drishti AI Oracle</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="ai-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="message ai">
              <div className="loading-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {showSimulationPrompt && (
            <div className="message ai simulation-prompt">
              <p>The optimal solution is to open Gate C. Would you like to run a simulation of this action?</p>
              <div className="simulation-buttons">
                <button onClick={() => handleSimulationChoice('yes')}>Yes, run simulation</button>
                <button onClick={() => handleSimulationChoice('no')}>No</button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-suggestions">
            <button onClick={() => handleSuggestionClick('Summarize the situation.')}>"Summarize the situation."</button>
            <button onClick={() => handleSuggestionClick('What are the best actions?')}>"What are the best actions?"</button>
            <button onClick={() => handleSuggestionClick('What is the worst-case scenario here?')}>"What is the worst-case?"</button>
        </div>

        <div className="ai-chat-input-area">
          <input 
            type="text" 
            placeholder="Ask a 'what if' question..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            disabled={isLoading || !chat}
          />
          <button onClick={() => handleSend()} disabled={isLoading || !chat}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPanel; 