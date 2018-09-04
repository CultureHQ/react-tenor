"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringify = _interopRequireDefault(require("./stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BASE = process.env.NODE_ENV === "test" ? "http://localhost:8080" : "https://api.tenor.com/v1";

var Client =
/*#__PURE__*/
function () {
  function Client(token) {
    _classCallCheck(this, Client);

    this.token = token;
  }

  _createClass(Client, [{
    key: "search",
    value: function search(q) {
      return fetch("".concat(BASE, "/search").concat(this.queryFor(q))).then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var results = _ref.results;
        return results;
      });
    }
  }, {
    key: "queryFor",
    value: function queryFor(q) {
      return (0, _stringify.default)({
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