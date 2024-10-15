const { Pool } = require('pg');

const pool = new Pool({
    user: 'Perusal',
    host: 'localhost',
    database: 'db1',
    password: 'admin',
    port: 5432,  // Default PostgreSQL port
});

module.exports = pool;
