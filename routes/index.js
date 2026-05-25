const { Router } = require('express');
const router = Router();
const { getProducts, addProduct } = require('../controllers/productController');
const { postTransaction } = require('../controllers/transactionController');
const { searchProducts } = require('../controllers/searchController');

// rutas para productos
router.get('/products', getProducts);
router.post('/products', addProduct);

//ruta para búsqueda
router.get('/search', searchProducts);

// ruta para tienda
router.post('/store',postTransaction);

module.exports = router;