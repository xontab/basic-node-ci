import fetch from 'isomorphic-fetch';

import { browserHistory } from 'react-router';

const methods = ['get', 'post', 'put', 'delete'];
const acceptHeader = 'Accept';
const contentTypeHeader = 'Content-Type';
const authHeader = 'Authorization';
const contentType = 'application/json';

const Promise = require('es6-promise').Promise;

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/'.concat(path) : path;

  return adjustedPath;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    localStorage.removeItem('accessToken');
    browserHistory.push('/');
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJson(response) {
  // Only parse when there is actually content to parse
  if (response.statusText === 'No Content') {
    return '';
  }

  return response.json();
}

export function serializeParams(obj) {
  const str = [];

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      str.push(encodeURIComponent(property).concat('=', encodeURIComponent(obj[property])));
    }
  }

  return str.join('&');
}

export default class ApiClient {
  constructor(baseUrl, tokenGetter) {
    if (!baseUrl || baseUrl === '') {
      const windowUrl = window.location;
      this.baseUrl = windowUrl.protocol.concat('//', windowUrl.host);
    } else {
      this.baseUrl = baseUrl;
    }

    methods.forEach((method) => {
      this[method] = (path, { params, data, options } = {}) => new Promise((resolve, reject) => {
        const adjustedPath = formatUrl(path);
        const token = tokenGetter ? tokenGetter() : '';
        let url = this.baseUrl + adjustedPath;

        const init = {
          method,
          headers: {
            [acceptHeader]: contentType,
          },
        };

        if (!options || !options.isPublicPath) {
          init.headers[authHeader] = 'Bearer '.concat(token);
        }

        if (params) {
          url = url.concat('?', serializeParams(params));
        }

        if (data) {
          if (data instanceof FormData) {
            init.body = data;
          } else {
            init.body = JSON.stringify(data);
            init.headers[contentTypeHeader] = contentType;
          }
        }

        if (method.toLowerCase() === 'get') {
          init.headers['Cache-Control'] = 'no-cache';
          init.headers.Pragma = 'no-cache';
        }

        fetch(url, init)
          .then(checkStatus)
          .then(parseJson)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            parseJson(error.response).then((body) => {
              reject(body);
            });
          });
      });
    });
  }
}
