const money = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const menus = [
  {
    id: "bakso-urat",
    name: "Bakso Urat",
    category: "Bakso",
    price: 18000,
    stock: 18,
    spice: "Sedang",
    description: "Bakso urat besar dengan mie kuning, bihun, sayur, dan kuah kaldu.",
    image: "assets/bakso-urat.svg",
  },
  {
    id: "bakso-telur",
    name: "Bakso Telur",
    category: "Bakso",
    price: 20000,
    stock: 12,
    spice: "Original",
    description: "Bakso isi telur dengan kuah gurih dan taburan bawang goreng.",
    image: "assets/bakso-telur.svg",
  },
  {
    id: "bakso-mercon",
    name: "Bakso Mercon",
    category: "Bakso",
    price: 22000,
    stock: 9,
    spice: "Mercon",
    description: "Bakso isi cabai untuk pelanggan yang suka rasa pedas kuat.",
    image: "assets/bakso-mercon.svg",
  },
  {
    id: "bakso-campur",
    name: "Bakso Campur",
    category: "Paket",
    price: 26000,
    stock: 15,
    spice: "Sedang",
    description: "Paket lengkap bakso halus, urat, tahu, pangsit, dan mie.",
    image: "assets/bakso-campur.svg",
  },
  {
    id: "mie-ayam-bakso",
    name: "Mie Ayam Bakso",
    category: "Mie",
    price: 21000,
    stock: 20,
    spice: "Original",
    description: "Mie ayam manis gurih dengan tambahan bakso dan pangsit kering.",
    image: "assets/mie-ayam-bakso.svg",
  },
  {
    id: "es-teh",
    name: "Es Teh Manis",
    category: "Minuman",
    price: 5000,
    stock: 40,
    spice: "Dingin",
    customizable: false,
    description: "Teh manis dingin untuk menyeimbangkan kuah bakso yang gurih.",
    image: "assets/es-teh.svg",
  },
  {
    id: "es-jeruk",
    name: "Es Jeruk",
    category: "Minuman",
    price: 7000,
    stock: 28,
    spice: "Dingin",
    customizable: false,
    description: "Jeruk peras dingin yang segar untuk teman makan bakso pedas.",
    image: "assets/es-jeruk.svg",
  },
  {
    id: "teh-hangat",
    name: "Teh Hangat",
    category: "Minuman",
    price: 4000,
    stock: 35,
    spice: "Hangat",
    customizable: false,
    description: "Teh manis hangat sederhana untuk pelanggan yang tidak ingin minuman dingin.",
    image: "assets/teh-hangat.svg",
  },
  {
    id: "air-mineral",
    name: "Air Mineral",
    category: "Minuman",
    price: 5000,
    stock: 50,
    spice: "Botol",
    customizable: false,
    description: "Air mineral botol untuk pilihan minuman yang ringan dan netral.",
    image: "assets/air-mineral.svg",
  },
];

const statusSteps = ["Menunggu", "Diproses", "Selesai"];
let activeCategory = "Semua";
let cart = [];
let orders = JSON.parse(localStorage.getItem("baksoOrders") || "[]");
let stocks = loadStocks();
let currentUser = JSON.parse(localStorage.getItem("baksoUser") || "null");

function setupAuthScaffold() {
  const nav = document.querySelector(".top-actions");
  const adminButton = document.querySelector('[data-view="admin"]');
  const ordersHeading = document.querySelector("#ordersView .section-heading");

  adminButton.classList.add("admin-only");
  nav.insertAdjacentHTML(
    "beforeend",
    '<button class="nav-btn" id="logoutBtn" type="button">Keluar</button>',
  );
  ordersHeading.insertAdjacentHTML(
    "beforeend",
    '<div class="search-wrap"><input id="orderSearchInput" type="search" placeholder="Cari nama pelanggan" aria-label="Cari pesanan berdasarkan nama pelanggan" /></div>',
  );
  document.querySelector(".app-header").insertAdjacentHTML(
    "afterend",
    `
      <section class="login-view" id="loginView" aria-labelledby="loginTitle">
        <form class="login-panel" id="loginForm">
          <div>
            <p class="eyebrow">Masuk akun</p>
            <h2 id="loginTitle">Login Pembeli atau Admin</h2>
          </div>

          <label>
            Peran
            <select id="loginRole">
              <option value="buyer">Pembeli</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>
            Nama
            <input id="loginName" type="text" placeholder="" required />
          </label>

          <label id="loginPasswordLabel">
            Password admin
            <input id="loginPassword" type="password" placeholder="" />
          </label>

          <button class="primary-btn" type="submit">Masuk</button>
        </form>
      </section>
    `,
  );
}

