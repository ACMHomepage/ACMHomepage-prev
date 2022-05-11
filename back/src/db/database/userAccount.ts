const userAccount = (conn) => ({
  getAll: async () => {
    const sql = `SELECT * FROM userAccount`;
    const result = await conn.execute(sql);
    const [rows, _fields] = result;
    return rows;
  },
  getByID: async (id: number) => {
    const sql = `SELECT * FROM userAccount WHERE id = ?`;
    const result = await conn.execute(sql, [id]);
    const [rows, _fields] = result;
    return rows;
  },
  getBySource: async (source: String) => {
    const sql = `SELECT * FROM userAccount WHERE source = ?`;
    const result = await conn.execute(sql, [source]);
    const [rows, _fields] = result;
    return rows;
  },
  insert: async (id: Number, account: String, source: String) => {
    const sql = `INSERT INTO userAccount VALUES (?, ?, ?)`;
    const result = await conn.execute(sql, [id, account, source]);
    const [rows, _fields] = result;
    return rows.length === 0 ? null : rows[0];
  },
  remove: async (id: Number, account: String, source: String) => {
    const sql1 = `SELECT * FROM userAccout
        WHERE id=? AND account = ? AND source = ?`;
    const sql2 = `DELETE FROM userAccount 
        WHERE id=? AND account = ? AND source = ?`;
    const queryResult = await conn.execute(sql1, [id, account, source]);
    await conn.execute(sql2, [id, account, source]);
    const [rows, _fields] = queryResult;
    return rows.length === 0 ? null : rows[0];
  },
  removeByID: async (id: Number) => {
    const sql1 = `SELECT * FROM userAccout
        WHERE id=?`;
    const sql2 = `DELETE FROM userAccount 
        WHERE id=?`;
    const queryResult = await conn.execute(sql1, [id]);
    await conn.execute(sql2, [id]);
    const [rows, _fields] = queryResult;
    return rows.length === 0 ? null : rows[0];
  },
});

export default userAccount;
