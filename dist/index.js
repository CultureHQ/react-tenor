"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _client = _interopRequireDefault(require("./client"));

var _result = _interopRequireDefault(require("./result"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DELAY = 250;

var Search = function Search(_ref) {
  var contentRef = _ref.contentRef,
      inputRef = _ref.inputRef,
      onSearchChange = _ref.onSearchChange,
      onSelect = _ref.onSelect,
      results = _ref.results,
      search = _ref.search,
      searching = _ref.searching;
  return _react.default.createElement("div", {
    className: "react-tenor",
    ref: contentRef
  }, _react.default.createElement("div", {
    className: "react-tenor--search-bar"
  }, _react.default.createElement("input", {
    ref: inputRef,
    className: "react-tenor--search",
    type: "text",
    value: search,
    onChange: onSearchChange,
    placeholder: "Search Tenor"
  }), searching && _react.default.createElement("svg", {
    className: "react-tenor--spinner",
    viewBox: "0 0 1024 1024"
  }, _react.default.createElement("path", {
    d: "M959.6 452.2c-2.8-17.4-6.2-34.6-10.6-51.6-5.6-21.6-12.8-43-21.6-63.6-17.8-42.4-42.2-82-71.8-117.2-32-37.8-70.6-70.4-113.4-95.4-42.2-24.8-88.2-42.4-136.2-52.2-24.8-5-49.8-8-75.2-8.2-19.8-0.2-39.6 0.6-59.2 2.4-51 5-101.4 19.2-147.8 41-39.8 18.8-76.8 43.2-109.6 72.4s-61.4 63.2-84.4 100.6c-25.4 41.6-44.4 87-54.8 134.6-8.4 38-12.4 77.2-10.4 116.2 1.8 37.8 7.6 75.6 19 111.8 7.2 23 15.8 45.4 26.6 67.2 10.6 21.4 23 42 36.8 61.4 27.6 38.6 61.2 72.8 99.6 101 39.2 29 83.4 51.4 129.8 66.2 48.4 15.4 99.8 22.6 150.6 20.8 49.6-1.6 98.8-11.2 145.2-29 44.6-17.2 86.4-41.8 123-72.6 18.4-15.6 34.8-33.2 50.2-51.8 15.6-18.8 29.6-38.6 41.2-60 10-18.4 18.4-37.6 25.6-57 3.6-9.6 7-19.2 9.8-29.2 3-10.6 5.2-21.6 7.2-32.4 3-17 4.2-34.6 2.6-51.8-1.4 7.6-2.6 15-4.4 22.4-2.2 8.6-5 17-8.2 25.2-6.4 17.4-14.4 34.2-22 51-9.8 21.4-21.2 41.8-33.6 61.6-6.4 10.2-13 20.2-20.2 29.8s-15.4 18.8-23.6 27.8-34.2 34.4-54 48.8c-20.2 14.8-41.6 27.8-64.2 38.6-45.2 22-94.6 35.2-144.6 39.6-51.2 4.4-103.4-0.6-152.6-15.2-46.8-13.8-91.2-36.2-130.2-65.6-37.8-28.6-70.6-63.8-96.4-103.6-27-40.6-45.6-86.4-55.8-134.2-2.6-12.4-4.6-25.2-6-37.8-1.2-10.8-2.2-21.8-2.6-32.8-0.6-22.6 0.8-46 4.2-68.4 7.4-49.2 23.4-96.6 48.2-139.8 22-38.6 50.6-73.4 84.2-102.8 33.6-29.6 72-53.4 113.6-70.2 24-9.8 49.2-17 74.8-21.8 13-2.4 26-4.4 39-5.4 6.4-0.6 12.6-0.6 19-1.2 2.6 0 5.2 0.2 7.8 0.2 43.4-0.8 87 4.8 128.4 17.8 44.6 14 86.6 36.6 123 66 38.2 30.8 70 68.8 94 111.6 20.4 36.4 35 75.6 43.8 116.4 2 9.4 3.6 18.8 5.2 28.2 1.4 8.6 6.2 16.6 13.6 21.4 15.6 10.4 37.4 3.4 45-13.4 2.6-5.8 3.4-12 2.4-17.8z"
  }))), _react.default.createElement("div", {
    className: "react-tenor--results"
  }, results.map(function (result) {
    return _react.default.createElement(_result.default, {
      key: result.id,
      result: result,
      onSelect: onSelect
    });
  })));
};

var Tenor =
/*#__PURE__*/
function (_Component) {
  _inherits(Tenor, _Component);

  function Tenor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tenor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tenor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      results: [],
      search: "",
      searching: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearchChange", function (_ref2) {
      var search = _ref2.target.value;

      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      if (!search.length) {
        _this.setState({
          results: [],
          search: search,
          searching: false
        });

        return;
      }

      _this.setState({
        search: search,
        searching: true
      });

      _this.timeout = setTimeout(function () {
        return _this.performSearch(search);
      }, DELAY);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "performSearch", function (query) {
      if (!_this.componentIsMounted) {
        return Promise.resolve();
      }

      var _this$props = _this.props,
          base = _this$props.base,
          token = _this$props.token;
      return new _client.default({
        base: base,
        token: token
      }).search(query).then(function (results) {
        _this.setState({
          results: results,
          searching: false
        });
      });
    });

    return _this;
  }

  _createClass(Tenor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.inputRef.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          contentRef = _this$props2.contentRef,
          onSelect = _this$props2.onSelect;
      var _this$state = this.state,
          results = _this$state.results,
          search = _this$state.search,
          searching = _this$state.searching;
      return _react.default.createElement(Search, {
        contentRef: contentRef,
        inputRef: this.inputRef,
        onSearchChange: this.handleSearchChange,
        onSelect: onSelect,
        results: results,
        search: search,
        searching: searching
      });
    }
  }]);

  return Tenor;
}(_react.Component);

var _default = Tenor;
exports.default = _default;