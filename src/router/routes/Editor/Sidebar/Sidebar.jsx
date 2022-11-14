import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import FeatureForm from "../../../../components/FeutureForm/FeatureForm";
import Md3Button from "../../../../components/md3/Md3Button/Md3Button";

import SidebarHeader from "./SidebarHeader/SidebarHeader";

export default function Sidebar({
  feature,
  onDownload,
  onPropertyRemove,
  onSubmit,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderRadius: "28px",
        display: "flex",
        flex: "1 1 16.67%",
        flexDirection: "column",
        my: 1,
        pl: 1 / 2,
        pr: 1,
      }}
    >
      <SidebarHeader />
      {feature ? (
        <FeatureForm
          feature={feature}
          onPropertyRemove={onPropertyRemove}
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            overflow: "hidden",
          }}
        />
      ) : (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Md3Button
            onClick={onDownload}
            sx={{ mt: 1 / 4 }}
            variant="contained"
          >
            Download GeoJSON
          </Md3Button>
          <Md3Button
            onClick={() => navigate("/")}
            sx={{ mt: 1 / 4 }}
            variant="outlined"
          >
            Upload a New File
          </Md3Button>
          <Box sx={{ flex: 1 }} />
          <Md3Button
            onClick={() => navigate("/about")}
            sx={{ mt: 1 / 4 }}
            variant="outlined"
          >
            About Sextant
          </Md3Button>
        </Box>
      )}
    </Box>
  );
}
