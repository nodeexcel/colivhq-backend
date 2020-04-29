const router = require("express").Router();

router.use('/homes', require('./homes'));

module.exports = router