import mysql from "mysql2/promise";

/**
 * MySQL connection object. Make sure that the values match the Dockerfile,
 * which is used to create a MariaDB (MySQL-like) server.
 */
export const conn = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "******",
  database: "acmhomepage",
  charset: "utf8mb4", // most 4 bytes, so emoji is included.
});
