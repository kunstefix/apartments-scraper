const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// PostgreSQL database configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// Enable CORS 
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/paginated-listings', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page if not specified
    const offset = (page - 1) * perPage;

    const client = await pool.connect();
    
    // Query to get paginated results
    const result = await client.query(
      'SELECT * FROM property_listings OFFSET $1 LIMIT $2',
      [offset, perPage]
    );
    
    // Query to count all entries in the table
    const countResult = await client.query('SELECT COUNT(*) FROM property_listings');
    const countAll = parseInt(countResult.rows[0].count);

    const items = result.rows;
    client.release();
    
    res.json({
      items,
      allItemsCount: countAll,
      currentPage: page,
      itemsPerPage: perPage,
    });
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
