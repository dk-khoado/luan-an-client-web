var express = require('express');
var router = express.Router();

router.get('/createapi', function(req, res, next) {
  res.render('manager/createapi', { title: 'CreateApi User' });
});

router.get('/managerapi',function (req, res,next){
    res.render('manager/managerapi.ejs',{title: 'ToolManagerApi User'});
});

//[end]
module.exports = router;