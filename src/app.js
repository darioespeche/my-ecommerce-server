const path = require("path");
const express = require("express");
const { createServer } = require("http");
const { Server: IOServer } = require("socket.io");
const exphbs = require("express-handlebars");

const ProductManager = require("./managers/ProductManager");
const productsRouter = require("./routes/products");
const viewsRouter = require("./routes/views");

const app = express();
const httpServer = createServer(app);
const io = new IOServer(httpServer);

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: path.resolve(__dirname, "views/layouts"),
    defaultLayout: "main",
    extname: ".handlebars",
  })
);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

app.set("io", io);

io.on("connection", async (socket) => {
  console.log("Cliente conectado:", socket.id);

  const mgr = new ProductManager();

  const allProducts = await mgr.getAll();
  socket.emit("updateProducts", allProducts);

  socket.on("newProduct", async (data) => {
    console.log("Nuevo producto recibido:", data);
    try {
      await mgr.create(data);
      const products = await mgr.getAll();
      io.emit("updateProducts", products);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("deleteProduct", async (pid) => {
    await mgr.delete(pid);
    const products = await mgr.getAll();
    io.emit("updateProducts", products);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () =>
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
);
