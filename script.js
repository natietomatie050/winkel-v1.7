// Vul hier de paden naar de afbeeldingen die in je tab "photos" staan.
// Als je andere bestandsnamen gebruikt, zet die hier (relatief pad vanaf index.html).
const IMAGES = {
  "trench-coat": "IMAGES/assetsphotostrench-coat.png.png",      // #edit: vervang als nodig
  "white-shirt": "IMAGES/assetsphotoswhite-shirt.png.png",      // #edit
  "charcoal-rollneck": "IMAGES/assetsphotoscharcoal-rollneck.png.png", // #edit
  "charcoal-blazer": "IMAGES/assetsphotoscharcoal-blazer.png.png",     // #edit
  "brown-crewneck": "images/assetsphotosbrown-crewneck.png.png",       // #edit
  "navy-trousers": "IMAGES/assetsphotosnavy-trousers.png.png",         // #edit
  "brown-oxfords": "IMAGES/assetsphotosbrown-oxfords.png.png",         // #edit
  "leather-belt": "IMAGES/assetsphotoscognac-riem.png.png"           // #edit
};

function resolveImage(key, fallbackQuery) {
  // Als IMAGES[key] leeg is gebruiken we een Unsplash fallback (geen crash)
  if (IMAGES[key] && IMAGES[key].trim() !== "") return IMAGES[key];
  return `https://source.unsplash.com/800x1066/?${encodeURIComponent(fallbackQuery)}`;
}

const products = [
  {
    id: "trench-coat",
    name: "Camel trenchcoat",
    image: resolveImage("trench-coat", "trench-coat,coat,men"),
    price: 520,
    description:
      "Een waterafstotende trenchcoat met Italiaanse katoenen gabardine, afneembare riem en donkere knopen.",
    category: "heren",
  },
  {
    id: "white-shirt",
    name: "Snow Oxford shirt",
    image: resolveImage("white-shirt", "white-shirt,shirt,men"),
    price: 129,
    description:
      "Gemaakt van compact geweven katoen met parelmoer knopen. Tweede exemplaar gratis in de stijltest.",
    category: "heren",
    sale: { type: "bogo", message: "2e gratis" },
  },
  {
    id: "charcoal-rollneck",
    name: "Charcoal coltrui",
    image: resolveImage("charcoal-rollneck", "rollneck,sweater,men"),
    price: 189,
    description:
      "Fijngebreide merinowol met hoge col om onder colberts te dragen en warmte toe te voegen zonder volume.",
    category: "heren",
  },
  {
    id: "charcoal-blazer",
    name: "Graphite blazer",
    image: resolveImage("charcoal-blazer", "blazer,suit,men"),
    price: 649,
    description:
      "Ongevoerd wolblazer in donkergrijze tint, geïnspireerd op Italiaanse sartoria met zachte schouders.",
    category: "heren",
  },
  {
    id: "brown-crewneck",
    name: "Castagna crewneck",
    image: resolveImage("brown-crewneck", "crewneck,sweater,men"),
    price: 210,
    description:
      "Kasjmiermix in warme kastanje kleur. Tijdelijke 20% korting bij de profielwerkstuk test.",
    category: "heren",
    sale: { type: "percent", value: 0.2, message: "20% korting" },
  },
  {
    id: "navy-trousers",
    name: "Slim navy trousers",
    image: resolveImage("navy-trousers", "trousers,pants,men"),
    price: 260,
    description:
      "Nauwsluitende pantalon met dubbele plooi en verstelbare tailleband, afgewerkt met verborgen haaksluiting.",
    category: "heren",
  },
  {
    id: "brown-oxfords",
    name: "Chestnut oxfords",
    image: resolveImage("brown-oxfords", "oxfords,shoes,men"),
    price: 330,
    description:
      "Kalfsleren veterschoen met subtiele cap toe en Blake-constructie voor soepele afwikkeling.",
    category: "heren",
  },
  {
    id: "leather-belt",
    name: "Cognac riem",
    image: resolveImage("leather-belt", "leather-belt,belt"),
    price: 145,
    description:
      "Handgekleurd leer met gepolijste messing gesp. Combineer met de Chestnut oxfords voor een complete look.",
    category: "heren",
    sale: { type: "percent", value: 0.15, message: "15% research korting" },
  },
];

