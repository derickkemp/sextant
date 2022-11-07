import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Box
        sx={{
          width: 80,
        }}
      />
      <Box
        elevation={0}
        sx={{
          flex: 1,
          height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
