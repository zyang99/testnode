//引入http模块
const http = require('http');
const querystring = require("querystring");

const server = http.createServer((req,res)=>{
    if(req.method === 'POST'){
        let postData = '';
        
        //流stream形式
        req.on('data',chunk => {
            postData += chunk.toString();
        });
        req.on('end',()=>{
            console.log("postData:", postData);
            res.end('数据接收到了！');
        })

        console.log('postdata contentType', req.headers['content-type'])
    }
});

server.listen(5000,()=>{
    console.log('server running at port 5000');
})