const tagNews = (conn) => ({
  getNewsByTagName: async (name: string) => {
    const sql = `
      SELECT news.id, news.title, news.imageUrl, news.content,
              news.createdDate, news.modifiedDate
      FROM (
              tag LEFT JOIN tagNewsRelation ON tag.id=tagNewsRelation.tagID
      ) 
      LEFT JOIN news ON tagNewsRelation.newsID=news.id WHERE tag.name=?
    `;
    const [rows, _fields] = await conn.execute(sql, [name]);
    return rows;
  },
  getTagsByNewsID: async (id: number) => {
    const sql = `
      SELECT tag.id, tag.name 
      FROM (
        tag LEFT JOIN tagNewsRelation ON tag.id=tagNewsRelation.tagID
      )
      LEFT JOIN news ON tagNewsRelation.newsID=news.id WHERE news.id=?
    `;
    const [rows, _fields] = await conn.execute(sql, [id]);
    return rows;
  },
  unbindRelation: async (tagID: number, newsID: number) => {
    const sql1 = `SELECT * FROM tagNewsRelation WHERE tagID=? AND newsID=?`;
    const sql2 = `DELETE FROM tagNewsRelation WHERE tagID=? AND newsID=?`;
    const [rows, _fields] = await conn.execute(sql1, [tagID, newsID]);
    await conn.execute(sql2, [tagID, newsID]);
    return rows.length === 0 ? null : rows[0];
  },
});
export default tagNews;
