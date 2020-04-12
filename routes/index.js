var express = require('express');
var router = express.Router();
var axios = require('axios').default;

var bundleScriptAccount = require('../app_config/scriptAccount');
var bundleStyleAccount = require('../app_config/styleAccount');
var bundleScriptChat = require('../app_config/adminChat');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Trang Chủ' });
});

router.get('/login', function (req, res, next) {
  res.render('home/login', {
    title: 'Đăng Nhập',
    style: bundleStyleAccount
  });
});

router.get('/register', function (req, res, next) {
  res.render('home/register', {
    title: 'Đăng Ký',
    style: bundleStyleAccount
  });
});

router.get('/team', function (req, res, next) {
  res.render('home/team', { title: 'My Team' });
});

router.get('/adminchat', function(req,res,next)
{
  res.render('adminchat/index', {title: 'Chat của admin nha mấy ba ',
script: bundleScriptChat})
})


router.get('/forgotpassword', function (req, res, next) {
  res.render('home/forgot-password', {
    title: 'Quên Mật Khẩu',
    style: bundleStyleAccount
  });
});

router.get('/success', function (req, res, next) {
  res.render('success', { title: 'Success' });
});

router.post('/register', async function (req, res) {
  await axios.post('https://api-server-game.herokuapp.com/api/account/register', {
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.email
  })
    .then(function (response) {
      if (response.data.is_success == false) {
        res.redirect('/account');
      }
      else {
        res.redirect('/success');
      }

    })
    .catch(function (error) {
      console.log(error);
    });
})

router.post('/login', async function (req, res) {
  await axios.post('https://api-server-game.herokuapp.com/api/account/login', {
    "username": req.body.username,
    "password": req.body.password,
    "email": req.body.username
  })
    .then(function (respone) {
      if (respone.data.is_success == true) {
        let data = respone.data;  
        res.cookie('token', data.data_response.token, { signed: true, });
        res.redirect('/admin');
      }
      else {
        res.redirect('/login');
      }
    })
    .catch(function (error) {
      console.log("[error]",error);      
    });
})
/* GET home page. */
router.get('/team', function(req, res, next) {
  res.render('home/team', { title: 'Express' });
});
module.exports = router;
