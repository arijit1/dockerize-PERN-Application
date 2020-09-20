const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password:"1234",
    host: "postgres",
    port: 5432,
    database: "blogitout"
});



module.exports = pool;