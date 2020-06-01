var express = require('express');
var router = express.Router();
const Auth = require('../helpers/Auth');
const apis = require("../helpers/APIs");
const connect = require('../helpers/APIHelper');


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

router.get('/api', Auth, function (req, res, next) {

  res.render('manager/managerapi', { title: 'Manager API' });
});

router.get('/detail/:tablename', Auth, async (req, res) => {
  var tablename = req.params.tablename;
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_API = apis.POST_API;
  res.locals.token = req.token;
  res.render('manager/detail', { style: require('../app_config/detail'), layout: 'layouts/layoutHome' });
});


//[end]
module.exports = router;