const STATE_KEY = "bookingState";

// ---------------- STATE ----------------
const getState = () => {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY));
  } catch {
    return null;
  }
};

const saveState = (state) => {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

// Safe state
const state = getState() || {};

// ---------------- GUARD ----------------
if (!state.movie || !state.theatre || !state.showTime) {
  window.location.href = "theatres.html";
}

// ---------------- UI INIT ----------------
const movieEl = document.getElementById("summary-movie");
const theatreEl = document.getElementById("summary-theatre");
const timeEl = document.getElementById("summary-time");

if (movieEl) movieEl.textContent = state.movie;
if (theatreEl) theatreEl.textContent = state.theatre;
if (timeEl) timeEl.textContent = state.showTime;

const selectedSeatsEl = document.getElementById("selected-seats");
const totalPriceEl = document.getElementById("total-price");

// ---------------- PRICING ----------------
const seatPrices = {
  vip: 350,
  premium: 250,
  available: 180
};

// Load previous selection if exists
let selectedSeats = state.seats || [];

// ---------------- HELPER ----------------
const getSeatType = (seat) => {
  if (seat.classList.contains("vip")) return "vip";
  if (seat.classList.contains("premium")) return "premium";
  return "available";
};

// ---------------- EVENT DELEGATION (IMPORTANT) ----------------
document.querySelector(".seat-map").addEventListener("click", (e) => {
  const seat = e.target.closest(".seat");

  if (!seat || seat.disabled) return;

  const seatId = seat.textContent.trim();
  const type = getSeatType(seat);

  const exists = selectedSeats.find(s => s.id === seatId);

  if (exists) {
    // REMOVE
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s.id !== seatId);
  } else {
    // ADD
    seat.classList.add("selected");
    selectedSeats.push({
      id: seatId,
      type,
      price: seatPrices[type]
    });
  }

  updateSummary();
});

// ---------------- UPDATE SUMMARY ----------------
function updateSummary() {
  const seatNames = selectedSeats.map(s => s.id).join(", ");
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  if (selectedSeatsEl) {
    selectedSeatsEl.textContent = seatNames || "None";
  }

  if (totalPriceEl) {
    totalPriceEl.textContent = `₹${total}`;
  }

  // SAVE STATE
  state.seats = selectedSeats;
  state.totalPrice = total;

  saveState(state);
}

// ---------------- RESTORE UI (VERY IMPORTANT) ----------------
function restoreSelectedSeats() {
  selectedSeats.forEach(s => {
    const seatEl = [...document.querySelectorAll(".seat")]
      .find(el => el.textContent.trim() === s.id);

    if (seatEl) {
      seatEl.classList.add("selected");
    }
  });
}

// ---------------- INIT ----------------
restoreSelectedSeats();
updateSummary();