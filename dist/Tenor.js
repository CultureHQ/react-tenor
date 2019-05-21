"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Client = _interopRequireDefault(require("./Client"));

var _Search = _interopRequireDefault(require("./Search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

var DEFAULT_STATE = {
  autocomplete: null,
  page: 0,
  pages: [],
  search: "",
  searching: false,
  suggestions: []
};
var DELAY = 250;
var KEYS = {
  Tab: 9,
  ArrowLeft: 37,
  ArrowRight: 39
};

var Tenor =
/*#__PURE__*/
function (_Component) {
  _inherits(Tenor, _Component);

  function Tenor(props) {
    var _this;

    _classCallCheck(this, Tenor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tenor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "fetchAutocomplete", function (currentSearch) {
      return _this.client.autocomplete(currentSearch).then(function (autocomplete) {
        var search = _this.state.search;

        if (search === currentSearch) {
          _this.mountedSetState({
            autocomplete: autocomplete
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fetchSuggestions", function (currentSearch) {
      return _this.client.suggestions(currentSearch).then(function (suggestions) {
        var search = _this.state.search;

        if (search === currentSearch) {
          _this.mountedSetState({
            suggestions: suggestions
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowClick", function (event) {
      var contentRef = _this.props.contentRef;
      var search = _this.state.search;

      if (!search) {
        return;
      }

      var container = (contentRef || _this.contentRef).current;

      if (container.contains(event.target)) {
        return;
      }

      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      _this.setState(DEFAULT_STATE);
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowKeyDown", function (event) {
      var contentRef = _this.props.contentRef;

      if (!(contentRef || _this.contentRef).current.contains(event.target) || [KEYS.ArrowLeft, KEYS.ArrowRight].indexOf(event.keyCode) === -1 || !event.metaKey) {
        return;
      }

      event.preventDefault();

      if (event.keyCode === KEYS.ArrowLeft) {
        _this.handlePageLeft();
      } else {
        _this.handlePageRight();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePageLeft", function () {
      _this.setState(function (_ref) {
        var page = _ref.page;
        return {
          page: page === 0 ? 0 : page - 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePageRight", function () {
      var _this$state = _this.state,
          page = _this$state.page,
          pages = _this$state.pages,
          search = _this$state.search,
          searching = _this$state.searching;

      if (!search || searching) {
        return Promise.resolve();
      }

      if (page < pages.length - 1) {
        _this.setState(function (_ref2) {
          var prevPage = _ref2.page;
          return {
            page: prevPage + 1
          };
        });

        return Promise.resolve();
      }

      return _this.client.search(search, {
        pos: pages[page].next
      }).then(function (nextPage) {
        if (nextPage.results) {
          _this.mountedSetState(function (_ref3) {
            var prevPage = _ref3.page,
                prevPages = _ref3.pages;
            return {
              page: prevPage + 1,
              pages: prevPages.concat([nextPage]),
              searching: false
            };
          });
        }
      })["catch"](function () {
        _this.mountedSetState({
          searching: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchChange", function (_ref4) {
      var search = _ref4.target.value;

      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      if (!search.length) {
        _this.setState(DEFAULT_STATE);

        return;
      }

      _this.setState({
        autocomplete: null,
        search: search,
        searching: true
      });

      _this.fetchAutocomplete(search);

      _this.fetchSuggestions(search);

      _this.timeout = setTimeout(function () {
        return _this.performSearch(search);
      }, DELAY);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchKeyDown", function (event) {
      var _this$state2 = _this.state,
          autocomplete = _this$state2.autocomplete,
          prevSearch = _this$state2.search;

      if (event.keyCode !== KEYS.Tab || !autocomplete || !prevSearch) {
        return;
      }

      var lowerAutocomplete = autocomplete.toLowerCase();
      var lowerSearch = prevSearch.toLowerCase().replace(/\s/g, "");

      if (lowerAutocomplete === lowerSearch) {
        return;
      }

      event.preventDefault();
      var typeahead = lowerAutocomplete.replace(lowerSearch, "");
      var search = "".concat(prevSearch).concat(typeahead);

      _this.setState({
        autocomplete: null,
        search: search,
        searching: true
      });

      _this.fetchSuggestions(search);

      _this.performSearch(search);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSuggestionClick", function (suggestion) {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      _this.setState({
        search: suggestion,
        searching: true
      });

      _this.performSearch(suggestion);
    });

    _defineProperty(_assertThisInitialized(_this), "performSearch", function (search) {
      if (!_this.componentIsMounted) {
        return Promise.resolve();
      }

      return _this.client.search(search).then(function (page) {
        _this.mountedSetState({
          page: 0,
          pages: [page],
          searching: false
        });
      })["catch"](function () {
        _this.mountedSetState({
          searching: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mountedSetState", function (mutation) {
      if (_this.componentIsMounted) {
        _this.setState(mutation);
      }
    });

    var base = props.base,
        token = props.token;
    _this.client = new _Client["default"]({
      base: base,
      token: token
    });
    _this.contentRef = _react["default"].createRef();
    _this.inputRef = _react["default"].createRef();
    _this.state = DEFAULT_STATE;
    return _this;
  }

  _createClass(Tenor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
      window.addEventListener("keydown", this.handleWindowKeyDown);
      window.addEventListener("click", this.handleWindowClick);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          base = _this$props.base,
          token = _this$props.token;

      if (base !== prevProps.base || token !== prevProps.token) {
        this.client = new _Client["default"]({
          base: base,
          token: token
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.handleWindowClick);
      window.removeEventListener("keydown", this.handleWindowKeyDown);
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
      var _this$state3 = this.state,
          autocomplete = _this$state3.autocomplete,
          page = _this$state3.page,
          pages = _this$state3.pages,
          search = _this$state3.search,
          searching = _this$state3.searching,
          suggestions = _this$state3.suggestions;
      return _react["default"].createElement(_Search["default"], {
        autocomplete: autocomplete,
        contentRef: contentRef || this.contentRef,
        inputRef: this.inputRef,
        onPageLeft: this.handlePageLeft,
        onPageRight: this.handlePageRight,
        onSearchChange: this.handleSearchChange,
        onSearchKeyDown: this.handleSearchKeyDown,
        onSuggestionClick: this.handleSuggestionClick,
        onSelect: onSelect,
        results: pages[page] ? pages[page].results : [],
        search: search,
        searching: searching,
        suggestions: suggestions
      });
    }
  }]);

  return Tenor;
}(_react.Component);

var _default = Tenor;
exports["default"] = _default;