import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import sextantLogo from "../../../sextant.webp";

export default function Welcome() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={sextantLogo}
        sx={{
          ...(theme.palette.mode === "dark" && { filter: "invert(1)" }),
          opacity: 0.87,
          width: 256,
        }}
      />
      <Typography variant="h1">Welcome to Sextant</Typography>
      <Typography variant="body1">
        Drag and Drop your GeoJSON file here, or use the upload button below to
        get started.
      </Typography>
      <Button
        disableElevation={true}
        variant="contained"
        sx={{ borderRadius: 20, height: 40 }}
      >
        Upload
      </Button>
    </Box>
  );
}
