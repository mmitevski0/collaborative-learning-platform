
// display and align multiple components for future use

import ChatHistory from './ChatHistory';
import ChatWindow from './ChatWindow';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  return (
    <div className="chat-panel-container">
      <ChatHistory />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;