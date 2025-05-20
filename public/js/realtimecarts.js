// public/js/realtimecarts.js
console.log("🔌 Cart WS client init");
const socket = io();

// Render inicial
socket.on("connect", () => {
  console.log("✅ Cart WS connected", socket.id);
});

// Actualizar lista completa de carritos
socket.on("updateCarts", (carts) => {
  console.log("🔄 updateCarts:", carts);
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

// Actualizar un carrito particular
socket.on("updateCart:" + socket.id, (cart) => {
  console.log(`🔄 updateCart:${cart.id}`, cart);
  // Si quisieras actualizar sólo ese carrito en pantalla…
});

// Refrescar manualmente (opcional)
document.getElementById("refreshAll").addEventListener("click", () => {
  socket.emit("requestCarts"); // si implementas un listener en el servidor
});
