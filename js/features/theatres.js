// js/features/theatres.js

const STATE_KEY = "bookingState";
const container = document.getElementById("theatres-container");

// ---------------- STATE ----------------
const getState = () => JSON.parse(localStorage.getItem(STATE_KEY));
const saveState = (state) => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const state = getState();

// ---------------- GUARD ----------------
if (!state || !state.city || !state.movie) {
  window.location.href = "movies.html";
}

// ---------------- UPDATE UI ----------------
document.getElementById("movie-title").textContent = state.movie;
document.getElementById("summary-city").textContent = state.city;
document.getElementById("summary-movie").textContent = state.movie;

// ---------------- CREATE CARD ----------------
const createTheatreCard = (theatre) => {
  return `
    <article class="card theatre-card" data-theatre="${theatre.name}">
      <div class="theatre-card-header">
        <div>
          <h3>${theatre.name}</h3>
          <p class="text-muted">${theatre.location}</p>
        </div>
        <span class="badge">${theatre.tag}</span>
      </div>

      <p class="text-muted">${theatre.features}</p>

      <div class="showtime-group">
        ${theatre.showtimes.map(time => `
          <a class="showtime-btn" href="#" data-time="${time}">
            ${time}
          </a>
        `).join("")}
      </div>
    </article>
  `;
};

// ---------------- RENDER ----------------
const renderTheatres = (data) => {
  container.innerHTML = data.map(createTheatreCard).join("");
};

// ---------------- FETCH ----------------
const loadTheatres = async () => {
  try {
    const res = await fetch("../assets/data/theatres.json");
    const data = await res.json();

    renderTheatres(data);
  } catch (err) {
    console.error("Error loading theatres:", err);
  }
};

// ---------------- EVENTS ----------------
container.addEventListener("click", (e) => {
  const btn = e.target.closest(".showtime-btn");
  if (!btn) return;

  e.preventDefault();

  const theatreCard = btn.closest(".theatre-card");

  const theatre = theatreCard.dataset.theatre;
  const showTime = btn.dataset.time;

  // ✅ UPDATE STATE
  state.theatre = theatre;
  state.showTime = showTime;

  saveState(state);

  // Navigate
  window.location.href = "seats.html";
});

// ---------------- INIT ----------------
loadTheatres();