const ID = 'id';
const TITLE = 'title';
const IMAGE_URL = 'imageUrl';
const CONTENT = 'content';
const CREATE_DATE = 'createdDate';
const MODIFIED_DATE = 'modifiedDate';

const getNews = (conn) => ({
  FIELDS: {
    ID,
    TITLE,
    IMAGE_URL,
    CONTENT,
    CREATE_DATE,
    MODIFIED_DATE,
  },
  getAll: async (fields) => {
    const sql = `
      SELECT ${fields.join(',')}
      FROM news
    `;
    const result = await conn.execute(sql);
    const [rows, _fields] = result;
    return rows;
  },
  getById: async (fields, id) => {
    const sql = `
      SELECT ${fields.join(',')}
      FROM news
      WHERE id = ?
    `;
    const result = await conn.execute(sql, [id]);
    const [rows, _fields] = result;
    // The id is unique. So the rows.length must be 0 or 1.
    return rows.length === 0 ? undefined : rows[0];
  },
  insert: async (news) => {
    const { title, imageUrl, content } = news;

    const sql = `
      INSERT INTO news
      (${TITLE}, ${IMAGE_URL}, ${CONTENT}, ${CREATE_DATE}, ${MODIFIED_DATE})
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    const [rows, _fields] = await conn.execute(sql, [title, imageUrl, content]);
    return rows;
  },
});

export default getNews;
