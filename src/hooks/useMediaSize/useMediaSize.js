import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

const mediaSizes = {
  LARGE: Symbol(1),
  MEDIUM: Symbol(2),
  SMALL: Symbol(3),
};

function useMediaSize() {
  const isLarge = useMediaQuery("(min-width:840px)");
  const isMedium = useMediaQuery("(min-width:600px)");

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
