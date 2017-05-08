var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../app');

var Blog = require('../models/blog')

describe('Blog', () => {
  var newBlog_id = "";
  beforeEach( done => {
    var newBlog = Blog({
      title: "Monday Blues",
      content: "I love Monday!",
      author_name: "rudy",
      author_username: "ijo",
      author_email: "ijo@haha.com"
    })

    newBlog.save( (err, blog) => {
      newBlog_id = blog._id;
      done()
    })

  });

  afterEach( done => {
    Blog.remove({}, err => {
      done();
    })
  });

  describe('GET - all blogs', () => {
    it('should get all data', done => {
      chai.request(server)
      .get('/api/blogs')
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")

        result.should.have.status(200)
        result.body.should.be.an('array')
        result.body.length.should.equal(1)

        done()
      })
    }); // it
  });

  describe('GET - one blog by id', () => {
    it('should get a blog', done => {
      chai.request(server)
      .get('/api/blogs/' + newBlog_id)
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")

        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.should.have.property('title')
        result.body.should.have.property('content')
        result.body.should.have.property('author_name')
        result.body.should.have.property('author_username')
        result.body.should.have.property('author_email')
        result.body.should.have.property('created_at')
        result.body.should.have.property('updated_at')

        result.body.title.should.equal("Monday Blues")
        result.body.content.should.equal("I love Monday!")
        result.body.author_name.should.equal("rudy")
        result.body.author_username.should.equal("ijo")
        result.body.author_email.should.equal("ijo@haha.com")


        done()
      })
    }); // it
  });


  describe('POST - create blog', () => {
    it('should create a new blog in the DB', done => {
      chai.request(server)
      .post('/api/blogs')
      .send({
        title: "Throwback Thursday",
        content: "I'm feeling nostalgic!",
        author_name: "rudy",
        author_username: "ijo",
        author_email: "ijo@haha.com"
      })
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")
        //
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.should.have.property('title')
        result.body.should.have.property('content')
        result.body.should.have.property('author_name')
        result.body.should.have.property('author_username')
        result.body.should.have.property('author_email')
        result.body.should.have.property('created_at')
        result.body.should.have.property('updated_at')

        result.body.title.should.equal("Throwback Thursday")
        result.body.content.should.equal("I'm feeling nostalgic!")
        result.body.author_name.should.equal("rudy")
        result.body.author_username.should.equal("ijo")
        result.body.author_email.should.equal("ijo@haha.com")

        done()
      })
    });
  });

  describe('PUT - edit blog', () => {
    it('should update specific field in the blog document', done => {

      console.log("newBlog_id", newBlog_id);

      chai.request(server)
      .put('/api/blogs/'+newBlog_id)
      .send({
        title: "Throwback Sunday"
      })
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")


        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.title.should.equal("Throwback Sunday")

        done()
      })

    });
  });

  describe('DELETE - delete blog', () => {
    it('should delete a blog', done => {

      chai.request(server)
      .delete('/api/blogs/'+newBlog_id)
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")


        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal("Blog has been deleted.")

        // get all blogs, if the array length is zero then it is correct
        chai.request(server)
        .get('/api/blogs')
        .end( (err, result) => {
          // console.log("result.body **********************")
          // console.log(result.body);
          // console.log("*********** **********************")

          result.should.have.status(200)
          result.body.should.be.an('array')
          result.body.length.should.equal(0)
          done()
        })

      })

    });
  });

  // validation input
  describe('POST create blog with invalid fields', () => {
    it('empty email should return error message', done => {
      chai.request(server)
      .post('/api/blogs')
      .send({
        title: "Throwback Thursday",
        content: "I'm feeling nostalgic!",
        author_name: "rudy",
        author_username: "ijo",
        author_email: ""
      })
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")

        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.should.have.property('errors')
        result.body.errors.author_email.message.should.equal('Email is required.')

        done()
      })

    }); // it

    it('invalid email should also return error message', done => {
      chai.request(server)
      .post('/api/blogs')
      .send({
        title: "Throwback Thursday",
        content: "I'm feeling nostalgic!",
        author_name: "rudy",
        author_username: "ijo",
        author_email: "ijohaha"
      })
      .end( (err, result) => {
        // console.log("result.body **********************")
        // console.log(result.body);
        // console.log("*********** **********************")

        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.should.have.property('errors')
        result.body.errors.author_email.message.should.equal('ijohaha is not a valid email address.')

        done()
      })

    }); // it
  });



});
