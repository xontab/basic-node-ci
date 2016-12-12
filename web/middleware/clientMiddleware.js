export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return promise(client).then(
        result => next({ ...rest, result, type: SUCCESS, receivedAt: Date.now() }),
        error => next({ ...rest, error, type: FAILURE }),
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console
      next({ ...rest, error, type: FAILURE });
    });
  };
}
