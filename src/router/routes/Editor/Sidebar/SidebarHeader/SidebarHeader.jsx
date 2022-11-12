import Box from "@mui/material/Box";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";

import Md3Typography from "../../../../../components/md3/Md3Typography/Md3Typography";
import SextantLogo from "../../../../../components/SextantLogo/SextantLogo";
import useColorMode from "../../../../../hooks/useColorMode/useColorMode";

export default function SidebarHeader() {
  const [colorMode, toggleColorMode] = useColorMode();

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <SextantLogo sx={{ mr: 1 / 4, width: 28 }} />
      <Md3Typography sx={{ flex: 1 }} role="title">
        Sextant
      </Md3Typography>
      <IconButton variant="" onClick={toggleColorMode}>
        {colorMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
}
