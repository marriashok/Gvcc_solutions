// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'database.sqlite');

// Connect to the database
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Could not connect to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;