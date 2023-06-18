const Sentence = require('../models/sentenceModel');
const InMemoryDB = require('../data/InMemoryDB');

class SentenceDAO {
  constructor() {
    this.dataSource = InMemoryDB.getInstance();
  }

  createSentence(text, categories) {
    return this.dataSource.createSentence(text, categories);
  }

  updateSentence(sentence) {
    return this.dataSource.updateSentence(sentence);
  }

  deleteSentence(id) {
    return this.dataSource.deleteSentence(id);
  }

  getSentenceById(id) {
    return this.dataSource.getSentenceById(id);
  }

  getAllSentences(
    page = 1,
    limit = 10,
    category = null,
    sortBy = 'id',
    sortDirection = 'ASC',
  ) {
    let sentences = this.dataSource.getAllSentences();

    if (category) {
      sentences = this.getSentencesWithByCategory(sentences, category);
    }

    sentences = this.getSortedSentences(sentences, sortBy, sortDirection);

    return this.getPaginatedSentences(sentences, page, limit);
  }

  getSentencesWithByCategory(sentences, category) {
    return sentences.filter(sentence => {
      return sentence.categories[category] === 1;
    });
  }

  getSortedSentences(sentences, sortBy, sortDirection) {
    return sentences.sort((a, b) => {
      const sortValueA = a.categories[sortBy];
      const sortValueB = b.categories[sortBy];
      let comparison = 0;

      if (sortValueA < sortValueB) {
        comparison = -1;
      } else if (sortValueA > sortValueB) {
        comparison = 1;
      }

      return sortDirection === 'DESC' ? -comparison : comparison;
    });
  }

  getPaginatedSentences(sentences, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return sentences.slice(startIndex, endIndex);
  }
}

module.exports = SentenceDAO;
