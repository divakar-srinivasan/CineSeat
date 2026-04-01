
const CITY_KEY = "bookingState";
const container = document.getElementById("cities-container");

// Initialize state
const initializeState = (city) => {
  const state = {
    city: city,
    movie: null,
    theatre: null,
    showTime: null,
    seats: [],
    totalPrice: 0
  };

  localStorage.setItem(CITY_KEY, JSON.stringify(state));
};

// Render cities
const renderCities = (cities) => {
  container.innerHTML = cities.map(city => `
    <article class="city-card hover-lift" data-city="${city.name}">
      <a href="#">
        <span class="badge">${city.tag}</span>
        <strong>${city.name}</strong>
        <span class="text-muted">${city.description}</span>
      </a>
    </article>
  `).join("");
};


// Fetch JSON
const loadCities = async () => {
  try {
    const res = await fetch("../assets/data/cities.json");
    const data = await res.json();
    renderCities(data);
  } catch (err) {
    console.error("Failed to load cities:", err);
  }
};

// Event delegation
container.addEventListener("click", (e) => {
  const card = e.target.closest(".city-card");
  if (!card) return;

  e.preventDefault();

  const city = card.dataset.city;

  initializeState(city);

  window.location.href = "movies.html";
});

loadCities();