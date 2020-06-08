var express = require('express');
var router = express.Router();
var axios = require('axios').default;

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const Auth = require('../helpers/Auth');

var bundleStyleAccount = require('../app_config/styleAccount');
var bundleStyleReset = require('../app_config/styleReset');
var bundleStyleIndex = require("../app_config/styleIndex");

var bundleScriptAccount = require('../app_config/scriptAccount');
var bundleScriptChat = require('../app_config/adminChat');

router.use(function(req, res, next){
  if (req.signedCookies.token)                                                                                                                                                                                                                                                                                                        {
    res.locals.is_login = true;
    res.locals.username = req.signedCookies.v1_pf;
  }
  next();
})
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { 
        title: 'Trang Chủ',
        style: bundleStyleIndex
     });
});

router.get('/login', function(req, res, next) {
    res.render('home/login', {
        title: 'Đăng Nhập',
        style: bundleStyleAccount
    });
});

router.get('/register', function(req, res, next) {
    res.render('home/register', {
        title: 'Đăng Ký',
        style: bundleStyleAccount
    });
});

router.get('/team' ,function(req, res, next) {
    res.render('home/team', { title: 'My Team' });
});

router.get('/adminchat', function(req, res, next) {
    res.render('adminchat/index', {
        title: 'Chat của admin nha mấy ba ',
        scripts: bundleScriptChat
    })
})


router.get('/forgotpassword', function(req, res, next) {
    res.render('home/forgot-password', {
        title: 'Quên Mật Khẩu',
        style: bundleStyleAccount
    });
});

router.get('/success', function(req, res, next) {
    res.render('success', { title: 'Success' });
});



router.post('/register', async function(req, res) {
    await axios.post('https://api-server-game.herokuapp.com/api/account/register', {
            "username": req.body.username,
            "password": req.body.password,
            "email": req.body.email
        })
        .then(function(response) {
            if (response.data.is_success == false) {
                res.redirect('/account');
            } else {
                res.redirect('/successlogin');
            }

        })
        .catch(function(error) {
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

        res.cookie('token', data.data_response.token, { signed: true, maxAge:7* 24 * 60 *60 *1000 });        
        res.cookie("v1_pf", data.data_response.user.username, { signed: true, maxAge: 604800 });             
        res.redirect('/home/newsfeed');
      }
      else {
        res.redirect('/login');
      }
    })
    .catch(function (error) {
      console.log("[error]", error);
      res.redirect('/login');
    });
});

router.post('/forgotpassword',async (req,res)=>{
  let respone = await connect(apis.POST_FORGOT,req.body,{});
  if(respone.is_success == true){
      console.log(respone.is_success);
    res.redirect('/notify_fg');
  }
  else{
    res.redirect('/forgotpassword');
  }
})


/* GET home page. */
router.get('/team', function(req, res, next) {
    res.render('home/team', { title: 'Express' });
});

router.get('/notify_fg', async(req, res) => {
    res.render('home/notify_fg', { title: 'Notify', layout: 'layouts/layoutHome' });
});

router.get('/resetnewpassword',async(req,res)=>{
  res.render('home/resetnewpassword',{title:"Reset Password", layout:'layouts/layoutHome',style:require("../app_config/styleReset")});
})


router.get('/error',function(req,res,next){
  res.render('error/errorpage',{title:'ErorrPage'});
});

router.get('/successlogin', function(req, res, next) {
    res.render('success/loginsuccess', { title: 'LoginSuccess' });
});

router.get('/tutorial',function(req,res,next){
  res.render('tutorial/index',{style:require('../app_config/styletutorial')})
});

router.get('/tutorial/tieudebaihuongdan',function(req,res,next){
  res.render('tutorial/tutorial',{style:require('../app_config/styletutorial')});
})
// ping live server
router.get('/ping/:urlPing',async function(req, res, next) {

  await axios.get("https://api-server-game.herokuapp.com/");
  res.send("hello !");
});

module.exports = router;