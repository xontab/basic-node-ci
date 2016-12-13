const appsHelper = require('./app/helpers/apps.js');
const list = require('./config/apps.json');
const webConfig = require('./config/web.json');

appsHelper.loadConfig(list);  

if (webConfig['web-ui-enable']) {
  // Web UI
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  app.use(bodyParser.json());

  const Immutable = require('Immutable');
  const uuid = require('node-uuid');
  const loggedUsers = [];

  // APIs
  const loggingHelper = require('./app/helpers/logging.js');

  function handleAuthenication(req, res, next) {
    const accessToken = req.headers['authorization'];
    if (accessToken && accessToken.length > 7 && loggedUsers[accessToken.substr(7)] && loggedUsers[accessToken.substr(7)] > new Date().getTime()) {
      next();
    } else {
      res.status(401).send({ error: 'Authentication failed' });
    }
  }

  app.get('/api/apps', handleAuthenication, (req, res) => {
      res.send(appsHelper.getRunningApps());
  });

  app.get('/api/exec/:id', handleAuthenication,  (req, res) => {
      res.send(appsHelper.executeApp(req.params.id));
  });

  app.get('/api/logout', (req, res) => {
      const accessToken = req.headers['authorization'];
      loggedUsers[accessToken.substr(7)] = undefined;
      res.send({ status: 'OK' });
  });

  app.post('/api/login', (req, res) => {
    const logins = Immutable.fromJS(require('./config/users.json'));
    if (logins.findIndex(x => x.get('username') === req.body.username && x.get('password') === req.body.password) >= 0) {
      const accessToken = uuid.v4();
      loggedUsers[accessToken] = new Date().getTime() + 3600000;
      res.send({ token: accessToken });
    } else {
      res.send({ token: '' });
    }
  });

  // Webpack
  const isDeveloping = process.env.NODE_ENV !== 'production';

  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./dev/webpack.config.js');

  const webPort = isDeveloping ? webConfig['web-port'] : process.env.PORT;
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
  });
}