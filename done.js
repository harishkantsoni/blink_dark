(() => {
  const root = document.documentElement;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    root.setAttribute("data-prepaint-done", "");
  };

  // Lift the cover only after the page has fully loaded and painted a couple of frames.
  const afterLoad = () => {
    requestAnimationFrame(() => requestAnimationFrame(finish));
  };

  if (document.readyState === "complete") {
    afterLoad();
  } else {
    window.addEventListener("load", afterLoad, { once: true });
  }

  // Safety net so a page that never finishes loading (or a background tab where rAF doesn't fire) isn't covered forever.
  setTimeout(finish, 10000);
})();
