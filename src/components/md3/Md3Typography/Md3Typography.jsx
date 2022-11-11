import Typography from "@mui/material/Typography";
import { useMemo } from "react";

import useMediaSize, {
  mediaSizes,
} from "../../../hooks/useMediaSize/useMediaSize";

const fontSizes = {
  body: {
    [mediaSizes.LARGE.description]: 16,
    [mediaSizes.MEDIUM.description]: 14,
    [mediaSizes.SMALL.description]: 12,
  },
  display: {
    [mediaSizes.LARGE.description]: 57,
    [mediaSizes.MEDIUM.description]: 45,
    [mediaSizes.SMALL.description]: 36,
  },
  title: {
    [mediaSizes.LARGE.description]: 22,
    [mediaSizes.MEDIUM.description]: 16,
    [mediaSizes.SMALL.description]: 14,
  },
};

const fontWeights = {
  body: {
    [mediaSizes.LARGE.description]: 400,
    [mediaSizes.MEDIUM.description]: 400,
    [mediaSizes.SMALL.description]: 400,
  },
  display: {
    [mediaSizes.LARGE.description]: 400,
    [mediaSizes.MEDIUM.description]: 400,
    [mediaSizes.SMALL.description]: 400,
  },
  title: {
    [mediaSizes.LARGE.description]: 400,
    [mediaSizes.MEDIUM.description]: 500,
    [mediaSizes.SMALL.description]: 500,
  },
};

const lineHeights = {
  body: {
    [mediaSizes.LARGE.description]: 24,
    [mediaSizes.MEDIUM.description]: 20,
    [mediaSizes.SMALL.description]: 16,
  },
  display: {
    [mediaSizes.LARGE.description]: 64,
    [mediaSizes.MEDIUM.description]: 52,
    [mediaSizes.SMALL.description]: 44,
  },
  title: {
    [mediaSizes.LARGE.description]: 28,
    [mediaSizes.MEDIUM.description]: 24,
    [mediaSizes.SMALL.description]: 20,
  },
};

const variants = {
  body: "body1",
  display: "h1",
  title: "h3",
};

export default function Md3Typography({ children, role, sx, ...props }) {
  const mediaSize = useMediaSize();
  const sizeKey = mediaSize.description;

  const fontSize = useMemo(() => fontSizes[role][sizeKey], [role, sizeKey]);
  const fontWeight = useMemo(() => fontWeights[role], [role]);
  const lineHeight = useMemo(() => lineHeights[role][sizeKey], [role, sizeKey]);
  const variant = useMemo(() => variants[role], [role]);

  return (
    <Typography
      sx={{
        ...sx,
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: `${lineHeight}px`,
      }}
      {...props}
      variant={variant}
    >
      {children}
    </Typography>
  );
}
