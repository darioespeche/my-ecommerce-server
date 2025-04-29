// src/routes/products.js

const { Router } = require("express");
const ctrl = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");

const router = Router();

router.get("/", ctrl.getProducts);
router.get("/:pid", ctrl.getProductById);
router.post("/", validateProduct, ctrl.createProduct);
router.put("/:pid", validateProduct, ctrl.updateProduct);
router.delete("/:pid", ctrl.deleteProduct);

module.exports = router;
