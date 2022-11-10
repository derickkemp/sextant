import { get as getGeoJson, set as setGeoJson } from "./geoJson";

describe("geoJSON utility", () => {
  test("Retrieving store value before setting returns undefined", async () => {
    const geoJson = await getGeoJson();
    expect(geoJson).toBeUndefined();
  });

  test("Setting a value and retrieving it should return the same value", async () => {
    const inputGeoJson = {
      type: "Point",
      coordinates: [-105.01621, 39.57422],
    };
    await setGeoJson(inputGeoJson);

    const geoJson = await getGeoJson();
    expect(geoJson).toEqual(inputGeoJson);
  });
});
