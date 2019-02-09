var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'register', cisShow:false, disShow:false, isShow:true });
  });

router.post('/validate',function(req,res,next){
    console.log(req.body)

    userModel.create({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email
	}).then(result=>{
		console.log('ok')
		res.redirect("/");
	}).catch(error=>{
		res.render('register', { title: 'register'});
	})
});

module.exports = router;