const SentenceDAO = require('../../dao/SentenceDao');

function getSentenceController(req, res) {
  try {
    const { id } = req.params;

    const sentenceDAO = new SentenceDAO();
    const sentence = sentenceDAO.getSentenceById(id);

    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    res.json(sentence);
  } catch (error) {
    console.error('Error getting sentence:', error);
    res.status(500).json({ error: 'Failed to retrieve sentence' });
  }
}

module.exports = getSentenceController;
