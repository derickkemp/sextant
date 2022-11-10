/**
 * Trigger a browser download
 *
 * @param { ArrayBuffer } file person/thing you want to say hello to.
 * @param { string } name The suggested filename for the file.
 * @param { string } type  MIME type of the of the file
 * @return { undefined }
 */
export default function download(file, name, type) {
  const blob = new Blob([file], { type: type });

  const anchor = document.createElement("a");

  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = name;
  // some browser needs the anchor to be in the doc
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  // in case the Blob uses a lot of memory
  window.addEventListener(
    "focus",
    () => {
      URL.revokeObjectURL(anchor.href);
    },
    {
      once: true,
    }
  );
}
