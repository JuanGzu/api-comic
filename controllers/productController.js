const db = require('../src/firebaseConfig');

// Controladores para productos (ruta products)
const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    // 1. Ordenamos por el campo interno 'id' de tus cómics
    let query = db.collection('products').orderBy('id').limit(limit);

    if (lastId) {
      // Convertimos el parámetro a número entero
      const lastIdNum = parseInt(lastId);

      // Buscamos el documento de Firestore donde el campo 'id' coincida
      const lastDocSnapshot = await db.collection('products').where('id', '==', lastIdNum).get();

      // Si el documento de referencia existe, paginamos a partir de él
      if (!lastDocSnapshot.empty) {
        const lastDoc = lastDocSnapshot.docs[0];
        query = query.startAfter(lastDoc);
      }
    }

    const productsSnapshot = await query.get();
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(productsList);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const docRef = await db.collection('products').add(newProduct);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

module.exports = { getProducts, addProduct };