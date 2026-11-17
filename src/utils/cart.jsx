const KEY = "cart";

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function loadCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(KEY));
    if (cart && Array.isArray(cart.orderedItems)) return cart;
  } catch {
    // ignore corrupted data
  }
  return {
    orderedItems: [],
    days: 1,
    startingDate: formatDate(new Date()),
    endingDate: formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  };
}

function saveCart(cart) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    // storage unavailable
  }
  window.dispatchEvent(new Event("cart:updated"));
}

/** Adds `qty` (can be negative) to an item; removes it when it reaches 0. */
export function addToCart(key, qty = 1) {
  const cart = loadCart();
  const row = cart.orderedItems.find((i) => i.key === key);
  if (row) {
    row.qty += qty;
    if (row.qty <= 0) cart.orderedItems = cart.orderedItems.filter((i) => i.key !== key);
  } else if (qty > 0) {
    cart.orderedItems.push({ key, qty });
  }
  saveCart(cart);
}

export function setCartQty(key, qty) {
  const cart = loadCart();
  cart.orderedItems = cart.orderedItems
    .map((i) => (i.key === key ? { ...i, qty } : i))
    .filter((i) => i.qty > 0);
  saveCart(cart);
}
export const updateCartQty = setCartQty;

export function removeFromCart(key) {
  const cart = loadCart();
  cart.orderedItems = cart.orderedItems.filter((i) => i.key !== key);
  saveCart(cart);
}

export function setCartDates(startingDate, endingDate) {
  const cart = loadCart();
  cart.startingDate = startingDate;
  cart.endingDate = endingDate;
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("cart:updated"));
}

export function cartCount() {
  return loadCart().orderedItems.reduce((n, i) => n + i.qty, 0);
}
