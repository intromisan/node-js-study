const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getHome);

router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.get('/checkout', shopController.getCheckout);

// router.get('/orders', shopController.getOrders);

// router.post('/cart', shopController.postCart);

// router.post('/cart/delete-item', shopController.postCartDeleteProduct);

// router.post ('/create-order', shopController.PostOrders);

module.exports = router;