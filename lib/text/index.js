'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _setProps = require('set-props');

var _setProps2 = _interopRequireDefault(_setProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          size = _props.size,
          className = _props.className,
          children = _props.children,
          bold = _props.bold,
          italic = _props.italic,
          ml = _props.ml,
          mr = _props.mr,
          pl = _props.pl,
          pr = _props.pr,
          style = _props.style,
          center = _props.center,
          left = _props.left,
          right = _props.right,
          remain = _objectWithoutProperties(_props, ['type', 'size', 'className', 'children', 'bold', 'italic', 'ml', 'mr', 'pl', 'pr', 'style', 'center', 'left', 'right']);

      return _react2.default.createElement(
        'span',
        _extends({
          className: 'i-text-type-' + type + ' i-text-size-' + size + ' ' + className + ' ' + (bold ? 'i-text-bold' : '') + ' ' + (italic ? 'i-text-italic' : ''),
          style: _extends({
            marginLeft: ml,
            marginRight: mr,
            paddingLeft: pl,
            paddingRight: pr,
            textAlign: center ? 'center' : left ? 'left' : right ? 'right' : 'inherit'
          }, style)
        }, remain),
        children
      );
    }
  }]);

  return Text;
}(_react2.default.Component);

exports.default = Text;


(0, _setProps2.default)(Text, {
  size: ['normal', _propTypes2.default.string],
  type: ['normal', _propTypes2.default.string],
  bold: [false, _propTypes2.default.bool]

});