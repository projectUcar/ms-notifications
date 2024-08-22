import admin from 'firebase-admin';
import { FIREBASE_APLICATION_CREDENTIALS } from '../config';
const fs = require('fs');


const serviceAccountPath = process.env.FIREBASE_APLICATION_CREDENTIALS;

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`No se encontró el archivo de credenciales en ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;