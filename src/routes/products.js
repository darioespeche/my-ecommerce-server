// src/routes/products.js

const { Router } = require("express");
const ctrl = require("../controllers/productController");

const router = Router();

// 8.1 Listar todos los productos
router.get("/", ctrl.getProducts);

// 8.2 Obtener un producto por su ID
router.get("/:pid", ctrl.getProductById);

// 8.3 Crear un nuevo producto
router.post("/", ctrl.createProduct);

// 8.4 Actualizar un producto existente
router.put("/:pid", ctrl.updateProduct);

// 8.5 Eliminar un producto
router.delete("/:pid", ctrl.deleteProduct);

module.exports = router;
