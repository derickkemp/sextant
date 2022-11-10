import { useContext } from "react";

import ToggleColorModeContext from "./ToggleColorModeContext";

export default function useToggleColorMode() {
  const toggleColorMode = useContext(ToggleColorModeContext);

  return toggleColorMode;
}
