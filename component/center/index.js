import React, { Component } from 'react';

export default class Center extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, style = {}, className } = this.props;

    return (
      <div className={`i-center-wrap ${className}`} style={style}>
        {children}
      </div>
    );
  }
}
