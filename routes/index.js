var express = require('express');
var router = express.Router();
var axios = require('axios').default;

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const signin = require('../helpers/Auth'); 
const moment = require('moment');


var bundleScriptAccount = require('../app_config/scriptAccount');
var bundleStyleAccount = require('../app_config/styleAccount');
var bundleScriptChat = require('../app_config/adminChat');
var bundleStyleReset = require('../app_config/styleReset');

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
scripts: bundleScriptChat})
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
        res.redirect('/successlogin');
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

router.get('/reset',function(req,res,next){
  res.render('home/resetnewpassword',{style:bundleStyleReset});
});

router.get('/profile',signin,async (req, res) => {
  let response = await connect(apis.POST_PROFILE,{}, req.token);
  res.locals = response.data_response;
  res.locals.birthday = moment(res.locals.birthday).format('DD/MM/yyyy');
  res.render('home/profile/index',{ layout: 'layouts/layoutHome' });
});

router.get('/profile/editfullName',async (req, res) =>{
  res.locals.fullName = req.query.name;
  res.render('home/profile/_editfullName', { layout: 'layouts/_layoutNull' });
});

router.post('/profile/editfullName',signin,async(req,res)=>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/profile");
});

router.get('/profile/editpassword',async (req,res)=>{
  res.render('home/profile/_editpassword',{ layout: 'layouts/_layoutNull'});
});

router.post('/profile/editpassword',signin,async(req,res)=>{
  await connect(apis.POST_CHANGE_PASSWORD,req.body,req.token);
  res.redirect("/profile");
})

router.get('/profile/editgender',async (req,res) =>{
  res.render('home/profile/_editgender',{ layout: 'layouts/_layoutNull'});
});

router.post('/profile/editgender',signin,async(req,res)=>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/profile");
});

router.get('/profile/editbirthday', async (req,res)=>{
  res.locals.birthday = req.query.name;
  res.render('home/profile/_editbirthday',{ layout : 'layouts/_layoutNull'});
})

router.post('/profile/editbirthday',signin,async(req,res) =>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/profile");
});

router.get('/error',function(req,res,next){
  res.render('error/errorpage',{title:'ErorrPage User'});
});

router.get('/successlogin',function(req,res,next){
  res.render('success/loginsuccess',{title:'LoginSuccess User'});
});



module.exports = router;
