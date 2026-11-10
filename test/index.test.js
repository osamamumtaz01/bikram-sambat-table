import test from 'node:test';
import assert from 'node:assert/strict';
import { bsToAd, adToBs, bsMonthLength, MIN_BS_YEAR, MAX_BS_YEAR, AD_MIN, AD_MAX } from '../dist/index.js';

const iso = (d) => d.toISOString().slice(0, 10);

test('known New Year dates', () => {
  assert.equal(iso(bsToAd({ y: 2000, m: 1, d: 1 })), '1943-04-14');
  assert.equal(iso(bsToAd({ y: 2083, m: 1, d: 1 })), '2026-04-14');
  assert.equal(iso(bsToAd({ y: 2084, m: 1, d: 1 })), '2027-04-14');
});

test('round trip over the whole range', () => {
  for (let y = MIN_BS_YEAR; y <= MAX_BS_YEAR; y++)
    for (let m = 1; m <= 12; m++) {
      const len = bsMonthLength(y, m);
      assert.ok(len >= 29 && len <= 32);
      for (const d of [1, len]) assert.deepEqual(adToBs(bsToAd({ y, m, d })), { y, m, d });
    }
});

test('out of range', () => {
  assert.equal(bsToAd({ y: 1999, m: 12, d: 30 }), null);
  assert.equal(bsToAd({ y: 2083, m: 1, d: 40 }), null);
  assert.equal(adToBs(new Date(AD_MIN.getTime() - 86400000)), null);
  assert.equal(adToBs(new Date(AD_MAX.getTime() + 86400000)), null);
});
