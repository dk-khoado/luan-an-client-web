var express = require('express');
var router = express.Router();
const Auth = require('../helpers/Auth');
const apis = require("../helpers/APIs");
const connect = require('../helpers/APIHelper');


var bundleStyleCreateAPI = require('../app_config/styleCreateAPI');
var bundleScriptCreateAPI = require('../app_config/scriptCreateAPI');

var bundleStyleManagerAPI = require('../app_config/styleManagerAPI');
var bundleScriptManagerAPI = require('../app_config/scriptManagerAPI');

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
  res.locals.POST_MANANER_API = apis.POST_MANANER_API;
  res.locals.token = req.token;
  res.render('manager/managerapi', { 
    title: 'Manager API',
    style: bundleStyleManagerAPI,
    scripts: bundleScriptManagerAPI
  });
});

router.get('/api/detail/:tablename',Auth,async(req,res)=>{
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_API = apis.POST_API;
  res.locals.token = req.token;
  res.locals.table_name = req.params.tablename;
  res.render('manager/detail', { style: require('../app_config/detail') });
});


//[end]
module.exports = router;