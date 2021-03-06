# Basic Node CI (Continuous Integration)

Very Basic and minimalistic Node-based CI (Continuous Integration) application

**Table of Contents**

- [Why yet another CI](#why-yet-another-ci)
- [Installation](#installation)
- [Start CI Server](#start-ci-server)
- [Future versions](#future-versions)
- [Credits](#credits)

## Why yet another CI

* Free for both public and private projects
* Cross-platform, works also on Windows
* Minimal Configuration
* Low resources needed
* Easy to use web interface


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

Please Note: You need to restart the server when changes are applied to the above file.

### Available Parameters

| Paramater | Type | Remark | Defaut Value |
| --- | --- | --- | --- |
| `id` | string |  The name of the application (required) | `undefined` |
| `directory` | string | The source code of the application (required)  | `undefined` |
| `post-script` | string | The script filename in the source code directory which will run after the latest source code is pulled  | `undefined` |
| `interval` | number |  How frequent the latest source code will be pulled from source control  | `300000` |
| `plugin` | enum | The source control engine.  Currently only `git` is supported  | `git` |
| `server` | string | The name of the remote name in source control  | `origin` |
| `branch` | string | The branch name in source control | `master` |


## Start CI Server

To run the CI server just execute the following command:

    > npm start

### Web interface

The web interface is started automatically when the CI server is running.  Just open http://localhost:8089 in a web browser for a basic web interface.

The default credentials are:
* Username: admin
* Password: admin123

The users' credentials are stored in the `users.json` file in the `config` folder.  Also the Web UI can be disabled for security reasons and the port can be changed from the `web.json` file in the `config` directory.

Please Note: You need to restart the server when changes are applied to the above file.


## Future versions

This application is still a WIP and more features will be coming in the near future: Planned feature that will be implemented soon:

* Unit Testing before releases
* Better login system
* More details in dashboard
* Permissions
* Add and configure apps from web portal
* Help page

## Credits

React: http://facebook.github.io/react/

Babel: http://babeljs.io/

Webpack: https://webpack.github.io/docs/
