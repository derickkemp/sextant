// https://issuetracker.google.com/issues/35821412#comment32

import { Loader } from "@googlemaps/js-api-loader";

const gMap = {};

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

export { getBounds, getMap };
