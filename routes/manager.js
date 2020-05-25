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

router.post('/managerapi', async function (req, res) {
  await axios.post('https://api-server-game.herokuapp.com/api/v1/getAllAPIByID', {
    "table_name": req.body.table_name
  })
    .then(function (respone) {
      if (respone.data.is_success == true) {

      }
    })
    .catch(function (error) {
      console.log("[error]", error);
    });
});

router.get('/detail/:tablename', Auth, async (req, res) => {
  var tablename = req.params.tablename;
  console.log(tablename);
  res.locals.BASE_URL = apis.BASE_URL;
  res.locals.POST_API = apis.POST_API;
  let response = await connect(apis.POST_API, {}, req.token);
  res.locals = response.data_response[0].endpoint_action;
  res.locals.errors = response.errors;
  res.locals.is_success = response.is_success;
  res.locals.status_code = response.status_code;
  res.locals.message = response.message;
  res.locals.table_name = response.data_response[0].table_name;
  res.locals.name = response.data_response[0].table_fields[0].name;
  res.locals.dataType = response.data_response[0].table_fields[0].dataType;
  res.render('manager/detail', { style: require('../app_config/detail'), layout: 'layouts/layoutHome' });
});


//[end]
module.exports = router;