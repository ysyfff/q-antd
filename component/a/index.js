import React from 'react';

export default class A extends React.Component {

  render() {
    const { children, className, ...other } = this.props;

    return (
      <a href="javascript:void 0" className={`i-a ${className}`} {...other} >
        {children}
      </a>
    )
  }
}