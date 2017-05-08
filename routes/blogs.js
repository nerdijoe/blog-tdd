var express = require('express');
var router = express.Router();
var blog_controller = require('../controllers/blogController');

/* GET home page. */
router.get('/', blog_controller.get_all);
router.get('/:id', blog_controller.get_one);

//create
router.post('/', blog_controller.create);

//update
router.put('/:id', blog_controller.edit);

//delete
router.delete('/:id', blog_controller.delete);

module.exports = router;
