import { onRequest }           from 'firebase-functions/v2/https';
import { logger }              from 'firebase-functions';
import {admin, bucket} from './firebaseAdmin';
import corsFactory             from 'cors';
import Busboy                  from 'busboy';
import { FieldValue } from 'firebase-admin/firestore';


const cors = corsFactory({ origin: true });        // TODO: restrict in prod
const MAX_SIZE = 10 * 1024 * 1024;                 // 10MB

export const createQuiz = onRequest(
    { region: 'europe-west3', timeoutSeconds: 30, maxInstances: 10 },
    (req, res) => cors(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Use POST' });
            return;
        }
        if (!req.rawBody) {
            res.status(400).json({ error: 'rawBody missing (did you disable body‑parser?)' });
            return;
        }
        // --- parse multipart ---------------------------------------------------
        const busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_SIZE } });

        let title = '';
        let creatorId = '';
        let fileBuffer: Buffer | null = null;
        let fileMime = '';

        busboy.on('field', (name, val) => {
            if (name === 'title')      title      = val;
            if (name === 'creatorId')  creatorId  = val;
        });

        busboy.on('file', (name, file, info) => {
            if (name !== 'file') {
                // ignore stray file fields
                file.resume();
                return;
            }
            fileMime = info.mimeType;
            const chunks: Buffer[] = [];
            file.on('data', d => chunks.push(d));
            file.on('limit', () => {
                res.status(400).json({ error: 'File exceeds 10MB limit' });
                file.removeAllListeners();         // stop parsing further
            });
            file.on('end', () => {
                fileBuffer = Buffer.concat(chunks);
            });
        });

        busboy.on('finish', async () => {
            if (!title || !creatorId || !fileBuffer) {
                res.status(400).json({ error: 'title, creatorId and file are required' });
                return;
            }
            try {
                const quizRef     = admin.firestore().collection('quizzes').doc();
                const storagePath = `quizzes/${quizRef.id}.pdf`;


                await bucket.file(storagePath)
                    .save(fileBuffer, { contentType: fileMime });

                await quizRef.set({
                    title, creatorId, storagePath,
                    createdAt: FieldValue.serverTimestamp(),
                });

                res.status(201).json({ id: quizRef.id });
            } catch (e) {
                logger.error(e);
                res.status(500).json({ error: 'Failed to create quiz' });
            }
        });

        // Kick‑off parsing using the already‑buffered body
        busboy.end(req.rawBody);
    }),
);
