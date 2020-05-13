var express = require('express');
var router = express.Router();

router.get('/createapi', function(req, res, next) {
  res.render('manager/createapi', { title: 'Create API' });
});

router.get('/managerapi',function (req, res,next){
    res.render('manager/managerapi',{title: 'Manager API'});
});

router.get("/details",function (req,res, next){
  res.render("manager/detailsapi",{title: 'Details API'});
})

//[end]
module.exports = router;