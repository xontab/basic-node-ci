function log(module, text) {
    const date = new Date();
    const hours = `0${date.getHours()}`.substr(-2);
    const mins = `0${date.getMinutes()}`.substr(-2);
    console.log(`[${hours}:${mins}][${module}] ${text}`);
}

module.exports = {
    log
};
