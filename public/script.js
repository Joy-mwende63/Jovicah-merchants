
const products = [
  { id: 1, name: 'T-Shirt', price: 19.99 },
  { id: 2, name: 'Mug', price: 9.99 },
];

const cart = [];

function displayProducts() {
  const container = document.getElementById('products');
  products.forEach(p => {
    const el = document.createElement('div');
    el.innerHTML = `
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(el);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  cart.forEach(p => {
    const item = document.createElement('li');
    item.textContent = `${p.name} - $${p.price.toFixed(2)}`;
    cartList.appendChild(item);
  });
}

function checkout() {
  fetch('/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart })
  })
  .then(res => res.json())
  .then(data => {
    window.location = data.url;
  });
}

displayProducts();
