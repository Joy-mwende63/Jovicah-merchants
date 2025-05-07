const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/checkout', (req, res) => {
  try {
    const items = req.body.items;

    console.log('Received checkout items:', items);

    // Simulate a successful checkout (no Stripe)
    res.json({ url: '/success.html' });
  } catch (error) {
    console.error('Checkout error:', error.message);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
