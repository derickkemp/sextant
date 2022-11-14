import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import Md3Typography from "../../../components/md3/Md3Typography/Md3Typography";
import SextantLogo from "../../../components/SextantLogo/SextantLogo";
import TopAppBar from "../../../components/TopAppBar/TopAppBar";

export default function About() {
  const navigate = useNavigate();

  return (
    <Box>
      <TopAppBar onBack={() => navigate(-1)} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 1,
        }}
      >
        <SextantLogo sx={{ width: 128 }} />
        <Md3Typography role="display">Sextant</Md3Typography>
        <Md3Typography role="body">
          {process.env.REACT_APP_VERSION}
        </Md3Typography>
        <Md3Typography role="body">
          <a href="https://github.com/derickkemp/sextant">
            https://github.com/derickkemp/sextant
          </a>
        </Md3Typography>
        <Md3Typography role="title" sx={{ mt: 1, width: "100%" }}>
          Attributions
        </Md3Typography>
        <Md3Typography role="body" sx={{ width: "100%" }}>
          <a
            href="https://www.flaticon.com/free-icons/sextant"
            title="sextant icons"
          >
            Sextant icons created by Smashicons - Flaticon
          </a>
        </Md3Typography>
      </Box>
    </Box>
  );
}
