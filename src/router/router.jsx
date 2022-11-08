import { createBrowserRouter } from "react-router-dom";

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
