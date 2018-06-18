'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flexbox = function (_React$Component) {
  _inherits(Flexbox, _React$Component);

  function Flexbox() {
    _classCallCheck(this, Flexbox);

    return _possibleConstructorReturn(this, (Flexbox.__proto__ || Object.getPrototypeOf(Flexbox)).apply(this, arguments));
  }

  _createClass(Flexbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          children = _props.children,
          alignItems = _props.alignItems,
          justifyContent = _props.justifyContent,
          flexDirection = _props.flexDirection,
          remain = _objectWithoutProperties(_props, ['style', 'children', 'alignItems', 'justifyContent', 'flexDirection']);

      return _react2.default.createElement(
        'div',
        _extends({
          style: _extends({
            display: 'flex',
            alignItems: alignItems,
            justifyContent: justifyContent,
            flexDirection: flexDirection
          }, style)
        }, remain),
        children
      );
    }
  }]);

  return Flexbox;
}(_react2.default.Component);

exports.default = Flexbox;

var Block = function (_React$Component2) {
  _inherits(Block, _React$Component2);

  function Block() {
    _classCallCheck(this, Block);

    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  _createClass(Block, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          children = _props2.children,
          remain = _objectWithoutProperties(_props2, ['style', 'children']);

      return _react2.default.createElement(
        'div',
        _extends({ style: _extends({}, style) }, remain),
        children
      );
    }
  }]);

  return Block;
}(_react2.default.Component);

var Flex = function (_React$Component3) {
  _inherits(Flex, _React$Component3);

  function Flex() {
    _classCallCheck(this, Flex);

    return _possibleConstructorReturn(this, (Flex.__proto__ || Object.getPrototypeOf(Flex)).apply(this, arguments));
  }

  _createClass(Flex, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          style = _props3.style,
          children = _props3.children,
          _props3$flex = _props3.flex,
          flex = _props3$flex === undefined ? 1 : _props3$flex,
          remain = _objectWithoutProperties(_props3, ['style', 'children', 'flex']);

      return _react2.default.createElement(
        'div',
        _extends({ style: _extends({ flex: flex }, style) }, remain),
        children
      );
    }
  }]);

  return Flex;
}(_react2.default.Component);

Flexbox.Flex = Flex;
Flexbox.Block = Block;