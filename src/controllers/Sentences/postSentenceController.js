const SentenceDAO = require('../../dao/SentenceDao');

function postSentenceController(req, res) {
  try {
    const { text, categories } = req.body;
    
    const sentenceDAO = new SentenceDAO();
    const newSentence = sentenceDAO.createSentence(text, categories);

    res.status(201).json(newSentence);
  } catch (error) {
    console.error('Error creating sentence:', error);
    res.status(500).json({ error: 'Failed to create sentence' });
  }
}

module.exports = postSentenceController;
