export const FETCH_LOGIN = 'AUTH/FETCH_LOGIN';
export const SUCCESS_LOGIN = 'AUTH/SUCCESS_LOGIN';
export const FAILED_LOGIN = 'AUTH/FAILED_LOGIN';

export const FETCH_LOGOUT = 'AUTH/FETCH_LOGOUT';
export const SUCCESS_LOGOUT = 'AUTH/SUCCESS_LOGOUT';
export const FAILED_LOGOUT = 'AUTH/FAILED_LOGOUT';

export function login(username, password) {
  return dispatch =>
    dispatch({
      types: [
        FETCH_LOGIN,
        SUCCESS_LOGIN,
        FAILED_LOGIN,
      ],
      promise: client => client.post('/login', {
          data: {
              username,
              password,
          }
      }),
    });
}

export function logout() {
  return dispatch =>
    dispatch({
      types: [
        FETCH_LOGOUT,
        SUCCESS_LOGOUT,
        FAILED_LOGOUT,
      ],
      promise: client => client.get('/logout'),
    });
}