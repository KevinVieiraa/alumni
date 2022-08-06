const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'root',
    password: 'root',
    database: 'alumni',
    host: 'db',
    port: 5432
})

module.exports = pool;