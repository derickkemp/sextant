import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import arrayBufferToString from "../../../utils/arrayBufferToString";
import { dialogue } from "../../../utils/upload";
import fileToArrayBuffer from "../../../utils/fileToArrayBuffer";
import Md3Button from "../../../components/md3/Md3Button/Md3Button";
import { set as setGeoJson } from "../../../utils/geoJson";
import SextantLogo from "../../../components/SextantLogo/SextantLogo";
import { useCallback, useEffect, useRef } from "react";

export default function Welcome() {
  const dropZoneRef = useRef();
  const navigate = useNavigate();

  const handleUpload = useCallback(() => {
    dialogue()
      .then((file) => setGeoJson(JSON.parse(arrayBufferToString(file))))
      .then(() => navigate("edit"));
  }, [navigate]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      fileToArrayBuffer(e.dataTransfer.files[0])
        .then((file) => setGeoJson(JSON.parse(arrayBufferToString(file))))
        .then(() => navigate("edit"));
    },
    [navigate]
  );

  useEffect(() => {
    const dropZoneEl = dropZoneRef.current;

    dropZoneEl.addEventListener("dragover", handleDragOver);
    dropZoneEl.addEventListener("drop", handleDrop);

    return () => {
      dropZoneEl.removeEventListener("dragover", handleDragOver);
      dropZoneEl.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver, handleDrop]);

  return (
    <Box
      ref={dropZoneRef}
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <SextantLogo sx={{ width: 256 }} />
      <Typography variant="h1">Welcome to Sextant</Typography>
      <Typography variant="body1">
        Drag and Drop your GeoJSON file here, or use the upload button below to
        get started.
      </Typography>
      <Md3Button onClick={handleUpload} sx={{ my: 1 / 2 }} variant="contained">
        Upload
      </Md3Button>
    </Box>
  );
}
