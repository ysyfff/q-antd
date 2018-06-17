'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _dec, _class3, _desc, _value, _class4, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec2, _class6; /*
                                                                                                                                    * @Author: shiyong.yin
                                                                                                                                    * @Date: 2018-01-16 12:16:04
                                                                                                                                    * @Last Modified by: shiyong.yin
                                                                                                                                    * @Description: 表单式布局以及表单验证Collect
                                                                                                                                    * @Usage: 
                                                                                                                                    * 
                                                                                                                                    * <Collect>
                                                                                                                                    *   <Terms>
                                                                                                                                    *     <Term></Term>
                                                                                                                                    *     <Term></Term>
                                                                                                                                    *   </Terms>
                                                                                                                                    *   <Action>
                                                                                                                                    *   </Action>
                                                                                                                                    * </Collect>
                                                                                                                                    */

var _antd = require('antd');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobx2 = _interopRequireDefault(_mobx);

var _mobxReact = require('mobx-react');

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _coreDecorators = require('core-decorators');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _flexbox = require('../flexbox');

var _flexbox2 = _interopRequireDefault(_flexbox);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _view = require('../view');

var _view2 = _interopRequireDefault(_view);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _setProps = require('set-props');

var _setProps2 = _interopRequireDefault(_setProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flex = _flexbox2.default.Flex,
    Block = _flexbox2.default.Block;

var Collect = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Collect, _React$Component);

  function Collect() {
    _classCallCheck(this, Collect);

    return _possibleConstructorReturn(this, (Collect.__proto__ || Object.getPrototypeOf(Collect)).apply(this, arguments));
  }

  _createClass(Collect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          conditionSpan = _props.conditionSpan,
          type = _props.type,
          layout = _props.layout,
          remain = _objectWithoutProperties(_props, ['children', 'conditionSpan', 'type', 'layout']);

      var terms = [],
          actions = [],
          term = [];

      //分拆children，可实现<Collect><Term></Term></Collect>，中间不要Terms也可以
      //由此带来了坑1
      //坑1 使用mobx的时候需要注意考虑item.type.name=Injector的情况
      _react2.default.Children.map(children, function (item, i) {
        if (item.type.name === 'Terms' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'Terms') {
          terms.push(item);
        } else if (item.type.name === 'Action' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'Action') {
          actions.push(item);
        } else if (item.type.name === 'Term' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'Term') {
          term.push(item);
        } else {
          console.error('Collect\u4E2D\u51FA\u73B0\u4E86\u975ETerms,Action,Term\u7684\u63A7\u4EF6\uFF1A' + item.type.name);
        }
      });

      return _react2.default.createElement(
        _mobxReact.Provider,
        { type: type, layout: layout },
        _react2.default.createElement(
          'div',
          { className: 'i-form' },
          type === 'flex' ? _react2.default.createElement(
            _antd.Row,
            null,
            _react2.default.createElement(
              _antd.Row,
              _extends({ type: type }, remain),
              _react2.default.createElement(
                _antd.Col,
                { span: layout === 'vertical' ? 24 : actions.length ? conditionSpan : 24 },
                terms,
                term
              ),
              layout === 'horizontal' ? actions : null
            ),
            layout === 'vertical' ? _react2.default.createElement(
              _antd.Row,
              _extends({ type: type }, remain),
              actions
            ) : null
          ) : _react2.default.createElement(
            _flexbox2.default,
            null,
            terms,
            term
          )
        )
      );
    }
  }]);

  return Collect;
}(_react2.default.Component)) || _class;

exports.default = Collect;


(0, _setProps2.default)(Collect, {
  type: ['flex', _propTypes2.default.oneOf(['flex', 'block'])],
  conditionSpan: [19, _propTypes2.default.number],
  layout: ['horizontal', _propTypes2.default.oneOf(['horizontal', 'vertical'])] //type用来决定Action的布局
});

