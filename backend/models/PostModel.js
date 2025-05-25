


const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const PostModel = mongoose.model('post', postSchema);
module.exports = PostModel;