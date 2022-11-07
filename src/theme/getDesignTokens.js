const components = {
  MuiButton: {
    styleOverrides: {},
  },
};

const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#4cdada",
      contrastText: "#001616",
    },
    secondary: {
      main: "#b0cccb",
      contrastText: "#0b1514",
    },
    background: {
      default: "#191c1c",
      paper: "#191c1c",
    },
    error: {
      main: "#ffb4ab",
      contrastText: "#290002",
    },
    divider: "#889392",
    text: {
      primary: "#e0e3e2",
    },
  },
};

const lightThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#006a6a",
    },
    secondary: {
      main: "#4a6363",
    },
    background: {
      default: "#fafdfc",
      paper: "#fafdfc",
    },
    error: {
      main: "#ba1a1a",
      contrastText: "#ffffff",
    },
    divider: "#2c2f2f",
  },
};

const getDesignTokens = (mode) =>
  mode === "dark" ? darkThemeOptions : lightThemeOptions;

export default getDesignTokens;
