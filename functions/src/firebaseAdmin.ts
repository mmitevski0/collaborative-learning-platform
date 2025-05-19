import * as admin from 'firebase-admin';
import {getApps} from "firebase-admin/app";


if (!getApps().length) {
    admin.initializeApp({
        storageBucket: `${process.env.GCLOUD_PROJECT}.appspot.com`  // classic name that emulator always accepts
    });
}

export { admin }; // convenience re-export
export const db       = admin.firestore();
export const storage  = admin.storage();
export const FieldVal = admin.firestore.FieldValue;
export const bucket = admin.storage().bucket();