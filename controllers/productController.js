const db = require('../src/firebaseConfig');


// Controladores para productos (ruta products)
const getProducts = async (req, res) => {
  try {
    const productsSnapshot = await db.collection('products').get();
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(productsList);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const docRef = await db.collection('products').add(newProduct);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

module.exports = { getProducts, addProduct };