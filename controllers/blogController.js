var Blog = require('../models/blog');

exports.create = (req, res, next) => {
  var newBlog = Blog({
    title: req.body.title,
    content: req.body.content,
    author_name: req.body.author_name,
    author_username: req.body.author_username,
    author_email: req.body.author_email,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at
  })

  newBlog.save( (err, blog) => {
    if(err) res.send(err);
    res.send(blog);
  })
}

exports.get_all = (req, res, next) => {
  Blog.find( (err, blogs) => {
    if(err) res.send(err);
    res.send(blogs);
  })
}

exports.get_one = (req, res, next) => {
  Blog.findById(req.params.id, (err, blog) => {
    if(err) res.send(err);
    res.json(blog);
  })
}


exports.edit = (req, res, next) => {
  Blog.findById( req.params.id, (err, blog) => {
    if(err) res.send(err);

    blog.title = req.body.title || blog.title
    blog.content= req.body.content || blog.content
    blog.author_name= req.body.author_name || blog.author_name
    blog.author_username= req.body.author_username || blog.author_username
    blog.author_email= req.body.author_email || blog.author_email
    blog.created_at= req.body.created_at || blog.created_at
    blog.updated_at= req.body.updated_at || blog.updated_at

    blog.save( (err, blog) => {
      if(err) res.send(err);

      // console.log("here")
      // console.log(blog);
      res.send(blog);
    })

  })
}


exports.delete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err, blog) => {
    if(err) res.send(err);

    if(blog){
      var message = {
        message: `Blog has been deleted.`,
        id: blog._id
      }
      res.send(message);
    } else {
      res.send('Invalid blog id.')
    }
  })
}
