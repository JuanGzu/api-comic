const db = require('../src/firebaseConfig');

const postTransaction = async (req, res) => {
  try {
    // Asumimos que req.body es un array de transacciones
    const transactions = req.body;

    // Validamos que sea un array
    if (!Array.isArray(transactions)) {
      return res.status(400).json({ error: "Se esperaba un array de transacciones" });
    }

    // Procesamos cada transacción de forma individual
    const promises = transactions.map(async (t) => {
      // Creamos un objeto plano y validamos explícitamente cada campo
      const dataToSave = {
        id_elemento: t.id_elemento || "desconocido", // Valor por defecto si es undefined
        cantidad: Number(t.cantidad) || 0,
        costo_unitario: Number(t.costo_unitario) || 0,
        fecha: t.fecha || new Date().toISOString(),
        hora: t.hora || ""
      };

      return await db.collection('transactions').add(dataToSave);
    });

    const results = await Promise.all(promises);
    res.status(201).json({ message: "Transacciones creadas", ids: results.map(r => r.id) });

  } catch (error) {
    console.error('Error al agregar transacción:', error);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
};

module.exports = { postTransaction };