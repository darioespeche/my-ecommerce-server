const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");
const manager = new ProductManager();
const CartManager = require("../managers/CartManager");
const cartMgr = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  const products = await manager.getAll();
  res.render("home", { products, title: "Home" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await manager.getAll();
  res.render("realTimeProducts", { products, title: "Real Time Products" });
});

router.get("/realtimecarts", async (req, res, next) => {
  try {
    const carts = await cartMgr.getAllCarts();
    res.render("realTimeCarts", { carts, title: "Real Time Carts" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
