import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

import getDesignTokens from "../../theme/getDesignTokens";
import useColorMode from "../useColorMode/useColorMode";
import useMediaSize, { mediaSizes } from "../useMediaSize/useMediaSize";

export default function useCreateTheme() {
  const [colorMode] = useColorMode();
  const mediaSize = useMediaSize();

  const spacing = useMemo(() => {
    if (mediaSize === mediaSizes.LARGE) {
      return 32;
    }

    if (mediaSize === mediaSizes.MEDIUM) {
      return 12;
    }

    return 8;
  }, [mediaSize]);

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(colorMode),
        spacing: spacing,
      }),
    [colorMode, spacing]
  );

  return theme;
}
