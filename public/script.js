const products = [
  {
    id: 1,
    name: 'NIKE Shoes',
    price: 20.00,
    image: 'https://images.pexels.com/photos/7445819/pexels-photo-7445819.jpeg?auto=compress&cs=tinysrgb&w=300' // Nike sneakers
  },
  {
    id: 2,
    name: 'Gucci Bag',
    price: 35.00,
    image: 'https://images.pexels.com/photos/31929486/pexels-photo-31929486/free-photo-of-elegant-white-handbag-with-gold-chain.jpeg?auto=compress&cs=tinysrgb&w=300' // Gucci-style bag
  },
  {
    id: 3,
    name: 'Crocs',
    price: 50.00,
    image: 'https://images.pexels.com/photos/13097398/pexels-photo-13097398.jpeg?auto=compress&cs=tinysrgb&w=300' // Crocs
  }
];

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the product list
function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:200px; height:auto;">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Function to render the cart
function renderCart() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<li>Your cart is empty</li>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!cart.some(item => item.id === productId)) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to your cart first.");
  } else {
    alert("Proceeding to checkout...");
    localStorage.removeItem('cart');
    window.location.href = '/success.html';
  }
}

// Initial render
renderProducts();
renderCart();
