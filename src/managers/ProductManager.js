const path = require("path");
const { readJson, writeJson } = require("../utils/fs-utils");

class ProductManager {
  constructor() {
    this.filePath = path.resolve(__dirname, "../../data/products.json");
  }

  async getAll() {
    return await readJson(this.filePath);
  }

  async getById(id) {
    const products = await readJson(this.filePath);
    return products.find((p) => p.id === id) || null;
  }

  async create(data) {
    const products = await readJson(this.filePath);

    if (products.some((p) => p.code === data.code)) {
      const error = new Error("Ya existe un producto con ese code");
      error.status = 400;
      throw error;
    }

    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, ...data };

    products.push(newProduct);
    await writeJson(this.filePath, products);
    return newProduct;
  }

  async update(id, updates) {
    const products = await readJson(this.filePath);
    const idx = products.findIndex((p) => p.id === id);
    if (idx < 0) return null;

    delete updates.id;
    products[idx] = { ...products[idx], ...updates };
    await writeJson(this.filePath, products);
    return products[idx];
  }

  async delete(id) {
    const products = await readJson(this.filePath);
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    await writeJson(this.filePath, filtered);
    return true;
  }
}

module.exports = ProductManager;
