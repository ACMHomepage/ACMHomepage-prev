import getUser from './database/user.js';
import getNews from './database/news.js';
import tagNews from './database/tagNews.js';
import tag from './database/tag.js';
import userAccount from './database/userAccount.js';
import problemSolved from './database/problemSolved.js';

const getDatabase = (conn) => ({
  user: getUser(conn),
  news: getNews(conn),
  tagNews: tagNews(conn),
  tag: tag(conn),
  userAccount: userAccount(conn),
  problemSolved: problemSolved(conn),
});

export default getDatabase;
