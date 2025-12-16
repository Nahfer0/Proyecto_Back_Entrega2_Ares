const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const pm = new ProductManager();

// GET /api/products/  -> lista todos
router.get('/', async (req, res) => {
  const products = await pm.getAll();
  res.json(products);
});

// GET /api/products/:pid -> trae 1
router.get('/:pid', async (req, res) => {
  const product = await pm.getById(req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// POST /api/products/ -> agrega
router.post('/', async (req, res) => {
  try {
    const created = await pm.addProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT /api/products/:pid -> actualiza (sin permitir cambiar id)
router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE /api/products/:pid -> elimina
router.delete('/:pid', async (req, res) => {
  try {
    const ok = await pm.deleteProduct(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
