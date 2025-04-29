// src/managers/CartManager.js
const fs = require("fs").promises;
const path = require("path");

class CartManager {
  constructor() {
    this.filePath = path.resolve(__dirname, "../../data/carts.json");
  }

  async _readFile() {
    try {
      const content = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async _writeFile(carts) {
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
  }

  // 11.1 Crear un nuevo carrito vacío
  async createCart() {
    const carts = await this._readFile();
    const newCart = {
      id: carts.length + 1,
      products: [], // Array de { productId, quantity }
    };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  // 11.2 Obtener un carrito por ID
  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find((c) => c.id === id) || null;
  }

  // 11.3 Agregar un producto a un carrito
  async addProduct(cartId, productId) {
    const carts = await this._readFile();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const item = cart.products.find((p) => p.productId === productId);
    if (item) {
      item.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await this._writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;
