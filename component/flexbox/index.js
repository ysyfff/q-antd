import React from 'react';

export default class Flexbox extends React.Component {
  render() {
    const {
      style,
      children,
      alignItems,
      justifyContent,
      flexDirection,
      ...remain
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          alignItems,
          justifyContent,
          flexDirection,
          ...style,
        }}
        {...remain}>
        {children}
      </div>
    );
  }
}

class Block extends React.Component {
  render() {
    const { style, children, ...remain } = this.props;
    return (
      <div style={{ ...style }} {...remain}>
        {children}
      </div>
    );
  }
}

class Flex extends React.Component {
  render() {
    const { style, children, flex = 1, ...remain } = this.props;

    return (
      <div style={{ flex, ...style }} {...remain}>
        {children}
      </div>
    );
  }
}

Flexbox.Flex = Flex;
Flexbox.Block = Block;
