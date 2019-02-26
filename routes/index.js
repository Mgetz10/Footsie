const express = require('express');
const router = express.Router();
const utils = require('../public/javascripts/isLogged');
const isLoggedIn = utils.isLoggedIn;
console.log(isLoggedIn, typeof isLoggedIn);
const containsSock = require('../public/javascripts/containsSock');
const User = require('../models/user');
const Sock = require('../models/socks');
//require('../public/javascripts/isLogged').logOut();
/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index');
});

router.post('/like', isLoggedIn, (req, res, next) => {
  console.log('the user', req.user, ' liked', req.body);
  res.json({ burgerking: true });
  console.log(req.user.socks[0]);
  Sock.findById(req.user.socks[0]).then(sock => {
    sock.socksMatching.push(req.body.sockId);
    sock.save();
  });
});
//
router.get('/socks', isLoggedIn, (req, res, next) => {
  Sock.aggregate([{ $sample: { size: 200 } }]).then(sockHandfull => {
    let socks = [];
    console.log(req.user._id);
    for (sock of sockHandfull) {
      // User.findById(sock.user_id).then(user => {

      // Check if card not current user
      if (sock.user_id === req.user._id) {
        continue;
      }
      // // Check if user has already matched
      // if (){}
      // // Check if user has already disliked sock
      // if (){}
      // // Check if other user has disliked current user
      // if (){}
      socks.push(sock);
    }
    // })
    // console.log(sockHandfull);
    Sock.find({
      _id: { $in: req.user.socks }.then(mySocks => {
        console.log(mySocks);
        res.render('socks', {
          sock: socks,
          mySocks: mySocks
        });
      })
    });
  });
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
