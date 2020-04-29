const router = require("express").Router();
const membersController = require('../controller/member');

router.get('/get', membersController.getMembers);

router.post('/add', membersController.addMembers);

module.exports = router