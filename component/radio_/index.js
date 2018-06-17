import { Radio } from 'antd';
import duplexHOC from '../_util/duplex';

const Radio_ = duplexHOC(Radio);
Radio_.Group_ = duplexHOC(Radio.Group);

export default Radio_;
