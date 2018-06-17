'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _antd = require('antd');

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _mobx = require('mobx');

var mobx = _interopRequireWildcard(_mobx);

var _mobxReact = require('mobx-react');

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _coreDecorators = require('core-decorators');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _flexbox = require('../../flexbox');

var _flexbox2 = _interopRequireDefault(_flexbox);

var _text = require('../../text');

var _text2 = _interopRequireDefault(_text);

var _view = require('../../view');

var _view2 = _interopRequireDefault(_view);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _setProps = require('set-props');

var _setProps2 = _interopRequireDefault(_setProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var observable = mobx.observable,
    action = mobx.action;
var Flex = _flexbox2.default.Flex,
    Block = _flexbox2.default.Block;

var Action = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Action, _React$Component);

  function Action() {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
  }

  _createClass(Action, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          style = _props.style;


      return React.createElement(
        'div',
        { style: style },
        children
      );
    }
  }]);

  return Action;
}(React.Component)) || _class;

exports.default = Action;