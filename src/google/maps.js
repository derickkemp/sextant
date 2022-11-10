import { Loader } from "@googlemaps/js-api-loader";
import { nanoid } from "nanoid";

/**
 * @typedef {Object} gMap
 * @property {HTMLElement} element
 * @property {google.maps.event} event
 * @property {google.maps.Map} map
 */

/**
 * @type {gMap}
 */
const gMap = {};

/**
 * Internal function used to load the google maps libraries
 */
async function init() {
  if (window?.google?.maps) {
    // Google maps platform has already been loaded we don't need to load it
    // again.
    return;
  }

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    version: "weekly",
  });

  await loader.load();
}

/**
 * Add GeoJSON to the map.
 *
 * This function will make sure that the object passed is a valid feature
 * collection and add auto generates feature ids for features that do not
 * have ids. Feature ids are required for application to know when the
 * selected feature has changed, but some GeoJSON files do not include them.
 *
 * @param {Object} geoJson
 */
function addFeatures(geoJson) {
  if (!geoJson?.type === "FeatureCollection") {
    throw new TypeError(
      "The uploaded file does not contain valid GeoJSON data."
    );
  }

  gMap.map.data.addGeoJson({
    ...geoJson,
    features: geoJson.features.map((feature) => ({
      ...feature,
      ...(!feature.id && { id: nanoid(6) }),
    })),
  });
}

/**
 * Clear all GeoJSON features from the map
 */
function clearFeatures() {
  const features = [];

  gMap.map.data.forEach((feature) => features.push(feature));

  for (const feature of features) {
    gMap.map.data.remove(feature);
  }
}

/**
 * This function takes an arry of features and returns its bounds.
 *
 * @param {google.maps.Data.Feature[]} geometry
 * @returns {google.maps.LatLngBounds}
 */
function getBounds(geometry) {
  const bounds = new window.google.maps.LatLngBounds();

  geometry.forEach((feature) => {
    const geometry = feature.getGeometry();

    if (geometry) {
      processPoints(geometry, bounds.extend, bounds);
    }
  });

  return bounds;
}

/**
 * Return the current features as a GeoJSON object
 *
 * @returns Promise<Object>
 */
function getGeoJson() {
  return new Promise((resolve) => {
    gMap.map.data.toGeoJson((geoJson) => resolve(geoJson));
  });
}

/**
 * Return the map instance
 *
 * Google maps platform JavaScript API does not provide a method to destroy
 * the map. Even unsetting that map variable and deleting the dom element
 * does not clean up a map instance propperly and leads to a memory leak. The
 * suggested solution is to instantiate the map once and reuse it every time
 * you wish to render a map. This function will return the global map
 * instance, or create a new one and return it if one doesn't already exist.
 *
 * @async
 * @return {Promise<gMap>}
 * @see {@link https://issuetracker.google.com/issues/35821412#comment32|Google Maps JavaScript API Issue Tracker}
 */
async function getMap() {
  if (gMap.element && gMap.map) {
    return gMap;
  }

  await init();

  gMap.element = document.createElement("div");
  gMap.event = window.google.maps.event;

  gMap.element.style.height = "100%";
  gMap.element.style.weight = "100%";
  gMap.map = new window.google.maps.Map(gMap.element, { minZoom: 2 });

  return gMap;
}

/**
 * This function will recursively call the callback with the currentValue and
 * geometry the geometry is a single point. This is can be used to process
 * every point in a geometry and return a single aggregate value based on
 * every point.
 *
 * @see {@link https://developers.google.com/maps/documentation/javascript/examples/layer-data-dragndrop|Google Maps JavaScript API Documentation}
 *
 * @param {google.maps.LatLng | google.maps.Data.Geometry} geometry
 * @param {function()} callback
 * @param {*} currentValue
 */
function processPoints(geometry, callback, currentValue) {
  if (geometry instanceof window.google.maps.LatLng) {
    callback.call(currentValue, geometry);
  } else if (geometry instanceof window.google.maps.Data.Point) {
    callback.call(currentValue, geometry.get());
  } else {
    geometry.getArray().forEach((g) => {
      processPoints(g, callback, currentValue);
    });
  }
}

export { addFeatures, clearFeatures, getBounds, getGeoJson, getMap };
