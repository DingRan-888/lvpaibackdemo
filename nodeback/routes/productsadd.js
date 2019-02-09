var express = require('express');
var router = express.Router();
var productsModel = require('../model/products');
var multer = require("multer");
// var multiparty = require('connect-multiparty')
var upload = multer({ dest: 'public/uploads/' })
// var multiMiddleware = multiparty();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    res.render('productsadd', { title: 'productsadd', isNew:true, isShow:false});
  }else{
    res.redirect('/login')
  }
});

//接收图片（单张）
// router.post('/',upload.single('myfile'), function(req,res,next){
//     console.log(req.body)
//       carticleModel.create({
//         author:req.session.whatever.username,
//         title:req.body.title,        
//         content:req.body.content,
//         createTime:new Date(),
//         imgPath:req.file?'/uploads/'+req.file.filename:''
//     }).then(result=>{
//       res.redirect("/");
//     })

// });

//接收图片（多张）
router.post('/',upload.array('myfile'), function(req,res,next){
  console.log(req.body)
  var newlist = req.files.map(item=>'/uploads/'+item.filename)
  productsModel.create({
      productsname:req.body.productsname,
      imgPath:newlist,
      productsprice:req.body.productsprice,
      productscontent:req.body.productscontent,        
      createTime:new Date()
  }).then(result=>{
    res.redirect("/products");
  })

});

router.get('/delete',function(req,res,next){
  productsModel.remove({
    _id:req.query.id
  }).then(result=>{
    res.redirect("/products");
  })
});

//修改按钮
router.get('/update',function(req,res,next){
  productsModel.find({
    _id:req.query.id
  }).then(result=>{
    console.log(result);
    res.render('productsadd', {info:result[0], isNew:false, isShow:false});
  })
});

//单张图片上传方法
// router.post('/update',upload.single('myfile'), function(req,res){
//   // carticleModel.update({
//   //   _id:req.body.id,
//   //   $set:{
//   //     title:req.body.title,        
//   //     content:req.body.content
//   //   }
//   // }).then(result=>{
//   //   res.redirect("/");
//   // })

//   carticleModel.findByIdAndUpdate(req.body.id,{$set:{
//     title:req.body.title,
//     content:req.body.content,
//     imgPath:req.file?'/uploads/'+req.file.filename:req.body.oldpath
//   }}).then(result=>{
//     res.redirect("/");
//   })
// });

//多张图片上传方法
router.post('/update',upload.array('myfile'), function(req,res){
  if(req.files.length){
    var newlist = req.files.map(item=>'/uploads/'+item.filename)
    productsModel.findByIdAndUpdate(req.body.id,{$set:{
      productsname:req.body.productsname,
      imgPath:newlist,
      productsprice:req.body.productsprice,
      productscontent:req.body.productscontent
    }}).then(result=>{
      res.redirect("/products");
    })
  }else{
    productsModel.findByIdAndUpdate(req.body.id,{$set:{
      productsname:req.body.productsname,
      productsprice:req.body.productsprice,
      productscontent:req.body.productscontent        
    }}).then(result=>{
      res.redirect("/products");
    })
  }
  
});

module.exports = router;