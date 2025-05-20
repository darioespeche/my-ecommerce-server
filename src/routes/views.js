// src/routes/views.js
const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");
const manager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const products = await manager.getAll();
  res.render("home", { products, title: "Home" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await manager.getAll();
  res.render("realTimeProducts", { products, title: "Real Time Products" });
});
router.get("/realtimecarts", async (req, res) => {
  const carts = await manager.getAllCarts();
  res.render("realTimeCarts", { carts, title: "Real Time Carts" });
});

module.exports = router;
