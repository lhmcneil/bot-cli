const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const filePath = './src/utils/convertNumbersArrays.json';
let languageNumbers;

const safelyParseJSON = (json) => {
    try { return JSON.parse(json); }
    catch (e) { return console.log(e); }
};

const updateLanguageNumbers = () => {
    fs.readFileAsync(filePath, 'utf8')
        .then(safelyParseJSON)
        .then((json) => {
            languageNumbers = json;
        })
        .catch((err) => console.log(err));
};
