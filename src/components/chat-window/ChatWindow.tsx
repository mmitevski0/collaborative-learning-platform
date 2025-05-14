import React, { useEffect, useState, useRef } from 'react';
import './ChatWindow.css';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../Login';

interface ChatMessage {
  id: string;
  text: string;
  timestamp: any;
  sender: 'user' | 'bot';
  userId: string;
  chatId?: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  currentChatId: string;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  setMessages,
  currentChatId,
  setCurrentChatId
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const { user } = useAuth();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const isInitialState = messages.length === 0;

  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const container = textarea.closest('.chat-input-bar');

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;

    if (container) {
      const baseHeight = 60;
      const extraPadding = 28;
      (container as HTMLElement).style.minHeight = `${baseHeight + (newHeight - 24)}px`;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    const newChatId = Date.now().toString();
    localStorage.setItem('currentChatId', newChatId);
    setCurrentChatId(newChatId);

    setMessages([]);
    setNewMessage('');
    setLoading(false);
  };

  const sendMessageToGemini = async (text: string) => {
    try {
      const firstUserIndex = messages.findIndex(msg => msg.sender === "user");

      let history;
      if (firstUserIndex === -1) {

        history = [{ role: "user", parts: [{ text }] }];
      } else {

        history = messages
          .slice(firstUserIndex)
          .map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          }));

