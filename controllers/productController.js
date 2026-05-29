const db = require('../src/firebaseConfig');

// Controladores para productos (ruta products)
const getProducts = async (req, res) => {
  try {
    // Leemos el límite (por defecto 10) y el ID del último documento cargado
    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    let query = db.collection('products').limit(limit);

    // Si recibimos un lastId, iniciamos la búsqueda a partir de ese documento
    if (lastId) {
      const lastDoc = await db.collection('products').doc(lastId).get();
      if (lastDoc.exists) {
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