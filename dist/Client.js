"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.stringify = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var stringify = function stringify(query) {
  return encodeURI(Object.keys(query).reduce(function (accum, key, index) {
    return "".concat(accum).concat(index === 0 ? "" : "&").concat(key, "=").concat(query[key]);
  }, "?"));
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
    key: "autocomplete",
    value: function autocomplete(search) {
      return fetch("".concat(this.base, "/autocomplete").concat(this.autocompleteQueryFor(search))).then(function (response) {
        return response.json();
      }).then(function (_ref) {
        var results = _ref.results;
        return results[0];
      });
    }
  }, {
    key: "search",
    value: function search(_search) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch("".concat(this.base, "/search").concat(this.searchQueryFor(_search, params))).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "suggestions",
    value: function suggestions(search) {
      return fetch("".concat(this.base, "/search_suggestions").concat(this.suggestionsQueryFor(search))).then(function (response) {
        return response.json();
      }).then(function (_ref2) {
        var results = _ref2.results;
        return results;
      });
    }
  }, {
    key: "autocompleteQueryFor",
    value: function autocompleteQueryFor(search) {
      return stringify({
        key: this.token,
        q: search,
        limit: 1,
        locale: "en_US"
      });
    }
  }, {
    key: "searchQueryFor",
    value: function searchQueryFor(search, params) {
      return stringify(Object.assign({}, {
        key: this.token,
        q: search,
        limit: 12,
        locale: "en_US",
        safesearch: "mild",
        media_filter: "minimal",
        ar_range: "all"
      }, params));
    }
  }, {
    key: "suggestionsQueryFor",
    value: function suggestionsQueryFor(search) {
      return stringify({
        key: this.token,
        q: search,
        limit: 5,
        locale: "en_US"
      });
    }
  }]);

  return Client;
}();

var _default = Client;
exports["default"] = _default;