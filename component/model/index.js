/*
 * @Author: shiyong.yin
 * @Date: 2018-04-25 14:59:50
 * @Desc: 非Form形式的表单元素的使用
 * const search=observable({a: 1})
 * <Model model={search}>
 *  <Input_ duplex="a" />
 * </Model>
 */
import React from 'react';
import { action, observable } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { autobind } from 'core-decorators';

@observer
export default class Model extends React.Component {
  @observable duplexer = [];

  @autobind
  @action
  nilFunction() { }

  render() {
    const { model, children, ...remain } = this.props;
    return (
      <Provider
        model={model}
        duplexer={this.duplexer}
        validateOnChange={this.nilFunction}
        validateOnBlur={this.nilFunction}
        getDuplexFromElement={() => 1}
        {...remain}>
        {children}
      </Provider>
    );
  }
}
