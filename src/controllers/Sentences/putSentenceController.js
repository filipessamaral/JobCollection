const SentenceDAO = require('../../dao/SentenceDao');

function putSentenceController(req, res) {
  try {
    const { id } = req.params;
    const { text, categories } = req.body;

    const sentenceDAO = new SentenceDAO();
    const sentence = sentenceDAO.getSentenceById(id);

    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    const updatedSentence = sentenceDAO.updateSentence({
      id,
      text,
      categories,
    });

    res.json(updatedSentence);
  } catch (error) {
    console.error('Error updating sentence:', error);
    res.status(500).json({ error: 'Failed to update sentence' });
  }
}

module.exports = putSentenceController;
