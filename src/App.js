import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import useColorMode from "./theme/colorMode";
import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import getDesignTokens from "./theme/getDesignTokens";
import router from "./router/router";

function App() {
  const [colorMode] = useColorMode();
  const isLarge = useMediaQuery("(min-width:840px)");

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(colorMode),
        spacing: isLarge ? 32 : 8,
      }),
    [isLarge, colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