setupAuthScaffold();

const loginForm = document.querySelector("#loginForm");
const loginRole = document.querySelector("#loginRole");
const loginName = document.querySelector("#loginName");
const loginPassword = document.querySelector("#loginPassword");
const loginPasswordLabel = document.querySelector("#loginPasswordLabel");
const logoutBtn = document.querySelector("#logoutBtn");
const menuGrid = document.querySelector("#menuGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const searchInput = document.querySelector("#searchInput");
const orderSearchInput = document.querySelector("#orderSearchInput");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const checkoutForm = document.querySelector("#checkoutForm");
const customerOrders = document.querySelector("#customerOrders");
const adminOrders = document.querySelector("#adminOrders");
const stockList = document.querySelector("#stockList");

function formatMoney(value) {
  return money.format(value);
}

function saveOrders() {
  localStorage.setItem("baksoOrders", JSON.stringify(orders));
}

function saveCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem("baksoUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("baksoUser");
  }
}

function isAdmin() {
  return currentUser?.role === "admin";
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function loadStocks() {
  const savedRaw = localStorage.getItem("baksoStocks");
  const savedStocks = JSON.parse(savedRaw || "{}");
  return menus.reduce((result, menu) => {
    if (Number.isFinite(savedStocks[menu.id])) {
      result[menu.id] = savedStocks[menu.id];
      return result;
    }

    const sold = savedRaw
      ? 0
      : orders.reduce((sum, order) => {
          return sum + order.items
            .filter((item) => item.menuId === menu.id)
            .reduce((itemSum, item) => itemSum + item.qty, 0);
        }, 0);
    result[menu.id] = Math.max(menu.stock - sold, 0);
    return result;
  }, {});
}

function saveStocks() {
  localStorage.setItem("baksoStocks", JSON.stringify(stocks));
}

function getStock(menuId) {
  return stocks[menuId] || 0;
}

function getCartQty(menuId) {
  return cart
    .filter((item) => item.menuId === menuId)
    .reduce((sum, item) => sum + item.qty, 0);
}

function getAvailableStock(menuId) {
  return Math.max(getStock(menuId) - getCartQty(menuId), 0);
}

function validateCartStock() {
  const requested = new Map();
  cart.forEach((item) => {
    requested.set(item.menuId, (requested.get(item.menuId) || 0) + item.qty);
  });

  return [...requested.entries()].filter(([menuId, qty]) => qty > getStock(menuId));
}

function getCategories() {
  return ["Semua", ...new Set(menus.map((menu) => menu.category))];
}

function renderCategories() {
  categoryTabs.innerHTML = "";
  getCategories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-btn${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderMenus();
    });
    categoryTabs.append(button);
  });
}

