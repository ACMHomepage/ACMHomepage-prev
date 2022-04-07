const ID = 'id';
const EMAIL = 'email';
const PASSWORD = 'password';
const NICKNAME = 'nickname';
const IS_ADMIN = 'isAdmin';

const user = (conn) => ({
  FIELDS: { ID, EMAIL, PASSWORD, NICKNAME, IS_ADMIN },
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
      WHERE ${ID} = ?
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
      WHERE ${EMAIL} = ?
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
      INSERT INTO user (${EMAIL}, ${PASSWORD}, ${NICKNAME}, ${IS_ADMIN})
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
});

export default user;
