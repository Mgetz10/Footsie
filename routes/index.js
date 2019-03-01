const express = require('express');
const router = express.Router();
const utils = require('../public/javascripts/isLogged');
const isLoggedIn = utils.isLoggedIn;
const uploadCloud = require('../config/cloudinary.js');
const containsSock = require('../public/javascripts/containsSock');
const User = require('../models/user');
const Sock = require('../models/socks');
const Chat = require('../models/chat');

/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('index');
});

router.get('/profile-page', isLoggedIn, (req, res) => {
  Sock.find({ user_id: req.user._id }).then(profileSocks => {
    Chat.find({ user_ids: req.user._id }).then(chats => {
      // console.log('in chats', req.user);
      res.render('myprofile.hbs', {
        socks: profileSocks,
        user: req.user,
        chats: chats
      });
    });
  });
});

router.post('/addsock', uploadCloud.single('photo'), (req, res, next) => {
  //uploadCloud.single(url)
  const newSock = new Sock({
    user_id: req.user._id,
    sockOwner: req.user.username,
    name: `Sock-${req.user.socks.length + 1}`,
    image: req.file.url
  });
  newSock.save();
  res.redirect('/profile-page');
});

router.post('/removesock', (req, res, next) => {
  //uploadCloud.single(url)
  console.log(req.body.sockId);
  Sock.findById(req.body.sockId)
    .then(sockToDelete => {
      console.log('broke sock');
      User.findById(sockToDelete.user_id).then(sockToDeleteUser => {
        console.log('broke user');
        sockToDeleteUser
          .update({ $pull: { socks: sockToDeleteUser._id } })
          .then(() => {
            sockToDelete.remove().exec();
          });
      });
    })
    .then(res.send('coolshit'));
  //save to db
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
        let chat = new Chat();
        chat.matchingSocks.push(otherSock.image, sock.image);
        chat.user_ids.push(sock.user_id, otherSock.user_id);
        chat.usernames.push(sock.sockOwner, otherSock.sockOwner);
        chat.save().then(room => {
          console.log('save this ', room._id, ' to each user');
          User.findById(sock.user_id).then(sockUser => {
            sockUser.chats.push(room._id);
            sockUser.save();
          });
          User.findById(otherSock.user_id).then(sockUser => {
            sockUser.chats.push(room._id);
            sockUser.save();
          });
        });

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

router.get('/chat/:chatId', isLoggedIn, (req, res, next) => {
  Chat.findById(req.params.chatId)
    .then(chat => {
      res.render('chat', { chat: chat });
    })
    .catch(err => console.log(err));
});

router.post('/messages', isLoggedIn, (req, res, next) => {
  const newMessage = {
    user: req.user.username,
    message: req.body.newMessage
  };
  Chat.findById(req.body.chatID).then(chat => {
    chat.messages.push(newMessage);
    chat.save().then(() => {
      res.send(newMessage);
    });
  });
});

router.post('/update', isLoggedIn, (req, res, next) => {
  Chat.findById(req.body.chatID).then(chatMessages => {
    res.send(chatMessages.messages);
  });
});

module.exports = router;
