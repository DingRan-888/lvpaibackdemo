var express = require('express');
var router = express.Router();
var productsModel = require('../model/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    productsModel.find({
      
	},{content:0},{sort:{createTime:-1}}).then(result=>{
    res.render('products', { title: 'products', 
    who:req.session.whatever.username, 
    list:result,
    handleMyDate:function(date){
      const d = new Date(date);
      // return d; //2019-01-12
      return `${d.getFullYear()}-${('00'+d.getMonth()+1).slice(-2)}-${('00'+d.getDate()).slice(-2)} ${('00'+d.getHours()).slice(-2)}:${('00'+d.getMinutes()).slice(-2)}:${('00'+d.getSeconds()).slice(-2)}`;
    }
    });
	}) 
  }else{
    res.redirect('/login')
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy((error)=>{
    if(!error){
      res.redirect('/login')
    }
  })
});

module.exports = router;
