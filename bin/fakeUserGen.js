const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = 'footsie';
mongoose.connect(`mongodb://localhost/${dbName}`);

sockCounter = 0;
for (let i = 0; i < 100; i++) {
  const fakeUser = new User({
    username: `fakeUser${i}`,
    password: i,
    socks: [
      {
        name: `Sock 1`,
        image: `${sockCounter}.jpeg`
      },
      {
        name: `Sock 2`,
        image: `${sockCounter + 1}.jpeg`
      }
    ]
  });
  fakeUser.save();
  sockCounter = (sockCounter + 2) % 20;
}
