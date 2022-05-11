const problemSolved = (conn) => ({
  getSolved: async (id: Number, account: String, source: String) => {
    const sql = `SELECT problemSolved.account, problemSolved.source,
        problemSolved.solved, problemSolved.date FROM  userAccount LEFT JOIN
        problemSolved ON userAccount.account = problemSolved.account AND
        userAccount.source = problemSolved.source WHERE userAccount.id = ? AND
        problemSolved.account = ? AND problemSolved.source = ? ORDER BY date DESC
        `;
    const result = await conn.execute(sql, [id, account, source]);
    const [rows, _fields] = result;
    return rows;
  },
  insertSolved: async (account: String, source: String, solved: Number) => {
    const sql = `INSERT INTO problemSolved VALUES (?, ?, ?, NOW())`;
    const result = await conn.execute(sql, [account, source, solved]);
    const [rows, _fields] = result;
    return rows;
  },
  remove: async (account: String, source: String) => {
    const sql1 = `SELECT * FROM problemSolved WHERE account = ? AND source = ?`;
    const sql2 = `DELETE FROM problemSolved WHERE account = ? AND source = ?`;
    const result = await conn.execute(sql1, [account, source]);
    const [rows, _fields] = result;
    await conn.execute(sql2, [account, source]);
    return rows;
  },
});

export default problemSolved;
