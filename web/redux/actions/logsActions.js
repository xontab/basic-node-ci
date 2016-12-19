export const FETCH_LOGS = 'APPS/FETCH_LOGS';
export const SUCCESS_LOGS = 'APPS/SUCCESS_LOGS';
export const FAILED_LOGS = 'APPS/FAILED_LOGS';

export function fetchLogs(id) {
  return dispatch =>
    dispatch({
      types: [
        FETCH_LOGS,
        SUCCESS_LOGS,
        FAILED_LOGS,
      ],
      promise: client => client.get(`/logs/${id}`),
      id,
    });
}
