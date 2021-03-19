/**
 * 博客相关方法控制器
 * */
 const { execSQL } = require('../db/mysql');

// 获取博客列表
const getList = (author) => {
    //从数据库里面拿数据
    //假设这里使用了传进来的数据
    // const sql = `select * from blogs where author='${author}';`;
    const sql = `select * from blogs`;
    return execSQL(sql);  //返回的是一个promise
    // return [
    //     {
    //         id: 1,
    //         tittle: '标题1',
    //         content: '内容同1',
    //         date: 1615963810784
    //     },
    // ]
}
// 获取博客详情
const getDetail = (id) => {
    const sql = `select * from blogs where id ='${id}'`;
    return execSQL(sql); //返回的是一个promise
}

// 新建博客内容
const insertBlog = (blogData = {}) => {
    const sql = `
    insert into blogs (title,content,author,createdAt) values ('${blogData.title}','${blogData.content}','${blogData.author}','${blogData.createdAt}');
    `;
    return execSQL(sql);
}

// 更新博客
const updateBlog = (id,blogData = {}) => {
    const sql = `
    update blogs set title = '${blogData.title}',content='${blogData.content}' where id = ${id};
    `;
    return execSQL(sql).then(updateResult => {
        if (updateResult.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

// 删除博客  正常的应该是软删除：设置状态码为state=-1.这样数据不会删除，只是不能被查出来。这里展示硬删除。
const deleteBlog = (id,author) => {
    // const sql = `
    // delete from blogs where id = ${id} and author ='${author}';
    // `;   //应该按照权限操作
    const sql = `
    // delete from blogs where id = ${id}';
    // `;
    return execSQL(sql).then(result => {
        if (result.affectedRows > 0) {
            return true;
        }
        return false;
    });
}



module.exports = {
    getList,
    getDetail,
    insertBlog,
    updateBlog,
    deleteBlog
}