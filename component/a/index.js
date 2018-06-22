import React from 'react';

export default class A extends React.Component {
  render() {
    const { children, className, size, ...other } = this.props;

    return (
      <a
        href="javascript:void 0"
        className={`i-a ${className} i-a-${size}`}
        {...other}>
        {children}
      </a>
    );
  }
}
