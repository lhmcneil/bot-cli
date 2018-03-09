console.log('HELLO WORLD');

const fileHandler = require('./src/fileHandler');
const request = require('request-promise');

const isValidEnvArg = (arg) => {
    if (arg === 'test' || arg === 'prod') {
        return Promise.resolve(arg);
    }
    return Promise.reject('Your environment arg must be test or prod');
};

const createBotSubscriber = () => {
    isValidEnvArg(process.argv[2]) // eslint-disable-line no-magic-numbers
        .then(() => fileHandler.getDataFromConfig(process.argv[3])) // eslint-disable-line no-magic-numbers
        .then((data) => {

            const env = process.argv[2]; // eslint-disable-line no-magic-numbers

            // create url
            const botNameForUrl = data.botName.replace(/ /g, '%20');
            const botEmail = `${data.botName.replace(/ /g, '.').toLowerCase()}@palringo.com`;
            const url = `http://bot-service.${env}.palringo.aws/Bot/?name=${botNameForUrl}&description=${botNameForUrl}&email=${botEmail}`;

            console.log(url);

            return request.put(url);
        })
        .then((response) => console.log('Bot subscriber created!', response))
        .catch((err) => console.log('Error', err));
};

createBotSubscriber();
