const db = require('../src/firebaseConfig');

// Controlador para transacciones (ruta store)
const postTransaction = async (req, res) => {
  try {
    // 1. Extrae solo las propiedades que necesitas (Desestructuración)
    const { id_elemento, cantidad, costo_unitario, fecha, hora } = req.body;

    // 2. Crea un objeto literal "plano". 
    // Esto garantiza que solo estamos enviando datos puros a Firestore.
    const newTransaction = {
      id_elemento: id_elemento,
      cantidad: Number(cantidad),
      costo_unitario: Number(costo_unitario),
      fecha: fecha,
      hora: hora,
      createdAt: new Date().toISOString() // Recomendación: agrega un sello de tiempo
    };

    // 3. Envía el objeto limpio
    const docRef = await db.collection('transactions').add(newTransaction);

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error al agregar transacción:', error);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
};

module.exports = { postTransaction };