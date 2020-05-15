var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const Auth = require('../helpers/Auth');
const apis = require("../helpers/APIs");

var bundlestyleCreateAPI = require('../app_config/styleCreateAPI');
var bundlescriptCreateAPI = require('../app_config/scriptCreateAPI');

router.get('/createapi', Auth, function (req, res, next) {
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_CREATE_API = apis.POST_CREATE_API;
  res.locals.token = req.token;
  res.render('manager/createapi', {
    title: 'Create API',
    style: bundlestyleCreateAPI,
    scripts: bundlescriptCreateAPI
  });
});

router.get('/managerapi', Auth, function (req, res, next) {

  res.render('manager/managerapi', { title: 'Manager API' });
=======
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
>>>>>>> remotes/origin/dev
});


//[end]
module.exports = router;