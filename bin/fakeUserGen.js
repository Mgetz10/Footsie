const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = 'footsie';
mongoose.connect(`mongodb://localhost/${dbName}`);

for (let i = 0; i < 100; i++) {
  const fakeUser = new User({
    username: `fakeUser${i}`,
    password: i
  });
  fakeUser.save();
}
