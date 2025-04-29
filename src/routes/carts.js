// src/routes/carts.js
const { Router } = require("express");
const ctrl = require("../controllers/cartController");
const router = Router();

// Crear un carrito vacío
router.post("/", ctrl.createCart);

// Ver los productos de un carrito
router.get("/:cid", ctrl.getCartById);

// Agregar producto al carrito
router.post("/:cid/product/:pid", ctrl.addProductToCart);

module.exports = router;
