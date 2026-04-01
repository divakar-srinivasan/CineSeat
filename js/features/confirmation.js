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
  window.location.href = "movies.html";
} else {
  const { movie, theatre, showTime, seats, totalPrice } = state;

  // ---------------- HELPER ----------------
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  // ---------------- BOOKING ID GENERATION ----------------
  const generateBookingId = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `CS-${formattedDate}-${random}`;
  };

  const bookingId = generateBookingId();

  // ---------------- SEATS ----------------
  const seatNames = seats.map(s => s.id).join(", ");

  // ---------------- PRICING ----------------
  const fee = 30 * seats.length;
  const gst = Math.round((totalPrice + fee) * 0.05);
  const finalTotal = totalPrice + fee + gst;

  // ---------------- SET UI ----------------
  setText("booking-id", bookingId);
  setText("summary-movie", movie);
  setText("summary-theatre", theatre);
  setText("summary-time", showTime);
  setText("summary-seats", seatNames);
  setText("price-total", `₹${finalTotal}`);

  // ---------------- CLEAR STATE (IMPORTANT) ----------------
  localStorage.removeItem(STATE_KEY);
}