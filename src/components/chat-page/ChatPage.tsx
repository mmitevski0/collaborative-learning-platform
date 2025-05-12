import ChatHistory from '../chat-history/ChatHistory';
import ChatWindow from '../chat-window/ChatWindow';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  return (
    <div className="">
      <ChatHistory />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;