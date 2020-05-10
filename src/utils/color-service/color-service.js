import config from "../../config";

// defaults in case everything fails
const defaults = {
  darkMode: {
    colorBackground: "#000000",
    colorBackgroundAlt: "#222222",
    colorText: "#FFFFFF",
    colorTextAlt: "#FFFFFF",
    colorPale: "#222222",
    colorDim: "#333333",
    colorTextDim: "#DDDDDD",
    colorTextSecondary: "#666666",
  },

  lightMode: {
    colorBackground: "#FFFFFF",
    colorBackgroundAlt: "#000000",
    colorText: "#000000",
    colorTextAlt: "#FFFFFF",
    colorPale: "#F5F5F5",
    colorDim: "#E9E9E9",
    colorTextDim: "#4E4E4E",
    colorTextSecondary: "#BCBCBC",
  },

  accent: "#FEB931",
};

function saveTheme(colors) {
  window.localStorage.setItem(config.THEME_KEY, JSON.stringify(colors));
}

function getTheme() {
  const colors = window.localStorage.getItem(config.THEME_KEY);
  return colors ? JSON.parse(colors) : defaults.lightMode;
}

function saveAccent(color) {
  window.localStorage.setItem(config.ACCENT_KEY, color);
}

function getAccent() {
  const accent = window.localStorage.getItem(config.ACCENT_KEY);
  return accent || defaults.accent;
}

export default {
  saveTheme,
  getTheme,
  saveAccent,
  getAccent,

  defaults, // to compare for the settings view
};
