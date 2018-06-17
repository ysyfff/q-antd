import duplexHOC from '../_util/duplex';
import { Checkbox } from 'antd';

const Checkbox_ = duplexHOC(Checkbox);
Checkbox_.Group_ = duplexHOC(Checkbox.Group);

export default Checkbox_;