/*
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

import { Row, Col, Icon } from 'antd';
import React from 'react';
import mobx, { observable, spy } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import AsyncValidator from 'async-validator';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import Flexbox from '../flexbox';
const { Flex, Block } = Flexbox;
import Text from '../text';
import View from '../view';
import _ from 'lodash';
import setProps from 'set-props';

@observer
export default class Collect extends React.Component {
  render() {
    const { children, conditionSpan, type, layout, ...remain } = this.props;
    let terms = [],
      actions = [],
      term = [];

    //分拆children，可实现<Collect><Term></Term></Collect>，中间不要Terms也可以
    //由此带来了坑1
    //坑1 使用mobx的时候需要注意考虑item.type.name=Injector的情况
    React.Children.map(children, (item, i) => {
      if (
        item.type.name === 'Terms' ||
        (item.type.wrappedComponent &&
          item.type.wrappedComponent.name === 'Terms')
      ) {
        terms.push(item);
      } else if (
        item.type.name === 'Action' ||
        (item.type.wrappedComponent &&
          item.type.wrappedComponent.name === 'Action')
      ) {
        actions.push(item);
      } else if (
        item.type.name === 'Term' ||
        (item.type.wrappedComponent &&
          item.type.wrappedComponent.name === 'Term')
      ) {
        term.push(item);
      } else {
        console.error(
          `Collect中出现了非Terms,Action,Term的控件：${item.type.name}`
        );
      }
    });

    return (
      <Provider type={type} layout={layout}>
        <div className="i-form">
          {type === 'flex' ? (
            <Row>
              <Row type={type} {...remain}>
                <Col
                  span={
                    layout === 'vertical'
                      ? 24
                      : actions.length
                        ? conditionSpan
                        : 24
                  }>
                  {terms}
                  {term}
                </Col>
                {layout === 'horizontal' ? actions : null}
              </Row>
              {layout === 'vertical' ? (
                <Row type={type} {...remain}>
                  {actions}
                </Row>
              ) : null}
            </Row>
          ) : (
            <Flexbox>
              {terms}
              {term}
            </Flexbox>
          )}
        </div>
      </Provider>
    );
  }
}

setProps(Collect, {
  type: ['flex', PropTypes.oneOf(['flex', 'block'])],
  conditionSpan: [19, PropTypes.number],
  layout: ['horizontal', PropTypes.oneOf(['horizontal', 'vertical'])], //type用来决定Action的布局
});

@observer
class Terms extends React.Component {
  render() {
    const { children, ...remain } = this.props;
    const average = Math.floor(24 / (React.Children.count(children) || 1));

    return (
      <div>
        <Row className="i-form-row" {...remain}>
          {React.Children.map(children, item => {
            return <Col span={average}>{item}</Col>;
          })}
        </Row>
      </div>
    );
  }
}

/**
 * fields: 用来存储一个Provider中的所有字段
 * model: 用来存储一个Provider中的所有字段的值
 * rules: 用来存储一个Provider中的所有字段的规则
 * type: type是用来表示Term的type的，和校验规则无关
 */
@inject('fields', 'model', 'rules', 'type')
@observer
class Term extends React.Component {
  @observable validateState = '';
  @observable validateMessage = '';
  @observable isRequired = false;
  @observable trigger = 'onChange';

  @autobind
  validateOnChange() {
    this.validate('change');
  }

  @autobind
  validateOnBlur() {
    this.validate('blur');
  }

  @autobind
  validate(trigger, fn = () => 1) {
    const { rules, prop, model, duplex } = this.props;

    if (prop === void 0) {
      return;
    }
    // debugger
    //从rules根据prop中获取对应的校验规则，并根据trigger进行过滤
    const pureRules = mobx.toJS(rules[prop]) || [];
    const theRules = trigger
      ? pureRules.filter(rule => {
          // debugger
          if (rule.trigger) {
            if (_.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger);
            } else {
              return rule.trigger === trigger ? true : false;
            }
          } else {
            return trigger === 'change';
          }
        })
      : pureRules;

