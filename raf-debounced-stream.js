// always delays incoming item one frame
// always schedules a frame for the last blocked item
const rafDebouncedStream = s => {
  const debounced$ = stream();
  let blocked = false;
  var last;
  flyd.on(v => {
    if (blocked) return last=v;
    last = null;
    blocked = true;
    const req = val => window.requestAnimationFrame(_=> {
      debounced$(val);
      if (last) {
        req(last);
      } else {
        blocked = false;
      }
    });
    req(v);
  }, s);
  return debounced$;
}
