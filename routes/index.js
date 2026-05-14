const { Router } = require('express');
const router = Router();
const { getProducts, addProduct } = require('../controllers/productController');

// rutas para productos
router.get('/products', getProducts);
router.post('/products', addProduct);

module.exports = router;