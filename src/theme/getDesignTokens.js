const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      contrastText: "#001616",
      dark: "#359898",
      main: "#4cdada",
    },
    secondary: {
      contrastText: "#0b1514",
      dark: "#7B8E8E",
      main: "#b0cccb",
    },
    background: {
      default: "#191c1c",
      paper: "#191c1c",
    },
    error: {
      contrastText: "#290002",
      main: "#ffb4ab",
    },
    divider: "#889392",
    text: {
      primary: "#e0e3e2",
    },
  },
};

const lightThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      light: "#338787",
      main: "#006a6a",
    },
    secondary: {
      main: "#4a6363",
      light: "#6e8282",
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
    text: {
      primary: "#191c1c",
    },
  },
};

const getDesignTokens = (mode) =>
  mode === "dark" ? darkThemeOptions : lightThemeOptions;

export default getDesignTokens;
