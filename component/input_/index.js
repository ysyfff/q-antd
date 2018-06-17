import duplexHOC from '../_util/duplex';
import { Input } from 'antd';

const Input_ = duplexHOC(Input);
Input_.TextArea_ = duplexHOC(Input.TextArea);

export default Input_;