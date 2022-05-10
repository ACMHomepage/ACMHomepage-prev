import pymysql;

__db = pymysql.connect(host='192.168.3.6',
                     user='root',
                     password='yxy20001209',
                     database='ACMHomepage')

dbCursor = __db.cursor()