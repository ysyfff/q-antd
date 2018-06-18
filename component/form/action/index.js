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

@observer
export default class Action extends React.Component {
  render() {
    const { children, style } = this.props;

    return <div style={style}>{children}</div>;
  }
}
