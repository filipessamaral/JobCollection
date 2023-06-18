const express = require('express');
const { Translation } = require('../../../../controllers');
const router = express.Router();

router.get('/:id', Translation.getTranslationController);

module.exports = router;
