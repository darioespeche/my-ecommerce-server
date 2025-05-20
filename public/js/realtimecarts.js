const socket = io();

socket.on("connect", () => {});

socket.on("updateCarts", (carts) => {
  const ul = document.getElementById("cartsList");
  ul.innerHTML = "";
  carts.forEach((c) => {
    const li = document.createElement("li");
    li.dataset.cid = c.id;
    li.innerHTML = `
      <strong>Carrito #${c.id}</strong>
      <ul>
        ${c.products
          .map(
            (p) => `<li>Producto: ${p.productId} – Cantidad: ${p.quantity}</li>`
          )
          .join("")}
      </ul>
    `;
    ul.appendChild(li);
  });
});

socket.on("updateCart:" + socket.id, (cart) => {});

document.getElementById("refreshAll").addEventListener("click", () => {
  socket.emit("requestCarts");
});
