import React from 'react';
import enzyme from 'enzyme';
import * as mobx from 'mobx';
const { mount, render } = enzyme;
const { observable, toJS } = mobx;
import Form from '../index';
const { FormItem } = Form;
import Input_ from '../../input_';
import { observer } from 'mobx-react';

describe('测试Form', () => {
  // beforeEach(() => {
  //   jest.useFakeTimers();
  // });

  // afterEach(() => {
  //   jest.useRealTimers();
  // });

  const model = observable({
    name: '',
    name2: '',
  });
  const rules = observable({
    pwd: [
      {
        required: true,
        message: '必须填写',
        trigger: 'blur',
      },
    ],
    name: [
      {
        required: false,
        message: '',
        trigger: 'change',
      },
    ],
  });

  @observer
  class Demo extends React.Component {
    render() {
      return (
        <Form model={model} rules={rules}>
          <FormItem label="姓名" prop="pwd">
            <Input_ duplex="name" />
          </FormItem>
          <FormItem label="姓名2" prop="name">
            <Input_ duplex="name2" />
          </FormItem>
        </Form>
      );
    }
  }

  const wrapper = mount(<Demo />);
  it('label should have the class', () => {
    // jest.runAllTimers();
    // expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('label')
        .at(0)
        .hasClass('ant-form-item-required')
    ).toBe(true);
    expect(
      wrapper
        .find('label')
        .at(0)
        .hasClass('i-form-label')
    ).toBe(true);
  });

  it('label should not have the class', () => {
    expect(
      wrapper
        .find('label')
        .at(1)
        .hasClass('ant-form-item-required')
    ).toBe(false);
  });
});

describe('测试Item', () => {
  const model2 = observable({
    name: '你猜不到',
  });

  @observer
  class DemoNoRules extends React.Component {
    render() {
      return (
        <Form model={model2}>
          <FormItem label="姓名" requiredFlag={false}>
            <Input_ duplex="name" />
          </FormItem>
        </Form>
      );
    }
  }

  const wrapper2 = mount(<DemoNoRules />);
  it('it should run well while no rules prop', () => {
    expect(wrapper2.find('input').prop('value')).toBe('你猜不到');
  });
  it('requiredFlag support false', () => {
    expect(wrapper2.find('label').hasClass('ant-form-item-required')).toBe(
      false
    );
  });
  describe('测试Item rules', () => {
    const model = observable({
      phoneNumber: '',
      name: '尹士勇',
      verifyCode: '',
      password: '',
      passwordAgain: '',
    });
    const rules = observable({
      pwd: [
        {
          required: true,
          message: '必须填写',
          trigger: 'blur',
        },
      ],
    });
    @observer
    class DemoValidate extends React.Component {
      render() {
        return (
          <Form model={model} rules={rules}>
            <FormItem prop="pwd">
              <Input_ duplex="password" />
            </FormItem>
          </Form>
        );
      }
    }
    const wrapper = mount(<DemoValidate />);

    it('required=true, requiredFlag=true', () => {
      expect(wrapper.find('label').hasClass('ant-form-item-required')).toBe(
        true
      );
    });
    //改变属性
    it('test required when value is not empty', () => {
      wrapper.find('input').simulate('change', { target: { value: '23' } });
      expect(wrapper.find('.ant-form-explain')).toHaveLength(0);
    });

    it('test required when value is empty', () => {
      wrapper.find('input').simulate('change', { target: { value: '' } });
      expect(wrapper.find('.ant-form-explain')).toHaveLength(1);
    });
  });
});
