
const fs = require("fs");
const { get } = require("http");
const path = require('path');


//传统callback
// function getFileContent(filename,callback){
//     //文件绝对路径
//     const fullFilename = path.resolve(__dirname,'data',filename);
//     fs.readFile(fullFilename,(err,data)=>{
//         if(err){
//             console.error(err);
//             return 
//         }
//         callback(
//             JSON.parse(data.toString())
//         );
//         // console.log(data.toString());
//     })
// }

// //  回调地狱
// getFileContent('a.json',(aData)=>{
//     console.log('aData', aData);
//     getFileContent(aData.next,(bData)=>{
//         console.log('bData', bData);
//         getFileContent(bData.next,(cData)=>{
//             console.log('cData', cData);
//         });
//     });
// });


//使用Promise
function getFileContent(filename) {
    const promise = new Promise((resolve, reject) => {
        const fullFilename = path.resolve(__dirname, 'data', filename);
        fs.readFile(fullFilename, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            );
        })
    });
    return promise;
}

getFileContent('a.json').then((aData) => {
    console.log('aData', aData);
    return getFileContent(aData.next);
}).then((bData) => {
    console.log('bData', bData);
    return getFileContent(bData.next);
}).then((cData) => {
    console.log('cData', cData);
})