const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001; // Different port than React app

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db1',
    password: 'admin',
    port: 5432,
});

// Middleware
app.use(cors()); // Allow requests from React
app.use(bodyParser.json()); // Parse JSON request bodies

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password],
        (error, results) => {
            if (error) {
                console.error('Error querying the database:', error);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (results.rows.length > 0) {
                res.json({ success: true, message: 'Login successful', username });
            } else {
                res.json({ success: false, message: 'Invalid username or password' });
            }
        }
    );
});

// Save a note for a specific user
app.post('/notes', async (req, res) => {
    const { username, note } = req.body;

    try {
        await pool.query('INSERT INTO notes (username, note) VALUES ($1, $2)', [username, note]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ success: false, error: 'Failed to save note' });
    }
});

// Get all notes for a specific user
app.get('/notes/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query('SELECT * FROM notes WHERE username = $1 ORDER BY created_at DESC', [username]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving notes:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve notes' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
