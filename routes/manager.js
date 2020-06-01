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

router.get('/detailapi',Auth,async(req,res)=>{
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_API = apis.POST_API;
  let response = await connect(apis.POST_API,req.body,req.token);
  res.locals= response.data_response[0].endpoint_action;
  res.locals.errors = response.errors;
  res.locals.is_success = response.is_success;
  res.locals.status_code = response.status_code;
  res.locals.message = response.message;
  res.locals.table_name = req.body.table_name;
  res.locals.name = req.body.name;
  res.locals.dataType = req.body.dataType;
  res.render('manager/detailapi', {style:require('../app_config/detailapi'), layout:'layouts/layoutHome'});
})
//[end]
module.exports = router;