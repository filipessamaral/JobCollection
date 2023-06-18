const express = require('express');
const { Sentences } = require('../../../controllers');
const authentication = require('../../middleware/authentication');
const translate = require('./translate');
const router = express.Router();

router.get('/', Sentences.getSentencesController);
router.get('/:id', Sentences.getSentenceController);
router.post('/', authentication, Sentences.postSentenceController);
router.put('/:id', authentication, Sentences.putSentenceController);
router.delete('/:id', authentication, Sentences.deleteSentenceController);

router.use('/translate', translate);

module.exports = router;
