# Basic Node CI

Very Basic and minimalistic Node-based CI.

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Web interface](#web-interface)
- [Future versions](#future-versions)
- [Credits](#credits)

## Installation
To install just run the following command:

    > git clone https://github.com/xontab/basic-node-ci.git 
    > npm install

## Usage

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

## Web interface

Open http://localhost:3000 in a web browser for a basic web interface.

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
