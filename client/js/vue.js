
Vue.component('hello', {
  template: '<h1>GLOB</h1>'
})

Vue.component('blog-list', {
  props: ['blog'],
  template: '<li>{{blog.title}} - {{blog.content}}</li>'
})


Vue.component('blog-detail', {
  props: ['blog'],
  template: `
  <div class="ui message">
    <div class="header">
      {{blog.title}}
    </div>
    <p>{{blog.content}}</p>
  </div>

  `
})


Vue.component('side-menu-item', {
  props: ['blog'],
  template: `
    <a class="item" v-on:click="emitfun(blog._id)">
      {{blog.title}}
    </a>
  `,
  methods: {
    emitfun(blog_id) {
      console.log('emmited ', blog_id);
      this.$emit('emitfunfun', blog_id)
    }
  }
})

Vue.component('side-menu-bar', {
  props: ['blogs'],
  template: `
  <div class="ui secondary vertical pointing menu">
    <side-menu-item v-for="blog in blogs" :blog="blog" v-on:emitfunfun="show(blog._id)"></side-menu-item>
  </div>

  `,
  methods: {
    show: function(blog_id){
      console.log('show', blog_id);
      this.$emit('showdetail', blog_id)
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    message: "sup",
    newBlog: {title: '', content: '', author_name: '', author_username: '', author_email: ''},
    blogDetails: [],
    blogs: []
  },
  methods: {
    addBlog: () => {
      axios.post(
        'http://localhost:3000/api/blogs',
        {
          title: app.newBlog.title,
          content: app.newBlog.content,
          author_name: app.newBlog.author_name,
          author_username: app.newBlog.author_username,
          author_email: app.newBlog.author_email
        }
      )
      .then( response => {
        console.log(response.data);

        app.blogs.push(response.data);

      })
    },
    showBlogDetail: (blog_id) => {
      console.log('blog id', blog_id);
      // axios.get('http://localhost:3000/api/blogs/'+blog_id)
      // .then ( response => {
      //   console.log(response.data);
      // })

      // actually dont need to make an axios get to server
      // just look at app.blogs

      console.log("***", app.blogs);
      var elementPos = app.blogs.map( function(blog) {return blog._id; }).indexOf(blog_id);

      app.blogDetails = [];
      app.blogDetails.push( app.blogs[elementPos] );

    },
    showAll : () => {
      app.blogDetails = [];
      app.blogDetails = app.blogs;
    }
  }, // end of methods
  filters: {

  },
  created: () => {
    axios.get(
      'http://localhost:3000/api/blogs',
    )
    .then ( response => {
      console.log(response.data);
      app.blogs = response.data;
      app.blogDetails = response.data;
    })
  }
}) // end of var app
