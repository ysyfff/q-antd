/*
 * @Author: shiyong.yin
 * @Date: 2018-01-08 15:30:31
 * @Last Modified by: shiyong.yin
 * @Description: 实现react双绑
 * @Usage: 
 * 
 * @duplex
 * class XX extends React.Component {
 * }
 */

/**
 * 思路：用mobx + decorator + hoc实现双绑
 * 
 * 问：如何解决双绑的问题
 * 答：通过HOC给受控组件统一加上value和onChange回调
 * 
 * 问：关于组件联动呢
 * 答：用mobx解决
 * 
 * 问：如何实现a.b.c这种动态结构的双绑
 * 答：使用a.b.c作为key值新增到model中，最后输出model的时候将其扁平化即可
 * (由于是动态新增到model中
 *  这就说明原来的model中是不存在此key值的
 *  应该移除@2.2.9以及之前的版本中key不存在model中的判断)
 */
'use strict';

import React, { Component } from 'react';
import { Input } from 'antd';
import * as mobx from 'mobx';
import { observer, inject } from 'mobx-react'
import moment from 'moment';
import warning from 'warning';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import { Mention } from 'antd';
import middlewareKeyCode, { testKeyCode } from '../middlewareKeyCode';
// import uniKeyProp from './uniKeyProp';
const { toString, toContentState } = Mention;

function partOf(a, b) {
  return b.indexOf(a) === 0 && ['.', '['].indexOf(b[a.length]) !== -1;
}

