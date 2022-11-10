/**
 * Convert a File to an ArrayBuffer
 *
 * @param {File} file
 * @returns {Promise<ArrayBuffer>}
 */
function fileToArrayBuffer(file) {
  return new Promise((resolve) => {
    // setting up the reader
    const reader = new FileReader();

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => resolve(readerEvent.target.result); // this is the content!

    reader.readAsArrayBuffer(file); // this is reading as binary
  });
}

export default fileToArrayBuffer;
