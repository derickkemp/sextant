import { createBrowserRouter } from "react-router-dom";

import { get as getGeoJson } from "../utils/geoJson";
import { getMap } from "../google/maps";

import About from "./routes/About/About";
import Editor from "./routes/Editor/Editor";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import Root from "./routes/Root/Root";
import Welcome from "./routes/Welcome/Welcome";

const router = createBrowserRouter([
  {
    children: [
      {
        element: <About />,
        path: "about",
      },
      {
        element: <Editor />,
        loader: () => Promise.all([getGeoJson(), getMap()]),
        path: "edit",
      },
      {
        element: <Welcome />,
        index: true,
      },
    ],
    element: <Root />,
    errorElement: <ErrorPage />,
    path: "/",
  },
]);

export default router;
