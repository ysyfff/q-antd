import duplexHOC from '../_util/duplex';
import { DatePicker } from 'antd';

const DatePicker_ = duplexHOC(DatePicker);

DatePicker_.RangePicker_ = duplexHOC(DatePicker.RangePicker);
DatePicker_.MonthPicker_ = duplexHOC(DatePicker.MonthPicker);
DatePicker_.WeekPicker_ = duplexHOC(DatePicker.WeekPicker);

export default DatePicker_;
