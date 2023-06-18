const path = require('path');
const admin = require('firebase-admin');

const SENTENCES_DATA_FILE_PATH = path.join(__dirname, '../data/data.json');
const jsonData = require(SENTENCES_DATA_FILE_PATH);

admin.initializeApp();
const firestore = admin.firestore();

const MAX_BATCH_SIZE = 500;

const transformDataAndSubmitToFirebase = async data => {
  try {
    const transformedData = data.map(item => {
      const cats = Object.keys(item.cats).filter(key => item.cats[key] === 1);
      return { text: item.text, cats };
    });

    const batches = [];

    for (let i = 0; i < transformedData.length; i += MAX_BATCH_SIZE) {
      const batchData = transformedData.slice(i, i + MAX_BATCH_SIZE);

      const batch = firestore.batch();
      batchData.forEach(item => {
        const docRef = firestore.collection('sentences').doc();
        batch.set(docRef, item);
      });

      batches.push(batch.commit());
    }

    await Promise.all(batches);
    console.log('Data submitted to Firebase successfully.');
  } catch (error) {
    console.error('Error submitting data to Firebase:', error);
  }
};
(async () => {
  await transformDataAndSubmitToFirebase(jsonData);
})();