function renderMenus() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = menus.filter((menu) => {
    const matchCategory = activeCategory === "Semua" || menu.category === activeCategory;
    const matchQuery = menu.name.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  menuGrid.innerHTML = "";
  const template = document.querySelector("#menuCardTemplate");

  filtered.forEach((menu) => {
    const available = getAvailableStock(menu.id);
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".menu-card");
    card.dataset.id = menu.id;
    node.querySelector("img").src = menu.image;
    node.querySelector("img").alt = menu.name;
    node.querySelector("h3").textContent = menu.name;
    node.querySelector(".price").textContent = formatMoney(menu.price);
    node.querySelector(".description").textContent = menu.description;
    const stockLabel = available === 0 ? "Stok Habis" : `Stok ${available}`;
    const stockClass = available === 0 ? "sold-out" : available <= 5 ? "hot" : "";
    node.querySelector(".meta-row").innerHTML = `
      <span class="pill">${menu.category}</span>
      <span class="pill ${menu.spice === "Mercon" ? "hot" : ""}">${menu.spice}</span>
      <span class="pill ${stockClass}">${stockLabel}</span>
    `;
    if (menu.customizable === false) {
      node.querySelector(".spice-select").closest("label").classList.add("is-hidden");
      node.querySelector(".topping-select").closest("label").classList.add("is-hidden");
    }

    const noteInput = node.querySelector(".note-input");
    const noteLabel = noteInput.closest("label");
    if (menu.category === "Minuman") {
      noteLabel.firstChild.textContent = "Catatan minuman";
      noteInput.placeholder = "Tanpa es, gula sedikit";
    } else {
      noteLabel.firstChild.textContent = "Catatan makanan";
      noteInput.placeholder = "Kuah dipisah, tanpa seledri";
    }

    const addButton = node.querySelector(".add-btn");
    if (!available) {
      addButton.disabled = true;
      addButton.textContent = getStock(menu.id) ? "Batas Stok" : "Stok Habis";
      addButton.setAttribute("aria-disabled", "true");
      card.classList.add("is-unavailable");
    }
    addButton.addEventListener("click", () => addToCart(card, menu));
    menuGrid.append(node);
  });
}

function addToCart(card, menu) {
  if (getAvailableStock(menu.id) <= 0) {
    alert(`${menu.name} sudah habis atau jumlah di keranjang sudah mencapai stok tersedia.`);
    return;
  }

  const spice = menu.customizable === false ? menu.spice : card.querySelector(".spice-select").value;
  const toppingSelect = card.querySelector(".topping-select");
  const topping = menu.customizable === false ? "Tanpa topping" : toppingSelect.value;
  const toppingPrice = menu.customizable === false ? 0 : Number(toppingSelect.selectedOptions[0].dataset.price);
  const note = card.querySelector(".note-input").value.trim();
  const key = `${menu.id}-${spice}-${topping}-${note}`;
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      menuId: menu.id,
      name: menu.name,
      price: menu.price,
      topping,
      toppingPrice,
      spice,
      note,
      customizable: menu.customizable !== false,
      qty: 1,
    });
  }

  renderCart();
  renderMenus();
}

function itemOptionsText(item) {
  const parts = item.customizable === false ? [item.spice] : [item.spice, item.topping];
  if (item.note) parts.push(item.note);
  return parts.join(" · ");
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + (item.price + item.toppingPrice) * item.qty, 0);
}

