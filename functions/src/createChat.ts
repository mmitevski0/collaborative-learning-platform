import { getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import cors from 'cors';
import { FieldVal } from './firebaseAdmin';  // use helper exports


const db = getFirestore();

// Re-usable CORS handler. // TODO: Add prod domain.
const corsHandler = cors({
    origin: ['http://localhost:5173'],
    methods: ['POST'],
});

// POST /api/create-chat
export const createChat = onRequest(
    { region: 'europe-west3' },
    (req, res) => corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const {
            name,
            participants,
            description = '',
            metadata = {},
        } = req.body ?? {};

        //validation
        if (typeof name !== 'string' || !name.trim()) {
            res.status(400).json({ error: 'name is required' }); return;
        }
        if (!Array.isArray(participants) ||
            participants.length === 0 ||
            !participants.every((u) => typeof u === 'string')
        ) {
            res.status(400).json({ error: 'participants must be string[]' }); return;
        }

        //write to Firestore
        try {
            const docRef = await db.collection('chats').add({
                name: name.trim(),
                participants,
                description,
                metadata,
                createdAt: FieldVal.serverTimestamp(),
            });
            res.status(201).json({ chatId: docRef.id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'internal-error' });
        }
    }),
);
