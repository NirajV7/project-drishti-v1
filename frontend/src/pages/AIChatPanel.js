import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './AIChatPanel.css';

// --- CONFIGURATION ---
// IMPORTANT: This is for demonstration purposes only.
// In a production app, you should not expose your API key like this.
const API_KEY = "AIzaSyBFxnbKs6ALSH-vQ_RBU2XVpvdv_8za7bk"; 

function AIChatPanel({ context, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);

  // Initialize the chat session
  useEffect(() => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
        console.error("API key is missing. Please add your API key to AIChatPanel.js");
        setMessages([{ sender: 'ai', text: 'ERROR: API Key not found. Please configure it in the source code.' }]);
        return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    // The "System Instruction" for the AI.
    const system_instruction = (
      "You are 'The Oracle,' a helpful AI teammate for the 'Project Drishti' security system. " +
      "Your role is to provide clear, concise, and actionable intelligence to event commanders. " +
      "You answer 'what if' questions, summarize complex situations, and recommend strategic actions. " +
      "Maintain a professional, knowledgeable, and calm tone. Your goal is to turn data into wisdom."
    );

    const initialChat = model.startChat({
      history: [
        { role: "user", parts: [{ text: system_instruction }] },
        { role: "model", parts: [{ text: "Understood. I am The Oracle, ready to assist." }] }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    setChat(initialChat);
    
    // Set the initial message from the AI based on the context
    setMessages([
      {
        sender: 'ai',
        text: `${context}`
      }
    ]);
  }, [context]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading || !chat) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
        const result = await chat.sendMessageStream(input);
        
        let text = '';
        // Start with an empty AI message to stream into
        setMessages(prev => [...prev, { sender: 'ai', text: '...' }]);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
            // Update the last message in the array with the new text
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].text = text;
                return updatedMessages;
            });
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages([...newMessages, { sender: 'ai', text: 'Sorry, I am having trouble connecting to the network.' }]);
    } finally {
        setIsLoading(false);
    }
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
          <button onClick={handleSend} disabled={isLoading || !chat}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPanel; 