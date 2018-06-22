/*
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
import React from 'react';
import * as mobx from 'mobx';
const { observable } = mobx;
import { Provider, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import Flexbox from '../flexbox';
const { Flex, Block } = Flexbox;
import PropTypes from 'prop-types';
import setProps from 'set-props';
import FormItem from './item';
import Action from './action';
import childrenUniKey from '../_util/childrenUniKey';
import _ from 'lodash';

@observer
export default class Form extends React.Component {
  @observable fields = []; //如果有prop属性，才push到fields数组中
  @observable duplexer = []; //只要有duplex属性，就push到此数组中
  initialModel = null; //缓存下model的初始值，用于resetFields
  // @observable rules = {}; //存储校验规则

  @autobind
  validate(fn = () => 1) {
    return new Promise((resolve, reject) => {
      let valid = true;
      let count = 0;
      // debugger
      //如果含有校验规则，校验，否则，直接返回
      if (this.fields.length > 0) {
        this.fields.map(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
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

  @autobind
  resetFieldsStyle() {
    this.fields.map(field => {
      field.resetField();
    });
  }

  @autobind
  resetFields() {
    Object.assign(this.props.model, this.initialModel);
  }

  // componentWillReceiveProps(nextProps){
  //   // fix mobx warning
  //   // MobX Provider: Provided store 'rules' has changed. Please avoid replacing stores as the change might not propagate to all children
  //   if(this.rules !== nextProps.rules){
  //     this.rules = nextProps.rules;
  //   }
  // }
  componentDidMount() {
    // if (this.rules !== this.props.rules) {
    //   this.rules = this.props.rules;
    // }
    this.initialModel = _.merge({}, mobx.toJS(this.props.model));
  }

  render() {
    /**
     * actionPosition定位Action的位置
     * right-flex-start
     * right-flex-end
     * right-center
     * bottom-flex-start
     * bottom-flex-end
     * bottom-center
     */
    const {
      children,
      layout,
      fillCount,
      inline,
      labelWidth,
      labelPosition,
      manualLayout,
      actionPosition,
      needCls,
      labelStyle,
      style,
      ...remain
    } = this.props;

    const actionPositionArr = actionPosition.split(':');
    const mainActionPosition = actionPositionArr[0] || 'right';
    const justifyActionPosition = actionPositionArr[1] || 'flex-start';
    const alignActionPosition = actionPositionArr[2] || 'flex-end';

    /**
     * manual:
     *   false - 使用Form内部提供的布局，能满足绝大多数需求
     *   true - 不使用Form内部提供的布局，需要自己布局
     */
    let formItems = [],
      actions = [],
      formItem = [];
    let formItemTotal = 0,
      formItemCount = 0,
      formTotalCount = 0;

    if (!manualLayout) {
      React.Children.map(children, (item, i) => {
        if (item && item.type && item.type.name) {
          if (
            item.type.name === 'FormItem' ||
            (item.type.wrappedComponent &&
              item.type.wrappedComponent.name === 'FormItem')
          ) {
            formItemTotal++;
          }
        }
      });

      //对children内容进行重新布局，这就引起了unique key prop的warning，可使用childrenUniKey解决
      React.Children.map(children, (item, i) => {
        if (item && item.type && item.type.name) {
          if (
            item.type.name === 'Action' ||
            (item.type.wrappedComponent &&
              item.type.wrappedComponent.name === 'Action')
          ) {
            actions.push(item);
          } else if (
            item.type.name === 'FormItem' ||
            (item.type.wrappedComponent &&
              item.type.wrappedComponent.name === 'FormItem')
          ) {
            formItemCount++;
            formTotalCount++;
            formItem.push(item);

            //将formItem进行分组，不够一组用空的FormItem进行补齐
            if (fillCount === formItemCount) {
              formItems.push(_.merge([], formItem));
              formItemCount = 0;
              formItem = [];
            } else if (formTotalCount === formItemTotal) {
              let nurse = fillCount - formItemCount;
              while (nurse-- > 0) {
                formItem.push(<FormItem />);
              }
              formItems.push(formItem);
            }
          } else {
            console.error(
              `Collect中出现了非formItems,Action,FormItem的控件：${
                item.type.name
              }`
            );
          }
        }
      });
    }

    const layoutArr = layout.split(':');
    const SearchComponentLayout =
      (layoutArr[0] && (layoutArr[0] === 'flex' || layoutArr[0] === '')) ||
      layoutArr[0] === void 0
        ? Flex
        : Block;
    const ActionComponentLayout =
      (layoutArr[1] && (layoutArr[1] === 'block' || layoutArr[1] === '')) ||
      layoutArr[1] === void 0
        ? Block
        : Flex;
    const ItemComponentLayout =
      (layoutArr[2] && (layoutArr[2] === 'block' || layoutArr[2] === '')) ||
      layoutArr[2] === void 0
        ? Block
        : Flex;

    // inline && (SearchComponentLayout = Flex);
    const formCls = needCls ? 'i-form' : '';

    return (
      <Provider
        fields={this.fields}
        duplexer={this.duplexer}
        rules={this.props.rules}
        ItemComponentLayout={ItemComponentLayout}
        type="block"
        labelWidth={labelWidth}
        labelStyle={labelStyle}
        {...remain}
        labelPosition={labelPosition}>
        {manualLayout ? (
          <div className={formCls} style={style}>
            {children}
          </div>
        ) : inline ? (
          <Flexbox className={formCls} style={style}>
            {/* {childrenUniKey(formItems)} */}
            {/* {React.Children.map(formItems, (formItem, i) => {
                return React.cloneElement(formItem, { key: i });
              })} */}
            {childrenUniKey(formItems)}
          </Flexbox>
        ) : (
          <div>
            <Flexbox
              className={formCls}
              style={style}
              alignItems={
                mainActionPosition === 'right'
                  ? alignActionPosition
                  : 'flex-start'
              }>
              <SearchComponentLayout>
                {formItems.map((formItemWrap, i) => {
                  //flex的时候，需要确保i-form-item-wrap元素是个Blcok，这个FormItem中flex才能生效
                  return layout[2] === 'flex' ? (
                    <Block
                      key={`form-item-wrap-${i}`}
                      className="i-form-item-wrap">
                      {childrenUniKey(formItemWrap)}
                      {/* {React.Children.map(formItemWrap, (formItems, i) => {
                              return React.cloneElement(React.Children.map(formItems, (formItem, j) => {
                                return React.cloneElement(formItem, { key: j })
                              }), { key: i });
                            })} */}
                      {/* {React.Children.map(formItemWrap, (formItems, i) => {
                              let formItems = React.cloneElement(formItems, { key: i });
                              if (React.Children.count(formItems.props.children) > 1) {
                                React.Children.map(formItems.props.children, (cc, j) => {
                                  cc.key = j;
                                })
                              }
                              return formItems;
                            })} */}
                    </Block>
                  ) : (
                    <Flexbox
                      key={`form-item-wrap-${i}`}
                      className="i-form-item-wrap">
                      {childrenUniKey(formItemWrap)}
                      {/* {React.Children.map(formItemWrap, (formItems, i) => {
                              return React.cloneElement(React.Children.map(formItems, (formItem, j) => {
                                return React.cloneElement(formItem, { key: j })
                              }), { key: i });
                            })} */}
                      {/* {React.Children.map(formItemWrap, (formItems, i) => {
                              return React.cloneElement(formItems, { key: i });
                            })} */}
                    </Flexbox>
                  );
                })}
              </SearchComponentLayout>
              {mainActionPosition === 'right' ? (
                <ActionComponentLayout
                  style={{
                    display: 'flex',
                    alignItems: alignActionPosition,
                    justifyContent: justifyActionPosition,
                  }}>
                  {actions}
                </ActionComponentLayout>
              ) : null}
            </Flexbox>
            {mainActionPosition === 'bottom' ? (
              <Flexbox
                justifyContent={justifyActionPosition}
                alignItems={alignActionPosition}
                className="i-form-action">
                {actions}
              </Flexbox>
            ) : null}
          </div>
        )}
      </Provider>
    );
  }
}

Form.FormItem = FormItem;
Form.Action = Action;

setProps(Form, {
  validateOnChange: [e => 1, PropTypes.func],
  validateOnBlur: [e => 1, PropTypes.func],
  inline: [false, PropTypes.bool],
  layout: ['flex:block:block', PropTypes.string],
  actionPosition: ['right:flex-start:flex-end', PropTypes.string],
  labelPosition: ['right:center', PropTypes.string],
  labelStyle: [null, PropTypes.object],
  fillCount: [1, PropTypes.number],
  manualLayout: [false, PropTypes.bool],
  labelWidth: [0, PropTypes.number], //labelWidth为0时，会将0替换为‘auto’
  needCls: [true, PropTypes.bool],
});
