/*
 * @Author: shiyong.yin 
 * @Date: 2018-03-14 16:35:26 
 * @Desc: {children} 当chilren是个数组的时候，需要给数组中的每个元素添加key值
 */
import * as React from 'react';
import _ from 'lodash';

function addUniKey(propsChildren) {
  React.Children.map(propsChildren, (cc, j) => {
    if (_.isObject(cc)) {
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

export default function(parent, index) {
  return React.Children.map(parent, (child, i) => {
    let result = React.cloneElement(child, { key: i });
    addUniKey(result.props.children);
    return result;
  });
}
