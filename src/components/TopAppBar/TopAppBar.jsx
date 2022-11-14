import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useLocation, useNavigate } from "react-router-dom";

import ColorModeSwitch from "../ColorModeSwitch/ColorModeSwitch";
import Md3Typography from "../md3/Md3Typography/Md3Typography";

export default function TopAppBar({ onBack }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ alignItems: "center", display: "flex", height: 64, p: 1 }}>
      <IconButton aria-label="back" onClick={onBack || (() => navigate("/"))}>
        <ArrowBackIcon />
      </IconButton>
      <Md3Typography sx={{ flex: 1 }} role="title">
        Sextant
      </Md3Typography>
      {pathname !== "/about" && (
        <IconButton aria-label="about" onClick={() => navigate("/about")}>
          <InfoIcon />
        </IconButton>
      )}
      <ColorModeSwitch />
    </Box>
  );
}
