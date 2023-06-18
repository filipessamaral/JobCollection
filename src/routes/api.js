const express = require('express');
const sentences = require('./api/sentences');
const authentication = require('./api/authentication');

const router = express.Router();

router.use('/sentences', sentences);
router.use('/authentication', authentication);
module.exports = router;
