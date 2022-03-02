import mysql from "mysql2";

export const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "******",
    database: "test"
});