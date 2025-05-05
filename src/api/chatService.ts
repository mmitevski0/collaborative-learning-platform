// src/api/chatService.ts
export async function createChat(
    name: string,
    participants: string[],
    description = ''
) {
    const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/createChat`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, participants, description }),
        },
    );

    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? 'createChat failed');
    }

    const { chatId } = await res.json();
    return chatId as string;
}
