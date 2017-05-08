var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author_name: {type: String, required: true},
  author_username: {type: String, required: true},
  author_email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: function(v) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(v);
      },
      message: '{VALUE} is not a valid email address.'
    }
  },
  created_at: { type: Date, required: false, default: Date.now},
  updated_at: { type: Date, required: false, default: Date.now}

})

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
