import { onRequest } from 'firebase-functions/v2/https';
import cors from 'cors';
import { db } from './firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

// allow localhost while developing – tighten this for prod
const corsHandler = cors({ origin: ['http://localhost:5173'] });

/**
 * POST /api/chat/{chatId}/question
 * Body: { question: string, authorId: string }
 */
export const askQuestion = onRequest({ region: 'europe-west3' }, (req, res) =>
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');            // only POST
            return;
        }

        /* -------- derive {chatId} from the URL ---------- */
        // URL will be …/api/chat/<chatId>/question
        // Works both on the hosted URL and in the emulator.
        const parts = req.path.split('/').filter(Boolean);       // drop empty items
        const chatId = parts.length >= 3 ? parts[2] : '';        // index 0:"api",1:"chat",2:"<id>"

        if (!chatId) {
            res.status(400).json({ error: 'chatId missing in path' });
            return;
        }

        /* -------- validate body -------- */
        const { question, authorId } = req.body ?? {};

        if (typeof question !== 'string' || !question.trim()) {
            res.status(400).json({ error: 'question (string) required' }); return;
        }
        if (typeof authorId !== 'string' || !authorId.trim()) {
            res.status(400).json({ error: 'authorId (string) required' }); return;
        }

        /* -------- write to Firestore -------- */
        try {
            const qRef = db
                .collection('chats')
                .doc(chatId)
                .collection('questions')
                .doc();                               // auto-id

            await qRef.set({
                question: question.trim(),
                authorId,
                answer: null,                         // placeholder – fill later
                createdAt: FieldValue.serverTimestamp(),
            });

            res.status(201).json({ id: qRef.id });  // you get the questionId back
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'internal-error' });
        }
    }),
);
