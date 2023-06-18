const fs = require('fs');
const path = require('path');
const Sentence = require('../models/sentenceModel');
const DATA_FILE_PATH = path.join(__dirname, 'data.json');

class InMemoryDB {
  constructor() {
    this.jsonFilePath = DATA_FILE_PATH;
    this.sentences = new Map();
  }

  static getInstance() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  initialize() {
    const jsonData = fs.readFileSync(this.jsonFilePath, 'utf8');
    let data = JSON.parse(jsonData);
    data.forEach((item, index) => {
      const id = index.toString();
      const sentence = new Sentence(id, item.text, item.cats);
      this.sentences.set(id, sentence);
    });

    console.log('Data source initialized.');
  }

  getAllSentences() {
    return [...this.sentences.values()];
  }

  getSentenceById(id) {
    return this.sentences.get(id);
  }

  createSentence(text, categories) {
    const id = this.sentences.size.toString();
    const sentence = new Sentence(id, text, categories);
    this.sentences.set(this.sentences.size.toString(), sentence);
    return sentence;
  }

  updateSentence(sentence) {
    const updateSentence = this.sentences.get(sentence.id);
    if (updateSentence) {
      if (sentence.text) {
        updateSentence.text = sentence.text;
      }
      if (sentence.categories) {
        updateSentence.categories = sentence.categories;
      }
      this.sentences.set(updateSentence.id, updateSentence);
      return sentence;
    }
    return null;
  }

  deleteSentence(id) {
    const sentence = this.sentences.get(id);
    if (sentence) {
      this.sentences.delete(id);
      return sentence;
    }
    return null;
  }
}

module.exports = InMemoryDB;
