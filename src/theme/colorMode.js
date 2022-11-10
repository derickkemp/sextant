import { useCallback, useEffect, useState } from "react";

/**
 * This variable is the value that all hook instances will be synced to.
 *
 * We initialize it to the users color-scheme preference (if it's set)
 *
 * @type {string}
 */
let scheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

/**
 * This hooks can be use to retrieve or toggle the current light/dark theme.
 *
 * We want the values returned by this hook to be the same accross the app,
 * so we use custom events to make sure that all instances of the hook is
 * notified when any other one changes the value.
 *
 * @returns
 */
export default function useColorMode() {
  const [mode, setMode] = useState(scheme);

  useEffect(() => {
    // When this hook is used we want to be notified if any other instance
    // changes the value
    const cb = (e) => setMode(e.detail.mode);
    document.addEventListener("colormodechanged", cb);

    return () => document.removeEventListener("colormodechanged", cb);
  }, []);

  const toggleMode = useCallback(() => {
    scheme = scheme === "light" ? "dark" : "light";

    // Notify all other instances that a change has occurred
    const e = new CustomEvent("colormodechanged", {
      detail: {
        mode: scheme,
      },
    });
    document.dispatchEvent(e);
  }, []);

  return [mode, toggleMode];
}
