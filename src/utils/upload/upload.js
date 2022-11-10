import fileToArrayBuffer from "../fileToArrayBuffer/fileToArrayBuffer";

/**
 * Open file upload dialog
 *
 * @returns {Promise} Promise object represents uploaded file data
 */
function dialogue() {
  return new Promise((resolve) => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");

    input.addEventListener(
      "change",
      (event) => {
        // Getting a hold of the file reference
        fileToArrayBuffer(event.target.files[0]).then((result) =>
          resolve(result)
        );
      },
      {
        once: true,
      }
    );

    input.click();
  });
}

export { dialogue };
