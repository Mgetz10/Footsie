// models/chat.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema(
  {
    user_ids: [String],
    usernames: [String],
    matchingSocks: [String],
    messages: [Object],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
