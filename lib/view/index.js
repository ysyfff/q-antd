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

var View = function (_React$Component) {
  _inherits(View, _React$Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          children = _props.children,
          className = _props.className,
          mb = _props.mb,
          mr = _props.mr,
          mt = _props.mt,
          ml = _props.ml,
          block = _props.block,
          clear = _props.clear,
          relative = _props.relative,
          absolute = _props.absolute,
          style = _props.style,
          other = _objectWithoutProperties(_props, ['type', 'children', 'className', 'mb', 'mr', 'mt', 'ml', 'block', 'clear', 'relative', 'absolute', 'style']);

      return _react2.default.createElement(
        'div',
        {
          className: (clear ? '' : 'i-view-type-' + type) + ' ' + (block ? 'i-view-block' : ''),
          style: _extends({
            marginBottom: mb,
            marginRight: mr,
            marginTop: mt,
            marginLeft: ml,
            position: relative ? 'relative' : absolute ? 'absolute' : 'static'
          }, style, other)
        },
        children
      );
    }
  }]);

  return View;
}(_react2.default.Component);

exports.default = View;


(0, _setProps2.default)(View, {
  type: ['hp-20', _propTypes2.default.oneOf(['hp-20', 'hp-30', ''])],
  mb: [0, _propTypes2.default.number],
  mr: [0, _propTypes2.default.number],
  mt: [0, _propTypes2.default.number],
  ml: [0, _propTypes2.default.number],
  block: [false, _propTypes2.default.bool],
  clear: [false, _propTypes2.default.bool]
});