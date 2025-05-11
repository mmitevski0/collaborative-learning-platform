import { useState } from 'react';
import './ChatHistory.css';

interface ChatItem {
  id: string;
  date: string;
  title: string;
  preview: string;
}

const ChatHistory: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[]>([
    { id: '1', date: '13 Apr', title: 'Software Frameworks', preview: '' },
    { id: '2', date: '13 Apr', title: 'Butterfly Animation CSS', preview: '' },
    { id: '3', date: '11 Apr', title: 'Responsive behavior doesn\'t work on mobile devices', preview: '' },
    { id: '4', date: '2 Apr', title: 'Confirmation states not rendering properly in dark mode', preview: '' },
    { id: '5', date: '11 Mar', title: 'Text wrapping is awkward on older browsers', preview: '' },
    { id: '6', date: '8 Mar', title: 'Revise copy on About page', preview: '' },
    { id: '7', date: '1 Mar', title: 'TypeScript vs Javascript', preview: '' },
    { id: '8', date: '1 Mar', title: 'JavaScript', preview: '' },
    { id: '9', date: '8 Feb', title: 'Accessibility focused state for input fields', preview: '' },
    { id: '10', date: '7 Jan', title: 'Header IA revision to support additional navigation items', preview: '' },
    { id: '11', date: '2024', title: 'GIFs flicker when looping back making the animation look choppy', preview: '' },
  ]);

  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-history">
      <div className="history-header">
        <h1 className="history-title">Chats</h1>
        <button className="new-chat-button">New Chat</button>
      </div>
      
      <input
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="column-headers">
        <span className="date-header">Date</span>
        <span className="title-header">Title</span>
      </div>
      
      <div className="chats-list">
        {filteredChats.map(chat => (
          <div key={chat.id} className="chat-item-container">
            <button
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="chat-dots">···</div>
              <span className="chat-date">{chat.date}</span>
              <span className="chat-title">{chat.title}</span>
            </button>
            <div className="chat-divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;