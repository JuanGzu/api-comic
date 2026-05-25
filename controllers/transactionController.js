const db = require('../src/firebaseConfig');

// Controlador para transacciones (ruta store)
const postTransaction = async (req, res) => {
  try {
    const newTransaction = req.body;
    const docRef = await db.collection('transactions').add(newTransaction);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error al agregar transacción:', error);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
};

module.exports = { postTransaction };