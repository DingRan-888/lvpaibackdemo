var mongoose =require("mongoose");
// 用schema 约束模型 存储的域（字段） 还有每个域存储的类型
var Schema = mongoose.Schema;


var obj = {
	activityname:String,
	activitycontent:String,
	activitypositionID:{type:Schema.ObjectId, ref:'position'},
	createTime:Date
	// path:[]
	// Array Number , Date,Object
}

var activityModel = mongoose.model("activity",new Schema(obj))

//blog 这个模型， 将来会 映射成blogs 这个集合
module.exports = activityModel;