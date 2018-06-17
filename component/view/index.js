import React from 'react';
import PropTypes from 'prop-types';
import setProps from 'set-props';

export default class View extends React.Component {
  render() {
    const { type, children, className, mb, mr, mt, ml, block, clear, relative, absolute, style, ...other } = this.props;
    return (
      <div
        className={`${clear ? '' : `i-view-type-${type}`} ${block ? 'i-view-block' : ''}`}
        style={{
          marginBottom: mb,
          marginRight: mr,
          marginTop: mt,
          marginLeft: ml,
          position: relative
            ?
            'relative'
            :
            absolute
              ?
              'absolute'
              :
              'static',
          ...style, //style就是style
          ...other //其他属性也是style
        }}
      >
        {children}
      </div>
    )
  }
}

setProps(View, {
  type: ['hp-20', PropTypes.oneOf(['hp-20', 'hp-30', ''])],
  mb: [0, PropTypes.number],
  mr: [0, PropTypes.number],
  mt: [0, PropTypes.number],
  ml: [0, PropTypes.number],
  block: [false, PropTypes.bool],
  clear: [false, PropTypes.bool],
})