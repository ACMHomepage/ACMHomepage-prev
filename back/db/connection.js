import mysql from "mysql2";

/**
 * MySQL connection object. Make sure that the values match the Dockerfile,
 * which is used to create a MariaDB (MySQL-like) server.
 */
export const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "******",
    database: "test"
});
