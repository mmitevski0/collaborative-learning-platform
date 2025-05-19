// src/components/NewChatModal.tsx
import { useState } from 'react';
import { createChat } from '../api/chatService.ts';

export default function NewChatModal({ userUid }: { userUid: string }) {
    const [chatName, setChatName]   = useState('');
    const [partnerUid, setPartner]  = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const chatId = await createChat(chatName, [userUid, partnerUid]);
            console.log('chat created:', chatId);
            // e.g. navigate(`/chats/${chatId}`)
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Chat title"
                className="border p-2 rounded w-full"
            />
            <input
                value={partnerUid}
                onChange={(e) => setPartner(e.target.value)}
                placeholder="Friend UID"
                className="border p-2 rounded w-full"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Chat
            </button>
        </form>
    );
}
