const getDatabase = (conn) => ({
  /****************************************************************************
   * User
   ***************************************************************************/
  user: {
    FIELDS: {
      ID: 'id',
      EMAIL: 'email',
      PASSWORD: 'password',
      NICKNAME: 'nickname',
      IS_ADMIN: 'isAdmin',
    },
    getAll: async (fields) => {
      const sql = `
        SELECT ${fields.join(',')}
        FROM user
      `;
      const result = await conn.execute(sql);
      const [rows, _fields] = result;
      return rows;
    },
    getById: async (fields, id) => {
      const sql = `
        SELECT ${fields.join(',')}
        FROM user
        WHERE id = ?
      `;
      const result = await conn.execute(sql, [id]);
      const [rows, _fields] = result;
      // The id is unique. So the rows.length must be 0 or 1.
      return rows.length === 0 ? undefined : rows[0];
    },
    getByEmail: async (fields, email) => {
      const sql = `
        SELECT ${fields.join(',')}
        FROM user
        WHERE email = ?
      `;
      const result = await conn.execute(sql, [email]);
      const [rows, _fields] = result;
      // The email is unique. So the rows.length must be 0 or 1.
      return rows.length === 0 ? undefined : rows[0];
    },
    getNumber: async () => {
      const sql = `
        SELECT COUNT(*) AS userNumber
        FROM user
      `;
      const [rows, _fields] = await conn.execute(sql);
      // It must be only one line.
      return rows[0].userNumber;
    },
    insert: async (user) => {
      const { email, password, nickname, isAdmin } = user;

      const sql = `
        INSERT INTO user (email, password, nickname, isAdmin)
        VALUES (?, ?, ?, ?)
      `;
      const [rows, _fields] = await conn.execute(sql, [
        email,
        password,
        nickname,
        isAdmin,
      ]);
      return rows;
    },
  },
});

/******************************************************************************
 * Export
 *****************************************************************************/
export default getDatabase;
