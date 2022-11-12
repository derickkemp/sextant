import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";

import getDesignTokens from "../../theme/getDesignTokens";
import useColorMode from "../useColorMode/useColorMode";
import useMediaSize, { mediaSizes } from "../useMediaSize/useMediaSize";

const spacings = {
  [mediaSizes.LARGE.description]: 32,
  [mediaSizes.MEDIUM.description]: 12,
  [mediaSizes.SMALL.description]: 8,
};

export default function useCreateTheme() {
  const [colorMode] = useColorMode();
  const mediaSize = useMediaSize();

  const spacing = useMemo(() => spacings[mediaSize.description], [mediaSize]);

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
