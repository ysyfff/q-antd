import React from 'react';
import PropTypes from 'prop-types';
import setProps from 'set-props';

export default class Text extends React.Component {
  render() {
    const {
      type,
      size,
      className,
      children,
      bold,
      italic,
      ml,
      mr,
      pl,
      pr,
      style,
      center,
      left,
      right,
      ...remain
    } = this.props;
    return (
      <span
        className={`i-text-type-${type} i-text-size-${size} ${className} ${
          bold ? 'i-text-bold' : ''
          } ${italic ? 'i-text-italic' : ''}`}
        style={{
          marginLeft: ml,
          marginRight: mr,
          paddingLeft: pl,
          paddingRight: pr,
          textAlign: center ? 'center' :
            left ? 'left' :
              right ? 'right' : 'inherit',
          ...style,
        }}
        {...remain}>
        {children}
      </span>
    );
  }
}

setProps(Text, {
  size: ['normal', PropTypes.string],
  type: ['normal', PropTypes.string],
  bold: [false, PropTypes.bool],
  center: [false, PropTypes.bool],
  left: [false, PropTypes.bool],
  rights: [false, PropTypes.bool],
});
