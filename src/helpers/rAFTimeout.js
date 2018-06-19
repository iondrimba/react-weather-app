export default function (fn, delay = 0) {
  const start = new Date().getTime(),
    handle = {};

  function loop () {
    const current = new Date().getTime(),
      delta = current - start;

    delta >= delay ? fn.call() : handle.value = requestAnimationFrame(loop);
  };

  handle.value = requestAnimationFrame(loop);

  return handle;
};
