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

// ---------------- SAFE MODE ----------------
if (!state || !state.seats || state.seats.length === 0) {
  console.warn("No booking state found");
} else {

  const { movie, theatre, showTime, seats, totalPrice } = state;

  // ---------------- BASIC INFO ----------------
  document.getElementById("summary-movie").textContent = movie;
  document.getElementById("summary-theatre").textContent = theatre;
  document.getElementById("summary-time").textContent = showTime;

  // ---------------- SEATS ----------------
  const seatNames = seats.map(s => s.id).join(", ");
  document.getElementById("summary-seats").textContent = seatNames;

  // ---------------- MULTI SEAT TYPE ----------------
  const seatTypeMap = seats.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {});

  const seatTypeText = Object.entries(seatTypeMap)
    .map(([type, count]) => `${type.toUpperCase()} x ${count}`)
    .join(", ");

  document.getElementById("summary-seat-type").textContent = seatTypeText;

  // ---------------- PRICING ---------------- 
  const basePrice = totalPrice;
  const fee = 30 * seats.length;
  const gst = Math.round((basePrice + fee) * 0.05);
  const finalTotal = basePrice + fee + gst;

  document.getElementById("price-label").textContent = seatTypeText;
  document.getElementById("price-base").textContent = `₹${basePrice}`;
  document.getElementById("price-fee").textContent = `₹${fee}`;
  document.getElementById("price-gst").textContent = `₹${gst}`;
  document.getElementById("price-total").textContent = `₹${finalTotal}`;
}