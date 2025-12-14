// js/food-render.js
(() => {
  const container = document.getElementById("foodList");
  if (!container) return;

  foods.forEach((food) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img1 = food.images?.[0] || "";
    const img2 = food.images?.[1] || "";

    item.innerHTML = `
      <div class="food-images">
        <img src="${img1}" alt="${food.name} 1">
        <img src="${img2}" alt="${food.name} 2">
      </div>
      <h2 class="food-title">${food.name}</h2>
      <p class="food-desc">${food.desc}</p>
    `;

    container.appendChild(item);
  });
})();
