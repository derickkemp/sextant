import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

import getDesignTokens from "../../theme/getDesignTokens";

const mediaSizes = {
  LARGE: Symbol(1),
  MEDIUM: Symbol(2),
  SMALL: Symbol(3),
};

function useMediaSize() {
  const { breakpoints } = getDesignTokens("light");

  const isLarge = useMediaQuery(`(min-width:${breakpoints.values.xl}px)`);
  const isMedium = useMediaQuery(`(min-width:${breakpoints.values.md}px)`);

  const size = useMemo(() => {
    if (isLarge) {
      return mediaSizes.LARGE;
    }

    if (isMedium) {
      return mediaSizes.MEDIUM;
    }

    return mediaSizes.SMALL;
  }, [isLarge, isMedium]);

  return size;
}

export { useMediaSize as default, mediaSizes };
