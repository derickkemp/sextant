/**
 * Convert an ArrayBuffer to a string
 *
 * @param {ArrayBuffer} file The file to read
 * @returns {string}
 */
function arrayBufferToString(buffer) {
  return new TextDecoder().decode(buffer);
}

export default arrayBufferToString;
