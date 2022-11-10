/**
 * For the smoke test we don't use @testing-library/react, because we want
 * to test the child components in isolation, we want to test that the entire
 * app bootstraps correctly
 */

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

it("Smoke test", () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  root.render(<App />);
});
