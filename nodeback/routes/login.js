var express = require('express');
var router = express.Router();
var userModel= require("../model/user")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login', isShow:false });
});

router.post('/',(req,res)=>{
	userModel.find({
		username:req.body.username,
		password:req.body.password
	}).then(result=>{
		if(result.length==0){
			//用户名密码不匹配
			res.render('login', { title: 'login',isShow:true })
		}else{
			// console.log(result);
			//为钥匙 分配房间
			// req.cookies["kerwinNodeSessID"]
			req.session.whatever=result[0] //当前登陆用户的个人信息
			res.redirect("/");
		}
	})
})

module.exports = router;