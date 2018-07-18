"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stringify = require("./stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE = process.env.NODE_ENV === "test" ? "http://localhost:8080" : "https://api.tenor.com/v1";

var Client = function () {
  function Client(token) {
    _classCallCheck(this, Client);

    this.token = token;
  }

  _createClass(Client, [{
    key: "search",
    value: function search(q) {
      return fetch(BASE + "/search" + this.queryFor(q)).then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var results = _ref.results;
        return results;
      });
    }
  }, {
    key: "queryFor",
    value: function queryFor(q) {
      return (0, _stringify2.default)({
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

exports.default = Client;