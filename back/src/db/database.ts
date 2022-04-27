import getUser from './database/user.js';
import getNews from './database/news.js';
import tagNews from './database/tagNews.js';
import tag from './database/tag.js';
const getDatabase = (conn) => ({
  user: getUser(conn),
  news: getNews(conn),
  tagNews: tagNews(conn),
  tag: tag(conn),
});

export default getDatabase;
