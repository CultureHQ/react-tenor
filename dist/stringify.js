"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stringifyQuery = function stringifyQuery(query) {
  return Object.keys(query).reduce(function (accum, key, index) {
    return "" + accum + (index === 0 ? "" : "&") + key + "=" + query[key];
  }, "?");
};

exports.default = stringifyQuery;