import config from "../../config";

const TokenService = {
  saveAuthInfo(first_name, token) {
    window.localStorage.setItem(config.FIRST_NAME_KEY, first_name);
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  getUserName() {
    return window.localStorage.getItem(config.FIRST_NAME_KEY);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.FIRST_NAME_KEY);
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
};

export default TokenService;
