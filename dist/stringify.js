"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var stringifyQuery = function stringifyQuery(query) {
  return Object.keys(query).reduce(function (accum, key, index) {
    return "".concat(accum).concat(index === 0 ? "" : "&").concat(key, "=").concat(query[key]);
  }, "?");
};

var _default = stringifyQuery;
exports.default = _default;