const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_KEYS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Si usas Realtime Database, añade esta línea:
  // databaseURL: "https://tu-proyecto.firebaseio.com"
});

const db = admin.firestore(); // Para Cloud Firestore
// const db = admin.database(); // Para Realtime Database

module.exports = db;