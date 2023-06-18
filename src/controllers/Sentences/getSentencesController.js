const SentenceDAO = require('../../dao/SentenceDao');

function getSentencesController(req, res) {
  try {
    const { page, limit, category, sortBy, sortDirection } = req.query;
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;

    const sentenceDAO = new SentenceDAO();
    const sentences = sentenceDAO.getAllSentences(
      parsedPage,
      parsedLimit,
      category,
      sortBy,
      sortDirection,
    );

    res.json(sentences);
  } catch (error) {
    console.error('Error getting sentences:', error);
    res.status(500).json({ error: 'Failed to retrieve sentences' });
  }
}

module.exports = getSentencesController;
