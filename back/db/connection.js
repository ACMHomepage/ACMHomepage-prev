import mysql from 'mysql2/promise';

/**
 * MySQL connection object. Make sure that the values match the Dockerfile,
 * which is used to create a MariaDB (MySQL-like) server.
 */
export const conn = await (async () => {
  while (true) {
    try {
      return await mysql.createConnection({
        // Check `docker-compose.yml` in the root of project.
        host: 'db',
        user: 'root',
        password: '******',
        database: 'acmhomepage',
        charset: 'utf8mb4', // most 4 bytes, so emoji is included.
      });
    } catch (e) {
      // Retry after 5s.
      console.log('Cannot create connection, retry...', e);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
})()
