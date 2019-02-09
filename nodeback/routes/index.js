var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
    res.render('index', { title: 'index', 
    who:req.session.whatever.username, });
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
