import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatHistory from '../chat-history/ChatHistory';
import ChatWindow from '../chat-window/ChatWindow';
import { ChatMessage } from '../chat-history/ChatHistory';
import './ChatPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ChatPage: React.FC = () => {
  const query = useQuery();
  const queryChatId = query.get('chatId'); 

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>(
    queryChatId || Date.now().toString() 
  );

  useEffect(() => {
    if (queryChatId && queryChatId !== currentChatId) {
      setCurrentChatId(queryChatId);
    }
  }, [queryChatId]);

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
