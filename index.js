var flyd = require('flyd');

// Stream bool -> Stream a -> Stream a
module.exports = flyd.curryN(2, function(minDelta, s) {
  const eased$ = stream();
  let targetValue = undefined;
  let easing = false;

  const requestFrame = function() {
    requestAnimationFrame(function() {
      const delta = (targetValue - eased$.val) * 0.5;
      if (Math.abs(delta) < minDelta) {
        eased$(targetValue);
        easing = false;
      } else {
        eased$(eased$.val + delta);
        requestFrame();
      }
    });
  };

  flyd.on(function(v) {
    if (v === undefined) return;
    if (eased$.val === undefined) {
      eased$(v);
    } else {
      targetValue = v;
      if (easing) return;
      easing = true;
      requestFrame();
    }
  }, s)

  return eased$;
});
