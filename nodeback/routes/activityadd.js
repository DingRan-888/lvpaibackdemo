var express = require('express');
var router = express.Router();
var activityModel =require('../model/activity')
var positionModel =require('../model/position')


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    positionModel.find().then(result=>{
      console.log(result)
      res.render('activityadd', { title: 'activityadd',isnew:true,positioninfo:result,activityinfo:result});
    })
  }else{
  	res.redirect("/login");
  }
});

//
router.post('/', function(req, res, next) {
  console.log(req.body); //文件详细信息， 
  activityModel.create({
    activityname:req.body.activityname,
    activitycontent:req.body.activitycontent,
    activitypositionID:req.body.activitypositionID,
    createTime:new Date()
  }).then(result=>{
  	console.log(result);
  	res.redirect("/activity");
  })

});

router.get("/delete",(req,res)=>{
	console.log(req.query);
	activityModel.findByIdAndRemove(req.query.id).then(result=>{
		res.redirect("/activity");
	})
})

router.get("/update",(req,res)=>{
  console.log(req.query);

  positionModel.find().then(result=>{
    console.log(result)
    let positioninfo = result
    // res.render('customeradd', { title: 'customeradd',isnew:true,info:result});
    activityModel.findById(req.query.id).then(result=>{
      console.log(result)
      // res.redirect("/");
      res.render("activityadd",{activityinfo:result,isnew:false, positioninfo:positioninfo})
    })
  })
})

router.post("/update",(req,res)=>{
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa');

  activityModel.findByIdAndUpdate(req.body.id,{$set:{
    activityname:req.body.activityname,
    activitycontent:req.body.activitycontent,
    activitypositionID:req.body.activitypositionID,
  }}).then(result=>{
    res.redirect("/activity");
  })
})

module.exports = router;