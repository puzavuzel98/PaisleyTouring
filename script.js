const searchInput = document.querySelector("#place-search");
const filterButtons = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".place-card")];
const noResults = document.querySelector("#no-results");
const placesMore = document.querySelector("#places-more");
const placesToggle = document.querySelector("#places-toggle");
const initialVisibleCount = 6;
let activeFilter = "all";
let placesExpanded = false;

function updatePlaces() {
  const term = searchInput.value.trim().toLowerCase();
  const hasActiveQuery = activeFilter !== "all" || Boolean(term);
  let shown = 0;
  cards.forEach((card, index) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = !term || card.dataset.search.includes(term) ||
      card.textContent.toLowerCase().includes(term);
    const withinVisibleLimit = index < initialVisibleCount || placesExpanded || hasActiveQuery;
    const visible = matchesCategory && matchesSearch && withinVisibleLimit;
    card.hidden = !visible;
    if (visible) shown++;
  });
  noResults.hidden = shown !== 0;
  placesMore.hidden = cards.length <= initialVisibleCount || hasActiveQuery;
  placesToggle.setAttribute("aria-expanded", String(placesExpanded));
  placesToggle.textContent = placesExpanded ? "Show fewer places ↑" : "See more places ↓";
}

placesToggle.addEventListener("click", () => {
  placesExpanded = !placesExpanded;
  updatePlaces();
});
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updatePlaces();
  });
});
searchInput.addEventListener("input", updatePlaces);
updatePlaces();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}));
document.querySelector("#year").textContent = new Date().getFullYear();
filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.classList.contains("active"))));
