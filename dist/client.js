"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.stringify = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var stringify = function stringify(query) {
  return Object.keys(query).reduce(function (accum, key, index) {
    return "".concat(accum).concat(index === 0 ? "" : "&").concat(key, "=").concat(query[key]);
  }, "?");
};

exports.stringify = stringify;

var Client =
/*#__PURE__*/
function () {
  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    this.base = options.base || "https://api.tenor.com/v1";
    this.token = options.token || "LIVDSRZULELA";
  }

  _createClass(Client, [{
    key: "search",
    value: function search(q) {
      return fetch("".concat(this.base, "/search").concat(this.queryFor(q))).then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var results = _ref.results;
        return results;
      });
    }
  }, {
    key: "queryFor",
    value: function queryFor(q) {
      return stringify({
        key: this.token,
        q: q,
        limit: 12,
        safesearch: "mild",
        media_filter: "minimal"
      });
    }
  }]);

  return Client;
}();

var _default = Client;
exports.default = _default;