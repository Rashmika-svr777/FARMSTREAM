const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const orders = require('./orders');


const app = express();
const PORT = process.env.PORT || 3001;

const products = require('./products'); // Your products data
const users = require('./users'); // User data array

const SECRET_KEY = 'farmstream-secret'; // Keep in env variable for real projects

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to FarmStream Store API!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username min 3 chars'),
    body('password').isLength({ min: 5 }).withMessage('Password min 5 chars')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.json({ message: 'User registered successfully' });
  }
);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, username });
});

// In real app, authenticate user; here we accept username in body
app.post('/api/orders', (req, res) => {
  const { username, items, address } = req.body;
  if (!username || !items || !address) {
    return res.status(400).json({ message: 'Missing order details' });
  }
  const order = {
    id: orders.length + 1,
    username,
    items,
    address,
    date: new Date().toISOString(),
  };
  orders.push(order);
  res.json({ message: 'Order placed successfully', order });
});

const bookingRoutes = require('./bookingRoutes');
app.use('/api', bookingRoutes);


app.get('/api/orders/:username', (req, res) => {
  const username = req.params.username;
  const userOrders = orders.filter(o => o.username === username);
  res.json(userOrders);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

