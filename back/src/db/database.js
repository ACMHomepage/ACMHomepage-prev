import getUser from './database/user.js';
import getNews from './database/news.js';

const getDatabase = (conn) => ({
  user: getUser(conn),
  news: getNews(conn),
});

export default getDatabase;
