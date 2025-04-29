// src/controllers/productController.js

const ProductManager = require("../managers/ProductManager");
const manager = new ProductManager();

// 7.1 GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await manager.getAll();
    res.json(products);
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
};

// 7.2 GET /api/products/:pid
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

// 7.3 POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    // Aquí podrías validar campos obligatorios
    const newProduct = await manager.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// 7.4 PUT /api/products/:pid
exports.updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const updates = req.body;
    const updated = await manager.update(id, updates);
    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// 7.5 DELETE /api/products/:pid
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.pid);
    const success = await manager.delete(id);
    if (!success)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
