const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3030;

// PostgreSQL database configuration
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'myuser',
    password: 'mypassword',
});

// Define a route to retrieve data from the database
app.get('/all-listings', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM property_listings');
    const items = result.rows;
    client.release();
    res.json(items);
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


app.get('/paginated-listings', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page if not specified
    const offset = (page - 1) * perPage;

    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM property_listings OFFSET $1 LIMIT $2',
      [offset, perPage]
    );

    const items = result.rows;
    client.release();
    
    res.json({
      items,
      currentPage: page,
      itemsPerPage: perPage,
    });
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
