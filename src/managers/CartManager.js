const path = require("path");
const { readJson, writeJson } = require("../utils/fs-utils");

class CartManager {
  constructor() {
    this.filePath = path.resolve(__dirname, "../../data/carts.json");
  }

  async createCart() {
    const carts = await readJson(this.filePath);
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id, products: [] };
    carts.push(newCart);
    await writeJson(this.filePath, carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await readJson(this.filePath);
    return carts.find((c) => c.id === id) || null;
  }

  async getAllCarts() {
    return await readJson(this.filePath);
  }

  async addProduct(cartId, productId) {
    const carts = await readJson(this.filePath);
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const item = cart.products.find((p) => p.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await writeJson(this.filePath, carts);
    return cart;
  }
}

module.exports = CartManager;
