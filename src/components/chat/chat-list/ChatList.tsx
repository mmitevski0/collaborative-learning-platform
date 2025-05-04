import ChatDetails, { ChatDetailsProps } from "../chat-details/ChatDetails"

const ChatList: React.FC = () => {
    // placeholder chat
    const chats: ChatDetailsProps[] = [
        {
            chat: {
                name: 'Some Random Conversation',
                messages: [
                    { text: 'Hi! How are you?', time: '10:00', isOutgoing: false },
                    { text: "I'm good, thanks!", time: '10:01', isOutgoing: true }
                ]
            }
        },
        {
            chat: {
                name: 'Jane Smith',
                messages: [
                    { text: 'Hey, what’s up?', time: '09:00', isOutgoing: false },
                    { text: 'Not much, just working!', time: '09:05', isOutgoing: true }
                ]
            }
        },
        {
            chat: {
                name: 'Jane Smith',
                messages: [
                    { text: 'Hey, what’s up?', time: '09:00', isOutgoing: false },
                    { text: 'Not much, just working!', time: '09:05', isOutgoing: true }
                ]
            }
        },
        {
            chat: {
                name: 'Jane Smith',
                messages: [
                    { text: 'Hey', time: '09:05', isOutgoing: true },
                    { text: 'Hi again! Just checking in - everything okay? You still need help with homework?', time: '09:00', isOutgoing: false },
                    { text: 'Hey', time: '09:05', isOutgoing: true },
                    { text: 'Hi again! Just checking in - everything okay? You still need help with homework?', time: '09:00', isOutgoing: false },
                    { text: 'Hey', time: '09:05', isOutgoing: true },
                ]
            }
        }
    ];
    return (
        <div className="container">
            <div style={{ padding: '20px 0'}} className="d-flex justify-content-between align-items-center">
                <h3 style={{ textAlign: 'left'}}>Chats</h3>
                <button className="btn btn-primary">New chat</button>
            </div>
            <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                <div style={{display: 'flex', gap: '20px', padding: '0'}}>
                    {chats.map((chat, index) => (
                        <ChatDetails key={index} chat={chat.chat} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatList