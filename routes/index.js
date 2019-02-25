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
    let userSocks = [];
    for (user of userHandfull) {
      randomSock = Math.floor(Math.random() * Math.floor(2));
      userSocks.push(user.socks[randomSock]);
    }
    res.render('socks', {
      userSock: userSocks,
      user: userHandfull
    });
  });
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
