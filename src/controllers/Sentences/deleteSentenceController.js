const SentenceDAO = require('../../dao/SentenceDao');

function deleteSentenceController(req, res) {
  try {
    const { id } = req.params;
    const sentenceDAO = new SentenceDAO();
    const sentence = sentenceDAO.deleteSentence(id);
    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    sentenceDAO.deleteSentence(id);

    res.json({ message: 'Sentence deleted successfully' });
  } catch (error) {
    console.error('Error deleting sentence:', error);
    res.status(500).json({ error: 'Failed to delete sentence' });
  }
}

module.exports = deleteSentenceController;
