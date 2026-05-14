const { Router } = require('express');
const router = Router();
const { getProducts, addProduct } = require('../controllers/productController');

router.get('/items', getProducts);
router.post('/items', addProduct);

module.exports = router;