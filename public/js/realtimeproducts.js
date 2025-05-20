const socket = io();

socket.on("connect", () => {});

socket.on("updateProducts", (products) => {
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
  socket.emit("newProduct", data);
  f.reset();
});

document.getElementById("productsList").addEventListener("click", (e) => {
  if (!e.target.matches(".deleteBtn")) return;
  const id = parseInt(e.target.closest("li").dataset.id);
  socket.emit("deleteProduct", id);
});

socket.on("error", (msg) => {});
