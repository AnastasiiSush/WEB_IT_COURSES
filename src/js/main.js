import "../styles/main.scss";
import { Store } from "./core/store.js";
import { api } from "./api/http.js";
import { endpoints } from "./api/endpoints.js";

// ------------------------------------------
// Mobile navigation (burger menu)
// ------------------------------------------
function initBurger() {
  const burger = document.querySelector(".header__burger");
  const nav = document.getElementById("main-nav");
  if (!burger || !nav) {
    return;
  }

  const setOpen = (isOpen) => {
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    nav.classList.toggle("nav--open", isOpen);
  };

  burger.addEventListener("click", () => {
    setOpen(burger.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      burger.focus();
    }
  });
}

// ------------------------------------------
// Starter data demo (runs only if #app exists; used in LR 4)
// ------------------------------------------
function initDataDemo() {
  const root = document.getElementById("app");
  if (!root) {
    return;
  }

  const store = new Store({ items: [], loading: false, error: null });

  const render = () => {
    const { items, loading, error } = store.get();
    root.innerHTML = "";

    if (loading) {
      root.append("Loading...");
      return;
    }
    if (error) {
      root.append(`Error: ${error}`);
      return;
    }

    const list = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.title} — ${item.price}`;
      list.appendChild(li);
    });
    root.appendChild(list);
  };

  store.subscribe(render);
  store.set({ loading: true });
  api
    .get(endpoints.items)
    .then((res) => store.set({ items: res.data, loading: false, error: null }))
    .catch((err) => store.set({ error: err.message, loading: false }));
}

initBurger();
initDataDemo();
