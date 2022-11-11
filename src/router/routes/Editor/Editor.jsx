import Box from "@mui/material/Box";
import { useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import download from "../../../utils/download/download";
import FeatureForm from "../../../components/FeutureForm/FeatureForm";
import { getGeoJson } from "../../../google/maps";
import Md3Button from "../../../components/md3/Md3Button/Md3Button";
import Map from "../../../components/Map/Map";
import stringToArrayBuffer from "../../../utils/stringToArrayBuffer/stringToArrayBuffer";

import SidebarHeader from "./SidebarHeader/SidebarHeader";

export default function Editor() {
  const [geoJson, map] = useLoaderData();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState();
  const { palette, spacing } = useTheme();

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
          mr: 1 / 2,
          my: 1,
          overflow: "hidden",
        }}
      />
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
        {selectedFeature ? (
          <FeatureForm
            feature={selectedFeature}
            onPropertyRemove={handlePropertyRemove}
            onSubmit={handleSubmit}
            sx={{ overflow: "auto" }}
          />
        ) : (
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Md3Button
              onClick={handleDownload}
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
    </Box>
  );
}
