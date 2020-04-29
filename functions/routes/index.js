const router = require("express").Router();

router.use('/homes', require('./homes'));

router.use('/members', require('./members'));

module.exports = router