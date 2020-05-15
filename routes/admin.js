var express = require('express');
var router = express.Router();
const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const moment = require('moment');
const Auth = require('../helpers/Auth');

router.use(Auth);
router.get('/', async (req, res) => {
    res.render('admin/index', { title: "admin", layout: 'layouts/_layout' });
});
router.get('/messenger', async (req, res) => {
    res.render('adminchat/index', { layout: 'layouts/_layout' });
})

//user manager
router.get('/manager/users', async (req, res) => {

    res.locals.script = require("../app_config/scriptManagerUser");
    
    res.render('admin/manager/user/index', { layout: 'layouts/_layout' });
})
//<<===
// this is post manager
router.get('/post', async (req, res) => {
    res.render('admin/post/index', { layout: 'layouts/_layout' });
})

router.get('/post/new', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost"), style: require("../app_config/styleadminPost")  });
})

router.post('/post/new', async (req, res) => {
    console.log(req.body);
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost"),});
})

router.get('/post/edit/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost"), style: require("../app_config/styleadminPost") });
})
router.post('/post/edit/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost") });
})

router.get('/post/delete/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost") });
})
router.post('/post/delete/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost") });
})
// <<<===
router.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
})

//Profile
router.get('/profile',async (req, res) =>{
    let response = await connect(apis.POST_PROFILE, {}, req.token);
    res.locals= response.data_response;
    if (res.locals.birthday)
    {
        res.locals.birthday = moment(res.locals.birthday).format('DD/MM/yyyy');
    }
    
    res.render('admin/profile/index', { layout: 'layouts/_layout', scripts: require("../app_config/adminProfile") });
})
//Change fullName
router.get('/profile/editfullName',async (req, res) =>{
    res.locals.fullName = req.query.name;
    res.render('admin/profile/_editfullName', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editfullName',async (req, res) =>{
    await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
   res.redirect("/admin/profile");
})
//Change password
router.get('/profile/editpassword',async (req, res) =>{
    res.render('admin/profile/_editpassword', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editpassword',async (req, res) =>{
    await connect(apis.POST_CHANGE_PASSWORD,req.body,req.token);
   res.redirect("/admin/profile");
})
//Change gender
router.get('/profile/editgender',async (req, res) =>{
    res.render('admin/profile/_editgender', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editgender',async (req, res) =>{
    await connect(apis.POST_UPDATE_PROFILE,req.body,req.token);
   res.redirect("/admin/profile");
})
//Change birthday
router.get('/profile/editbirthday', async(req, res)=>{
    res.locals.birthday = req.query.value;
    res.render('admin/profile/_editbirthday', {layout: 'layouts/_layoutNull'});
})
router.post('/profile/editbirthday', async(req, res)=>{
    await connect(apis.POST_UPDATE_PROFILE, req.body, req.token);
    res.redirect("/admin/profile");
})





//[end]
//làm ơn đừng xóa cái //[end]
router.use((req, res) => {
    res.render('admin/404', { layout: 'layouts/_layout' });
});

module.exports = router;