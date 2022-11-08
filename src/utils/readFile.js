/**
 * Convert a Blob or File object to an ArrayBuffer
 *
 * @param {(Blob | File)} file The file to read
 * @returns {Promise} A promise containing an ArrayBuffer
 */
function readFile(file) {
  return new Promise((resolve) => {
    // setting up the reader
    const reader = new FileReader();

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => resolve(readerEvent.target.result); // this is the content!

    reader.readAsArrayBuffer(file); // this is reading as binary
  });
}

export default readFile;
