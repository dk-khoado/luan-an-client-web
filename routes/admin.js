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

router.get('/messenger', Auth, async (req, res) => {
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
    var response = await connect(apis.GET_GET_ALL_POST, {}, req.token);
    res.locals.dataPost = response.data_response;
    res.locals.BASE_URL = apis.BASE_URL;
    res.locals.POST_DELETE_POST = apis.POST_DELETE_POST;
    res.locals.POST_SEARCH_POST = apis.POST_SEARCH_POST;
    res.locals.token = req.token;
    res.render('admin/post/index', { layout: 'layouts/_layout' , style: require("../app_config/styleadminPost")});
})

router.get('/post/new', async (req, res) => {
    res.locals.POST_UPLOAD_IMAGE_POST = apis.POST_UPLOAD_IMAGE_POST;
    res.locals.POST_UPLOAD_IMAGE_SUMMERNOTE = apis.POST_UPLOAD_IMAGE_SUMMERNOTE;
    res.locals.POST_CREATE_POST = apis.POST_CREATE_POST;
    res.locals.BASE_URL = apis.BASE_URL;
    res.locals.token = req.token;
    res.render('admin/post/post', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost"), style: require("../app_config/styleadminPost") });
})

router.get('/post/edit/:id', async (req, res) => {
    res.locals.idPost = req.params.id;
    res.locals.POST_UPLOAD_IMAGE_POST = apis.POST_UPLOAD_IMAGE_POST;
    res.locals.POST_UPLOAD_IMAGE_SUMMERNOTE = apis.POST_UPLOAD_IMAGE_SUMMERNOTE;
    res.locals.BASE_URL = apis.BASE_URL;
    res.locals.GET_POST_BY_ID = apis.GET_POST_BY_ID;
    res.locals.POST_UPDATE_POST = apis.POST_UPDATE_POST;
    res.locals.token = req.token;
    res.render('admin/post/update', { layout: 'layouts/_layout', scripts: require("../app_config/adminPost"), style: require("../app_config/styleadminPost") });
})

router.get('/post/upload/:id', async (req, res) => {
    res.locals.idPost = req.params.id;
    res.locals.POST_UPLOAD_IMAGE_POST = apis.POST_UPLOAD_IMAGE_POST;
    res.locals.BASE_URL = apis.BASE_URL;
    res.locals.token = req.token;
    res.render('admin/post/upload', { layout: 'layouts/_layoutNull'});
})


router.get('/post/delete/:id', async (req, res) => {
    res.locals.idPost = req.params.id;
    res.render('admin/post/delete', { layout: 'layouts/_layoutNull'});
})

router.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
})

//Profile
router.get('/profile', async (req, res) => {

    try {
        let response = await connect(apis.POST_PROFILE, {}, req.token);
        res.locals.getdata = response.data_response;
        res.locals.BASE_URL = apis.BASE_URL;
        res.locals.URL_IMAGE = apis.URL_IMAGE;
        res.locals.POST_UPLOAD_IMAGE = apis.POST_UPLOAD_IMAGE;
        res.locals.token = req.token;

        if (res.locals.getdata.birthday) {
            res.locals.getdata.birthday = moment(res.locals.getdata.birthday).format('DD/MM/yyyy');
        }

        res.render('admin/profile/index', { layout: 'layouts/_layout', scripts: require("../app_config/adminProfile"), style: require("../app_config/styleadminProfile") });
    } catch (error) {
        res.clearCookie("token");
        res.redirect('/login')
    }

})



//Change fullName
router.get('/profile/editfullName', async (req, res) => {
    res.locals.fullName = req.query.name;
    res.render('admin/profile/_editfullName', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editfullName', async (req, res) => {
    await connect(apis.POST_UPDATE_PROFILE, req.body, req.token);
    res.redirect("/admin/profile");
})
//Change password
router.get('/profile/editpassword', async (req, res) => {
    res.render('admin/profile/_editpassword', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editpassword', async (req, res) => {
    await connect(apis.POST_CHANGE_PASSWORD, req.body, req.token);
    res.redirect("/admin/profile");
})
//Change gender
router.get('/profile/editgender', async (req, res) => {
    res.render('admin/profile/_editgender', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editgender', async (req, res) => {
    await connect(apis.POST_UPDATE_PROFILE, req.body, req.token);
    res.redirect("/admin/profile");
})
//Change birthday
router.get('/profile/editbirthday', async (req, res) => {
    res.locals.birthday = req.query.value;
    res.render('admin/profile/_editbirthday', { layout: 'layouts/_layoutNull' });
})
router.post('/profile/editbirthday', async (req, res) => {
    await connect(apis.POST_UPDATE_PROFILE, req.body, req.token);
    res.redirect("/admin/profile");
})



//[end]
//làm ơn đừng xóa cái //[end]
router.use((req, res) => {
    res.render('admin/404', { layout: 'layouts/_layout' });
});

module.exports = router;