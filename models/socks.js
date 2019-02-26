// models/socks.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socksSchema = new Schema(
  {
    user_id: String,
    sockOwner: String,
    name: String,
    image: {
      type: String,
      default: '1.jpeg'
    },
    socksMatching: [String],
    socksNotMatching: [String]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Sock = mongoose.model('socks', socksSchema);

module.exports = Sock;
