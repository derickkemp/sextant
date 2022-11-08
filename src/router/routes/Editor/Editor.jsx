import Box from "@mui/material/Box";
import { Suspense } from "react";

import { get as getGeoJson } from "../../../utils/geoJson";
import { getMap } from "../../../google/maps";
import Map from "../../../components/Map/Map";
import wrapPromise from "../../../utils/wrapPromise";

import mapFallback from "./molumen-world-map.svg";

export default function Editor() {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Suspense
        fallback={
          <Box
            component="img"
            src={mapFallback}
            sx={{ height: "100%", width: "100%" }}
          />
        }
      >
        <Map
          center={{ lat: -25.73134, lng: 28.21837 }}
          getMap={wrapPromise(getMap())}
          getGeoJson={wrapPromise(getGeoJson())}
          zoom={8}
        />
      </Suspense>
    </Box>
  );
}
