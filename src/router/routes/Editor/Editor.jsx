import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import FeatureForm from "../../../components/FeutureForm/FeatureForm";
import Md3Button from "../../../components/md3/Md3Button/Md3Button";
import Map from "../../../components/Map/Map";
import SextantLogo from "../../../components/SextantLogo/SextantLogo";

export default function Editor() {
  const [geoJson, map] = useLoaderData();

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
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <SextantLogo sx={{ mr: 1 / 4, width: 24 }} />
          <Typography variant="h4">Sextant</Typography>
        </Box>
        {selectedFeature ? (
          <FeatureForm
            feature={selectedFeature}
            onPropertyRemove={handlePropertyRemove}
            onSubmit={handleSubmit}
            sx={{ overflow: "scroll" }}
          />
        ) : (
          <Md3Button>Download GeoJSON</Md3Button>
        )}
      </Box>
    </Box>
  );
}
