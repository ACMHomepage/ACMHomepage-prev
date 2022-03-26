import getUser from './database/user';
import getNews from './database/news';

const getDatabase = (conn) => ({
  user: getUser(conn),
  news: getNews(conn),
});

export default getDatabase;