function renderCart() {
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-line">
        <strong>${item.name}</strong>
        <span>${formatMoney((item.price + item.toppingPrice) * item.qty)}</span>
      </div>
      <p class="muted">${itemOptionsText(item)}</p>
      <div class="qty-controls">
        <button type="button" data-action="minus">-</button>
        <strong>${item.qty}</strong>
        <button type="button" data-action="plus">+</button>
      </div>
    `;

    row.querySelector('[data-action="minus"]').addEventListener("click", () => {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart = cart.filter((cartItem) => cartItem.key !== item.key);
      }
      renderCart();
      renderMenus();
    });

    const plusButton = row.querySelector('[data-action="plus"]');
    plusButton.disabled = getAvailableStock(item.menuId) <= 0;
    plusButton.title = plusButton.disabled ? "Stok menu sudah mencapai batas" : "Tambah jumlah";
    plusButton.addEventListener("click", () => {
      if (getAvailableStock(item.menuId) <= 0) {
        alert(`Stok ${item.name} tidak cukup untuk menambah jumlah.`);
        return;
      }
      item.qty += 1;
      renderCart();
      renderMenus();
    });

    cartItems.append(row);
  });

  cartTotal.textContent = formatMoney(cartSubtotal());
}

function statusClass(status) {
  if (status === "Selesai") return "done";
  if (status === "Diproses") return "cooking";
  return "waiting";
}

function renderOrders() {
  customerOrders.innerHTML = "";
  adminOrders.innerHTML = "";
  const orderQuery = normalizeText(orderSearchInput.value);
  const customerVisibleOrders = orders.filter((order) => {
    return !orderQuery || order.customer.toLowerCase().includes(orderQuery);
  });

  customerVisibleOrders.forEach((order) => {
    const itemsText = order.items
      .map((item) => `${item.qty}x ${item.name} (${itemOptionsText(item)})`)
      .join(", ");
    const stepMarkup = statusSteps
      .map((status, index) => {
        const currentIndex = statusSteps.indexOf(order.status);
        const stateClass = index <= currentIndex ? "active" : "";
        return `<span class="mini-step ${stateClass}">${status}</span>`;
      })
      .join("");
    const orderNode = document.createElement("article");
    orderNode.className = "order-item";
    orderNode.innerHTML = `
      <div class="order-line">
        <div>
          <strong>${order.number} · ${order.customer}</strong>
          <p class="muted">${order.service} · ${order.detail} · ${order.payment}</p>
        </div>
        <span class="status ${statusClass(order.status)}">${order.status}</span>
      </div>
      <p class="muted">${itemsText}</p>
      <div class="mini-flow">${stepMarkup}</div>
      <div class="order-line">
        <strong>${formatMoney(order.total)}</strong>
        <span>${order.createdAt}</span>
      </div>
    `;
    customerOrders.append(orderNode.cloneNode(true));
  });

  orders.forEach((order) => {
    const itemsText = order.items
      .map((item) => `${item.qty}x ${item.name} (${itemOptionsText(item)})`)
      .join(", ");
    const stepMarkup = statusSteps
      .map((status, index) => {
        const currentIndex = statusSteps.indexOf(order.status);
        const stateClass = index <= currentIndex ? "active" : "";
        return `<span class="mini-step ${stateClass}">${status}</span>`;
      })
      .join("");
    const orderNode = document.createElement("article");
    orderNode.className = "order-item";
    orderNode.innerHTML = `
      <div class="order-line">
        <div>
          <strong>${order.number} · ${order.customer}</strong>
          <p class="muted">${order.service} · ${order.detail} · ${order.payment}</p>
        </div>
        <span class="status ${statusClass(order.status)}">${order.status}</span>
      </div>
      <p class="muted">${itemsText}</p>
      <div class="mini-flow">${stepMarkup}</div>
      <div class="order-line">
        <strong>${formatMoney(order.total)}</strong>
        <span>${order.createdAt}</span>
      </div>
    `;
    const adminNode = orderNode.cloneNode(true);
    const actions = document.createElement("div");
    actions.className = "order-actions";
    statusSteps.forEach((status) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = status;
      if (order.status === status) button.classList.add("active");
      button.addEventListener("click", () => {
        order.status = status;
        saveOrders();
        renderAll();
      });
      actions.append(button);
    });
    adminNode.append(actions);
    adminOrders.append(adminNode);
  });

  renderStats();
}

function renderStocks() {
  stockList.innerHTML = "";
  menus.forEach((menu) => {
    const sold = orders.reduce((sum, order) => {
      return sum + order.items
        .filter((item) => item.menuId === menu.id)
        .reduce((itemSum, item) => itemSum + item.qty, 0);
    }, 0);
    const row = document.createElement("article");
    row.className = "stock-item";
    const currentStock = getStock(menu.id);
    row.innerHTML = `
      <div class="stock-line">
        <strong>${menu.name}</strong>
        <span class="pill ${currentStock <= 5 ? "hot" : ""}">${currentStock} tersedia</span>
      </div>
      <p class="muted">Terjual ${sold} porsi. Stok awal  ${menu.stock} porsi.</p>
      <div class="stock-controls">
        <input type="number" min="0" value="${currentStock}" aria-label="Stok ${menu.name}" />
      </div>
    `;

    const input = row.querySelector("input");
    const updateStock = (value) => {
      stocks[menu.id] = Math.max(Number(value) || 0, 0);
      saveStocks();
      renderAll();
    };
    input.addEventListener("change", () => updateStock(input.value));
    stockList.append(row);
  });
}

function renderStats() {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const soldMap = new Map();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      soldMap.set(item.name, (soldMap.get(item.name) || 0) + item.qty);
    });
  });
  const bestSeller = [...soldMap.entries()].sort((a, b) => b[1] - a[1])[0];

  document.querySelector("#statOrders").textContent = orders.length;
  document.querySelector("#statRevenue").textContent = formatMoney(revenue);
  document.querySelector("#statBestSeller").textContent = bestSeller ? bestSeller[0] : "-";
  document.querySelector("#heroTotal").textContent = `${orders.filter((order) => order.status !== "Selesai").length} pesanan aktif`;
}

function renderAll() {
  renderMenus();
  renderCart();
  renderOrders();
  renderStocks();
  renderAuthState();
}

function createOrder(payload) {
  payload.items.forEach((item) => {
    stocks[item.menuId] = Math.max(getStock(item.menuId) - item.qty, 0);
  });
  saveStocks();

  const timestamp = new Date();
  const number = `BKS-${String(timestamp.getTime()).slice(-6)}`;
  orders.unshift({
    number,
    status: "Menunggu",
    createdAt: timestamp.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    ...payload,
  });
  saveOrders();
}

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    alert("Keranjang masih kosong.");
    return;
  }

  const stockErrors = validateCartStock();
  if (stockErrors.length) {
    const names = stockErrors
      .map(([menuId]) => menus.find((menu) => menu.id === menuId)?.name || menuId)
      .join(", ");
    alert(`Stok tidak cukup untuk: ${names}. Kurangi jumlah pesanan atau edit stok di admin.`);
    renderAll();
    return;
  }

  const customerNameValue = document.querySelector("#customerName").value.trim();
  createOrder({
    customer: customerNameValue,
    service: document.querySelector("#serviceType").value,
    detail: document.querySelector("#serviceDetail").value.trim(),
    payment: document.querySelector("#paymentMethod").value,
    items: cart.map((item) => ({ ...item })),
    total: cartSubtotal(),
  });

  cart = [];
  if (currentUser?.role === "buyer") {
    orderSearchInput.value = customerNameValue;
  }
  checkoutForm.reset();
  if (currentUser?.role === "buyer") {
    document.querySelector("#customerName").value = currentUser.name;
  }
  renderAll();
  switchView("orders");
});

document.querySelector("#clearCartBtn").addEventListener("click", () => {
  cart = [];
  renderAll();
});

function switchView(view) {
  if (view === "admin" && !isAdmin()) {
    alert("Halaman admin hanya bisa dibuka oleh admin.");
    view = "menu";
  }

  document.querySelectorAll(".view").forEach((element) => element.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((button) => button.classList.remove("active"));
  document.querySelector(`#${view}View`).classList.add("active");
  document.querySelector(`[data-view="${view}"]`).classList.add("active");
}

