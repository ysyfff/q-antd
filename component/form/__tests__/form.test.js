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
  const model = observable({
    name: '',
    pwd: '',
  });
  let jj = null;
  const rules = observable({
    name: [
      {
        required: true,
        message: '必须填写',
        trigger: 'blur',
      },
      // {
      //   validator(rule, value, callback) {
      //     jj.validate('pwdRule').then((res) => {

      //     })
      //   },
      //   trigger: 'change'
      // }
    ],
    pwdRule: [
      {
        required: false,
        message: '',
        trigger: 'change',
      },
      {
        validator(rule, value, callback) {
          callback('可以了')
        }
      }
    ],
  });


  @observer
  class Demo extends React.Component {
    render() {
      return (
        <Form model={model} rules={rules} ref={ref => jj = ref}>
          <FormItem label="姓名" prop="name">
            <Input_ duplex="name" />
          </FormItem>
          <FormItem label="密码" prop="pwdRule">
            <Input_ duplex="pwd" />
          </FormItem>
        </Form>
      );
    }
  }

  const wrapper = mount(<Demo />);
  it('姓名为必填，label应该有必填星标', () => {
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
  it('改变姓名时，校验密码规则', () => {
    console.log('wtfffffffffffff')
    wrapper.find('input').at(0).simulate('change', { target: { value: 1 } });
    // wrapper.find('input').at(0).simulate('change', { target: { value: 1 } });
    console.log(wrapper.find('input').at(0).prop('value'), 'Niiiiiiiii')
    
      expect(wrapper.find('.ant-form-explain')).toHaveLength(1);

    // setTimeout(()=>{
    // expect(wrapper.find('.ant-form-explain')).toHaveLength(1);
    // expect(wrapper.find('.ant-form-explain').innerText).toBe('可以了呢是')
    // }, 0);
  })

  it('姓名2为非必填，label不能有必填星标', () => {
    expect(
      wrapper
        .find('label')
        .at(1)
        .hasClass('ant-form-item-required')
    ).toBe(false);
  });

  
});


