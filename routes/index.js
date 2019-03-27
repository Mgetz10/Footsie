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
      res.render('myprofile.hbs', {
        socks: profileSocks,
        user: req.user,
        chats: chats
      });
    });
  });
});

router.post('/addsock', uploadCloud.single('photo'), (req, res, next) => {
  if (!req.file) {
    console.log('LSKDJLKDJFHJ');
    res.redirect('/profile-page');
  }
  const newSock = new Sock({
    user_id: req.user._id,
    sockOwner: req.user.username,
    name: `Sock-${req.user.socks.length + 1}`,
    image: req.file.url
  });
  newSock.save().then(newSockWithId => {
    User.findOneAndUpdate(
      { _id: req.user },
      { $push: { socks: newSockWithId._id } },
      { new: true }
    ).then(pow => {
      console.log(pow);
    });
  });
  res.redirect('/profile-page');
});

router.post('/removesock', (req, res, next) => {
  console.log('showt', req.body.sockId);
  User.findOneAndUpdate(
    { _id: req.user },
    { $pull: { socks: req.body.sockId } },
    { new: true }
  )
    .then(newres => {
      console.log('shh', newres);
      Sock.findById(req.body.sockId)
        .then(sockToDelete => {
          console.log(sockToDelete._id, typeof sockToDelete.id);
          Sock.findByIdAndDelete({ _id: sockToDelete._id })
            .then(response => {
              console.log(response, sockToDelete._id);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .then(res.send('cool'))
    .catch(err => console.log(err));
  // res.redirect('/profile-page');
});

router.post('/match', isLoggedIn, (req, res, next) => {
  //Add liked sock to array
  Sock.findById(req.body.currentSock).then(sock => {
    sock.socksMatching.push(req.body.sockId);
    sock.save();
    Sock.findById(req.body.sockId).then(otherSock => {
      if (otherSock.socksMatching.includes(req.body.currentSock)) {
        let chat = new Chat();
        chat.matchingSocks.push(otherSock.image, sock.image);
        chat.user_ids.push(sock.user_id, otherSock.user_id);
        chat.usernames.push(sock.sockOwner, otherSock.sockOwner);
        chat.save().then(room => {
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
        console.log(sock.user_id, 'user: ', req.user._id);
        // Check if card not current user
        if (String(sock.user_id) === String(req.user._id)) {
          continue;
        }

        // // Check if user has already disliked sock
        if (req.user.socksNotMatching.includes(String(sock._id))) {
          continue;
        }
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
