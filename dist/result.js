"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BASE = "https://tenor.com/view/";

var Result =
/*#__PURE__*/
function (_Component) {
  _inherits(Result, _Component);

  function Result() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Result);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Result)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loaded: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var _this$props = _this.props,
          result = _this$props.result,
          onSelect = _this$props.onSelect;
      onSelect(result);
    });

    return _this;
  }

  _createClass(Result, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.componentIsMounted = true;
      var result = this.props.result;
      this.image = new Image();
      this.image.src = result.media[0].tinygif.url;

      this.image.onload = function () {
        if (_this2.componentIsMounted) {
          _this2.setState({
            loaded: true
          });
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      var itemurl = this.props.result.itemurl;
      return itemurl.replace(BASE, "").replace(/-gif-\d+$/, "").replace(/-/g, " ");
    }
  }, {
    key: "render",
    value: function render() {
      var loaded = this.state.loaded;
      return _react.default.createElement("button", {
        "aria-label": this.getLabel(),
        type: "button",
        onClick: this.handleClick,
        className: "react-tenor--result"
      }, loaded && _react.default.createElement("span", {
        style: {
          backgroundImage: "url(".concat(this.image.src, ")")
        }
      }));
    }
  }]);

  return Result;
}(_react.Component);

var _default = Result;
exports.default = _default;