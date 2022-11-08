import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import getDesignTokens from "./theme/getDesignTokens";
import router from "./router/router";
import ToggleColorModeContext from "./theme/ToggleColorModeContext";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const isLarge = useMediaQuery("(min-width:840px)");

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(mode),
        spacing: isLarge ? 32 : 8,
      }),
    [isLarge, mode]
  );

  const toggleColorMode = useCallback(() => {
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
