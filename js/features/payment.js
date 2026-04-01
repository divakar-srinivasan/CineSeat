const STATE_KEY = "bookingState";

// ---------------- STATE ----------------
const getState = () => {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY));
  } catch {
    return null;
  }
};

const state = getState();

// ---------------- GUARD ----------------
if (!state || !state.seats || state.seats.length === 0) {
  window.location.href = "movies.html"; // redirect if no booking
} else {
  const { movie, theatre, seats, totalPrice } = state;

  // ---------------- BASIC INFO ----------------
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("summary-movie", movie);
  setText("summary-theatre", theatre);

  // ---------------- SEATS ----------------
  const seatNames = seats.map(s => s.id).join(", ");
  setText("summary-seats", seatNames);

  // ---------------- PRICING ----------------
  const fee = 30 * seats.length;
  const gst = Math.round((totalPrice + fee) * 0.05);
  const finalTotal = totalPrice + fee + gst;

  setText("price-total", `₹${finalTotal}`);
}