import { StrictMode } from 'react';
import NewChatModal from "./components/NewChatModal.tsx";

export default function App() {
    // in a real app you’ll get this from Firebase Auth
    const currentUserUid = 'uidA';

    return (
        <StrictMode>
            <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
                <div className="w-full max-w-md p-6 bg-zinc-800 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Create a Chat</h1>

                    <NewChatModal userUid={currentUserUid} />
                </div>
            </main>
        </StrictMode>
    );
}
