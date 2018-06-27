'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _descriptor, _descriptor2; /*
                                                                * @Author: shiyong.yin
                                                                * @Date: 2018-01-16 12:00:13
                                                                * @Last Modified by: shiyong.yin
                                                                * @Description: 封装Provider为Form，使其具有校验功能，需配合Collect使用
                                                                * @Usage: 
                                                                */

/**
 * Form fillCount=1 labelWidth=20 layout=[flex, block，block]
 *   Flexbox
 *     Flex|Block
 *       ItemWrap
 *         Item
 *         ...
 *       ...
 *     Block|Flex
 *       Action
 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var mobx = _interopRequireWildcard(_mobx);

var _mobxReact = require('mobx-react');

var _coreDecorators = require('core-decorators');

var _flexbox = require('../flexbox');

var _flexbox2 = _interopRequireDefault(_flexbox);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _setProps = require('set-props');

var _setProps2 = _interopRequireDefault(_setProps);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _childrenUniKey = require('../_util/childrenUniKey');

var _childrenUniKey2 = _interopRequireDefault(_childrenUniKey);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var observable = mobx.observable;
var Flex = _flexbox2.default.Flex,
    Block = _flexbox2.default.Block;

var Form = (0, _mobxReact.observer)(_class = (_class2 = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, 'fields', _descriptor, _this), _initDefineProp(_this, 'duplexer', _descriptor2, _this), _this.initialModel = null, _temp), _possibleConstructorReturn(_this, _ret);
  } //如果有prop属性，才push到fields数组中
  //只要有duplex属性，就push到此数组中


  _createClass(Form, [{
    key: 'validate',
    //缓存下model的初始值，用于resetFields
    // @observable rules = {}; //存储校验规则

    value: function validate() {
      var _this2 = this;

      var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return 1;
      };

      return new Promise(function (resolve, reject) {
        var valid = true;
        var count = 0;
        // debugger
        //如果含有校验规则，校验，否则，直接返回
        if (_this2.fields.length > 0) {
          _this2.fields.map(function (field) {
            field.validate('', function (errors) {
              if (errors) {
                valid = false;
              }
              if (++count === _this2.fields.length) {
                resolve(valid);
                fn(valid);
              }
            });
          });
        } else {
          resolve(valid);
          fn(valid);
        }
      });
    }
  }, {
    key: 'resetFieldsStyle',
    value: function resetFieldsStyle() {
      this.fields.map(function (field) {
        field.resetField();
      });
    }
  }, {
    key: 'resetFields',
    value: function resetFields() {
      Object.assign(this.props.model, this.initialModel);
    }

    // componentWillReceiveProps(nextProps){
    //   // fix mobx warning
    //   // MobX Provider: Provided store 'rules' has changed. Please avoid replacing stores as the change might not propagate to all children
    //   if(this.rules !== nextProps.rules){
    //     this.rules = nextProps.rules;
    //   }
    // }

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // if (this.rules !== this.props.rules) {
      //   this.rules = this.props.rules;
      // }
      this.initialModel = _lodash2.default.merge({}, mobx.toJS(this.props.model));
    }
  }, {
    key: 'render',
    value: function render() {
      /**
       * actionPosition定位Action的位置
       * right-flex-start
       * right-flex-end
       * right-center
       * bottom-flex-start
       * bottom-flex-end
       * bottom-center
       */
      var _props = this.props,
          children = _props.children,
          layout = _props.layout,
          fillCount = _props.fillCount,
          inline = _props.inline,
          labelWidth = _props.labelWidth,
          labelPosition = _props.labelPosition,
          manualLayout = _props.manualLayout,
          actionPosition = _props.actionPosition,
          needCls = _props.needCls,
          labelStyle = _props.labelStyle,
          style = _props.style,
          remain = _objectWithoutProperties(_props, ['children', 'layout', 'fillCount', 'inline', 'labelWidth', 'labelPosition', 'manualLayout', 'actionPosition', 'needCls', 'labelStyle', 'style']);

      var actionPositionArr = actionPosition.split(':');
      var mainActionPosition = actionPositionArr[0] || 'right';
      var justifyActionPosition = actionPositionArr[1] || 'flex-start';
      var alignActionPosition = actionPositionArr[2] || 'flex-end';

      /**
       * manual:
       *   false - 使用Form内部提供的布局，能满足绝大多数需求
       *   true - 不使用Form内部提供的布局，需要自己布局
       */
      var formItems = [],
          actions = [],
          formItem = [];
      var formItemTotal = 0,
          formItemCount = 0,
          formTotalCount = 0;

      if (!manualLayout) {
        _react2.default.Children.map(children, function (item, i) {
          if (item && item.type && item.type.name) {
            if (item.type.name === 'FormItem' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'FormItem') {
              formItemTotal++;
            }
          }
        });

        //对children内容进行重新布局，这就引起了unique key prop的warning，可使用childrenUniKey解决
        _react2.default.Children.map(children, function (item, i) {
          if (item && item.type && item.type.name) {
            if (item.type.name === 'Action' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'Action') {
              actions.push(item);
            } else if (item.type.name === 'FormItem' || item.type.wrappedComponent && item.type.wrappedComponent.name === 'FormItem') {
              formItemCount++;
              formTotalCount++;
              formItem.push(item);

              //将formItem进行分组，不够一组用空的FormItem进行补齐
              if (fillCount === formItemCount) {
                formItems.push(_lodash2.default.merge([], formItem));
                formItemCount = 0;
                formItem = [];
              } else if (formTotalCount === formItemTotal) {
                var nurse = fillCount - formItemCount;
                while (nurse-- > 0) {
                  formItem.push(_react2.default.createElement(_item2.default, null));
                }
                formItems.push(formItem);
              }
            } else {
              console.error('Collect\u4E2D\u51FA\u73B0\u4E86\u975EformItems,Action,FormItem\u7684\u63A7\u4EF6\uFF1A' + item.type.name);
            }
          }
        });
      }

      var layoutArr = layout.split(':');
      var SearchComponentLayout = layoutArr[0] && (layoutArr[0] === 'flex' || layoutArr[0] === '') || layoutArr[0] === void 0 ? Flex : Block;
      var ActionComponentLayout = layoutArr[1] && (layoutArr[1] === 'block' || layoutArr[1] === '') || layoutArr[1] === void 0 ? Block : Flex;
      var ItemComponentLayout = layoutArr[2] && (layoutArr[2] === 'block' || layoutArr[2] === '') || layoutArr[2] === void 0 ? Block : Flex;

      // inline && (SearchComponentLayout = Flex);
      var formCls = needCls ? 'i-form' : '';

      var addons = {};
      if (!remain.rules) {
        //如果用户没有传入rules属性，需要确保此属性出现在Provider上
        addons.rules = {};
      }

      return _react2.default.createElement(
        _mobxReact.Provider,
        _extends({
          fields: this.fields,
          duplexer: this.duplexer,
          rules: this.props.rules,
          ItemComponentLayout: ItemComponentLayout,
          type: 'block',
          labelWidth: labelWidth,
          labelStyle: labelStyle
        }, remain, addons, {
          labelPosition: labelPosition }),
        manualLayout ? _react2.default.createElement(
          'div',
          { className: formCls, style: style },
          children
        ) : inline ? _react2.default.createElement(
          _flexbox2.default,
          { className: formCls, style: style },
          (0, _childrenUniKey2.default)(formItems)
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _flexbox2.default,
            {
              className: formCls,
              style: style,
              alignItems: mainActionPosition === 'right' ? alignActionPosition : 'flex-start' },
            _react2.default.createElement(
              SearchComponentLayout,
              null,
              formItems.map(function (formItemWrap, i) {
                //flex的时候，需要确保i-form-item-wrap元素是个Blcok，这个FormItem中flex才能生效
                return layout[2] === 'flex' ? _react2.default.createElement(
                  Block,
                  {
                    key: 'form-item-wrap-' + i,
                    className: 'i-form-item-wrap' },
                  (0, _childrenUniKey2.default)(formItemWrap)
                ) : _react2.default.createElement(
                  _flexbox2.default,
                  {
                    key: 'form-item-wrap-' + i,
                    className: 'i-form-item-wrap' },
                  (0, _childrenUniKey2.default)(formItemWrap)
                );
              })
            ),
            mainActionPosition === 'right' ? _react2.default.createElement(
              ActionComponentLayout,
              {
                style: {
                  display: 'flex',
                  alignItems: alignActionPosition,
                  justifyContent: justifyActionPosition
                } },
              actions
            ) : null
          ),
          mainActionPosition === 'bottom' ? _react2.default.createElement(
            _flexbox2.default,
            {
              justifyContent: justifyActionPosition,
              alignItems: alignActionPosition,
              className: 'i-form-action' },
            actions
          ) : null
        )
      );
    }
  }]);

  return Form;
}(_react2.default.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'fields', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'duplexer', [observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, 'validate', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'validate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetFieldsStyle', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFieldsStyle'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetFields', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'resetFields'), _class2.prototype)), _class2)) || _class;

exports.default = Form;


Form.FormItem = _item2.default;
Form.Action = _action2.default;

(0, _setProps2.default)(Form, {
  validateOnChange: [function (e) {
    return 1;
  }, _propTypes2.default.func],
  validateOnBlur: [function (e) {
    return 1;
  }, _propTypes2.default.func],
  inline: [false, _propTypes2.default.bool],
  layout: ['flex:block:block', _propTypes2.default.string],
  actionPosition: ['right:flex-start:flex-end', _propTypes2.default.string],
  labelPosition: ['right:center', _propTypes2.default.string],
  labelStyle: [null, _propTypes2.default.object],
  fillCount: [1, _propTypes2.default.number],
  manualLayout: [false, _propTypes2.default.bool],
  labelWidth: [0, _propTypes2.default.number], //labelWidth为0时，会将0替换为‘auto’
  needCls: [true, _propTypes2.default.bool]
});