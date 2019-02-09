var express = require('express');
var router = express.Router();
var userModel =require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    //   console.log(req.query.id)
    // userModel.findById(req.query.id).then(result=>{
    //     console.log(result)
        res.render("userspassword",{
            title: 'userspassword',info:req.session.whatever,isnew:false,list:req.session.whatever})
        // })
   }else{
  	res.redirect("/login");
  }
});


router.post("/",(req,res)=>{
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

  userModel.findByIdAndUpdate(req.session.whatever._id,{$set:{
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
    
  }}).then(result=>{
    res.redirect("/login");
  })
})

module.exports = router;