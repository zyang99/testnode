/**
 * 处理博客相关的路由
 *  */

const { SuccessModel, FailModel } = require('../src/model/responseModel');
const {
    getList,
    getDetail,
    insertBlog,
    updateBlog,
    deleteBlog } = require('../src/controllers/blogController');

const blogHandle = (req, res) => {
    // 处理路由的逻辑操作
    const method = req.method;
    

    //测试路由1： 获取博客列表   接收参数:登录的用户author
    if (method === 'GET' && req.path === '/api/list') {
        // /api/test?author=zy&keyword=123
        // const sql = 'select * from blogs;';

        // // // 回调函数的形式  优化点11111111
        // // execSQL(sql, (err, result) => {
        // //     if (err) {
        // //         console.log('err', err);
        // //         return;
        // //     }
        // //     console.log('result', result);
        // // })

        // // promise  这里result拿到了数据库里面的内容
        // execSQL(sql).then(result => {
        //     console.log('result', result);
        // })
        // 假设这里有作者信息传进来
        const author = req.query.author || '';
        //const keyword = req.query.keyword || '';
        const listDataPromise = getList(author);
        return listDataPromise.then(listData => {
            console.log('listData', listData);
            return new SuccessModel(listData);
        });
        // return {
        //     "message":"这个接口工作了"
        // }
    }

    //  获取博客细节  接收参数：博客的id         处理post数据（处理异步代码）
    if (method === 'GET' && req.path === '/api/detail') {
        const id = req.query.id || '';
        const detailPromise = getDetail(id);
        return detailPromise.then(result => {
            console.log('result detail', result);
            return new SuccessModel(result);
        });
        // console.log('接收到了POST数据', req.body);
        // return {
        //     message: '进入了post路由'
        // }
    }

    // 新建博客    接收参数：title,content,author是登录的用户。createdAt是写入的时间
    if (method === 'POST' && req.path === '/api/insert') {
        const newBlog = {
            title: req.body.title,
            content: req.body.content,
            author: 'zyang',
            createdAt: Date.now()
        }
        console.log('content', newBlog);
        const insertedBlogPromise = insertBlog(newBlog);
        return insertedBlogPromise.then(inserted => {
            if (inserted.affectedRows > 0) {
                console.log('inserted id', inserted.insertId);
                return new SuccessModel(inserted.insertId);
            }
            return new FailModel('插入失败');
            // "affectedRows": 1,
            // "insertId": 6,
            // "serverStatus": 2,
            // "warningCount": 0,
            // "message": "",
            // "protocol41": true,
            // "changedRows": 0
        });
    }

    //  更新博客 接收参数：title,content.author是登录用户不用修改，created是新写入的时间   根据修改时候的博客id
    if (method === 'POST' && req.path === '/api/update') {
        const id = req.query.id;
        const update = {
            title: req.body.title,
            content: req.body.content,
        }    //也可以不重新封装，直接把blogData传过去
        const updateBlogPromise = updateBlog(id, update);
        return updateBlogPromise.then(updateResult => {
            if (updateResult) {
                return new SuccessModel('更新成功');
            }
            return new FailModel('更新失败');
        })
        
    }

    //  删除博客路由  接收参数：删除博客的id
    if (method === 'POST' && req.path === '/api/delete') {
        const id = req.query.id;
        //const author = 'xxxx';  //应该是登录用户author 删除的时候也应该检查用户名
        const deletePromise = deleteBlog(id);
        return deletePromise.then(result => {
            if (result) {
                return new SuccessModel('删除成功');
            }
            return new FailModel('删除失败');
        })
    }
    

}

module.exports = blogHandle;