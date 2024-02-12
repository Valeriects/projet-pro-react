import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0 
});


pool.getConnection().then((connection) => {
    console.log("Connexion à la BDD: " + connection.config.database);

    connection.release();
});


export default pool;