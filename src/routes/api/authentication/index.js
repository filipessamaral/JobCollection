const express = require('express');
const { Authentication } = require('../../../controllers');
const router = express.Router();

router.post('/login', Authentication.login);

module.exports = router;