    if (!theRules || theRules.length === 0) {
      fn();
      return true;
    }

    this.validateState = 'validating';

    let descriptor = {};
    let theModel = {};

    // debugger
    //从model中根据prop或者duplex获取对应的值
    theModel[prop] = mobx.toJS(model[prop]);

    if (!theModel[prop] && duplex !== none) {
      let uuid = duplex[1];
      descriptor[uuid] = theRules;
      theModel[uuid] = mobx.toJS(model[duplex[0]][duplex[1]]);
    } else {
      descriptor[prop] = theRules;
    }

    const validator = new AsyncValidator(descriptor);

    validator.validate(theModel, { firstFields: true }, errors => {
      this.validateState = !errors ? 'success' : 'error';
      this.validateMessage = errors ? errors[0].message : '';

      fn(this.validateMessage);
    });

    this.validateDisabled = false;
  }

  resetField() {
    this.validateState = 'validating';
  }

  componentWillUnmount() {
    this.props.fields.splice(this.props.fields.indexOf(this), 1);
  }

  componentDidMount() {
    const { prop, rules } = this.props;
    //如果有prop属性，才push到fields数组中
    if (prop !== void 0) {
      this.props.fields.push(this);
    }
    this.isRequired =
      prop !== void 0 && rules[prop] && _.isArray(rules[prop])
        ? rules[prop].filter(item => !!item.required)
        : false;
  }
  render() {
    const {
      children,
      labelSpan,
      align,
      label,
      fields,
      model,
      prop,
      labelStyle,
      noLabel,
      ...remain
    } = this.props;
    React.Children.map(children, child => {});

    return (
      <Provider
        validateOnChange={this.validateOnChange}
        validateOnBlur={this.validateOnBlur}>
        {this.props.type === 'flex' ? (
          <Row type="flex" align={align} {...remain}>
            <Col span={labelSpan} align="right" className="i-form-label">
              <label
                className={this.isRequired ? 'ant-form-item-required' : ''}
                style={labelStyle}
                title={label}
                htmlFor={prop}>
                {label}
              </label>
            </Col>
            <Col span={23 - labelSpan}>
              <div
                className={`i-form-term ${
                  this.validateState === 'error' ? 'has-error' : ''
                }`}>
                {children}
                {this.validateState === 'error' && (
                  <div className="ant-form-explain">
                    <Text size="small" type="error">
                      <Icon style={IconStyle} type="exclamation-circle-o" />
                      {this.validateMessage}
                    </Text>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        ) : (
          <Block className="i-form-block">
            {label !== none && (
              <label
                className={`${
                  this.isRequired ? 'ant-form-item-required' : ''
                } i-form-label`}
                title={label}
                htmlFor={prop}>
                {label}
              </label>
            )}
            <View
              clear
              block
              className={[this.validateState === 'error' ? 'has-error' : '']}>
              {children}
              {/* 错误信息 */}
              {this.validateState === 'error' && (
                <div className="ant-form-explain">
                  <Text size="small" type="error">
                    <Icon style={IconStyle} type="exclamation-circle-o" />
                    {this.validateMessage}
                  </Text>
                </div>
              )}
            </View>
          </Block>
        )}
      </Provider>
    );
  }
}

setProps(Term, {
  align: ['middle', PropTypes.string],
  labelSpan: [5, PropTypes.number],
  labelStyle: [{}, PropTypes.object],
});

@inject('layout')
@observer
class Action extends React.Component {
  render() {
    const {
      children,
      span,
      align,
      layout,
      justifyContent,
      aligItems,
      ...remain
    } = this.props;
    return layout === 'horizontal' ? (
      <Col span={span} {...remain} className={`i-search-action`}>
        {children}
      </Col>
    ) : (
      <Col span={24} {...remain}>
        <Flexbox justifyContent={justifyContent} aligItems={aligItems}>
          {children}
        </Flexbox>
      </Col>
    );
  }
}

setProps(Action, {
  span: [5, PropTypes.number],
  align: ['bottom', PropTypes.string],
});

Collect.Terms = Terms;
Collect.Term = Term;
Collect.Action = Action;
