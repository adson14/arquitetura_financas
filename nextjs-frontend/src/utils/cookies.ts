import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'access_token';

export const setAccessTokenCookie = (token: string) => {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    expires: 10 * 60 * 60, 
    path: '/',
  });
};

export const getAccessTokenFromCookie = () => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const removeAccessTokenCookie = () => {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: '/',
  });
};
