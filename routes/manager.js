var express = require('express');
var router = express.Router();
const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const signin = require('../helpers/Auth'); 
const moment = require('moment');


var bundleScriptAccount = require('../app_config/scriptAccount');
var bundleStyleAccount = require('../app_config/styleAccount');
var bundleScriptChat = require('../app_config/adminChat');

router.get('/createapi', function(req, res, next) {
  res.render('manager/createapi',{ layout: 'layouts/layoutHome', style: require("../app_config/CreateApiStyle") });
  
});



router.get('/managerapi',function (req, res,next){
    res.render('manager/managerapi.ejs',{title: 'ToolManagerApi'});
});

router.get

//[end]
module.exports = router;