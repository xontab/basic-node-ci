export const FETCH_APPS = 'APPS/FETCH_APPS';
export const SUCCESS_APPS = 'APPS/SUCCESS_APPS';
export const FAILED_APPS = 'APPS/FAILED_APPS';

export const FETCH_EXECUTE_APPS = 'APPS/FETCH_EXECUTE_APPS';
export const SUCCESS_EXECUTE_APPS = 'APPS/SUCCESS_EXECUTE_APPS';
export const FAILED_EXECUTE_APPS = 'APPS/FAILED_EXECUTE_APPS';

export function fetchApps() {
  return dispatch =>
    dispatch({
      types: [
        FETCH_APPS,
        SUCCESS_APPS,
        FAILED_APPS,
      ],
      promise: client => client.get('/apps'),
    });
}

export function executeApp(id) {
  return dispatch =>
    dispatch({
      types: [
        FETCH_EXECUTE_APPS,
        SUCCESS_EXECUTE_APPS,
        FAILED_EXECUTE_APPS,
      ],
      id,
      promise: client => client.get(`/exec/${id}`),
    });
}
