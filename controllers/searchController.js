const db = require('../src/firebaseConfig');
// Controladores para búsqueda (ruta search)

const searchProducts = async (req, res) => {
  try {
    const query = req.query.title;
    if (!query) {
      return res.status(400).json({ error: 'Falta el parámetro de búsqueda "title"' });
    }

    // 1. Convertimos la entrada del usuario a minúsculas
    const lowerCaseQuery = query.toLowerCase();

    // 2. Traemos todos los productos (o puedes aplicar un límite previo)
    const productsSnapshot = await db.collection('products').get();

    // 3. Mapeamos y filtramos en memoria usando JavaScript
    const results = productsSnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(product => {
        // Verificamos que el título exista y lo pasamos a minúsculas para comparar
        if (!product.titulo) return false;
        const tituloMiniscula = product.titulo.toLowerCase();

        // .includes() hace la búsqueda parcial (en cualquier parte del texto)
        return tituloMiniscula.includes(lowerCaseQuery);
      });

    res.json(results);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
};

module.exports = { searchProducts };