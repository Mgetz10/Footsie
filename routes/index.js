const express = require('express');
const router = express.Router();
const isLoggedIn = require('../public/javascripts/isLogged');

/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index');
});

//
router.get('/socks', isLoggedIn, (req, res, next) => {
  res.render('socks');
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
