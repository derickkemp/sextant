import Box from "@mui/material/Box";

import ColorModeSwitch from "../../../../../components/ColorModeSwitch/ColorModeSwitch";
import Md3Typography from "../../../../../components/md3/Md3Typography/Md3Typography";
import SextantLogo from "../../../../../components/SextantLogo/SextantLogo";

export default function SidebarHeader() {
  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      <SextantLogo sx={{ mr: 1 / 4, width: 28 }} />
      <Md3Typography sx={{ flex: 1 }} role="title">
        Sextant
      </Md3Typography>
      <ColorModeSwitch />
    </Box>
  );
}
