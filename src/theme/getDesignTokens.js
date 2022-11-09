const typography = {
  h4: {
    fontSize: 32,
    lineHeight: 1.25,
  },
};

const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      contrastText: "#001616",
      dark: "#359898",
      main: "#4cdada",
    },
    secondary: {
      container: "#324b4b",
      contrastText: "#0b1514",
      dark: "#7B8E8E",
      main: "#b0cccb",
      onContainer: "#cce8e7",
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
      container: "#cce8e7",
      light: "#6e8282",
      main: "#4a6363",
      onContainer: "#051f1f",
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

const getDesignTokens = (mode) => ({
  ...(mode === "dark" ? darkThemeOptions : lightThemeOptions),
  typography: typography,
});

export default getDesignTokens;
