const express = require('express');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const cm = new CartManager();

// POST /api/carts/ -> crea carrito
router.post('/', async (req, res) => {
  try {
    const created = await cm.createCart();
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// GET /api/carts/:cid -> lista productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// POST /api/carts/:cid/product/:pid -> agrega 1 unidad del producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const updated = await cm.addProductToCart(req.params.cid, req.params.pid);
    if (!updated) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

module.exports = router;
