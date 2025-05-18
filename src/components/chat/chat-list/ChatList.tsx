import React, { useEffect, useState } from 'react';
import ChatDetails, { ChatDetailsProps } from "../chat-details/ChatDetails";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';
import { useAuth } from '../../Login';
import { NavLink } from 'react-router-dom';
import "./ChatList.css";

const ChatList: React.FC = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState<{ chatId: string; chat: ChatDetailsProps['chat'] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user?.id) {
                console.warn("User ID not available yet.");
                setLoading(false);
                return;
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

                const finalChats = Object.entries(grouped).map(([chatId, chat]) => ({ chatId, chat }));
                console.log("Grouped chats:", finalChats);

                setChats(finalChats);

            } catch (err) {
                console.error('Error loading chats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [user]);

    if (loading) {
        return <div className="chatlist-container">Loading...</div>;
    }

    return (
        <div className="chatlist-container">
            <div className="chatlist-header">
                <h1 className="chatlist-title">Chats</h1>
                <NavLink to="/home/chats" className="chatlist-new-button">
                    New chat
                </NavLink>
            </div>
            <div className="chatlist-grid">
                {chats.length > 0 ? (
                    chats.map(({ chatId, chat }) => (
                        <ChatDetails key={chatId} chatId={chatId} chat={chat} />
                    ))
                ) : (
                    <div className="chatlist-empty-state">
                        You don't have any saved chats. {' '}
                        <NavLink to="/home/chats" className="chatlist-empty-link">
                            Start a new chat
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
