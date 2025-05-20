console.log("🔌 Socket.IO client initializing…");

const socket = io();

socket.on("connect", () => {
  console.log("✅ Conectado con socket id:", socket.id);
});

socket.on("updateProducts", (products) => {
  console.log("🔄 updateProducts recibido:", products);
  const ul = document.getElementById("productsList");
  ul.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.dataset.id = p.id;
    li.innerHTML = `
      ${p.id} - ${p.title} - $${p.price}
      <span class="deleteBtn">[Eliminar]</span>
    `;
    ul.appendChild(li);
  });
});

document.getElementById("addProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("✉️ Form submit");
  const f = e.target;
  const data = {
    title: f.title.value,
    description: f.description.value,
    code: f.code.value,
    price: parseFloat(f.price.value),
    status: true,
    stock: parseInt(f.stock.value),
    category: f.category.value,
    thumbnails: [],
  };
  console.log("↗️ Emitting newProduct:", data);
  socket.emit("newProduct", data);
  f.reset();
});

document.getElementById("productsList").addEventListener("click", (e) => {
  if (!e.target.matches(".deleteBtn")) return;
  const id = parseInt(e.target.closest("li").dataset.id);
  console.log("🗑️ Emitting deleteProduct:", id);
  socket.emit("deleteProduct", id);
});

socket.on("error", (msg) => {
  console.error("❌ Socket error from server:", msg);
});
