const mongoose = require('mongoose');

// Define your schema
const postSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  like:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"like"
  }],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comments"
  }]
});

// Create a model
module.exports = mongoose.model('Post', postSchema);

