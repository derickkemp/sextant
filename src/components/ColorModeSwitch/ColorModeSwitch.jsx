import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";

import useColorMode from "../../hooks/useColorMode/useColorMode";

export default function ColorModeSwitch() {
  const [colorMode, toggleColorMode] = useColorMode();

  return (
    <IconButton variant="" onClick={toggleColorMode}>
      {colorMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
