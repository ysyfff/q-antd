import React from 'react';
import * as mobx from 'mobx';
import { mount, render } from 'enzyme';
import Model from '../../model/index';
import Input_ from '../index';
import { observer } from 'mobx-react';

const { observable } = mobx;

describe('测试Input', () => {
  const model = observable({ a: 1 });

  const wrapper = mount(
    <Model model={model}>
      <Input_ duplex="a" />
    </Model>
  )

  wrapper.find('input').simulate('change', { target: { value: 22 } });
  it('双绑view=>model', () => {
    expect(model.a).toBe(22);
  });

  it('双绑mdoel=>view', () => {
    model.a = 345;
    setTimeout(() => {
      expect(wrapper.find('input').value).toBe(345)
    }, 0);
  })

})

describe('测试a.b.c', () => {
  const model = observable.map({});

  @observer
  class Demo extends React.Component {
    render() {
      return (
        <Model model={model}>
          <div>
            <Input_ duplex="a.b.c" />
            <Input_ duplex="b.c" />
            <Input_ duplex="b.d" />
            <Input_ duplex="a.b.d.m.n" />
          </div>
        </Model>
      )
    }
  }

  const wrapper = mount(
    <Demo />
  );

  it('获取model.a.b.c的值', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 2345 } });
    expect(mobx.toJS(model).a.b.c).toBe(2345)
  })

  it('设置model.a.b.c的值', () => {
    model.set('a', { b: { c: '123' } });
    setTimeout(() => {
      expect(wrapper.find('input').at(0).prop('value')).toBe('123')
    }, 0);
  })

  it('获取model.b.c的值', () => {
    wrapper.find('input').at(1).simulate('change', { target: { value: 12 } });
    expect(mobx.toJS(model).b.c).toBe(12)
  })

  it('设置model.b.c的值', () => {
    model.set('b', { c: '121' });
    setTimeout(() => {
      expect(wrapper.find('input').at(1).prop('value')).toBe('121')
    }, 0);
  })

  it('获取model.b.d的值', () => {
    wrapper.find('input').at(2).simulate('change', { target: { value: 12 } });
    expect(mobx.toJS(model).b.d).toBe(12)
  })

  it('设置model.b.d的值', () => {
    model.set('b', { d: '121' });
    setTimeout(() => {
      expect(wrapper.find('input').at(2).prop('value')).toBe('121')
    }, 0);
  })

  it('获取model.a.b.d.m.n的值', () => {
    wrapper.find('input').at(3).simulate('change', { target: { value: 12 } });
    expect(mobx.toJS(model).a.b.d.m.n).toBe(12)
  })

  it('设置model.a.b.d.m.n的值', () => {
    model.set('a', { b: { d: { m: { n: '121' } } } });
    setTimeout(() => {
      expect(wrapper.find('input').at(3).prop('value')).toBe('121')
    }, 0);
  })
})
