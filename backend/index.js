// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// --- API Endpoints ---

// GET /api/products: Fetch products with search, category, and pagination
app.get('/api/products', (req, res) => {
  const { search = '', category = '', page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let whereClauses = [];
  let params = [];

  if (search) {
    whereClauses.push('name LIKE ? OR short_desc LIKE ?');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (category && category !== 'All') {
    whereClauses.push('category = ?');
    params.push(category);
  }

  const whereSql = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';
  
  // Query to count total items for pagination metadata
  db.get(`SELECT COUNT(id) AS total FROM products ${whereSql}`, params, (err, countRow) => {
    if (err) return res.status(500).json({ error: 'Database error counting products' });
    
    // Main query with LIMIT and OFFSET for pagination
    const productQuery = `SELECT * FROM products ${whereSql} LIMIT ? OFFSET ?`;
    const finalParams = [...params, parseInt(limit), offset];

    db.all(productQuery, finalParams, (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Database error fetching products' });
      }
      res.json({ 
        products: rows,
        totalProducts: countRow.total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(countRow.total / parseInt(limit))
      });
    });
  });
});

// GET /api/products/:id: Fetch single product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

// POST /api/enquiries: Submit a new enquiry
app.post('/api/enquiries', (req, res) => {
  const { product_id, name, email, phone, message } = req.body;
  
  // Basic Validation
  if (!product_id || !name || !email || !message) {
    return res.status(400).json({ error: 'Required fields: product ID, name, email, and message are missing.' });
  }

  const sql = `
    INSERT INTO enquiries (product_id, name, email, phone, message)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [product_id, name, email, phone || null, message], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to submit enquiry due to a database error.' });
    }
    // `this.lastID` holds the ID of the last inserted row
    res.status(201).json({ 
      message: 'Enquiry submitted successfully!', 
      id: this.lastID 
    });
  });
});

// GET /api/enquiries: Fetch all enquiries (Admin view)
app.get('/api/enquiries', (req, res) => {
  // JOIN to include product name for context
  const sql = `
    SELECT 
        e.*, 
        p.name AS product_name 
    FROM enquiries e
    JOIN products p ON e.product_id = p.id
    ORDER BY e.created_at DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error fetching enquiries' });
    }
    res.json({ enquiries: rows });
  });
});

// --- Authentication Endpoints ---

// POST /api/login: User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Demo authentication (in production, check against database with hashed passwords)
  if (email === 'user@example.com' && password === 'password123') {
    // Generate a simple token
    const token = Buffer.from(email + Date.now()).toString('base64');
    res.json({
      token,
      user: {
        id: 1,
        name: 'John Doe',
        email: email
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// POST /api/register: User registration
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Demo registration (in production, store user in database with hashed password)
  if (email === 'user@example.com') {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Generate a simple token
  const token = Buffer.from(email + Date.now()).toString('base64');
  res.json({
    token,
    user: {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});