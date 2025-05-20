// src/controllers/productController.js
const ProductManager = require("../managers/ProductManager");
const manager = new ProductManager();

exports.getProducts = async (req, res, next) => {
  try {
    const products = await manager.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await manager.getById(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// ————————————————
// POST /api/products
// ————————————————
exports.createProduct = async (req, res, next) => {
  try {
    // 1) Crear el producto en JSON
    const newProduct = await manager.create(req.body);

    // 2) Emitir por WebSocket la lista actualizada
    const io = req.app.get("io");
    const products = await manager.getAll();
    io.emit("updateProducts", products);

    // 3) Responder al cliente HTTP
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// ————————————————
// PUT /api/products/:pid (no emit necesario si no cambia lista completa)
// ————————————————
exports.updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const updated = await manager.update(id, req.body);
    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ————————————————
// DELETE /api/products/:pid
// ————————————————
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const success = await manager.delete(id);
    if (!success)
      return res.status(404).json({ error: "Producto no encontrado" });

    // Emitir la lista sin ese producto
    const io = req.app.get("io");
    const products = await manager.getAll();
    io.emit("updateProducts", products);

    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
