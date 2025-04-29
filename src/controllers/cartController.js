// src/controllers/cartController.js
const CartManager = require("../managers/CartManager");
const manager = new CartManager();

// POST /api/carts  → crea carrito
exports.createCart = async (req, res, next) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

// GET /api/carts/:cid  → devuelve carrito con productos
exports.getCartById = async (req, res, next) => {
  try {
    const cid = parseInt(req.params.cid);
    const cart = await manager.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// POST /api/carts/:cid/product/:pid  → agrega producto al carrito
exports.addProductToCart = async (req, res, next) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = await manager.addProduct(cid, pid);
    if (!updatedCart)
      return res
        .status(404)
        .json({ error: "Carrito o producto no encontrado" });
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
};
