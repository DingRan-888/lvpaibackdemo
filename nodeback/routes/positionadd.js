var express = require('express');
var router = express.Router();
var positionModel =require('../model/position')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
  	res.render('positionadd', { title: 'positionadd',isnew:true});
  }else{
  	res.redirect("/login");
  }
  
});

//
router.post('/', function(req, res, next) {
  console.log(req.body); //文件详细信息， 
  positionModel.create({
    positionname:req.body.positionname,
    positioncontent:req.body.positioncontent
  }).then(result=>{
  	console.log(result);
  	res.redirect("/position");
  })

});

router.get("/delete",(req,res)=>{
	console.log(req.query);
	positionModel.findByIdAndRemove(req.query.id).then(result=>{
		res.redirect("/position");
	})
})

router.get("/update",(req,res)=>{
  console.log(req.query);

  positionModel.findById(req.query.id).then(result=>{
    // res.redirect("/");
    res.render("positionadd",{info:result,isnew:false,list:result})
  })
})

router.post("/update",(req,res)=>{
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

  positionModel.findByIdAndUpdate(req.body.id,{$set:{
    positionname:req.body.positionname,
    positioncontent:req.body.positioncontent
  }}).then(result=>{
    res.redirect("/position");
  })
})

module.exports = router;