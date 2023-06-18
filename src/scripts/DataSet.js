const path = require('path');

const SENTENCES_DATA_FILE_PATH = path.join(__dirname, '../data/data.json');
const dataSet = require(SENTENCES_DATA_FILE_PATH);

module.exports = dataSet;