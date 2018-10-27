var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const adminUser = require('../controller/adminUser')
const upload = require('../controller/upload')
const news = require('../controller/news')
const category = require('../controller/category')
const swiper = require('../controller/swiper')
const jwt = require('../controller/jwt')
const topic = require('../controller/topic')
const common = require('../controller/common')

router.use('/admine',adminUser)
router.use(upload)
router.use('/news',news)
router.use('/category',category)
router.use('/swiper',swiper)
router.use('/jwt',jwt)
router.use('/topic',topic)
router.use('/common',common)



module.exports = router;
