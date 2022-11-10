import { render, screen } from "@testing-library/react";

import Md3Button from "./Md3Button";

describe("Md3Button Component", () => {
  it("Rendering a button has the correct label", () => {
    render(<Md3Button>Submit</Md3Button>);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
