const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake database (in-memory)
let products = [
  { id: 1, name: 'Shirt', description: 'Blue shirt', price: 25.99 },
  { id: 2, name: 'Jeans', description: 'Slim fit jeans', price: 45.99 }
];

let orders = [];

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/orders', (req, res) => {
  const order = req.body;
  order.id = orders.length + 1;
  orders.push(order);
  res.status(201).json({ message: 'Order placed', orderId: order.id });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
