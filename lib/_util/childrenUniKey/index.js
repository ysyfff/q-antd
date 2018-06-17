'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (parent, index) {
  return React.Children.map(parent, function (child, i) {
    var result = React.cloneElement(child, { key: i });
    addUniKey(result.props.children);
    return result;
  });
};

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
 * @Author: shiyong.yin 
 * @Date: 2018-03-14 16:35:26 
 * @Desc: {children} 当chilren是个数组的时候，需要给数组中的每个元素添加key值
 */
function addUniKey(propsChildren) {
  React.Children.map(propsChildren, function (cc, j) {
    if (_lodash2.default.isObject(cc)) {
      //兼容只读属性不能重写key属性的情况
      try {
        cc.key = j;
      } catch (err) {}
    }
    if (cc && cc.props && cc.props.children) {
      addUniKey(cc.props.children);
    }
  });
  return propsChildren;
}