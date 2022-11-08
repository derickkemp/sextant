/**
 * Wraps a promise and returns an object with a read method to access the
 * promise value.
 *
 * If the promise has net resolved yet, read throws a promise is thrown, this is
 * useful when using react 18's suspend functionality for data loading
 *
 * @param { Promise } promise The promise to wrap.
 * @returns {{ read: function()}} The wrapped promise.
 */
export default function wrapPromise(promise) {
  let status = "pending";

  let result;

  let suspend = promise.then(
    (res) => {
      status = "success";

      result = res;
    },

    (err) => {
      status = "error";

      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}
