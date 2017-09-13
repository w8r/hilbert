(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hilbert = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// This code is ported from Go to JS from https://github.com/google/hilbert/
// Inlined rotations to eliminate function call


// Hilbert represents a 2D Hilbert space of order N for mapping to and from.

/**
 * [x, y] -> distance on a hilbert curve
 * @param  {Number}        bits Order of Hilbert curve
 * @param  {Array<Number>} p    2d-Point
 * @return {Number}
 */
module.exports.encode = function encode(bits, pt) {
  var d = 0, tmp;
  var x = pt[0], y = pt[1];
  for (var s = (1 << bits) / 2; s > 0; s /= 2) {
    var rx = 0, ry = 0;

    if ((x & s) > 0) rx = 1;
    if ((y & s) > 0) ry = 1;

    d += s * s * ((3 * rx) ^ ry);

    // inlining
    // hilbertRot(s, p, rx, ry)
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      tmp = x;
      x = y;
      y = tmp;
    }
    // end inline
  }
  return d;
}


/**
 * Hilbert curve distance -> [x, y]
 * @param  {Number} bits Order of Hilbert curve
 * @param  {Number} d    Distance
 * @return {Array<Number>} [x, y]
 */
module.exports.decode = function decode(bits, d) {
  var x = 0, y = 0, tmp;
  var n = 1 << bits;
  for (var s = 1; s < n; s *= 2) {
    var rx = 1 & (d / 2);
    var ry = 1 & (d ^ rx);
    // inlining
    // hilbertRot(s, p, rx, ry)
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      tmp = x;
      x = y;
      y = tmp;
    }
    // end inline

    x += s * rx;
    y += s * ry;
    d /= 4;
  }
  return [x, y];
}


// left for reference
function hilbertRot(s, p, rx, ry) {
  if (ry === 0) {
    if (rx === 1) {
      p[0] = s - 1 - p[0];
      p[1] = s - 1 - p[1];
    }
    var tmp = p[0];
    p[0] = p[1];
    p[1] = tmp;
  }
  return p;
}

},{}]},{},[1])(1)
});
