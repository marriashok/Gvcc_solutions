// backend/seed.js
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Create a new database connection for seeding
const DB_FILE = path.join(__dirname, 'database.sqlite');

function runSeed() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) {
        console.error('Could not connect to database:', err.message);
        reject(err);
        return;
      }
      
      // Read schema and seed SQL files
      const schemaSql = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
      const seedSql = fs.readFileSync(path.join(__dirname, '../seed.sql'), 'utf8');

      // Drop and recreate tables
      db.run('DROP TABLE IF EXISTS enquiries', (err) => {
        if (err && !err.message.includes('no such table')) {
          console.error('Error dropping enquiries table:', err);
        }
        
        db.run('DROP TABLE IF EXISTS products', (err) => {
          if (err && !err.message.includes('no such table')) {
            console.error('Error dropping products table:', err);
          }
          
          // Create tables using exec
          db.exec(schemaSql, (err) => {
            if (err) {
              console.error('Error creating schema:', err);
              db.close();
              reject(err);
              return;
            }
            
            console.log('Database schema created successfully.');
            
            // Insert seed data
            db.exec(seedSql, (err) => {
              if (err) {
                console.error('Error seeding database:', err);
                db.close();
                reject(err);
                return;
              }
              
              console.log('Database seeded with sample products.');
              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err);
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          });
        });
      });
    });
  });
}

// Run the seed
runSeed()
  .then(() => {
    console.log('Seeding completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });