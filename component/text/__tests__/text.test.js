import React from 'react';
import enzyme from 'enzyme';
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
import Text from '../index';
const { observable, toJS } = mobx;
const { mount, render } = enzyme;

describe('Text test', () => {
  @observer
  class Demo extends React.Component {
    render() {
      return <Text center>你好</Text>;
    }
  }

  const wrapper = mount(<Demo />);

  it('text-align test', () => {
    console.log(JSON.stringify(wrapper.find('span').prop('style')), '888');
    expect(wrapper.find('span').prop('style').textAlign).toBe('center');
  });
});
