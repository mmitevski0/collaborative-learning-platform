import { useEffect, useState } from 'react';
import './ChatHistory.css';
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../Login';
import { formatDistanceToNow } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: any;
  sender: 'user' | 'bot';
  userId: string;
  chatId?: string;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  currentChatId: string;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string>>;
}

interface ChatGroup {
  id: string;
  date: string;
  title: string;
  messages: ChatMessage[];
  firstMessage: ChatMessage;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  setMessages,
  currentChatId,
  setCurrentChatId
}) => {

  const { user } = useAuth();
  const [chats, setChats] = useState<ChatGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isInitialState, setIsInitialState] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      fetchUserChats(user.id);
    }
  }, [user]);

  useEffect(() => {
    const loadActiveChat = async () => {
      if (currentChatId && currentChatId !== 'new') {
        const q = query(
          collection(db, "messages"),
          where("chatId", "==", currentChatId),
          orderBy("timestamp", "asc")
        );

        const querySnapshot = await getDocs(q);
        const loadedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ChatMessage[];

        setMessages(loadedMessages);
      }
    };

    loadActiveChat();
  }, [currentChatId]);

  const startNewChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setMessages([]);
    setNewMessage('');
    setIsInitialState(true);
  };

  const fetchUserChats = async (userId: string) => {
    try {
      const q = query(
        collection(db, "messages"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];

      const groupedMessages = messages.reduce((acc, message) => {
        const chatKey = message.chatId || 'default';

        if (!acc[chatKey]) {
          const firstMsg = message;
          acc[chatKey] = {
            id: chatKey,
            date: formatDistanceToNow(
              message.timestamp?.toDate?.() ||
              new Date(message.timestamp) || new Date(), { addSuffix: true }),
            messages: [],
            firstMessage: firstMsg,
            title: firstMsg.sender === 'user' ? firstMsg.text : 'AI Chat'
          };
        }
        acc[chatKey].messages.push(message);
        return acc;
      }, {} as Record<string, ChatGroup>);

      setChats(Object.values(groupedMessages));
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const deleteChat = async (chatId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmed) return;

    try {
      const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId)
      );
      const snapshot = await getDocs(q);

      const deletions = snapshot.docs.map(docItem =>
        deleteDoc(doc(db, "messages", docItem.id))
      );
      await Promise.all(deletions);

      setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));

      if (currentChatId === chatId) {
        setCurrentChatId('');
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-history">
      <div className="history-header">
        <h1 className="history-title">Chats</h1>
        <button className="history-new-chat-button" onClick={startNewChat}>New Chat</button>
      </div>

      <input
        className="history-search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="history-column-headers">
        <span className="history-date-header">Date</span>
        <span className="history-title-header">Title</span>
      </div>

      <div className="history-chats-list">
        {filteredChats.map(chat => (
          <div key={chat.id} className="history-chat-item-container">
            <button
              className={`history-chat-item ${currentChatId === chat.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentChatId(chat.id);
                setMessages(chat.messages);

                const newUrl = `${location.pathname}?chatId=${chat.id}`;
                navigate(newUrl, { replace: true });
              }}
            >
              <div
                className="history-chat-dots"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering chat selection
                  deleteChat(chat.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="delete-icon"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>

              <span className="history-chat-date">{chat.date}</span>
              <span className="history-chat-title">
                {chat.firstMessage.text.length > 30
                  ? chat.firstMessage.text.substring(0, 30) + '...'
                  : chat.firstMessage.text}
              </span>
            </button>
            <div className="history-chat-divider"></div>
          </div>
        ))}
        {loading && (
          <div className="message-container bot">
            <div className="message bot">
              <div className="message-text">
                <div className="loading-dots">
                  <div></div><div></div><div></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
