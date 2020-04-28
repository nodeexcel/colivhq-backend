const router = require("express").Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth');

router.post('/register', userController.addUser);

module.exports = router