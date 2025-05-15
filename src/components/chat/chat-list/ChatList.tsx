import React, { useEffect, useState } from 'react';
import ChatDetails, { ChatDetailsProps } from "../chat-details/ChatDetails";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';
import { useAuth } from '../../Login';
import { NavLink } from 'react-router-dom';

const ChatList: React.FC = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState<ChatDetailsProps[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user?.id) {
                console.warn("User ID not available yet.");
                return <div>Start a chat</div>;
            }

            try {
                const q = query(
                    collection(db, "messages"),
                    where("userId", "==", user.id)
                    // orderBy("timestamp", "asc")
                );
                const snapshot = await getDocs(q);
                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                console.log("Fetched messages from Firebase:", messages);

                const grouped = messages.reduce((acc, message: any) => {
                    const chatId = message.chatId || 'default';

                    if (!acc[chatId]) {
                        acc[chatId] = {
                            name: message.sender === 'user' ? message.text : 'AI Chat',
                            messages: []
                        };
                    }

                    acc[chatId].messages.push({
                        text: message.text,
                        time: new Date(message.timestamp?.toDate?.() || message.timestamp).toLocaleTimeString(),
                        isOutgoing: message.sender === 'user'
                    });

                    return acc;
                }, {} as Record<string, ChatDetailsProps['chat']>);

                const finalChats = Object.values(grouped).map(chat => ({ chat }));
                console.log("Grouped chats:", finalChats);

                setChats(finalChats);

            } catch (err) {
                console.error('Error loading chats:', err);
            }
        };

        fetchChats();
    }, [user]);

    return (
        <div className="container  my-5 ">
            <div style={{ padding: '25px 0' }} className="d-flex justify-content-between align-items-center">
                <h1 style={{ textAlign: 'left' }}>Chats</h1>
                <button className="btn btn-primary text-white"> <NavLink to="/home/chats" >
                    New chat</NavLink></button>
            </div>
            <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '20px', padding: '0', flexWrap: 'wrap' }}>
                    {chats.map((chatData, index) => (
                        <ChatDetails key={index} chat={chatData.chat} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
