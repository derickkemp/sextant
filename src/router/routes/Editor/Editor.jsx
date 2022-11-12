import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import download from "../../../utils/download/download";
import { getGeoJson } from "../../../google/maps";
import Map from "../../../components/Map/Map";
import stringToArrayBuffer from "../../../utils/stringToArrayBuffer/stringToArrayBuffer";
import useMediaSize, {
  mediaSizes,
} from "../../../hooks/useMediaSize/useMediaSize";

import Sidebar from "./Sidebar/Sidebar";

export default function Editor() {
  const [geoJson, map] = useLoaderData();
  const mediaSize = useMediaSize();
  const [selectedFeature, setSelectedFeature] = useState();
  const { palette, spacing } = useTheme();

  const showSidebar = mediaSize === mediaSizes.LARGE;

  const handleFeatureSelect = useCallback((feature) => {
    setSelectedFeature(feature);
  }, []);

  /**
   * @name handleSubmit
   * @function
   * @param {google.maps.Data.Feature} feature
   * @param {Object.<string, string>} newProperties
   */
  const handleSubmit = useCallback((feature, newProperties) => {
    const properties = [];

    // First we build an array of property names, we need to do this so we
    // don't modify the array while looping over it.
    feature.forEachProperty((value, field) => properties.push(field));

    for (const property of properties) {
      feature.removeProperty(property);
    }

    for (const key in newProperties) {
      feature.setProperty(key, newProperties[key]);
    }

    setSelectedFeature();
  }, []);

  const handleDownload = useCallback(() => {
    getGeoJson()
      .then((geoJson) => JSON.stringify(geoJson))
      .then((geoJson) => stringToArrayBuffer(geoJson))
      .then((geoJson) => {
        const now = new Date();
        download(geoJson, `Sextant-${now.toISOString()}.json`);
      });
  }, []);

  /**
   * @name handlePropertyRemove
   * @function
   * @param {google.maps.Data.Feature} feature
   * @param {string} propertyName
   */
  const handlePropertyRemove = useCallback((feature, propertyName) => {
    feature.removeProperty(propertyName);
  }, []);

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
        onFeatureSelect={handleFeatureSelect}
        sx={{
          border: `1px solid ${palette.divider}`,
          borderRadius: "28px",
          flex: `1 1 calc(83.33% - ${spacing(1.5)})`,
          ml: 1,
          mr: showSidebar ? 1 / 2 : 1,
          my: 1,
          overflow: "hidden",
        }}
      />
      {showSidebar.LARGE && (
        <Sidebar
          feature={selectedFeature}
          onDownload={handleDownload}
          onPropertyRemove={handlePropertyRemove}
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
}
