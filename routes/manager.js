var express = require('express');
var router = express.Router();
const Auth = require('../helpers/Auth');
const apis = require("../helpers/APIs");
const connect = require('../helpers/APIHelper');


var bundleStyleCreateAPI = require('../app_config/styleCreateAPI');
var bundleScriptCreateAPI = require('../app_config/scriptCreateAPI');

var bundleStyleManagerAPI = require('../app_config/styleManagerAPI');
var bundleScriptManagerAPI = require('../app_config/scriptManagerAPI');

var bundleStyleDetailAPI = require('../app_config/styleDetailAPI');
var bundleScriptDetailsPI = require('../app_config/scriptDetailAPI');

router.get('/createapi', Auth, function (req, res, next) {
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_CREATE_API = apis.POST_CREATE_API;
  res.locals.token = req.token;
  res.render('manager/createapi', {
    title: 'Create API',
    style: bundleStyleCreateAPI,
    scripts: bundleScriptCreateAPI
  });
});

router.get('/api', Auth, function (req, res, next) {
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_MANANGER_API = apis.POST_MANANGER_API;
  res.locals.token = req.token;
  res.render('manager/managerapi', { 
    title: 'Manager API',
    style: bundleStyleManagerAPI,
    scripts: bundleScriptManagerAPI
  });
});

router.get('/api/detail/:tablename',Auth,function(req,res,next) {
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_MANANGER_API = apis.POST_MANANGER_API;
  res.locals.token = req.token;
  res.locals.table_name = req.params.tablename;
  res.render('manager/detail', 
  {
    title : 'Detail API',
    style: bundleStyleDetailAPI,
    scripts: bundleScriptDetailsPI
  });
});


//[end]
module.exports = router;