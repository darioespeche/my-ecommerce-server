const logger = require("./middlewares/logger");
const express = require("express");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();
app.use(logger);
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use((err, req, res, next) => {
  console.error("💥 Error capturado:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
);
