var express = require('express');
var router = express.Router();
var productsModel = require("../model/products")
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    productsModel.findByIdAndUpdate(req.query.id).then(result=>{
      console.log(result);
      res.render("productsdetail",{info:result});
    })
  	
  }else{
  	res.redirect("/login");
  }
  
});


module.exports = router;