# flyd-eased
eased function for Flyd.

uses requestAnimationFrame to generated eased stream values.

# Usage
```
// this is just a helper function that let's us visualize stream output in realtime
const logstream = (s, label='') => {
  s = s || stream();
  flyd.on(v => console.log(label,'stream:', v), s);
  return s;
};

// create our stream and eased stream
const seed$ = flyd.stream();
const eased$ = easedStream(0.1, seed$)

// setup logging for both streams
logstream(seed$, 'seed');
logstream(eased$, 'eased');

// now try feeding some values into the stream...

seed$(5)

//-> seed stream: 5

//-> eased stream: 5

seed$(10)

//-> seed stream: 10

//-> eased stream: 7.5
//-> eased stream: 8.75
//-> eased stream: 9.375
//-> eased stream: 9.6875
//-> eased stream: 9.84375
//-> eased stream: 10

seed$(-99)

//-> seed stream: -99

//-> eased stream: -44.5
//-> eased stream: -71.75
//-> eased stream: -85.375
//-> eased stream: -92.1875
//-> eased stream: -95.59375
//-> eased stream: -97.296875
//-> eased stream: -98.1484375
//-> eased stream: -98.57421875
//-> eased stream: -98.787109375
//-> eased stream: -98.8935546875
//-> eased stream: -99
```
