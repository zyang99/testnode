/**
 * 设置响应的基本的模型对象
 * */
function BaseModel(data,message){
    if(typeof data === 'string'){
        this.message = data;
        data = null;
        message = null;
    }
    if(data){
        this.data = data;
    }
    if(message){
        this.message = message;
    }
}

//成功模型对象
function SuccessModel(data,message){
    BaseModel.call(this,data,message);
    this.error = 0;
}
SuccessModel.prototype = Object.create(BaseModel.prototype);
SuccessModel.prototype.constructor = SuccessModel;


//失败模型对象
function FailModel(data,message){
    BaseModel.call(this,data,message);
    this.error = -1;
}
FailModel.prototype = Object.create(BaseModel.prototype);
FailModel.prototype.constructor = FailModel;


//导出两个模型对象
module.exports = {
    SuccessModel,
    FailModel
}