const bundles = [
  {
    id: "boardroom-poise",
    name: "Boardroom poise",
    image: resolveImage("charcoal-blazer", "suit,business,men"),
    price: 1420,
    savings: 120,
    description:
      "Blazer, oxford shirt, pantalon, riem en schoenen voor een volledige meeting-set.",
    items: [
      "charcoal-blazer",
      "white-shirt",
      "navy-trousers",
      "leather-belt",
      "brown-oxfords",
    ],
  },
  {
    id: "rainy-commute",
    name: "Rainy commute set",
    image: resolveImage("trench-coat", "raincoat,commute,men"),
    price: 899,
    savings: 90,
    description:
      "Trenchcoat met coltrui en pantalon voor comfort tijdens regenachtige stadsdagen.",
    items: ["trench-coat", "charcoal-rollneck", "navy-trousers"],
  },
  {
    id: "weekend-retreat",
    name: "Weekend retreat",
    image: resolveImage("brown-crewneck", "casual,weekend,men"),
    price: 540,
    savings: 60,
    description:
      "Casual luxe voor vrije tijd: crewneck, coltrui en denim-look pantalon.",
    items: ["brown-crewneck", "charcoal-rollneck", "navy-trousers"],
  },
];

const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
const bundleMap = Object.fromEntries(bundles.map((b) => [b.id, b]));

const state = {
  customerName: "",
  cart: [],
  considered: new Set(),
  viewed: new Set(),
  registrationSent: false,
};

const accessForm = document.getElementById("access-form");
const userNameInput = document.getElementById("user-name");
const gate = document.getElementById("access-gate");
const gateError = document.getElementById("gate-error");
const gatedContent = document.querySelector(".gated-content");
const navCheckout = document.getElementById("nav-checkout");
const heroCheckout = document.getElementById("hero-checkout");
const heroScroll = document.getElementById("hero-scroll");
const cartTotalLabel = document.getElementById("cart-total");
const productGrid = document.getElementById("product-grid");
const saleGrid = document.getElementById("sale-grid");
const bundleGrid = document.getElementById("bundle-grid");
const lookbookGrid = document.getElementById("lookbook-grid");
const cartInsight = document.getElementById("cart-insight");
const abandonedInsight = document.getElementById("abandoned-insight");
const checkoutPanel = document.getElementById("checkout");
const checkoutBack = document.getElementById("checkout-back");
const checkoutList = document.getElementById("checkout-list");
const checkoutEmpty = document.getElementById("checkout-empty");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutSavings = document.getElementById("checkout-savings");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutSubmit = document.getElementById("checkout-submit");
const toast = document.getElementById("toast");

const modal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalOverlay = document.getElementById("modal-overlay");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalQuantity = document.getElementById("modal-quantity");
const modalAdd = document.getElementById("modal-add");
const revealElements = document.querySelectorAll("[data-reveal]");

let activeModalItem = null;

