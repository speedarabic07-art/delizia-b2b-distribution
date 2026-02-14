const express = require('express');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

let userIdCounter = 1;
let productIdCounter = 1;
let orderIdCounter = 1;

const users = [];
const products = [];
const orders = [];

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token.' });
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or expired.' });
  }
}

app.get('/', (_req, res) => {
  res.json({
    service: 'Delizia B2B Distribution API',
    status: 'ok',
    docs: '/api/health',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.post('/api/auth/register', (req, res) => {
  const { name, role = 'retailer', email, password, phone = '' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, password are required.' });
  }

  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email already exists.' });
  }

  const user = {
    id: userIdCounter++,
    name,
    role,
    email,
    password,
    phone,
  };

  users.push(user);

  return res.status(201).json({ user: sanitizeUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({ token, user: sanitizeUser(user) });
});

app.get('/api/products', authRequired, (_req, res) => {
  res.json({ products });
});

app.post('/api/products', authRequired, (req, res) => {
  const { name, description = '', price, stock = 0 } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'name and numeric price are required.' });
  }

  const product = {
    id: productIdCounter++,
    name,
    description,
    price,
    stock: Number(stock),
  };

  products.push(product);

  return res.status(201).json(product);
});

app.put('/api/products/:id', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const allowedFields = ['name', 'description', 'price', 'stock'];
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      product[field] = req.body[field];
    }
  }

  return res.json(product);
});

app.delete('/api/products/:id', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  products.splice(index, 1);

  return res.json({ message: 'Product deleted successfully.' });
});

app.get('/api/orders', authRequired, (req, res) => {
  if (req.user.role === 'admin' || req.user.role === 'supplier') {
    return res.json({ orders });
  }

  const userOrders = orders.filter((order) => order.userId === req.user.id);
  return res.json({ orders: userOrders });
});

app.post('/api/orders', authRequired, (req, res) => {
  const { products: orderedProducts } = req.body;

  if (!Array.isArray(orderedProducts) || orderedProducts.length === 0) {
    return res.status(400).json({ error: 'products array is required.' });
  }

  const order = {
    id: orderIdCounter++,
    userId: req.user.id,
    products: orderedProducts,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return res.status(201).json(order);
});

app.put('/api/orders/:id', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find((entry) => entry.id === id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  const { status } = req.body;
  const allowedStatus = ['pending', 'shipped', 'delivered'];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${allowedStatus.join(', ')}` });
  }

  order.status = status;

  return res.json(order);
});

app.get('/api/catalog.pdf', authRequired, (_req, res) => {
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="catalog.pdf"');

  doc.fontSize(18).text('Delizia B2B Product Catalog', { underline: true });
  doc.moveDown();

  if (products.length === 0) {
    doc.fontSize(12).text('No products available yet.');
  } else {
    products.forEach((product) => {
      doc.fontSize(14).text(`${product.name} - $${product.price}`);
      doc.fontSize(11).text(`Stock: ${product.stock}`);
      doc.fontSize(11).text(`Description: ${product.description || 'N/A'}`);
      doc.moveDown();
    });
  }

  doc.pipe(res);
  doc.end();
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Delizia API server running on http://localhost:${PORT}`);
});
