(() => {
  const root = document.documentElement;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    root.setAttribute("data-prepaint-done", "");
  };

  const afterPaint = () => {
    requestAnimationFrame(() => requestAnimationFrame(finish));
  };

  // Wait for "load" so render-blocking stylesheets have been applied before the override lifts.
  if (document.readyState !== "complete") {
    window.addEventListener("load", afterPaint, { once: true });
  } else {
    afterPaint();
  }

  // Safety net: rAF doesn't fire in background tabs, and slow pages may never reach DOMContentLoaded.
  setTimeout(finish, 3000);
})();
