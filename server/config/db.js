const mysql = require("mysql2");

const db = mysql.createPool({ // Using Pool is better than connection for Express
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Check connection
db.getConnection((err, conn) => {
    if (err) console.error("DB Connection Error:", err);
    else {
        console.log("Connected to MySQL Database");
        conn.release();
    }
});

module.exports = db.promise(); // Using .promise() makes code cleaner with async/await
