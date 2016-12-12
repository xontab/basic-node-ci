# Basic Node CI

Very Basic and minimalistic Node-based CI.

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Web interface](#web-interface)
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
        "directory": "C:\\app\\Test1\\"
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

## Credits

React: http://facebook.github.io/react/
Babel: http://babeljs.io/
Webpack: https://webpack.github.io/docs/
