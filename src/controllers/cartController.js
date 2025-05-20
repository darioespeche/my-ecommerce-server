const CartManager = require("../managers/CartManager");
const manager = new CartManager();

exports.createCart = async (req, res, next) => {
  try {
    const cart = await manager.createCart();
    const io = req.app.get("io");
    const allCarts = await manager.getAllCarts(); // implementa este método
    io.emit("updateCarts", allCarts);

    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

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

exports.addProductToCart = async (req, res, next) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = await manager.addProduct(cid, pid);
    if (!updatedCart)
      return res
        .status(404)
        .json({ error: "Carrito o producto no encontrado" });

    const io = req.app.get("io");
    io.emit("updateCart:" + cid, updatedCart);

    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
};
