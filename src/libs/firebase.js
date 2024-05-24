import admin from 'firebase-admin';
import { FIREBASE_APLICATION_CREDENTIALS } from '../config';

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_APLICATION_CREDENTIALS)
});

export default admin;