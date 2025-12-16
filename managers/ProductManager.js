const fs = require('fs').promises;
const path = require('path');
const { randomUUID } = require('crypto');

class ProductManager {
  constructor(filename = 'data/products.json') {
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

  async getAll() {
    return await this._readFile();
  }

  async getById(id) {
    const items = await this._readFile();
    return items.find(p => String(p.id) === String(id)) || null;
  }

  async addProduct(productData) {
    const items = await this._readFile();
    const newProduct = {
      id: randomUUID(),
      title: productData.title || '',
      description: productData.description || '',
      code: productData.code || '',
      price: Number(productData.price) || 0,
      status: productData.status === undefined ? true : Boolean(productData.status),
      stock: Number(productData.stock) || 0,
      category: productData.category || '',
      thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };
    items.push(newProduct);
    await this._writeFile(items);
    return newProduct;
  }

  async updateProduct(id, updateFields) {
    const items = await this._readFile();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const { id: _, ...rest } = updateFields;
    items[idx] = { ...items[idx], ...rest };
    await this._writeFile(items);
    return items[idx];
  }

  async deleteProduct(id) {
    const items = await this._readFile();
    const filtered = items.filter(p => String(p.id) !== String(id));
    if (filtered.length === items.length) return false;
    await this._writeFile(filtered);
    return true;
  }
}

module.exports = ProductManager;
