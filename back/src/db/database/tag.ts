const ID: string = 'id';
const NAME: string = 'name';

const tag = (conn) => ({
  FIELDS: { TAGID: ID, TAG_NAME: NAME },
  getAll: async () => {
    const sql = `SELECT *
        FROM tag`;
    const result = await conn.execute(sql);
    const [rows, _fields] = result;
    return rows;
  },
  getByName: async (name: string) => {
    const sql = `SELECT * FROM tag WHERE ${NAME} = ?`;
    const result = await conn.execute(sql, [name]);
    const [rows, _fields] = result;
    return rows.length === 0 ? undefined : rows[0];
  },
  getById: async (id: number) => {
    const sql = `SELECT * FROM tag WHERE ${ID} = ?`;
    const result = await conn.execute(sql, [id]);
    const [rows, _fields] = result;
    return rows.length === 0 ? undefined : rows[0];
  },
  getNumber: async () => {
    const sql = `SELECT COUNT(*) AS tagNumber
        FROM tag`;
    const [rows, _fields] = await conn.execute(sql);
    return rows[0].tagNumber;
  },
  insert: async (name: string) => {
    const sql = `INSERT INTO tag (name) VALUES (?)`;
    const [rows, _fields] = await conn.execute(sql, [name]);
    return rows;
  },
  // I only implemented the interface with argument `name`.
  // Because I think ID is hard to acquire from the programmer.
  remove: async (name: string) => {
    const sql = `DELETE FROM tag WHERE name = ?`;
    const [rows, _fields] = await conn.execute(sql, [name]);
    return rows;
  },
});

export default tag;
