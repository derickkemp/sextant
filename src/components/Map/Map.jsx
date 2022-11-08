import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

import { getBounds } from "../../google/maps";
import { dark as darkMap, light as lightMap } from "../../theme/mapStyles";

const Map = ({ gMap, geoJson, sx }) => {
  const mapContainer = useRef();

  const theme = useTheme();

  useEffect(() => {
    gMap.map.setOptions({
      styles: theme.palette.mode === "dark" ? darkMap : lightMap,
    });
    mapContainer.current.appendChild(gMap.element);

    return () => gMap.element.remove();
  }, [gMap, theme.palette.mode]);

  useEffect(() => {
    gMap.map.data.setStyle({
      fillColor: theme.palette.primary.main,
      strokeColor: theme.palette.primary.main,
    });

    gMap.map.data.addGeoJson(geoJson);

    const bounds = getBounds(gMap.map.data);
    gMap.map.fitBounds(bounds);

    const listeners = [];

    listeners.push(
      gMap.map.data.addListener("click", (e) =>
        e.feature.forEachProperty((value, name) => console.log(name, value))
      )
    );

    listeners.push(
      gMap.map.data.addListener("mouseover", (e) =>
        gMap.map.data.overrideStyle(e.feature, {
          fillColor: theme.palette.secondary.main,
          strokeColor: theme.palette.secondary.main,
        })
      )
    );

    listeners.push(
      gMap.map.data.addListener("mouseout", (e) =>
        gMap.map.data.overrideStyle(e.feature, {
          fillColor: theme.palette.primary.main,
          strokeColor: theme.palette.primary.main,
        })
      )
    );

    return () => {
      while (listeners.length) {
        const listener = listeners.pop();
        gMap.event.removeListener(listener);
      }
    };
  }, [geoJson, gMap, theme.palette]);

  return <Box ref={mapContainer} sx={sx} />;
};

export default Map;
