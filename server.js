const express = require('express');
const bodyParser = require('body-parser');
// const stripe = require('stripe')('your_stripe_secret_key_here');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/checkout', async (req, res) => {
  const items = req.body.items;
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,
    success_url: 'http://localhost:3000/success.html',
    cancel_url: 'http://localhost:3000/cancel.html',
  });

  res.json({ url: session.url });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
