/**
 * Convert a string to an ArrayBuffer
 *
 * @param {string} str
 * @returns {ArrayBuffer}
 */
function stringToArrayBuffer(str) {
  return new TextEncoder().encode(str);
}

export default stringToArrayBuffer;
