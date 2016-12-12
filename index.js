const express = require('express');
const app = express();

// APIs
const appsHelper = require('./app/helpers/apps.js');
const loggingHelper = require('./app/helpers/logging.js');
const list = require('./config/apps.json');

app.get('/api/apps', (req, res) => {
    res.send(appsHelper.getRunningApps());
});

app.get('/api/exec/:id', (req, res) => {
    res.send(appsHelper.executeApp(req.params.id));
});

// Webpack
const isDeveloping = process.env.NODE_ENV !== 'production';

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./dev/webpack.config.js');

const webPort = isDeveloping ? 3000 : process.env.PORT;
const path = require('path');

if (isDeveloping) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(webPort, () => {
    loggingHelper.log('Initialise', `Web: http://localhost:${webPort}`);
    appsHelper.loadConfig(list);
});