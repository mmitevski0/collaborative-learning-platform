import { useState } from 'react';
import ChatHistory from '../chat-history/ChatHistory';
import ChatWindow from '../chat-window/ChatWindow';
import { ChatMessage } from '../chat-history/ChatHistory';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>(
    localStorage.getItem('currentChatId') || Date.now().toString()
  );

  return (
    <div className="mainWrapper">
      <ChatHistory
        messages={messages}
        setMessages={setMessages}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
      <ChatWindow
        messages={messages}
        setMessages={setMessages}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
    </div>
  );
};

export default ChatPage;