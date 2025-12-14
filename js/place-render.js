// js/place-render.js
(() => {
  const container = document.getElementById("placeList");
  if (!container) return;

  // ✅ HIỂN THỊ TẤT CẢ ĐỊA ĐIỂM
  places.forEach((place) => {
    const card = document.createElement("a");
    card.href = place.link;
    card.style.textDecoration = "none";

    card.innerHTML = `
      <div class="card">
        <img src="${place.image}" alt="${place.title}">
        <h3>${place.title}</h3>
        <p>${place.desc}</p>
      </div>
    `;

    container.appendChild(card);
  });
})();
