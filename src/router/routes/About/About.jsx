import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SextantLogo from "../../../components/SextantLogo/SextantLogo";

export default function About() {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
      }}
    >
      <SextantLogo sx={{ width: 256 }} />
      <Typography variant="h1">Sextant</Typography>
      <Typography variant="body1">{process.env.REACT_APP_VERSION}</Typography>
      <Typography variant="body1">
        <a href="https://github.com/derickkemp/sextant">
          https://github.com/derickkemp/sextant
        </a>
      </Typography>
      <Typography variant="h3" sx={{ width: "100%" }}>
        Attributions
      </Typography>
      <Typography variant="body1" sx={{ width: "100%" }}>
        <a
          href="https://www.flaticon.com/free-icons/sextant"
          title="sextant icons"
        >
          Sextant icons created by Smashicons - Flaticon
        </a>
      </Typography>
    </Box>
  );
}