function formatCurrency(amount) {
  return amount.toLocaleString("nl-NL", {
    style: "currency",
    currency: "EUR",
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function markConsidered(type, id) {
  state.considered.add(`${type}:${id}`);
}

function markViewed(type, id) {
  state.viewed.add(`${type}:${id}`);
}

function renderProducts() {
  productGrid.innerHTML = "";
  products
    .filter((product) => product.category === "heren")
    .forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-card__media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="product-card__body">
          <h3>${product.name}</h3>
          <p>Open voor details en prijsinformatie.</p>
        </div>
      `;
      card.addEventListener("click", () => openProductModal(product, "product"));
      productGrid.appendChild(card);
    });
}

function renderSale() {
  saleGrid.innerHTML = "";
  products
    .filter((product) => product.sale)
    .forEach((product) => {
      const card = document.createElement("article");
      card.className = "sale-card";
      card.innerHTML = `
        <div class="sale-card__media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="sale-card__body">
          <h3>${product.name}</h3>
          <p>${product.sale.message} — ontdek prijs in het detailvenster.</p>
        </div>
      `;
      card.addEventListener("click", () => openProductModal(product, "product"));
      saleGrid.appendChild(card);
    });
}

function renderBundles() {
  bundleGrid.innerHTML = "";
  bundles.forEach((bundle) => {
    const card = document.createElement("article");
    card.className = "bundle-card";
    const list = bundle.items
      .map((id) => `<li>${productMap[id]?.name ?? id}</li>`)
      .join("");
    card.innerHTML = `
      <div class="bundle-card__media">
        <img src="${bundle.image}" alt="${bundle.name}" loading="lazy" />
      </div>
      <div class="bundle-card__body">
        <h3>${bundle.name}</h3>
        <p>${bundle.description}</p>
        <ul>${list}</ul>
      </div>
    `;
    card.addEventListener("click", () => openProductModal(bundle, "bundle"));
    bundleGrid.appendChild(card);
  });
}

function renderLookbook() {
  lookbookGrid.innerHTML = "";
  products
    .filter((product) => product.id !== "leather-belt")
    .forEach((product) => {
      const button = document.createElement("button");
      button.className = "lookbook__item";
      button.setAttribute("type", "button");
      button.innerHTML = `<img src="${product.image}" alt="${product.name}" loading="lazy" />`;
      button.addEventListener("click", () => openProductModal(product, "product"));
      lookbookGrid.appendChild(button);
    });
}

function openProductModal(item, type) {
  activeModalItem = { ...item, type };
  markConsidered(type, item.id);
  markViewed(type, item.id);
  modalImage.src = item.image;
  modalImage.alt = item.name;
  modalTitle.textContent = item.name;
  modalDescription.textContent = item.description;
  modalQuantity.value = 1;

  if (type === "product") {
    modalPrice.textContent = formatCurrency(item.price);
    modalAdd.textContent = "Voeg toe aan winkelmand";
  } else {
    const savingsLabel = item.savings
      ? ` (bespaar ${formatCurrency(item.savings)})`
      : "";
    modalPrice.textContent = `${formatCurrency(item.price)}${savingsLabel}`;
    modalAdd.textContent = "Voeg pakket toe";
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

function addToCart(type, id, quantity) {
  if (!quantity || quantity < 1) return;
  const key = `${type}:${id}`;
  const existing = state.cart.find((item) => item.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ key, type, id, quantity });
  }
  updateCartUi();
  const label =
    type === "product" ? productMap[id].name : bundleMap[id].name;
  showToast(`${label} toegevoegd aan je winkelmand.`);
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  updateCartUi();
}

function adjustQuantity(key, delta) {
  const entry = state.cart.find((item) => item.key === key);
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    removeFromCart(key);
  } else {
    updateCartUi();
  }
}

function computeDiscount(product, quantity) {
  if (!product.sale) return 0;
  if (product.sale.type === "bogo") {
    return Math.floor(quantity / 2) * product.price;
  }
  if (product.sale.type === "percent") {
    return product.price * product.sale.value * quantity;
  }
  return 0;
}

function calculateCart() {
  let subtotal = 0;
  let savings = 0;

  for (const entry of state.cart) {
    if (entry.type === "product") {
      const product = productMap[entry.id];
      if (!product) continue;
      subtotal += product.price * entry.quantity;
      savings += computeDiscount(product, entry.quantity);
    } else {
      const bundle = bundleMap[entry.id];
      if (!bundle) continue;
      subtotal += bundle.price * entry.quantity;
      if (bundle.savings) savings += bundle.savings * entry.quantity;
    }
  }

  const total = Math.max(subtotal - savings, 0);
  return { subtotal, savings, total };
}

function updateCartUi() {
  const { total } = calculateCart();
  cartTotalLabel.textContent = formatCurrency(total);
  updateInsights();
  renderCheckout();
}

function updateInsights() {
  cartInsight.innerHTML = "";
  if (state.cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nog geen items toegevoegd.";
    cartInsight.appendChild(li);
  } else {
    state.cart.forEach((entry) => {
      const label =
        entry.type === "product"
          ? productMap[entry.id]?.name
          : bundleMap[entry.id]?.name;
      const li = document.createElement("li");
      li.textContent = `${entry.quantity} × ${label}`;
      cartInsight.appendChild(li);
    });
  }

  abandonedInsight.innerHTML = "";
  const purchasedKeys = new Set(state.cart.map((entry) => entry.key));
  const abandoned = Array.from(state.considered).filter(
    (key) => !purchasedKeys.has(key)
  );

  if (abandoned.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nog geen verlaten keuzes.";
    abandonedInsight.appendChild(li);
  } else {
    abandoned.forEach((key) => {
      const [type, id] = key.split(":");
      const label =
        type === "product"
          ? productMap[id]?.name
          : bundleMap[id]?.name;
      const li = document.createElement("li");
      li.textContent = label ?? key;
      abandonedInsight.appendChild(li);
    });
  }
}

function renderCheckout() {
  checkoutList.innerHTML = "";
  if (state.cart.length === 0) {
    checkoutEmpty.hidden = false;
  } else {
    checkoutEmpty.hidden = true;
    state.cart.forEach((entry) => {
      const label =
        entry.type === "product"
          ? productMap[entry.id]?.name
          : bundleMap[entry.id]?.name;
      const price =
        entry.type === "product"
          ? productMap[entry.id]?.price ?? 0
          : bundleMap[entry.id]?.price ?? 0;
      const li = document.createElement("li");
      li.className = "checkout__item";
      li.dataset.key = entry.key;
      li.innerHTML = `
        <header>
          <span>${label}</span>
          <span>${formatCurrency(price)}</span>
        </header>
        <div class="checkout__item-controls">
          <button type="button" data-action="decrease">−</button>
          <span>${entry.quantity}</span>
          <button type="button" data-action="increase">+</button>
          <button type="button" data-action="remove" aria-label="Verwijder">×</button>
        </div>
      `;
      checkoutList.appendChild(li);
    });
  }

  const { subtotal, savings, total } = calculateCart();
  checkoutSubtotal.textContent = formatCurrency(subtotal);
  checkoutSavings.textContent = `-${formatCurrency(savings)}`;
  checkoutTotal.textContent = formatCurrency(total);
}

function openCheckout() {
  checkoutPanel.hidden = false;
  document.body.style.overflow = "hidden";
  renderCheckout();
}

function closeCheckout() {
  checkoutPanel.hidden = true;
  document.body.style.overflow = "";
}

function gatherPayload() {
  const { subtotal, savings, total } = calculateCart();
  const purchased = state.cart.map((entry) => {
    const base = {
      type: entry.type,
      id: entry.id,
      quantity: entry.quantity,
    };
    if (entry.type === "product") {
      const product = productMap[entry.id];
      return {
        ...base,
        name: product?.name,
        unitPrice: product?.price,
        discount: computeDiscount(product, entry.quantity),
      };
    }
    const bundle = bundleMap[entry.id];
    return {
      ...base,
      name: bundle?.name,
      unitPrice: bundle?.price,
      discount: bundle?.savings ?? 0,
    };
  });

  const purchasedKeys = new Set(state.cart.map((entry) => entry.key));
  const abandoned = Array.from(state.considered)
    .filter((key) => !purchasedKeys.has(key))
    .map((key) => {
      const [type, id] = key.split(":");
      return {
        type,
        id,
        name:
          type === "product"
            ? productMap[id]?.name
            : bundleMap[id]?.name,
      };
    });

  return {
    phase: "checkout",
    name: state.customerName,
    subtotal,
    savings,
    total,
    purchased,
    abandoned,
    viewed: Array.from(state.viewed),
    timestamp: new Date().toISOString(),
  };
}

async function sendToFormspree(payload) {
  try {
    const response = await fetch("https://formspree.io/f/mwpagopv/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Fout ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Formspree fout", error);
    return false;
  }
}

async function handleCheckoutSubmit() {
  if (state.cart.length === 0) {
    showToast("Je winkelmand is nog leeg.");
    return;
  }
  const payload = gatherPayload();
  showToast("Versturen naar Formspree...");
  const success = await sendToFormspree(payload);
  if (success) {
    showToast("Keuzes succesvol verzonden.");
    state.cart = [];
    updateCartUi();
    closeCheckout();
  } else {
    showToast("Versturen mislukt. Probeer later opnieuw.");
  }
}

function handleCheckoutControls(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const key = button.closest(".checkout__item")?.dataset.key;
  if (!key) return;

  if (action === "increase") {
    adjustQuantity(key, 1);
  } else if (action === "decrease") {
    adjustQuantity(key, -1);
  } else if (action === "remove") {
    removeFromCart(key);
  }
}

function initNavigation() {
  navCheckout.addEventListener("click", openCheckout);
  heroCheckout.addEventListener("click", openCheckout);
  checkoutBack.addEventListener("click", closeCheckout);
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  modalAdd.addEventListener("click", () => {
    if (!activeModalItem) return;
    const quantity = Number.parseInt(modalQuantity.value, 10) || 1;
    addToCart(activeModalItem.type, activeModalItem.id, quantity);
    closeModal();
  });
  checkoutList.addEventListener("click", handleCheckoutControls);
  checkoutSubmit.addEventListener("click", handleCheckoutSubmit);
  heroScroll.addEventListener("click", () => {
    const lookbookSection = document.getElementById("lookbook");
    if (lookbookSection) {
      lookbookSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    document
      .getElementById("menswear")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!modal.hidden) closeModal();
      if (!checkoutPanel.hidden) closeCheckout();
    }
  });
}

function initReveal() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const observer = prefersReduced
    ? null
    : new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -10% 0px",
        }
      );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    if (prefersReduced) {
      element.classList.add("is-visible");
    } else {
      observer?.observe(element);
    }
  });
}

function handleAccessSubmit(event) {
  event.preventDefault();
  const data = new FormData(accessForm);
  const name = String(data.get("name") || "").trim();
  if (name.length < 2) {
    gateError.hidden = false;
    gateError.textContent = "Vul een geldige naam in.";
    return;
  }
  gateError.hidden = true;
  state.customerName = name;
  localStorage.setItem("nathanCustomerName", name);
  document.body.classList.remove("is-gated");
  gatedContent.setAttribute("aria-hidden", "false");
  gate.setAttribute("aria-hidden", "true");
  showToast(`Welkom ${name}, veel succes met de stijltest.`);
  if (!state.registrationSent) {
    sendToFormspree({
      phase: "registration",
      name,
      timestamp: new Date().toISOString(),
    });
    state.registrationSent = true;
  }
}

function bootstrap() {
  const storedName = localStorage.getItem("nathanCustomerName");
  if (storedName) {
    userNameInput.value = storedName;
  }
  renderProducts();
  renderSale();
  renderBundles();
  renderLookbook();
  initReveal();
  updateCartUi();
  initNavigation();
  accessForm.addEventListener("submit", handleAccessSubmit);

  // Zorg dat hero afbeelding zichtbaar is (fallback naar trench-coat asset)
  try {
    const heroImg = document.getElementById("hero-image");
    if (heroImg) {
      heroImg.src = productMap["trench-coat"]?.image ?? "IMAGES/assetsphotostrench-coat.png.png";
      heroImg.alt = productMap["trench-coat"]?.name ?? "Camel trenchcoat";
    }
  } catch (e) {
    // noop
  }
}

bootstrap();