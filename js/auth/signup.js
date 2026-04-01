const USERS_KEY = "users";

// ---------------- GET USERS ----------------
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// ---------------- SAVE USERS ----------------
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ---------------- SIGNUP ----------------
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = getUsers();

  // check existing
  const exists = users.find(u => u.email === email);

  if (exists) {
    alert("User already exists");
    return;
  }

  const newUser = { name, email, password };

  users.push(newUser);
  saveUsers(users);

  alert("Signup successful!");

  window.location.href = "login.html";
});