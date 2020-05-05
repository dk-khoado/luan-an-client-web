var express = require('express');
var router = express.Router();
const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');

router.use(async (req, res, next) => {

    if (req.signedCookies.token) {
        req.token = req.signedCookies.token;
        //kiểm tra xem đa lưu thông tin người dùng chưa nếu chưa lưu thì gọi lấy
        if (!req.signedCookies.v1_pf) {
            var response = await connect(apis.POST_PROFILE, {}, req.token);

            if (response == null) {
                res.clearCookie("token")
                res.send('<script>alert("token exprire");window.location.replace("/login")</script>');
                return;
            }

            if (response.is_success) {
                res.locals.data = response.data_response[0].username;
                res.cookie("v1_pf", response.data_response[0].username, { signed: true, maxAge: 12000 });
                next();
            } else {
                res.clearCookie("token")
                res.send('<script>alert("token exprire");window.location.replace("/login")</script>');
            }
        } else {
            res.locals.data = req.signedCookies.v1_pf;
            next();
        }
    } else {
        res.clearCookie("token")
        res.redirect("/login");
    }
})

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
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost"), style: require("../app_config/styleadminPost")  });
})

router.post('/post/new', async (req, res) => {
    console.log(req.body);
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost"),});
})

router.get('/post/edit/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost"), style: require("../app_config/styleadminPost") });
})
router.post('/post/edit/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost") });
})

router.get('/post/delete/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost") });
})
router.post('/post/delete/:id', async (req, res) => {
    res.render('admin/post/post', { layout: 'layouts/_layout', script: require("../app_config/adminPost") });
})
// <<<===
router.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
})

router.get('/profile',async (req, res) =>{
    let response = await connect(apis.POST_PROFILE, {}, req.token);
    res.locals= response.data_response[0];
    res.render('admin/profile/profile', { layout: 'layouts/_layout', script: require("../app_config/adminProfile") });
})

router.post('/profile',async (req, res) =>{
   let request = req.body;
    
    res.render('admin/profile/profile', { layout: 'layouts/_layout', script: require("../app_config/adminProfile") });
})
//[end]
//làm ơn đừng xóa cái //[end]
router.use((req, res) => {
    res.render('admin/404', { layout: 'layouts/_layout' });
});

module.exports = router;