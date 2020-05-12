var express = require('express');
var router = express.Router();
var axios = require('axios').default;

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const signin = require('../helpers/Auth');

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

router.get('/adminchat', function (req, res, next) {
  res.render('adminchat/index', {
    title: 'Chat của admin nha mấy ba ',
    scripts: bundleScriptChat
  })
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
        res.cookie('token', data.data_response.token, { signed: true, expires: new Date(new Date().getDate + 3) });

        res.redirect('/admin');
      }
      else {
        res.redirect('/login');
      }
    })
    .catch(function (error) {
      console.log("[error]", error);
    });
})
/* GET home page. */
router.get('/team', function (req, res, next) {
  res.render('home/team', { title: 'Express' });
});

<<<<<<< HEAD
router.get('/profile', signin, async (req, res) => {
  let response = await connect(apis.POST_PROFILE, {}, req.token);
  res.locals = response.data_response;
  res.render('home/profile', { title: 'Profile User' });
=======
router.get('/profile',signin,async (req, res) => {
  let response = await connect(apis.POST_PROFILE,{}, req.token);
  res.locals = response.data_response;
  res.render('home/profile',{ layout: 'layouts/layoutHome', scripts: require("../app_config/styleFreeProfile") });
>>>>>>> remotes/origin/Tuan
});
router.get('/error',function(req,res,next){
  res.render('error/errorpage',{title:'ErorrPage User'});
});

router.get('/successlogin',function(req,res,next){
  res.render('success/loginsuccess',{title:'LoginSuccess User'});
})

module.exports = router;
