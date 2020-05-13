var express = require('express');
var router = express.Router();
const Auth = require('../helpers/Auth');

router.get('/createapi', Auth, function (req, res, next) {
  res.render('manager/createapi', {
    title: 'Create API',
    style: require('../app_config/styleCreateAPI'),
    script: require('../app_config/scriptCreateAPI')
  });
});

router.get('/managerapi', Auth, function (req, res, next) {
  res.render('manager/managerapi', { title: 'Manager API' });
});

router.get("/details", Auth, function (req, res, next) {
  res.render("manager/detailsapi", { title: 'Details API' });
})

//[end]
module.exports = router;