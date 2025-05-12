import { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import EmojiIcon from "../../assets/icons/smile.svg"
import ImageIcon from '../../assets/icons/image.svg';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello, how can I help you today?',
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage,
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-window">
        <div className="messages-scroll-container" ref={messagesContainerRef}>
          <div className="messages-content">
            <div className="chat-timestamp">
              {messages[0].timestamp}
            </div>

            {messages.map(message => (
              <div key={message.id} className={`message-container ${message.sender}`}>
                <div className={`message ${message.sender}`}>
                  <div className="message-text">
                    {message.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Enter your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="input-buttons">
            <button className="icon-button">
              <img src={EmojiIcon} alt="Emoji" className="icon" />
            </button>
            <button className="icon-button">
              <img src={ImageIcon} alt="Image" className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;