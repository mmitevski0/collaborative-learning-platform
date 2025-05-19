import { onRequest }      from 'firebase-functions/v2/https';
import { logger }         from 'firebase-functions';
import Busboy             from 'busboy';
import pdfParse           from 'pdf-parse';
import corsFactory        from 'cors';

const cors      = corsFactory({ origin: true });                  // TODO tighten in prod
const MAX_SIZE  = 15 * 1024 * 1024;                               // 15 MB safety limit

// POST /api/extract-pdf-text
export const extractPdfText = onRequest(
    { region: 'europe-west3', timeoutSeconds: 60, memory: '512MiB' },
    (req, res) => cors(req, res, async () => {
        if (req.method !== 'POST') { res.status(405).send('Use POST'); return; }
        if (!req.rawBody)        { res.status(400).send('rawBody missing'); return; }

        const busboy      = Busboy({ headers: req.headers, limits: { fileSize: MAX_SIZE } });
        const chunks: Buffer[] = [];

        busboy.on('file', (field, file, info) => {
            if (field !== 'file') { file.resume(); return; }            // ignore stray files
            if (info.mimeType !== 'application/pdf') {
                res.status(400).json({ error: 'file must be PDF' }); file.resume();
            }
            file.on('data',  d => chunks.push(d));
        });

        busboy.on('finish', async () => {
            try {
                const pdfBuf = Buffer.concat(chunks);
                const { text } = await pdfParse(pdfBuf);
                res.status(200).json({ text });
            } catch (err) {
                logger.error(err);
                res.status(500).json({ error: 'failed-to-extract' });
            }
        });

        // kick-off parsing
        busboy.end(req.rawBody);
    }),
);
