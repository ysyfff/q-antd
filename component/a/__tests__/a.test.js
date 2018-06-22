import React from 'react';
import * as mobx from 'mobx';
import { mount } from 'enzyme';
import { observer } from 'mobx-react';
import A from '../index';

const { observable, toJS } = mobx;

describe('测试A', () => {
  const wrapper = mount(<A size="small">Hello</A>);
  it('检测className', () => {
    const a = wrapper.find('a');
    expect(a.hasClass('i-a-small')).toBe(true);
  });
});
