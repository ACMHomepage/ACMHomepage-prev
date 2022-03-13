此目录用来存放与 MySQL 通信、操作的代码段。

### 各 JS 文件的用途

|      文件       |              描述               |
| :-------------: | :-----------------------------: |
| `connection.js` |      用于配置和连接数据库       |
|   `query.js`    | 用于配置 SQL 语句查询数据的接口 |

### 更改 MySQL 的配置

在`./connection.js`文件中修改配置文件即可。 如果本地 MySQL Server 没有使用默认端口，则需要在`conn`中添加`port`字段。例如：

```javascript
export const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password_here',
  database: 'test',
  port: 1209, // Here to revise the port number
});
```

### 注意

通常情况下，`./query.js`文件无需修改，因为它只是提供一个使用 SQL 语句查询数据的接口。它的用途也仅限于此。
