console.log('HELLO WORLD');

const fileHandler = require('./src/fileHandler');
const request = require('request-promise');

// const processEnvArg = (arg) => {
//     if (arg === 'test' || arg === 'prod') {
//         return Promise.resolve(arg);
//     }
//     return Promise.reject('Your environment arg must be test or prod');
// };

const createBotSubscriber = () => {
    fileHandler.getDataFromConfig()
        .then((data) => {
            console.log(data);

            // const env = process.argv[2];// test or prod
            // const pathToConfig = process.argv[3];

            // create url
            const botNameForUrl = data.botName.replace(/ /g, '%20');
            const botEmail = `${data.botName.replace(/ /g, '.').toLowerCase()}@palringo.com`;

            const url = `http://bot-service.test.palringo.aws/Bot/?name=${botNameForUrl}&description=${botNameForUrl}&email=${botEmail}`;

            // http://bot-service.${env}.palringo.aws/Bot/?name${botNameForUrl}&description=${botNameForUrl}&email=${botEmail}
            console.log('url', url);

            return request.put(url);
        })
        .then((response) => console.log('Response from request: ', response))
        .catch((err) => console.log('Error', err));
};

createBotSubscriber();
