// 业务代码

const blogHandleRoute = require('./routes/blog');    //引入路由
const querystring = require('querystring');

// 异步处理POST数据
function getPostData(req) {
    const promise = new Promise((resolve, reject) => {
        //如果不是post方法
        if(req.method !== 'POST'){
            resolve({message:'请求不是POST方法'});
            return;
        }
        //如果接收数据不是json格式
        if(req.headers['content-type'] !== 'application/json'){
            resolve({message:'POST数据格式不对'});
            return;
        }
        //开始接收post数据
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            resolve(JSON.parse(postData));
            return;
        });
    });
    return promise;
}


const serverHandler = (req, res) => {
    // 设置响应格式
    res.setHeader('Content-Type', 'application/json');

    //获取url地址的path，放进req对象的path属性上，这样后面直接调用req的path属性就可以了.后面的参数放到query
    const url = req.url;
    req.path = url.split('?')[0];
    //解析query:这里面一般是get请求从url上传过来的参数
    req.query = querystring.parse(url.split('?')[1]);

    //解析post数据
    getPostData(req).then((postData) => {
        req.body = postData;
        //处理blog相关的业务
        const blogDataPromise = blogHandleRoute(req, res);
        if (blogDataPromise) {
            blogDataPromise.then(blogData => {
                if (blogData) {
                    res.end(JSON.stringify(blogData));
                }
            })
            return;
        }
        
        //没有已知路由的请求,设置错误请求
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404: Not Found Route!');
        res.end();
    });

};

module.exports = serverHandler;