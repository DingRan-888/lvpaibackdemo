var express = require('express');
var router = express.Router();
var activityModel =require('../model/activity')
var positionModel =require('../model/position')

/* GET home page. */

//获取列表信息
router.get('/', function(req, res, next) {
    console.log(req.session.whatever)
    if(req.session.whatever){
        activityModel.find({
            
        }).populate({path:'activitypositionID', select: 'positionname'})
        .then(result=>{
            console.log(result)
            res.render("activity",{title:"activity",
                who:req.session.whatever.username,
                list:result,
                handleMyDate:function(date){
                  const d = new Date(date);
                  // return d; //2019-01-12
                  return `${d.getFullYear()}-${('00'+d.getMonth()+1).slice(-2)}-${('00'+d.getDate()).slice(-2)} ${('00'+d.getHours()).slice(-2)}:${('00'+d.getMinutes()).slice(-2)}:${('00'+d.getSeconds()).slice(-2)}`;
                }
            })
        })
    }else{
        res.redirect("/login");  
    }
    
  });

  //查询结果
  router.post('/activitysearch', function(req, res, next) {
    console.log(req.session.whatever)
    var keyvalue;
    if(req.session.whatever){
        switch(req.body.cateloge){
            case '1':keyvalue={activitycontent:req.body.search};
            break;
            case '2':keyvalue={activityname:req.body.search};
            break;
            default :keyvalue = {};
        }
        activityModel.find(keyvalue).then(result=>{
            // console.log(result)
            // res.send(result)

            // res.render('activitysearch',{title:"activitysearch",
            // list:result
            // })
            var activity = result;
            var searchArr = [];
            for(let i=0; i< result.length; i++) {
                searchArr.push(positionModel.find({_id:result[i].activitypositionID}));
            }
            Promise.all(searchArr).then(result=>{
                var positions = result;
                var final = [];
                for(let i=0; i<activity.length; i++) {
                    final.push({
                        activityname: activity[i].activityname,
                        activitycontent: activity[i].activitycontent,
                        activitypositionID: {
                            activitypositionID: activity[i].activitytel,
                            positionname: positions[i][0].positionname
                        }
                    })
                    console.log(11111111)
                    console.log(result)
                    console.log(22222222)

                    console.log(final[i]);

                }

                // console.log(activity)
            
                res.send(final)
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