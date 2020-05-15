var express = require('express');
var router = express.Router();
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
});


//[end]
module.exports = router;