var Terms = (0, _mobxReact.observer)(_class2 = function (_React$Component2) {
  _inherits(Terms, _React$Component2);

  function Terms() {
    _classCallCheck(this, Terms);

    return _possibleConstructorReturn(this, (Terms.__proto__ || Object.getPrototypeOf(Terms)).apply(this, arguments));
  }

  _createClass(Terms, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          remain = _objectWithoutProperties(_props2, ['children']);

      var average = Math.floor(24 / (_react2.default.Children.count(children) || 1));

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Row,
          _extends({ className: 'i-form-row' }, remain),
          _react2.default.Children.map(children, function (item) {
            return _react2.default.createElement(
              _antd.Col,
              { span: average },
              item
            );
          })
        )
      );
    }
  }]);

  return Terms;
}(_react2.default.Component)) || _class2;

/**
 * fields: 用来存储一个Provider中的所有字段
 * model: 用来存储一个Provider中的所有字段的值
 * rules: 用来存储一个Provider中的所有字段的规则
 * type: type是用来表示Term的type的，和校验规则无关
 */


var Term = (_dec = (0, _mobxReact.inject)('fields', 'model', 'rules', 'type'), _dec(_class3 = (0, _mobxReact.observer)(_class3 = (_class4 = function (_React$Component3) {
  _inherits(Term, _React$Component3);

  function Term() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, Term);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = Term.__proto__ || Object.getPrototypeOf(Term)).call.apply(_ref, [this].concat(args))), _this3), _initDefineProp(_this3, 'validateState', _descriptor, _this3), _initDefineProp(_this3, 'validateMessage', _descriptor2, _this3), _initDefineProp(_this3, 'isRequired', _descriptor3, _this3), _initDefineProp(_this3, 'trigger', _descriptor4, _this3), _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(Term, [{
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
      var _this4 = this;

      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return 1;
      };
      var _props3 = this.props,
          rules = _props3.rules,
          prop = _props3.prop,
          model = _props3.model,
          duplex = _props3.duplex;


      if (prop === void 0) {
        return;
      }
      // debugger
      //从rules根据prop中获取对应的校验规则，并根据trigger进行过滤
      var pureRules = _mobx2.default.toJS(rules[prop]) || [];
      var theRules = trigger ? pureRules.filter(function (rule) {
        // debugger
        if (rule.trigger) {
          if (_lodash2.default.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger);
          } else {
            return rule.trigger === trigger ? true : false;
          }
        } else {
          return trigger === 'change';
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
      theModel[prop] = _mobx2.default.toJS(model[prop]);

      if (!theModel[prop] && duplex !== none) {
        var uuid = duplex[1];
        descriptor[uuid] = theRules;
        theModel[uuid] = _mobx2.default.toJS(model[duplex[0]][duplex[1]]);
      } else {
        descriptor[prop] = theRules;
      }

      var validator = new _asyncValidator2.default(descriptor);

      validator.validate(theModel, { firstFields: true }, function (errors) {
        _this4.validateState = !errors ? 'success' : 'error';
        _this4.validateMessage = errors ? errors[0].message : '';

        fn(_this4.validateMessage);
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
      var _props4 = this.props,
          prop = _props4.prop,
          rules = _props4.rules;
      //如果有prop属性，才push到fields数组中

      if (prop !== void 0) {
        this.props.fields.push(this);
      }
      this.isRequired = prop !== void 0 && rules[prop] && _lodash2.default.isArray(rules[prop]) ? rules[prop].filter(function (item) {
        return !!item.required;
      }) : false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          children = _props5.children,
          labelSpan = _props5.labelSpan,
          align = _props5.align,
          label = _props5.label,
          fields = _props5.fields,
          model = _props5.model,
          prop = _props5.prop,
          labelStyle = _props5.labelStyle,
          noLabel = _props5.noLabel,
          remain = _objectWithoutProperties(_props5, ['children', 'labelSpan', 'align', 'label', 'fields', 'model', 'prop', 'labelStyle', 'noLabel']);

      _react2.default.Children.map(children, function (child) {});

      return _react2.default.createElement(
        _mobxReact.Provider,
        { validateOnChange: this.validateOnChange, validateOnBlur: this.validateOnBlur },
        this.props.type === 'flex' ? _react2.default.createElement(
          _antd.Row,
          _extends({ type: 'flex', align: align }, remain),
          _react2.default.createElement(
            _antd.Col,
            { span: labelSpan, align: 'right', className: 'i-form-label' },
            _react2.default.createElement(
              'label',
              {
                className: this.isRequired ? 'ant-form-item-required' : '',
                style: labelStyle,
                title: label,
                htmlFor: prop
              },
              label
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 23 - labelSpan },
            _react2.default.createElement(
              'div',
              { className: 'i-form-term ' + (this.validateState === 'error' ? 'has-error' : '') },
              children,
              this.validateState === 'error' && _react2.default.createElement(
                'div',
                { className: 'ant-form-explain' },
                _react2.default.createElement(
                  _text2.default,
                  { size: 'small', type: 'error' },
                  _react2.default.createElement(_antd.Icon, { style: IconStyle, type: 'exclamation-circle-o' }),
                  this.validateMessage
                )
              )
            )
          )
        ) : _react2.default.createElement(
          Block,
          { className: 'i-form-block' },
          label !== none && _react2.default.createElement(
            'label',
            {
              className: (this.isRequired ? 'ant-form-item-required' : '') + ' i-form-label',
              title: label,
              htmlFor: prop
            },
            label
          ),
          _react2.default.createElement(
            _view2.default,
            { clear: true, block: true, className: [this.validateState === 'error' ? 'has-error' : ''] },
            children,
            this.validateState === 'error' && _react2.default.createElement(
              'div',
              { className: 'ant-form-explain' },
              _react2.default.createElement(
                _text2.default,
                { size: 'small', type: 'error' },
                _react2.default.createElement(_antd.Icon, { style: IconStyle, type: 'exclamation-circle-o' }),
                this.validateMessage
              )
            )
          )
        )
      );
    }
  }]);

  return Term;
}(_react2.default.Component), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, 'validateState', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class4.prototype, 'validateMessage', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class4.prototype, 'isRequired', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, 'trigger', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 'onChange';
  }
}), _applyDecoratedDescriptor(_class4.prototype, 'validateOnChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class4.prototype, 'validateOnChange'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'validateOnBlur', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class4.prototype, 'validateOnBlur'), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, 'validate', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class4.prototype, 'validate'), _class4.prototype)), _class4)) || _class3) || _class3);


(0, _setProps2.default)(Term, {
  align: ['middle', _propTypes2.default.string],
  labelSpan: [5, _propTypes2.default.number],
  labelStyle: [{}, _propTypes2.default.object]
});

var Action = (_dec2 = (0, _mobxReact.inject)('layout'), _dec2(_class6 = (0, _mobxReact.observer)(_class6 = function (_React$Component4) {
  _inherits(Action, _React$Component4);

  function Action() {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
  }

  _createClass(Action, [{
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          children = _props6.children,
          span = _props6.span,
          align = _props6.align,
          layout = _props6.layout,
          justifyContent = _props6.justifyContent,
          aligItems = _props6.aligItems,
          remain = _objectWithoutProperties(_props6, ['children', 'span', 'align', 'layout', 'justifyContent', 'aligItems']);

      return layout === 'horizontal' ? _react2.default.createElement(
        _antd.Col,
        _extends({ span: span }, remain, { className: 'i-search-action' }),
        children
      ) : _react2.default.createElement(
        _antd.Col,
        _extends({ span: 24 }, remain),
        _react2.default.createElement(
          _flexbox2.default,
          { justifyContent: justifyContent, aligItems: aligItems },
          children
        )
      );
    }
  }]);

  return Action;
}(_react2.default.Component)) || _class6) || _class6);


(0, _setProps2.default)(Action, {
  span: [5, _propTypes2.default.number],
  align: ['bottom', _propTypes2.default.string]
});

Collect.Terms = Terms;
Collect.Term = Term;
Collect.Action = Action;