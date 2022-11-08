import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useMemo, useState } from "react";

import getDesignTokens from "./theme/getDesignTokens";
import router from "./router/router";
import ToggleColorModeContext from "./theme/ToggleColorModeContext";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = useCallback(() => {
    console.log(mode);
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  console.log(toggleColorMode);

  return (
    <ToggleColorModeContext.Provider value={toggleColorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ToggleColorModeContext.Provider>
  );
}

export default App;
