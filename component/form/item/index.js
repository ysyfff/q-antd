import { Icon } from 'antd';
import * as React from 'react';
import * as mobx from 'mobx';
const { observable, action } = mobx;
import { observer, inject, Provider } from 'mobx-react';
import AsyncValidator from 'async-validator';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import Flexbox from '../../flexbox';
const { Flex, Block } = Flexbox;
import Text from '../../text';
import View from '../../view';
import _ from 'lodash';
import setProps from 'set-props';
const IconStyle = {
  transform: 'scale(0.85)',
};
/**
 * fields: 用来存储一个Provider中的所有字段
 * model: 用来存储一个Provider中的所有字段的值
 * rules: 用来存储一个Provider中的所有字段的规则
 * type: type是用来表示Term的type的，和校验规则无关
 */
@inject(
  'fields',
  'model',
  'rules',
  'labelStyle',
  'ItemComponentLayout',
  'labelWidth',
  'labelPosition'
)
@observer
export default class FormItem extends React.Component {
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
    console.log('item validate');

    if (prop === void 0 || rules === void 0) {
      return;
    }
    // debugger
    //从rules根据prop中获取对应的校验规则，并根据trigger进行过滤
    const pureRules = mobx.toJS(rules[prop]) || [];
    const theRules = trigger
      ? pureRules.filter(rule => {
          // debugger
          //如果有trigger配置参数，提取对应的trigger规则，否则返回false，那么theRule就是空数组，就不进行校验
          if (rule.trigger) {
            if (_.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger);
            } else {
              return rule.trigger === trigger ? true : false;
            }
          } else {
            return false;
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
    const { prop, rules, duplex } = this.props;
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
      ItemComponentLayout,
      labelWidth,
      labelPosition,
      style,
      ...remain
    } = this.props;

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
    const labelPositionArr = labelPosition.split(':');
    const mainLabelPosition = labelPositionArr[0] || 'right';
    const viceLabelPosition = labelPositionArr[1] || 'center';
    const alignLabelPosition = labelPositionArr[2] || 'right';

    return (
      <Provider
        validateOnChange={this.validateOnChange}
        validateOnBlur={this.validateOnBlur}>
        <Flexbox
          {...remain}
          flexDirection={mainLabelPosition === 'top' ? 'column' : 'row'}
          alignItems={viceLabelPosition}>
          <Flexbox>
            <label
              className={`${label && 'i-form-label'} ${this.isRequired &&
                'ant-form-item-required'} ${labelPosition === 'top' &&
                'i-form-label-top'}`}
              style={{
                ...labelStyle,
                width: labelWidth > 0 ? labelWidth : 'auto',
                textAlign: alignLabelPosition,
              }}
              title={label}
              htmlFor={prop}>
              {label}
            </label>
          </Flexbox>
          <ItemComponentLayout className={`i-form-item`}>
            <div
              className={`i-form-item ${
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
          </ItemComponentLayout>
        </Flexbox>
      </Provider>
    );
  }
}

// setProps(FormItem, {
//   labelStyle: [null, PropTypes.object],
// });
