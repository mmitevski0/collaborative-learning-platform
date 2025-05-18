import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
    text: string;
    time: string;
    isOutgoing: boolean;
}

export interface ChatDetailsProps {
    chatId: string;
    chat: {
        name: string;
        messages: ChatMessage[];
    };
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ chatId, chat }) => {
    const navigate = useNavigate();
    const visibleMessages = chat.messages.slice(-3);

    const handleClick = () => {
        navigate(`/home/chats?chatId=${chatId}`);
    };

    return (
        <div
            className="card shadow-sm border rounded-3 m-2"
            onClick={handleClick}
            style={{
                height: '18rem',
                width: '280px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: '7px',
                backgroundColor: '#fff',
                transition: 'box-shadow 0.2s ease-in-out',
            }}
        >
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {visibleMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`d-flex ${message.isOutgoing ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                        <span
                            className={`p-2 rounded ${message.isOutgoing ? 'text-white' : 'bg-light text-dark'}`}
                            style={{
                                fontSize: '12px',
                                maxWidth: '80%',
                                backgroundColor: message.isOutgoing ? 'black' : undefined,
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                            }}
                        >
                        {message.text.length > 100 ? `${message.text.slice(0, 100)}...` : message.text}
                    </span>
                    </div>
                ))}
            </div>

            <div className="text-end mt-2" style={{ fontSize: '18px', color: '#ccc' }}>
                <span>↗</span>
            </div>

            <h5
                className="text-truncate"
                style={{
                    fontWeight: 600,
                    fontSize: '20px',
                    marginBottom: '8px',
                    paddingLeft: '18px',
                }}
            >
                {chat.name}
            </h5>
        </div>
    );
};

export default ChatDetails;
