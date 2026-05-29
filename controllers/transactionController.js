const db = require('../src/firebaseConfig');

const postTransaction = async (req, res) => {
  try {
    const { id_elementos, costo_total, fecha } = req.body;

    // Validación básica
    if (!id_elementos || !Array.isArray(id_elementos)) {
      return res.status(400).json({ error: "Datos de transacción inválidos" });
    }

    // Crear el objeto que se guardará en Firestore
    const nuevaTransaccion = {
      id_elementos: id_elementos, // Firestore soporta arrays de objetos
      costo_total: Number(costo_total),
      fecha: fecha,
      creadoEn: new Date() // Timestamp del servidor
    };

    // Guardar como un único documento
    const docRef = await db.collection('transactions').add(nuevaTransaccion);

    res.status(201).json({ message: "Transacción guardada exitosamente", id: docRef.id });

  } catch (error) {
    console.error('Error al guardar:', error);
    res.status(500).json({ error: 'Error al procesar la transacción' });
  }
};

module.exports = { postTransaction };