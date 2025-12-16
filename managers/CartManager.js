const fs = require('fs').promises;
const path = require('path');
const { randomUUID } = require('crypto');

class CartManager {
  constructor(filename = 'data/carts.json') {
    this.path = path.resolve(filename);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  async _writeFile(data) {
    await fs.mkdir(path.dirname(this.path), { recursive: true });
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this._readFile();
    const newCart = { id: randomUUID(), products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this._readFile();
    const idx = carts.findIndex(c => String(c.id) === String(cartId));
    if (idx === -1) return null;

    const cart = carts[idx];
    const prodIdx = cart.products.findIndex(p => String(p.product) === String(productId));
    if (prodIdx === -1) {
      cart.products.push({ product: String(productId), quantity: 1 });
    } else {
      cart.products[prodIdx].quantity += 1;
    }

    carts[idx] = cart;
    await this._writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;
