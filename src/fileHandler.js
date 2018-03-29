const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

// const path = require('path');

// const filePath = './config/staging.json';

const safelyParseJSON = (json) => {
    try { return JSON.parse(json); }
    catch (e) { return console.log(e); }
};

const getDataFromConfig = (filePath) => fs.readFileAsync(filePath, 'utf8')
    .then(safelyParseJSON)
    .then((json) => ({
        botName: json.app.name,
    }))
    .catch((err) => console.log('Not a valid config file path', err));

module.exports = {
    getDataFromConfig,
};
