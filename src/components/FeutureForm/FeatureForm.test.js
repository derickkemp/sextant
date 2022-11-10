import { render, screen } from "@testing-library/react";

import FeatureForm from "./FeatureForm";

let feature;

describe("FeatureForm Component", () => {
  beforeEach(() => {
    feature = {
      getId: jest.fn(() => "Id 2"),
      forEachProperty: jest.fn((cb) =>
        Object.entries({
          filename: "sample_cover.tif",
          val: 3,
        }).forEach(([key, value]) => cb(value, key))
      ),
    };
  });

  it("Rendering a feature form shows the correct feature id", () => {
    render(<FeatureForm feature={feature} />);

    expect(feature.getId.mock.calls.length).toBe(1);
    expect(screen.getByDisplayValue("Id 2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("sample_cover.tif")).toBeInTheDocument();
  });
});
