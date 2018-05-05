var express = require('express');
var router = express.Router();

/* GET admin home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});
router.get('/admin/cinema', function(req, res, next) {
  res.render('cinema');
});
router.get('/admin/cinema/details', function(req, res, next) {
  res.render('cinemaDetails')
});
router.get('/admin/users', function(req, res, next) {
  res.render('adminUsers')
});


module.exports = router;
