var express = require('express');
var router = express.Router();

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const signin = require('../helpers/Auth'); 
const moment = require('moment');

var bundleScriptProfile = require("../app_config/scriptProfile");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/profile',signin,async (req, res) => {
  try {
    let response = await connect(apis.POST_PROFILE, {}, req.token);
    res.locals.data = response.data_response;
    res.locals.BASE_URL = apis.BASE_URL;
    res.locals.URL_IMAGE = apis.URL_IMAGE;
    res.locals.POST_UPLOAD_IMAGE = apis.POST_UPLOAD_IMAGE;
    res.locals.token = req.token;
  
    if (res.locals.birthday) {
        res.locals.birthday = moment(res.locals.birthday).format('DD/MM/yyyy');
    }

    res.render('home/profile/index', { layout: 'layouts/layoutHome', scripts: require("../app_config/styleFreeProfile") });
} catch (error) {
    res.clearCookie("token");
    res.redirect('/login')
}
});

router.get('/profile/editfullName',async (req, res) =>{
  res.locals.fullName = req.query.name;
  res.render('home/profile/_editfullName', { layout: 'layouts/_layoutNull' });
});

router.post('/profile/editfullName',signin,async(req,res)=>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/user/profile");
});

router.get('/profile/editpassword',async (req,res)=>{
  res.render('home/profile/_editpassword',{ layout: 'layouts/_layoutNull'});
});

router.post('/profile/editpassword',signin,async(req,res)=>{
  await connect(apis.POST_CHANGE_PASSWORD,req.body,req.token);
  res.redirect("/user/profile");
})

router.get('/profile/editgender',async (req,res) =>{
  res.render('home/profile/_editgender',{ layout: 'layouts/_layoutNull'});
});

router.post('/profile/editgender',signin,async(req,res)=>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/user/profile");
});

router.get('/profile/editbirthday', async (req,res)=>{
  res.locals.birthday = req.query.value;
  res.render('home/profile/_editbirthday',{ layout : 'layouts/_layoutNull'});
})

router.post('/profile/editbirthday',signin,async(req,res) =>{
  await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
  res.redirect("/user/profile");
});

module.exports = router;
