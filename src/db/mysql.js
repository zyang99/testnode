const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');


// 创建连接对象   优化点2  将数据库连接配置放出去，便于管理
const connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

// 执行sql语句  下面封装成execSQL()函数
// const sql = 'select * from blogs';
// connection.query(sql, (err, result) => {
//     if (err) {
//         console.log('err', err);
//         return;
//     }
//     console.log('result', result);
// })

// // 回调函数形式
// function execSQL(sql,callback) {
//     connection.query(sql, callback);
// }

// promise形式来处理sql语句
function execSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
    return promise;
}

module.exports = {
    execSQL
}