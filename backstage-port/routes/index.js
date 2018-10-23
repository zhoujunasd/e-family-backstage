var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const adminUser = require('../controller/adminUser')
const upload = require('../controller/upload')

router.use('/admine',adminUser)
router.use(upload)

module.exports = router;
