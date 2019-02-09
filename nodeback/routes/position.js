var express = require('express');
var router = express.Router();
var positionModel =require('../model/position')

/* GET home page. */

//获取列表信息
router.get('/', function(req, res, next) {
    console.log(req.session.whatever)
    if(req.session.whatever){
        positionModel.find({
            
        }).then(result=>{
            console.log(result)
            res.render("position",{title:"position",
                who:req.session.whatever.username,
                list:result
            })
        })
    }else{
        res.redirect("/login");  
    }
    
  });
  
//退出按钮
router.get('/logout', function(req, res, next) {
  req.session.destroy((error)=>{
    if(!error){
      res.redirect('/login')
    }
  })
});

module.exports = router;