export default ComposedComponent => inject('model', 'duplexer', 'validateOnChange', 'validateOnBlur')(observer(class extends React.Component {
  expandedInitVal = '';

  componentWillUnmount() {
    const { duplex } = this.props;
    const duplexString = Array.isArray(duplex) ? duplex[0] : duplex;
    this.props.duplexer.splice(this.props.duplexer.indexOf(duplexString), 1);

  }

  componentDidMount() {
    const { duplex, model } = this.props;
    const duplexString = Array.isArray(duplex) ? duplex[0] : duplex;

    this.props.duplexer.push(duplexString);

    //检测code是否存在
    this.getKeyCodeFromProps((eventType, code, prop) => {
      testKeyCode(code);
    });

    const expanded = duplex.indexOf('.') > 0;
    const expandedInitVal = '';

    if (expanded) {
      //重要前提，如果是expanded我们先假设这个一个map类型
      //重要前提，如果是expanded我们先假设这个一个map类型
      //重要前提，如果是expanded我们先假设这个一个map类型

      //1.理论上来说，model中是不存在duplex字段的，所以需要我们加上此字段
      //2. 为了防止意外，我们做一个判断
      // if(mobx.toJS(model).hasOwnProperty(duplex)){
      //   duplexValue = model.get(duplex);
      // }else{
      const { key, value } = this.createKeyValueViaDot(duplex, this.expandedInitVal);
      model.set(key, value);
      // duplexValue = model.get(duplex);
      // }

      //如何实现duplex的扁平化 参见：https://github.com/react-component/form/search?utf8=%E2%9C%93&q=flattenRegisteredFields&type=
      // duplex.split('.').map()
    }
  }

  /**
   * 将a.b.c形式的字符串转换成{key:a, value: {b: {c: initialValue}}}
   * 这样就可以set到model中了
   * @param {*} str 输入字符串
   * @param {*} initialValue 初始值
   */
  @autobind
  createKeyValueViaDot(str, initialValue) {
    const { model } = this.props;

    const keys = str.split('.');
    let initial = mobx.toJS(model.get(keys[0]));
    let middle = {};
    let allKeywords = {}; //倒数第二个节点的所有字段
    const len = keys.length;

    if (len === 1) {
      return { key: keys[0], value: initialValue };
    }

    for (let i = 1; i < len; i++) {
      let currKey = keys[i];

      // console.log(str, i, currKey)

      if (i === 1) {
        if (initial) { //如果inital已经存在，也就是说model已经存在
          if (initial[currKey]) { //在现有model中已经存在currKey对象
            len === 2 && (initial[currKey] = initialValue);
            // console.log(str, 'initial')
            middle = initial[currKey];
          } else {
            //处理len=2是的临界值
            initial[currKey] = len === 2 ? initialValue : {};
            middle = initial[currKey];
          }
        } else {
          initial = {};
          //处理len=2是的临界值
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
  @autobind
  getExpandedMapValue(str, originalObj, initialValue) {
    let keys = str.split('.');
    let middle = null;
    const len = keys.length;

    if (len === 1) {
      return originalObj[keys[0]];
    }
    // let middle = 
    for (let i = 0; i < len; i++) {
      let currKey = keys[i];

      // console.log(str, i, currKey, JSON.stringify(originalObj));

      if (i === 0) {
        if (originalObj[currKey]) {
          middle = originalObj[currKey];
        } else {
          middle = initialValue;
          break;
        }
      } else {
        if(middle[currKey]){
          middle = middle[currKey];
        }else{
          middle = initialValue;
          break;
        }
      }
    }

    return middle;
  }

  @autobind
  isValidDuplexString(duplex) {
    const duplexString = Array.isArray(duplex) ? duplex[0] : duplex;
    return this.props.duplexer.every(n => !partOf(n, duplexString) && !partOf(duplexString, n));
  }

  @autobind
  getKeyCodeFromProps(func = e => 1) {
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        //如果prop中含有-字符串，我们认为要进行修饰符相关的操作
        if (prop.indexOf('-') > 0) {
          let [eventType, code] = prop.split('-');
          func(eventType, code, prop);
          // addons[eventType] = middlewareKeyCode(code, this.props[prop]);
        }
      }
    }
  }

  render() {
    /**
     * duplex的三种类型
     * string                  静态一个变量，用在Input等其中
     * string, string          静态两个变量，用在rangePicker等其中
     * [string, string|number] 动态两个变量，用在循环(动态增加Input等组件)中
     */
    const { duplex, model, children, onChange = () => 1, validateOnChange, validateOnBlur, noDefault, ...remain } = this.props;

    warning(this.isValidDuplexString(duplex), 'duplex的值不能是另一个duplex值得一部分，比如a和a.b不能出现在同一个form中');
    // debugger
    let dynamic = Array.isArray(duplex);
    let staticWith2Param = false;
    let duplexValue = '';
    let keys1, keys2;
    const expanded = model.constructor.name.includes('Map');
    const expandedInitVal = '';

    if (dynamic) { //动态两个变量
      duplexValue = model[duplex[0]][duplex[1]];
    } else if (expanded) {
      //重要前提，如果是expanded我们先假设这个一个map类型
      //重要前提，如果是expanded我们先假设这个一个map类型
      //重要前提，如果是expanded我们先假设这个一个map类型

      //1.理论上来说，model中是不存在duplex字段的，所以需要我们加上此字段
      //2. 为了防止意外，我们做一个判断

      duplexValue = this.getExpandedMapValue(duplex, mobx.toJS(model), this.expandedInitVal);

      //如何实现duplex的扁平化 参见：https://github.com/react-component/form/search?utf8=%E2%9C%93&q=flattenRegisteredFields&type=
      // duplex.split('.').map()
    } else { //静态一个变量
      const keys = duplex.split(',');
      staticWith2Param = keys.length === 2;
      if (staticWith2Param) {
        keys1 = _.trim(keys[0]);
        keys2 = _.trim(keys[1]);
      } else {
        duplexValue = model[duplex];
      }
    }

    let componentName = ComposedComponent.name;
    let addons = {};

    const existed = expanded ?
      true
      :
      dynamic ?
        model.hasOwnProperty(duplex[0])
        :
        staticWith2Param ?
          model.hasOwnProperty(keys1) && model.hasOwnProperty(keys2)
          :
          model.hasOwnProperty(duplex);

    warning(
      existed,
      `${duplex} 不存在model中`
    )

    //注册键盘事件
    this.getKeyCodeFromProps((eventType, code, prop) => {
      addons[eventType] = middlewareKeyCode(code, this.props[prop]);
    });
    //注册键盘事件
    // for (let prop in this.props) {
    //   if (this.props.hasOwnProperty(prop)) {
    //     console.log(prop)

    //     //如果prop中含有-字符串，我们认为要进行修饰符相关的操作
    //     if (prop.indexOf('-') > 0) {
    //       let [eventType, code] = prop.split('-');
    //       addons[eventType] = middlewareKeyCode(code, this.props[prop]);
    //     }
    //   }
    // }


    //双绑之去
    switch (componentName) {
      //双绑的是value
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
      //Checkbox双绑的是checked
      case 'Radio':
      case 'Checkbox':
      case 'Switch':
        addons.checked = duplexValue;
        break;
      case 'PickerWrapper':
        //处理RangePicker_
        if (staticWith2Param) {
          if (model[keys1] === '' || model[keys2] === '') {
            addons.value = [];
          } else {
            addons.value = [moment(model[keys1]), moment(model[keys2])];
          }
        } else {
          addons.value = duplexValue ? moment(duplexValue) : duplexValue;
        }
        break;
      case 'TimePicker':
        addons.value = moment(duplexValue, 'HH:mm:ss');
        break;
      case 'Mention':
        addons.value = toContentState(mobx.toJS(duplexValue));
        break;
      case 'Transfer':
        addons.targetKeys = mobx.toJS(duplexValue);
        addons.render = (item) => {
          return item.title
        };
        break;
      default:
        const msg = '未捕获组件类型'
        console.error(`${msg}: ${componentName}`);
        break;
    }

    //如果不设置默认值，将value属性清理掉，这和antd的实现有关
    if (noDefault) {
      delete addons.value;
    }

    return (
      <ComposedComponent
        {...remain}
        {...addons}
        onBlur={(e) => {
          setTimeout(() => {
            validateOnBlur();
          });
        }}
        onChange={(e, options) => {
          setTimeout(() => {
            validateOnChange();
          });
          let v;
          //双绑之回
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
              v = e;
              const msg = '未捕获组件类型'
              console.error(`${msg}: ${componentName}`);
              break;
          }

          if (staticWith2Param) { //静态两个变量
            model[keys1] = e[0] instanceof moment ? options[0] : e[0];
            model[keys2] = e[1] instanceof moment ? options[1] : e[1];
          } else if (dynamic) { //动态两个变量
            model[duplex[0]][duplex[1]] = v;
          } else if (expanded) {
            const { key, value } = this.createKeyValueViaDot(duplex, v);
            model.set(key, value);
          } else { //静态一个变量或者是expanded类型
            //关于week例如2014-28th不好处理，先用date格式
            model[duplex] = v;
          }
          onChange(v);
        }}
      >
        {React.Children.map(children, (child, i) => {
          /**
           * 当只有文本元素的时候，不能cloneElement，文本不属于Element，比如<Checkbox_>dd</Checkbox_>
           */
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { key: i });
          } else {
            return child;
          }
        })}
      </ComposedComponent>
    )
  }
}));
