import duplexHOC from '../_util/duplex';
import { Radio } from 'antd';

const Radio_ = duplexHOC(Radio);
Radio_.Group_ = duplexHOC(Radio.Group);

export default Radio_;