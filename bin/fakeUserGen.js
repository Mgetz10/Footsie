const mongoose = require('mongoose')
const User = require('../models/user')
const Sock = require('../models/socks')

const bcrypt = require('bcrypt')
const bcryptSalt = 10

// const dbName = 'footsie';
mongoose.connect(
  `mongodb+srv://Monroe:Monroe@cluster0-7erhe.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
)

// Sock.deleteMany({})
//   .then()
//   .catch();
// User.deleteMany({})
//   .then()
//   .catch();

sockCounter = 0
for (let i = 0; i < 6; i++) {
  let password = String(i)
  const salt = bcrypt.genSaltSync(bcryptSalt)
  const hashPass = bcrypt.hashSync(password, salt)

  const fakeUser = new User({
    username: `LonelySock${i}`,
    password: hashPass,
  })

  fakeUser.save().then(newUser => {
    const fakeSock = new Sock({
      user_id: newUser._id,
      sockOwner: newUser.username,
      name: `Sock-1`,
      image: `./images/testSocks/${sockCounter}.jpeg`,
    })
    const fakeSock2 = new Sock({
      user_id: newUser._id,
      sockOwner: newUser.username,
      name: `Sock-2`,
      image: `./images/testSocks/${sockCounter + 1}.jpeg`,
    })
    fakeSock.save().then(newSock => {
      User.findById(newUser._id).then(user => {
        user.socks.push(newSock._id)
        user.save()
      })
    })
    fakeSock2.save().then(newSock => {
      User.findById(newUser._id).then(user => {
        user.socks.push(newSock._id)
        user.save()
      })
    })
    // fakeSock2.save().then(newSock2 => {
    //   newUser.socks.push(newSock2._id);
    //   newUser.save();
    // });
    sockCounter = (sockCounter + 2) % 20
  })
}
