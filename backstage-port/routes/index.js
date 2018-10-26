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

router.use('/admine',adminUser)
router.use(upload)
router.use('/news',news)
router.use('/category',category)
router.use('/swiper',swiper)
router.use('/jwt',jwt)



module.exports = router;
