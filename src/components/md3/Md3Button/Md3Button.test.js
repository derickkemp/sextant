import Button from "@mui/material/Button";

export default function Md3Button({ children, sx, ...props }) {
  return (
    <Button
      disableElevation={true}
      sx={{
        ...sx,
        borderRadius: 20,
        height: 40,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
