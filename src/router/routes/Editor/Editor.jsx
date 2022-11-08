import Box from "@mui/material/Box";
import { useLoaderData } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Map from "../../../components/Map/Map";

export default function Editor() {
  const [geoJson, map] = useLoaderData();
  const { palette } = useTheme();

  console.log(palette);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Map
        geoJson={geoJson}
        gMap={map}
        sx={{
          border: `2px solid ${palette.divider}`,
          borderRadius: "24px",
          flex: 5,
          height: "calc(100% - 64px)",
          m: 1,
          overflow: "hidden",
          width: "calc(100% - 64px)",
        }}
      />
      <Box sx={{ flex: 1 }}></Box>
    </Box>
  );
}