document.querySelectorAll(".nav-btn[data-view]").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

searchInput.addEventListener("input", renderMenus);
orderSearchInput.addEventListener("input", renderOrders);

function renderAuthState() {
  const loggedIn = Boolean(currentUser);
  document.body.classList.toggle("is-authenticated", loggedIn);
  document.body.classList.toggle("is-admin", isAdmin());
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.hidden = !isAdmin();
  });
  logoutBtn.hidden = !loggedIn;

  if (!loggedIn) {
    switchView("menu");
    return;
  }

  if (!isAdmin() && document.querySelector("#adminView").classList.contains("active")) {
    switchView("menu");
  }
}

function updateLoginPasswordVisibility() {
  const adminLogin = loginRole.value === "admin";
  loginPasswordLabel.classList.toggle("is-hidden", !adminLogin);
  loginPassword.required = adminLogin;
}

loginRole.addEventListener("change", updateLoginPasswordVisibility);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = loginRole.value;
  const name = loginName.value.trim();

  if (role === "admin" && loginPassword.value !== "admin123") {
    alert("Password admin salah.");
    return;
  }

  saveCurrentUser({ role, name: name || (role === "admin" ? "Admin" : "Pembeli") });
  if (role === "buyer") {
    orderSearchInput.value = name;
    document.querySelector("#customerName").value = name;
  } else {
    orderSearchInput.value = "";
  }
  loginForm.reset();
  updateLoginPasswordVisibility();
  renderAll();
  switchView(role === "admin" ? "admin" : "menu");
});

logoutBtn.addEventListener("click", () => {
  saveCurrentUser(null);
  cart = [];
  loginForm.reset();
  updateLoginPasswordVisibility();
  renderAll();
});

if (currentUser?.role === "buyer") {
  orderSearchInput.value = currentUser.name;
  document.querySelector("#customerName").value = currentUser.name;
}
updateLoginPasswordVisibility();
renderCategories();
renderAll();
