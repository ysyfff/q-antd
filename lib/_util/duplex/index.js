'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var mobx = _interopRequireWildcard(_mobx);

var _mobxReact = require('mobx-react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _coreDecorators = require('core-decorators');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _antd = require('antd');

var _middlewareKeyCode = require('../middlewareKeyCode');

var _middlewareKeyCode2 = _interopRequireDefault(_middlewareKeyCode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
} /*
   * @Author: shiyong.yin
   * @Date: 2018-01-08 15:30:31
   * @Last Modified by: shiyong.yin
   * @Description: 实现react双绑
   */

/**
 * 思路：用mobx + hoc实现双绑
 *
 * 问：如何解决双绑的问题
 * 答：通过HOC给受控组件统一加上value和onChange回调
 *
 * 问：关于组件联动呢
 * 答：用mobx解决
 *
 * 问：如何实现a.b.c这种动态结构的双绑
 * 答：使用a.b.c作为key值新增到model中，最后输出model的时候将其扁平化即可
 */

// import uniKeyProp from './uniKeyProp';
var toString = _antd.Mention.toString,
    toContentState = _antd.Mention.toContentState;


function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

function getValue(componentName, e) {
  var v = void 0;
  switch (componentName) {
    case 'Input':
    case 'TextArea':
    case 'RadioGroup':
      v = e.target.value;
      break;
    case 'Radio':
    case 'Checkbox':
      v = e.target.checked;
      break;
    case 'CheckboxGroup':
    case 'AutoComplete':
    case 'Cascader':
    case 'InputNumber':
    case 'Rate':
    case 'Select':
    case 'Slider':
    case 'Switch':
    case 'TreeSelect':
    case 'Transfer':
      v = e;
      break;
    case 'Mention':
      v = toString(e);
      break;
    case 'TimePicker':
      v = e.format('HH:mm:ss');
      break;
    case 'PickerWrapper':
      if (!staticWith2Param) {
        v = e.format('YYYY-MM-DD');
      }
      break;
    default:
      {
        v = e;
        var msg = '未捕获组件类型';
        (0, _warning2.default)(true, msg + ': ' + componentName);
        break;
      }
  }

  return v;
}

exports.default = function (ComposedComponent) {
  var _desc, _value, _class;

  return (0, _mobxReact.inject)('model', 'duplexer', 'validateOnChange', 'validateOnBlur', 'getDuplexFromElement')((0, _mobxReact.observer)((_class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.expandedInitVal = '', _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            duplex = _props.duplex,
            model = _props.model;

        var duplexString = Array.isArray(duplex) ? duplex[0] : duplex;
        //向FormItem传递duplex属性
        this.props.getDuplexFromElement(duplex);
        this.props.duplexer.push(duplexString);

        // 检测code是否存在
        this.getKeyCodeFromProps(function (eventType, code) {
          (0, _middlewareKeyCode.testKeyCode)(code);
        });

        var expanded = duplex.indexOf('.') > 0;

        if (expanded) {
          var _createKeyValueViaDot = this.createKeyValueViaDot(duplex, this.expandedInitVal),
              key = _createKeyValueViaDot.key,
              value = _createKeyValueViaDot.value;

          model.set(key, value);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var duplex = this.props.duplex;

        var duplexString = Array.isArray(duplex) ? duplex[0] : duplex;
        this.props.duplexer.splice(this.props.duplexer.indexOf(duplexString), 1);
      }
    }, {
      key: 'isValidDuplexString',
      value: function isValidDuplexString(duplex) {
        var duplexString = Array.isArray(duplex) ? duplex[0] : duplex;
        return this.props.duplexer.every(function (n) {
          return !partOf(n, duplexString) && !partOf(duplexString, n);
        });
      }
    }, {
      key: 'getKeyCodeFromProps',
      value: function getKeyCodeFromProps() {
        var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return 1;
        };

        Object.keys(this.props).forEach(function (prop) {
          // 如果prop中含有-字符串，我们认为要进行修饰符相关的操作
          if (prop.indexOf('-') > 0) {
            var _prop$split = prop.split('-'),
                _prop$split2 = _slicedToArray(_prop$split, 2),
                eventType = _prop$split2[0],
                code = _prop$split2[1];

            func(eventType, code, prop);
            // addons[eventType] = middlewareKeyCode(code, this.props[prop]);
          }
        });
      }

      /**
       * 将a.b.c形式的字符串转换成{key:a, value: {b: {c: initialValue}}}
       * 这样就可以set到model中了
       * @param {*} str 输入字符串
       * @param {*} initialValue 初始值
       */

    }, {
      key: 'createKeyValueViaDot',
      value: function createKeyValueViaDot(str, initialValue) {
        var model = this.props.model;


        var keys = str.split('.');
        var initial = mobx.toJS(model.get(keys[0]));
        var middle = {};
        var len = keys.length;

        if (len === 1) {
          return { key: keys[0], value: initialValue };
        }

        for (var i = 1; i < len; i++) {
          var currKey = keys[i];

          if (i === 1) {
            if (initial) {
              // 如果inital已经存在，也就是说model已经存在
              if (initial[currKey]) {
                // 在现有model中已经存在currKey对象
                if (len === 2) {
                  initial[currKey] = initialValue;
                }
                // console.log(str, 'initial')
                middle = initial[currKey];
              } else {
                // 处理len=2是的临界值
                initial[currKey] = len === 2 ? initialValue : {};
                middle = initial[currKey];
              }
            } else {
              initial = {};
              // 处理len=2是的临界值
              initial[currKey] = len === 2 ? initialValue : {};
              middle = initial[currKey];
            }
          } else if (i === len - 1) {
            middle[currKey] = initialValue;
          } else if (middle[currKey]) {
            middle = middle[currKey];
          } else {
            // console.log(str, '未定义分支')
            middle[currKey] = {};
            middle = middle[currKey];
          }
        }
        // console.log('这是', JSON.stringify(initial))
        return { key: keys[0], value: initial };
      }

      /**
       * 根据字符串a.b.c获取model中对应的model.a.b.c的值
       * 如果是初次，取值initalValue
       * @param {*} str 字符创a.b.c
       * @param {*} originalObj js对象{a: {b: {c: ''}}}
       * @param {*} initialValue 初始值
       */

    }, {
      key: 'getExpandedMapValue',
      value: function getExpandedMapValue(str, originalObj, initialValue) {
        var keys = str.split('.');
        var middle = null;
        var len = keys.length;

        if (len === 1) {
          return originalObj[keys[0]];
        }

        for (var i = 0; i < len; i++) {
          var currKey = keys[i];

          if (i === 0) {
            if (originalObj[currKey]) {
              middle = originalObj[currKey];
            } else {
              middle = initialValue;
              break;
            }
          } else if (middle[currKey]) {
            middle = middle[currKey];
          } else {
            middle = initialValue;
          }
        }

        return middle;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        /**
         * duplex的三种类型
         * string                  静态一个变量，用在Input等其中
         * string, string          静态两个变量，用在rangePicker等其中
         * [string, string|number] 动态两个变量，用在循环(动态增加Input等组件)中
         */
        var _props2 = this.props,
            duplex = _props2.duplex,
            model = _props2.model,
            children = _props2.children,
            _props2$onChange = _props2.onChange,
            _onChange = _props2$onChange === undefined ? function () {
          return 1;
        } : _props2$onChange,
            _props2$onBlur = _props2.onBlur,
            _onBlur = _props2$onBlur === undefined ? function () {
          return 1;
        } : _props2$onBlur,
            validateOnChange = _props2.validateOnChange,
            validateOnBlur = _props2.validateOnBlur,
            noDefault = _props2.noDefault,
            remain = _objectWithoutProperties(_props2, ['duplex', 'model', 'children', 'onChange', 'onBlur', 'validateOnChange', 'validateOnBlur', 'noDefault']);

        (0, _warning2.default)(this.isValidDuplexString(duplex), 'duplex的值不能是另一个duplex值得一部分，比如a和a.b不能出现在同一个form中');
        // debugger
        var dynamic = Array.isArray(duplex);
        var staticWith2Param = false;
        var duplexValue = '';
        var keys1 = void 0;
        var keys2 = void 0;
        var expanded = model.constructor.name.includes('Map');

        if (dynamic) {
          // 动态两个变量
          duplexValue = model[duplex[0]][duplex[1]];
        } else if (expanded) {
          duplexValue = this.getExpandedMapValue(duplex, mobx.toJS(model), this.expandedInitVal);
        } else {
          // 静态一个变量
          var keys = duplex.split(',');
          staticWith2Param = keys.length === 2;
          if (staticWith2Param) {
            keys1 = _lodash2.default.trim(keys[0]);
            keys2 = _lodash2.default.trim(keys[1]);
          } else {
            duplexValue = model[duplex];
          }
        }

        var componentName = ComposedComponent.name;
        var addons = {};

        var isStaticWith2Param = staticWith2Param ? Object.prototype.hasOwnProperty.call(model, keys1) && Object.prototype.hasOwnProperty.call(model, keys2) : Object.prototype.hasOwnProperty.call(model, duplex);
        var isDynamic = dynamic ? Object.prototype.hasOwnProperty.call(model, duplex[0]) : isStaticWith2Param;
        var existed = expanded ? true : isDynamic;

        (0, _warning2.default)(existed, duplex + ' \u4E0D\u5B58\u5728model\u4E2D');

        // 注册键盘事件
        this.getKeyCodeFromProps(function (eventType, code, prop) {
          addons[eventType] = (0, _middlewareKeyCode2.default)(code, _this2.props[prop]);
        });

        // 双绑之去
        switch (componentName) {
          // 双绑的是value
          case 'Input':
          case 'TextArea':
          case 'AutoComplete':
          case 'CheckboxGroup':
          case 'Cascader':
          case 'InputNumber':
          case 'Rate':
          case 'RadioGroup':
          case 'Select':
          case 'Slider':
          case 'TreeSelect':
            addons.value = mobx.toJS(duplexValue);
            break;
          // Checkbox双绑的是checked
          case 'Radio':
          case 'Checkbox':
          case 'Switch':
            addons.checked = duplexValue;
            break;
          case 'PickerWrapper':
            // 处理RangePicker_
            if (staticWith2Param) {
              if (model[keys1] === '' || model[keys2] === '') {
                addons.value = [];
              } else {
                addons.value = [(0, _moment2.default)(model[keys1]), (0, _moment2.default)(model[keys2])];
              }
            } else {
              addons.value = duplexValue ? (0, _moment2.default)(duplexValue) : duplexValue;
            }
            break;
          case 'TimePicker':
            addons.value = (0, _moment2.default)(duplexValue, 'HH:mm:ss');
            break;
          case 'Mention':
            addons.value = toContentState(mobx.toJS(duplexValue));
            break;
          case 'Transfer':
            addons.targetKeys = mobx.toJS(duplexValue);
            addons.render = function (item) {
              return item.title;
            };
            break;
          default:
            {
              var msg = '未捕获组件类型';
              (0, _warning2.default)(true, msg + ': ' + componentName);
              break;
            }
        }

        // 如果不设置默认值，将value属性清理掉，这和antd的实现有关
        if (noDefault) {
          delete addons.value;
        }

        return _react2.default.createElement(
          ComposedComponent,
          _extends({}, remain, addons, {
            onBlur: function onBlur(e) {
              setTimeout(function () {
                validateOnBlur();
              });
              var v = getValue(componentName, e);
              _onBlur(v);
            },
            onChange: function onChange(e, options) {
              setTimeout(function () {
                validateOnChange();
              });
              // 双绑之回
              var v = getValue(componentName, e);

              if (staticWith2Param) {
                // 静态两个变量
                model[keys1] = e[0] instanceof _moment2.default ? options[0] : e[0];
                model[keys2] = e[1] instanceof _moment2.default ? options[1] : e[1];
              } else if (dynamic) {
                // 动态两个变量
                model[duplex[0]][duplex[1]] = v;
              } else if (expanded) {
                var _createKeyValueViaDot2 = _this2.createKeyValueViaDot(duplex, v),
                    key = _createKeyValueViaDot2.key,
                    value = _createKeyValueViaDot2.value;

                model.set(key, value);
              } else {
                // 静态一个变量或者是expanded类型
                // 关于week例如2014-28th不好处理，先用date格式
                model[duplex] = v;
              }
              _onChange(v);
            } }),
          _react2.default.Children.map(children, function (child, i) {
            /**
             * 当只有文本元素的时候，不能cloneElement，文本不属于Element，比如<Checkbox_>dd</Checkbox_>
             */
            if (_react2.default.isValidElement(child)) {
              return _react2.default.cloneElement(child, { key: i });
            }
            return child;
          })
        );
      }
    }]);

    return _class;
  }(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'isValidDuplexString', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'isValidDuplexString'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getKeyCodeFromProps', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getKeyCodeFromProps'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createKeyValueViaDot', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'createKeyValueViaDot'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getExpandedMapValue', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getExpandedMapValue'), _class.prototype)), _class)));
};