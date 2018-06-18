'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _antd = require('antd');

var _duplex = require('../_util/duplex');

var _duplex2 = _interopRequireDefault(_duplex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker_ = (0, _duplex2.default)(_antd.DatePicker);

DatePicker_.RangePicker_ = (0, _duplex2.default)(_antd.DatePicker.RangePicker);
DatePicker_.MonthPicker_ = (0, _duplex2.default)(_antd.DatePicker.MonthPicker);
DatePicker_.WeekPicker_ = (0, _duplex2.default)(_antd.DatePicker.WeekPicker);

exports.default = DatePicker_;