'use strict'; 
const AppService = require('../service.js');
const logging = require('./logging.js');

const appsList = [];

function addNewApp(config, i) {
    if (!config.id) {
        logging.log('Initialise', `Error: App ${i}'s Id is not defined`);
        return;
    }
    appsList[config.id] = new AppService(i, config);
}

function loadConfig(config) {
    logging.log('Initialise', 'Loading Configuration');
    config.map(addNewApp);
    logging.log('Initialise', 'Loaded Configuration');
}

function getRunningApps() {
    return Object.keys(appsList).map((id) => {
            const app = appsList[id];
            return Object.assign(app.getConfig(), {
                status: app.getStatus(),
                lastLog: app.getLastLog(),
                nextExecutionDate: app.getNextExecutionDate()
            });
        }
    );
}

function executeApp(id) {
    appsList[id].execute();
    return true;
}

module.exports = {
    addNewApp,
    loadConfig,
    getRunningApps,
    executeApp
};
