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
    name: ''
  })
  const rules = observable({
    pwd: [{
      required: true, message: '必须填写', trigger: 'blur'
    }]
  })

  @observer
  class Demo extends React.Component {
    render() {
      return (
        <Form model={model} rules={rules}>
          <FormItem label="姓名" prop="pwd">
            <Input_ duplex="name" />
          </FormItem>
        </Form>
      )
    }
  }

  const wrapper = mount(
    <Demo />
  )
  it('label should have the class', () => {
    // jest.runAllTimers();
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('label').hasClass('ant-form-item-required')).toBe(true)
    expect(wrapper.find('label').hasClass('i-form-label')).toBe(true)
  });

  const model2 = observable({
    name: '你猜不到'
  })

  @observer
  class DemoNoRules extends React.Component {
    render() {
      return (
        <Form model={model2}>
          <FormItem label="姓名" >
            <Input_ duplex="name" />
          </FormItem>
        </Form>
      )
    }
  }

  const wrapper2 = mount(
    <DemoNoRules />
  )
  it('it should run well while no rules prop', () => {
    expect(wrapper2.find('input').prop('value')).toBe('你猜不到')
  })
});
