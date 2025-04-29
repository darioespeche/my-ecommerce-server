// src/managers/ProductManager.js

const fs = require("fs").promises; // Usamos la API de promesas de fs
const path = require("path");

class ProductManager {
  constructor() {
    // Definimos la ruta absoluta al archivo JSON
    this.filePath = path.resolve(__dirname, "../../data/products.json");
  }

  // 6.1 Leer el archivo y parsear JSON
  async _readFile() {
    try {
      const content = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      // Si el archivo no existe o está vacío, devolvemos array vacío
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  // 6.2 Escribir el array de productos en el archivo
  async _writeFile(products) {
    // stringify con indentación para legibilidad
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  // 6.3 Obtener todos los productos
  async getAll() {
    return await this._readFile();
  }

  // 6.4 Obtener un producto por su ID
  async getById(id) {
    const products = await this._readFile();
    return products.find((p) => p.id === id) || null;
  }

  // 6.5 Generar un ID incremental
  async _generateId() {
    const products = await this._readFile();
    // Si no hay productos, empezamos en 1
    if (products.length === 0) return 1;
    // Tomamos el último ID y sumamos 1
    return products[products.length - 1].id + 1;
  }

  // 6.6 Crear un nuevo producto
  async create(productData) {
    const products = await this._readFile();
    const newProduct = {
      id: await this._generateId(),
      ...productData,
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  // 6.7 Actualizar un producto existente
  async update(id, updates) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index < 0) return null;

    // Mezclamos los campos existentes con los updates
    products[index] = { ...products[index], ...updates };
    await this._writeFile(products);
    return products[index];
  }

  // 6.8 Eliminar un producto por ID
  async delete(id) {
    const products = await this._readFile();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) {
      // No se eliminó ninguno (ID no encontrado)
      return false;
    }
    await this._writeFile(filtered);
    return true;
  }
}

module.exports = ProductManager;
