const db = require('../util/database');

const Cart = require('./cart');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Person {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // Add new product
  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  };

  static deleteById(id) {
    
  };

  // Show all products
  static fetchAll() {
    return db.execute('SELECT * FROM products');
  };

  // Show details of a single product
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  };
}