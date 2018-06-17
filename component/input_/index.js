import { Input } from 'antd';
import duplexHOC from '../_util/duplex';

const Input_ = duplexHOC(Input);
Input_.TextArea_ = duplexHOC(Input.TextArea);

export default Input_;
