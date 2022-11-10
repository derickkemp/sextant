import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react";
import useColorMode from "./useColorMode";

describe("useColorMode Hook", () => {
  it("Should return light by default and dark after toggle", () => {
    const { result } = renderHook(() => useColorMode());

    expect(result.current[0]).toBe("light");
    act(() => result.current[1]());
    expect(result.current[0]).toBe("dark");
  });
});
