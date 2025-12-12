const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig, isDev } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// In-memory storage for development mode
let registrations = [];

// Test database connection if not in development mode
async function testConnection() {
  if (isDev) {
    console.log('Running in development mode with simulated database');
    return;
  }
  
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful!');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    console.log('Falling back to development mode with simulated database');
    // Set global isDev flag to true
    global.isDev = true;
  }
}

testConnection();

// API endpoint to save registration data
app.post('/api/register', async (req, res) => {
  const { name, email, phone, country } = req.body;
  
  if (!name || !email || !phone || !country) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  try {
    if (isDev || global.isDev) {
      // In development mode, store in memory
      const id = registrations.length + 1;
      const newRegistration = {
        id,
        name,
        email,
        phone,
        country,
        created_at: new Date().toISOString()
      };
      
      registrations.push(newRegistration);
      console.log('New registration saved (dev mode):', newRegistration);
      
      return res.status(201).json({
        success: true,
        message: 'Registration successful (dev mode)',
        data: { id }
      });
    }
    
    // Production mode - save to database
    // Check if the registrations table exists, if not create it
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert the registration data
    const [result] = await pool.query(
      'INSERT INTO registrations (name, email, phone, country) VALUES (?, ?, ?, ?)',
      [name, email, phone, country]
    );
    
    console.log('New registration saved to database:', { id: result.insertId, name, email });
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your registration'
    });
  }
});

// API endpoint to get all registrations (for testing in dev mode)
app.get('/api/registrations', (req, res) => {
  if (isDev || global.isDev) {
    return res.json({ registrations });
  }
  
  res.status(403).json({ message: 'Access denied in production mode' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
