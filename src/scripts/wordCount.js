const dataSet = require('./DataSet');

function countTopWords(data) {
  const wordCountMap = new Map();

  for (const sentenceData of data) {
    const text = sentenceData.text.toLowerCase();
    const words = text.split(/\W+/);

    for (const word of words) {
      if (word.length > 0) {
        const count = wordCountMap.get(word) || 0;
        wordCountMap.set(word, count + 1);
      }
    }
  }

  const sortedWords = Array.from(wordCountMap.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  const top100Words = sortedWords.slice(0, 100);
  return top100Words;
}

const topWords = countTopWords(dataSet);
console.log('Most used 100 words:');
topWords.forEach(([word, count], index) => {
  console.log(`${index + 1}. ${word}: ${count}`);
});
