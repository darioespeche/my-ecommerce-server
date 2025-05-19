const { Router } = require("express");
const ctrl = require("../controllers/cartController");
const router = Router();

router.post("/", ctrl.createCart);

router.get("/:cid", ctrl.getCartById);

router.post("/:cid/product/:pid", ctrl.addProductToCart);

module.exports = router;
