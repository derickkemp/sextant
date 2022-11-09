import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import sextantLogo from "./sextant.webp";

export default function SextantLogo({ sx }) {
  const theme = useTheme();

  return (
    <Box
      component="img"
      src={sextantLogo}
      sx={{
        ...(theme.palette.mode === "dark" && { filter: "invert(1)" }),
        opacity: 0.87,
        width: 512,
        ...sx,
      }}
    />
  );
}
