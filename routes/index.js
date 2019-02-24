const express = require('express');
const router = express.Router();
const isLoggedIn = require('../public/javascripts/isLogged');
const User = require('../models/user');

/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index');
});

//
router.get('/socks', isLoggedIn, (req, res, next) => {
  User.aggregate([{ $sample: { size: 3 } }]).then(userHandfull => {
    res.render('socks', { users: userHandfull });
  });
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
