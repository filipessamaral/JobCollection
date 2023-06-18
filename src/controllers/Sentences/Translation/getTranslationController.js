const SentenceDAO = require('../../../dao/SentenceDao');
const TranslateText = require('../../../services/translateText');

async function getTranslationController(req, res) {
  try {
    const { id } = req.params;
    const { lang } = req.query;

    const sentenceDAO = new SentenceDAO();
    const sentence = sentenceDAO.getSentenceById(id);

    if (!sentence) {
      return res.status(404).json({ error: 'Sentence not found' });
    }

    const translationText = await TranslateText(sentence.text, lang);

    res.json({ sentence, translationText });
  } catch (error) {
    console.error('Error getting sentence:', error);
    res.status(500).json({ error: 'Failed to retrieve sentence' });
  }
}

module.exports = getTranslationController;