        const last = history[history.length - 1];
        if (last.role !== "user" || last.parts[0].text !== text) {
          history.push({ role: "user", parts: [{ text }] });
        }
      }

      const chat = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
        history,
      });

      const response = await chat.sendMessage(text);
      return await response.response.text();
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't process your request.";
    }
  };

  const saveMessage = async (userId: string, sender: string, text: string) => {
    try {
      await addDoc(collection(db, "messages"), {
        userId: user?.id,
        chatId: currentChatId, 
        sender,
        text,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user?.id) {
      toast.error("Please sign in first");
      return;
    }

    const messageToSend = newMessage.trim();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageToSend,
      timestamp: new Date().toLocaleString(),
      userId: user.id,
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");
    setLoading(true);

    try {
      await saveMessage(user.id, "user", messageToSend);

      const aiReply = await sendMessageToGemini(messageToSend);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiReply,
        timestamp: new Date().toLocaleString(),
        userId: user.id,
      };

      setMessages(prev => [...prev, botMsg]);

      await saveMessage(user.id, "bot", aiReply);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-window">
        {isInitialState ? (
          <div className="initial-screen">
            <h1>What can I help with?</h1>
            <div className="chat-input-container">
              <div className="chat-input-bar">
                <textarea
                  className="chat-input"
                  placeholder="Ask anything"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    autoResizeTextarea(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                />
                <div className='chat-input-buttons'>
                  <div className="chat-actions">
                    <button className="chat-action"><span role="img">🌐</span> Search</button>
                    <button className="chat-action"><span role="img">📍</span> Reason</button>
                    <button className="chat-action"><span role="img">🧠</span> Deep research</button>
                    <button className="chat-action"><span role="img">🎨</span> Create image</button>
                    <button className="chat-action">•••</button>
                  </div>
                  <div className="chat-voice-buttons">
                    <button className="chat-icon-button voice-wave">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.66699 14.4165V3.5835C5.66699 2.89314 6.22664 2.3335 6.91699 2.3335C7.6072 2.33367 8.16699 2.89325 8.16699 3.5835V14.4165C8.16699 15.1068 7.6072 15.6663 6.91699 15.6665C6.22664 15.6665 5.66699 15.1069 5.66699 14.4165ZM9.83301 11.9165V6.0835C9.83301 5.39325 10.3928 4.83367 11.083 4.8335C11.7734 4.8335 12.333 5.39314 12.333 6.0835V11.9165C12.333 12.6069 11.7734 13.1665 11.083 13.1665C10.3928 13.1663 9.83301 12.6068 9.83301 11.9165ZM1.5 10.2505V7.75049C1.5 7.06013 2.05964 6.50049 2.75 6.50049C3.44036 6.50049 4 7.06013 4 7.75049V10.2505C3.99982 10.9407 3.44025 11.5005 2.75 11.5005C2.05975 11.5005 1.50018 10.9407 1.5 10.2505ZM14 10.2505V7.75049C14 7.06013 14.5596 6.50049 15.25 6.50049C15.9404 6.50049 16.5 7.06013 16.5 7.75049V10.2505C16.4998 10.9407 15.9402 11.5005 15.25 11.5005C14.5598 11.5005 14.0002 10.9407 14 10.2505Z" fill="currentColor"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="messages-scroll-container" ref={messagesContainerRef}>
              <div className="messages-content">
                {messages.map(message => (
                  <div key={message.id} className={`message-container ${message.sender}`}>
                    <div className={`message ${message.sender}`}>
                      <div className="message-text">
                        {message.text.split('\n').filter(line => line.trim()).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message-container bot">
                    <div className="message bot">
                      <div className="message-loading">
                        <div className="spinner" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="chat-input-container">
              <div className="chat-input-bar">
                <textarea
                  className="chat-input"
                  placeholder="Ask anything"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    autoResizeTextarea(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                />
                <div className='chat-input-buttons'>
                  <div className="chat-actions">
                    <button className="chat-action"><span role="img">🌐</span> Search</button>
                    <button className="chat-action"><span role="img">📍</span> Reason</button>
                    <button className="chat-action"><span role="img">🧠</span> Deep research</button>
                    <button className="chat-action"><span role="img">🎨</span> Create image</button>
                    <button className="chat-action">•••</button>
                  </div>
                  <div className="chat-voice-buttons">
                    <button
                      className="chat-icon-button voice-wave"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      {newMessage.trim() ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.99992 14.9993V5.41334L4.70696 8.70631C4.31643 9.09683 3.68342 9.09683 3.29289 8.70631C2.90237 8.31578 2.90237 7.68277 3.29289 7.29225L8.29289 2.29225L8.36906 2.22389C8.76184 1.90354 9.34084 1.92613 9.70696 2.29225L14.707 7.29225L14.7753 7.36842C15.0957 7.76119 15.0731 8.34019 14.707 8.70631C14.3408 9.07242 13.7618 9.09502 13.3691 8.77467L13.2929 8.70631L9.99992 5.41334V14.9993C9.99992 15.5516 9.55221 15.9993 8.99992 15.9993C8.44764 15.9993 7.99993 15.5516 7.99992 14.9993Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.66699 14.4165V3.5835C5.66699 2.89314 6.22664 2.3335 6.91699 2.3335C7.6072 2.33367 8.16699 2.89325 8.16699 3.5835V14.4165C8.16699 15.1068 7.6072 15.6663 6.91699 15.6665C6.22664 15.6665 5.66699 15.1069 5.66699 14.4165ZM9.83301 11.9165V6.0835C9.83301 5.39325 10.3928 4.83367 11.083 4.8335C11.7734 4.8335 12.333 5.39314 12.333 6.0835V11.9165C12.333 12.6069 11.7734 13.1665 11.083 13.1665C10.3928 13.1663 9.83301 12.6068 9.83301 11.9165ZM1.5 10.2505V7.75049C1.5 7.06013 2.05964 6.50049 2.75 6.50049C3.44036 6.50049 4 7.06013 4 7.75049V10.2505C3.99982 10.9407 3.44025 11.5005 2.75 11.5005C2.05975 11.5005 1.50018 10.9407 1.5 10.2505ZM14 10.2505V7.75049C14 7.06013 14.5596 6.50049 15.25 6.50049C15.9404 6.50049 16.5 7.06013 16.5 7.75049V10.2505C16.4998 10.9407 15.9402 11.5005 15.25 11.5005C14.5598 11.5005 14.0002 10.9407 14 10.2505Z" fill="currentColor" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;