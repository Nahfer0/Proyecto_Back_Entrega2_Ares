# Entrega 1 - API Productos y Carritos

Proyecto para la primera entrega: servidor en Node.js + Express con endpoints para productos y carritos.

## Instalar y ejecutar
```bash
npm install
npm start
```
El servidor escucha en http://localhost:8080

## Endpoints principales
- Productos: `/api/products`
  - GET `/api/products/` -> listar todos
  - GET `/api/products/:pid` -> traer por id
  - POST `/api/products/` -> crear (body con title, description, code, price, status, stock, category, thumbnails)
  - PUT `/api/products/:pid` -> actualizar (no permite cambiar id)
  - DELETE `/api/products/:pid` -> eliminar
- Carritos: `/api/carts`
  - POST `/api/carts/` -> crear carrito (retorna id)
  - GET `/api/carts/:cid` -> listar productos del carrito
  - POST `/api/carts/:cid/product/:pid` -> agrega 1 unidad del producto al carrito

## Notas
- IDs autogenerados con `crypto.randomUUID()`
- Persistencia en `data/products.json` y `data/carts.json`
