const loadComponent = async (id, path) => {
  try {
    const res = await fetch(path);
    const html = await res.text();

    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Failed to load ${path}`, err);
  }
};

// Load components
loadComponent("navbar", "../../components/header.html");
loadComponent("footer", "../../components/footer.html");