const STATE_KEY = "bookingState";
const container = document.getElementById("movies-container");

// ---------------- STATE ----------------
const getState = () => JSON.parse(localStorage.getItem(STATE_KEY));

const saveState = (state) => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

// ---------------- GUARD ----------------
const state = getState();

if (!state || !state.city) {
  window.location.href = "city.html";
}

// ---------------- UPDATE CITY TITLE ----------------
const cityTitle = document.getElementById("city-title");
cityTitle.textContent = `Now showing in ${state.city}`;

// ---------------- CREATE CARD ----------------
const createMovieCard = (movie) => {
  return `
    <article class="card movie-card hover-lift" data-movie="${movie.name}">
      <img src="${movie.image}" alt="${movie.name} poster">
      
      <div class="movie-card-content">
        <div class="split">
          <h3>${movie.name}</h3>
          <span class="rating-badge">${movie.rating}</span>
        </div>

        <div class="card-meta">
          <span class="badge">${movie.genre}</span>
          <span class="pill">${movie.language}</span>
          <span class="pill">${movie.format}</span>
        </div>

        <p class="text-muted">
          ${movie.duration} · ${movie.description}
        </p>

        <a class="button" href="#">Select Theatre</a>
      </div>
    </article>
  `;
};

// ---------------- RENDER ----------------
const renderMovies = (movies) => {
  container.innerHTML = movies.map(createMovieCard).join("");
};

// ---------------- LOAD DATA ----------------
const loadMovies = async () => {
  try {
    const res = await fetch("../assets/data/movies.json");
    const data = await res.json();

    renderMovies(data);
  } catch (err) {
    console.error("Error loading movies:", err);
  }
};

// ---------------- EVENTS ----------------
container.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card");
  if (!card) return;

  e.preventDefault();

  const movie = card.dataset.movie;

  // ✅ UPDATE STATE
  state.movie = movie;

  saveState(state);

  // Navigate
  window.location.href = "theatres.html";
});

// ---------------- INIT ----------------
loadMovies();