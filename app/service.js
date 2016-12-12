'use strict'; 
const open = require('open');
const exec = require('child_process').exec;
const loggingHelper = require('./helpers/logging.js');
const defaultConfig = require('../config/default.json');
const statuses = require('./constants/statuses.js');

class AppService {
    constructor(idx, config){
        this._logs = [];
        this._idx = idx;
        this._status = statuses.IDLE;
        this.init(config);
    }

    init(config) {
        const newConfig = Object.assign(defaultConfig, config);
        this._config = JSON.parse(JSON.stringify(newConfig));
        this.log(statuses.IDLE, 'Adding new config');
        if (!this._config.directory) {
            this.log(statuses.ERROR, 'Error: Directory is not defined');
            return;
        }
        this.dispose();
        this._interval = setInterval(this.execute.bind(this), this._config.interval);
        this.execute();
    }

    getConfig() {
        return this._config;
    }

    getStatus() {
        return this._status;
    }

    getNextExecutionDate() {
        if (this._lastExecuted) {
            return new Date(this._lastExecuted.getTime() + this._config.interval);
        }
    }

    getLastLog() {
        if (this._logs.length > 0)
        {
            return this._logs[this._logs.length - 1];
        }

        return {};
    }

    log(type, text) {
        this._status = type;
        this._logs.push({
            type: type,
            text: text,
            date: new Date()
        });
        loggingHelper.log(this._config.id, text);
    }

    execute() {
        this._lastExecuted = new Date();
        this._status = statuses.PROCESSING;
        const pluginPath = `../plugins/${this._config.plugin}.json`;
        const plugin = require(pluginPath);
        const pull = plugin.pull
            .replace('{server}', this._config.server)
            .replace('{branch}', this._config.branch);

        exec(pull, { cwd: this._config.directory }, (errorP, stdoutP, stderrP) => {
            this.log(statuses.PROCESSING, `Executing`);
            if (errorP) {
                this.log(statuses.ERROR, `Error while Pulling changes: ${stderrP || 'Unknown Error'}`);
                return;            
            }

            if (stdoutP.indexOf(plugin['no-changes-response']) === 0) {
                this.log(statuses.NO_CHANGES, `No Changes in Repository - ${this._config.server}/${this._config.branch}`);
                return;
            }

            exec(this._config['post-script'], { cwd: this._config.directory }, (errorPS, stdoutPS, stderrPS) => {
                if (errorPS) {
                    this.log(statuses.ERROR, `Error while Deploying changes: ${stderrPS || 'Unknown Error'}`);
                    return;            
                }

                this.log(statuses.OK, 'Deployed new version');
            });
        });
    }

    dispose() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }
}

module.exports = AppService;
