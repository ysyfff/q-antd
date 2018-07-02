'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

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

var _setProps = require('set-props');

var _setProps2 = _interopRequireDefault(_setProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var observable = mobx.observable,
    action = mobx.action;
var Flex = _flexbox2.default.Flex,
    Block = _flexbox2.default.Block;

var IconStyle = {
  transform: 'scale(0.85)'
};
/**
 * fields: 用来存储一个Provider中的所有字段
 * model: 用来存储一个Provider中的所有字段的值
 * rules: 用来存储一个Provider中的所有字段的规则
 * type: type是用来表示Term的type的，和校验规则无关
 */
var FormItem = (_dec = (0, _mobxReact.inject)('fields', 'model', 'rules', 'labelStyle', 'ItemComponentLayout', 'labelWidth', 'labelPosition'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 = function (_React$Component) {
  _inherits(FormItem, _React$Component);

  function FormItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, 'validateState', _descriptor, _this), _initDefineProp(_this, 'validateMessage', _descriptor2, _this), _initDefineProp(_this, 'isRequired', _descriptor3, _this), _initDefineProp(_this, 'trigger', _descriptor4, _this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormItem, [{
    key: 'validateOnChange',
    value: function validateOnChange() {
      this.validate('change');
    }
  }, {
    key: 'validateOnBlur',
    value: function validateOnBlur() {
      this.validate('blur');
    }
  }, {
    key: 'validate',
    value: function validate(trigger) {
      var _this2 = this;

      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return 1;
      };
      var _props = this.props,
          rules = _props.rules,
          prop = _props.prop,
          model = _props.model,
          duplex = _props.duplex;

      console.log('item validate');

      if (prop === void 0 || rules === void 0) {
        return;
      }
      // debugger
      //从rules根据prop中获取对应的校验规则，并根据trigger进行过滤
      var pureRules = mobx.toJS(rules[prop]) || [];
      var theRules = trigger ? pureRules.filter(function (rule) {
        // debugger
        //如果有trigger配置参数，提取对应的trigger规则，否则返回false，那么theRule就是空数组，就不进行校验
        if (rule.trigger) {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger);
          } else {
            return rule.trigger === trigger ? true : false;
          }
        } else {
          return false;
        }
      }) : pureRules;

      if (!theRules || theRules.length === 0) {
        fn();
        return true;
      }

      this.validateState = 'validating';

      var descriptor = {};
      var theModel = {};

      // debugger
      //从model中根据prop或者duplex获取对应的值
      theModel[prop] = mobx.toJS(model[prop]);

      if (!theModel[prop] && duplex !== none) {
        var uuid = duplex[1];
        descriptor[uuid] = theRules;
        theModel[uuid] = mobx.toJS(model[duplex[0]][duplex[1]]);
      } else {
        descriptor[prop] = theRules;
      }

      var validator = new _asyncValidator2.default(descriptor);

      validator.validate(theModel, { firstFields: true }, function (errors) {
        _this2.validateState = !errors ? 'success' : 'error';
        _this2.validateMessage = errors ? errors[0].message : '';

        fn(_this2.validateMessage);
      });

      this.validateDisabled = false;
    }
  }, {
    key: 'resetField',
    value: function resetField() {
      this.validateState = 'validating';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.fields.splice(this.props.fields.indexOf(this), 1);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          prop = _props2.prop,
          rules = _props2.rules,
          duplex = _props2.duplex;
      //如果有prop属性，才push到fields数组中

      if (prop !== void 0) {
        this.props.fields.push(this);
      }

      var pureRules = mobx.toJS(rules[prop]);
      this.isRequired = prop !== void 0 && pureRules && Array.isArray(pureRules) ? !!pureRules.filter(function (item) {
        return !!item.required;
      }) : false;
      console.log(this.isRequired, '99999999999');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          labelSpan = _props3.labelSpan,
          align = _props3.align,
          label = _props3.label,
          fields = _props3.fields,
          model = _props3.model,
          prop = _props3.prop,
          labelStyle = _props3.labelStyle,
          noLabel = _props3.noLabel,
          ItemComponentLayout = _props3.ItemComponentLayout,
          labelWidth = _props3.labelWidth,
          labelPosition = _props3.labelPosition,
          style = _props3.style,
          requiredFlag = _props3.requiredFlag,
          remain = _objectWithoutProperties(_props3, ['children', 'labelSpan', 'align', 'label', 'fields', 'model', 'prop', 'labelStyle', 'noLabel', 'ItemComponentLayout', 'labelWidth', 'labelPosition', 'style', 'requiredFlag']);

      /**
       * labelPosition
       *
       * right - flex-start
       *         flex-end
       *         center
       * left - flex-start
       *        flex-end
       *        center
       * center - flex-start
       *          flex-end
       *          center
       */


      var labelPositionArr = labelPosition.split(':');
      var mainLabelPosition = labelPositionArr[0] || 'right';
      var viceLabelPosition = labelPositionArr[1] || 'center';
      var alignLabelPosition = labelPositionArr[2] || 'right';

      return React.createElement(
        _mobxReact.Provider,
        {
          validateOnChange: this.validateOnChange,
          validateOnBlur: this.validateOnBlur },
        React.createElement(
          _flexbox2.default,
          _extends({}, remain, {
            flexDirection: mainLabelPosition === 'top' ? 'column' : 'row',
            alignItems: viceLabelPosition }),
          React.createElement(
            _flexbox2.default,
            null,
            React.createElement(
              'label',
              {
                className: (label && 'i-form-label') + ' ' + (this.isRequired && requiredFlag && 'ant-form-item-required') + ' ' + (labelPosition === 'top' && 'i-form-label-top'),
                style: _extends({}, labelStyle, {
                  width: labelWidth > 0 ? labelWidth : 'auto',
                  textAlign: alignLabelPosition
                }),
                title: label,
                htmlFor: prop },
              label
            )
          ),
          React.createElement(
            ItemComponentLayout,
            { className: 'i-form-item' },
            React.createElement(
              'div',
              {
                className: 'i-form-item ' + (this.validateState === 'error' ? 'has-error' : '') },
              children,
              this.validateState === 'error' && React.createElement(
                'div',
                { className: 'ant-form-explain' },
                React.createElement(
                  _text2.default,
                  { size: 'small', type: 'error' },
                  React.createElement(_antd.Icon, { style: IconStyle, type: 'exclamation-circle-o' }),
                  this.validateMessage
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FormItem;
}(React.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'validateState', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'validateMessage', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'isRequired', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'trigger', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return 'onChange';
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'validateOnChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'validateOnChange'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'validateOnBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'validateOnBlur'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'validate', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'validate'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = FormItem;


(0, _setProps2.default)(FormItem, {
  requiredFlag: [true, _propTypes2.default.bool]
});