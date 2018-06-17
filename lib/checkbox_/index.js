'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _duplex = require('../_util/duplex');

var _duplex2 = _interopRequireDefault(_duplex);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox_ = (0, _duplex2.default)(_antd.Checkbox);
Checkbox_.Group_ = (0, _duplex2.default)(_antd.Checkbox.Group);

exports.default = Checkbox_;