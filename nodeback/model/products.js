var mongoose =require("mongoose");
// 用schema 约束模型 存储的域（字段） 还有每个域存储的类型
var Schema = mongoose.Schema;


var obj = {
    productsname:String,
    imgPath:Array,
    productsprice:Number,
	productscontent:String,
	createTime:Date
    
	// path:[]
	// Array Number , Date,Object
}

var productsModel = mongoose.model("product",new Schema(obj))

//blog 这个模型， 将来会 映射成blogs 这个集合
module.exports = productsModel;