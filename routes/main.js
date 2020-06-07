var express = require('express');
var router = express.Router();
var axios = require('axios').default;

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
const Auth = require('../helpers/Auth');

var bundleStyleNewsFeed = require('../app_config/styleNewsFeed');

 
router.get('/newsfeed',Auth, async (req, res) => {
  
  res.render('newsfeed/index', { 
    title: "News Feed",
    style: bundleStyleNewsFeed
  })
});


module.exports = router;