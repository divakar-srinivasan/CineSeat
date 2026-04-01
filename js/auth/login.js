const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// ---------------- GET USERS ----------------
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// ---------------- SAVE USER ----------------
const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// ---------------- LOGIN ----------------
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  setCurrentUser(user);

  alert("Login successful!");

  // redirect
  window.location.href = "../index.html";
});