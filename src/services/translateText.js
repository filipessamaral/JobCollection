const fetch = require('node-fetch');
const DEEPL_KEY = process.env.DEEPL_KEY;
const API_URL = 'https://api-free.deepl.com/v2/translate';

async function translateText(text, targetLang = 'EN') {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLang,
      }),
    };

    const response = await fetch(API_URL, requestOptions);
    const result = await response.json();
    return result.translations[0]?.text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

module.exports = translateText;
