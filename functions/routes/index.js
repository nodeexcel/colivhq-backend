const router = require("express").Router();

router.use('/members', require('./members'));

module.exports = router