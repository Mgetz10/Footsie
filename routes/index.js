const express = require('express');
const router = express.Router();
const utils = require('../public/javascripts/isLogged');
const isLoggedIn = utils.isLoggedIn;
console.log(isLoggedIn, typeof isLoggedIn);
const containsSock = require('../public/javascripts/containsSock');
const User = require('../models/user');
const Sock = require('../models/socks');
/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index');
});

router.post('/match', isLoggedIn, (req, res, next) => {
  //Add liked sock to array
  Sock.findById(req.body.currentSock).then(sock => {
    console.log('whats......', req.body.sockId);
    sock.socksMatching.push(req.body.sockId);
    sock.save();
    Sock.findById(req.body.sockId).then(otherSock => {
      console.log(`othersock: ${otherSock.socksMatching}, sock: ${sock._id}`);
      if (otherSock.socksMatching.includes(req.body.currentSock)) {
        res.json({ matchResult: true });
      } else {
        res.json({ matchResult: false });
      }
    });
  });
});

router.post('/notmatch', isLoggedIn, (req, res, next) => {
  res.json({ burgerking: true });
  User.findById(req.user._id).then(user => {
    console.log('whats......', req.body.sockId);
    user.socksNotMatching.push(req.body.sockId);
    user.save();
  });
});
//
router.get('/socks', isLoggedIn, (req, res, next) => {
  Sock.aggregate([{ $sample: { size: 200 } }]).then(sockHandfull => {
    let socks = [];
    Sock.find({
      user_id: req.user._id
    }).then(mySocks => {
      for (sock of sockHandfull) {
        // User.findById(sock.user_id).then(user => {

        // Check if card not current user
        if (sock.user_id === req.user._id) {
          continue;
        }

        // // Check if user has already disliked sock
        if (req.user.socksNotMatching.includes(String(sock._id))) {
          continue;
        }

        // Check if user has already matched
        console.log(
          'piss and shit',
          mySocks,
          'poo poo and pee pee',
          sock.socksMatching
        );
        if (sock.socksMatching.includes(String)) {
          continue;
        }

        /*  NEW APPROACH NEEDED (CHECK BEFORE FOR LOOP?)
        // Check if other user has disliked current user
        let allSocksNotMatching = true;
        User.findById(sock.user_id).then(thisUser => {
          for (mySock of mySocks) {
            if (!thisUser.socksNotMatching.includes(mySock)) {
              allSocksNotMatching = false;
              break;
            }
          }
        });

        if (allSocksNotMatching) {
          console.log('urDUMN');
          continue;
        }
        */

        socks.push(sock);
      }
      res.render('socks', {
        sock: socks,
        mySocks: mySocks
      });
    });
  });
});

// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;
