const tape = require('tape');
const { encode, decode } = require('./hilbert');


tape.test('Hilbert', (t) => {

  t.test('API', (t) => {
    t.ok(typeof encode === 'function');
    t.ok(typeof decode === 'function');
    t.end();
  });

  t.test('encoding/decoding', (t) => {
    for (var dim = 16; dim < 23; dim += 2) {
      for (var i = 0, n = 1000; i < n; i++) {
        var p   = [(Math.random() * n) | 0, (Math.random() * n) | 0];
        var hb  = encode(dim, p);
        var dec = decode(dim, hb);
        t.deepEqual(p, dec);
      }
    }
    t.end();
  });

  t.end();
});
