# Basic Node CI

Very Basic and minimalistic Node-based CI.

**Table of Contents**

- [Installation](#installation)
- [Start CI Server](#start-ci-server)
- [Future versions](#future-versions)
- [Credits](#credits)

## Installation
To install just run the following command:

    > git clone https://github.com/xontab/basic-node-ci.git 
    > npm install

### Configuration

Add `apps.js` in the `config` directory to define the CI enabled apps.  The following is a sample config:

```js
[
    {
        "id": "Test1",
        "directory": "C:\\app\\Test1\\",
        "post-script": "run.bat"
    },
    {
        "id": "Test2",
        "interval": 15000,
        "directory": "C:\\app\\Test2\\"
    }
]
```

## Start CI Server

To run the CI server just execute the following command:

    > npm start

### Web interface

The web interface is started automatically when the CI server is running.  Just open http://localhost:3000 in a web browser for a basic web interface.

The default credentials are:
* Username: admin
* Password: admin123

## Future versions

This application is still a WIP and more features will be coming in the near future: Planned feature that will be implemented soon:

* Security and Logins
* Unit Testing before releases
* More details in dashboard
* Add and configure apps from web portal

## Credits

React: http://facebook.github.io/react/

Babel: http://babeljs.io/

Webpack: https://webpack.github.io/docs/
