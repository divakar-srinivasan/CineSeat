const container = document.getElementById("movies-container");

// ---------------- CREATE CARD ----------------
const createMovieCard = (movie) => {
  return `
    <article class="card movie-card hover-lift">
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

        <a class="button" href="pages/city.html">Book Now</a>
      </div>
    </article>
  `;
};

// ---------------- RENDER ----------------
const renderMovies = (movies) => {
  container.innerHTML = movies.map(createMovieCard).join("");
};

// ---------------- LOAD ----------------
const loadMovies = async () => {
  try {
    const res = await fetch("assets/data/movies.json");
    const data = await res.json();

    renderMovies(data.slice(0, 4)); // show only few on homepage
  } catch (err) {
    console.error("Error loading movies:", err);
  }
};

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", loadMovies);