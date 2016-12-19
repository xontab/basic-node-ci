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
        const newConfig = Object.assign({}, defaultConfig, config);
        this._config = newConfig;
        this.addLog(statuses.IDLE, 'Adding new config');
        if (!this._config.directory) {
            this.addLog(statuses.ERROR, 'Error: Directory is not defined');
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

    getFullLogs() {
        return this._logs;
    }

    addLog(type, text) {
        this._status = type;
        if (type === statuses.OK || type === statuses.ERROR || type === statuses.NO_CHANGES) {
            this._lastStatus = type;
        }
        this._logs.push({
            type: type,
            text: text,
            date: new Date()
        });
        if (this._logs.length > 100) {
            this._logs.pop();
        }
        loggingHelper.log(this._config.id, text);
    }

    execute(force) {
        this._lastExecuted = new Date();
        this._status = statuses.PROCESSING;
        const pluginPath = `../plugins/${this._config.plugin}.json`;
        const plugin = require(pluginPath);
        const pull = plugin.pull
            .replace('{server}', this._config.server)
            .replace('{branch}', this._config.branch);

        exec(pull, { cwd: this._config.directory }, (errorP, stdoutP, stderrP) => {
            this.addLog(statuses.PROCESSING, `Executing`);
            if (errorP) {
                this.addLog(statuses.ERROR, `Error while Pulling changes: ${stderrP || 'Unknown Error'}`);
                return;            
            }

            if (stdoutP.indexOf(plugin['no-changes-response']) === 0 && this._lastStatus !== statuses.ERROR && !force) {
                this.addLog(statuses.NO_CHANGES, `No Changes in Repository - ${this._config.server}/${this._config.branch}`);
                return;
            }

            if (this._config['post-script']) {
                exec(this._config['post-script'], { cwd: this._config.directory }, (errorPS, stdoutPS, stderrPS) => {
                    if (errorPS) {
                        this.addLog(statuses.ERROR, `Error while Deploying changes: ${stderrPS || 'Unknown Error'}`);
                        return;            
                    }

                    this.addLog(statuses.OK, 'Deployed new version');
                });
            } else {
                this.addLog(statuses.OK, 'Deployed new version without Post Scripts');
            }
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
