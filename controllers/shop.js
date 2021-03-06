const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
}

exports.getHome = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Home',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: products
      });
    })
    .catch(err => {
      console.log(err);
    })
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     pageTitle: 'Checkout',
//     path: '/checkout',
//   });
// }

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders
      });
    })
    .catch(err => console.log(err))
}

// // Orders below

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result)
      res.redirect('/cart');
    });

  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart
  //       .getProducts({ where: { id: prodId } })
  //       .then(products => {
  //         let product;
  //         if (products.length > 0) {
  //           product = products[0];
  //         }
  //         if (product) {
  //           const oldQuantity = product.cartItem.quantity;
  //           newQuantity = oldQuantity + 1;
  //           return product;
  //         }
  //         return Product.findByPk(prodId)
  //       })
  //       .then(product => {
  //         return fetchedCart.addProduct(product, {
  //           through: { quantity: newQuantity }
  //         });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //       .then(() => {
  //         res.redirect('/cart');
  //       })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
  // .then(products => {
  //   const product = products[0]
  //   return product.cartItem.destroy();
  // })
  // .then((result) => {
  //   res.redirect('/cart');
  // })
  // .catch(err => {
  //   console.log(err);
  // })
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
}

exports.PostOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    })
}