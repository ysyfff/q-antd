[![Build Status](https://www.travis-ci.org/ysyfff/q-antd.svg?branch=master&style=flat-square)](https://www.travis-ci.org/ysyfff/q-antd)

[![NPM downloads](http://img.shields.io/npm/dm/q-antd.svg?style=flat-square)](http://www.npmtrends.com/q-antd)

# 简介
q-antd是在antd的基础上，结合mobx，对antd中的表单元素进行二次改装和对Form的重写一个npm包，使得表单元素支持双工绑定，使得表单使用更简单，从而提高开发效率

q-antd最大的优势是：
1. 各个表单元素是双绑的，不需要调用onChange函数手动处理变化后的赋值操作
2. q-antd的form在使用上比antd的form简单很多，而且form内置了不少自定义布局，能满足绝大数情况下的布局，实在满足不了，可使用manualLayout=true，自定义布局

# 安装
`yarn add q-antd`
安装之前需要项目中已经安装了antd

# 使用

- [Form](#form)
- [表单元素](#fields)
- [Flexbox](#flexbox)
- [View](#view)
- [Text](#text)
- [A](#A)

## Form

### 使用说明
使用Form组件和FormItem组件进行布局
* 使用Form的model属性和表单元素的duplex属性，进行数据的双绑。
* 使用Form的rules属性进行表单元素的校验
  * 校验规则的写法参见[async-validator](https://github.com/yiminghe/async-validator)
  * 校验的触发，在各个规则中传入trigger属性，例如：trigger:'blur'或者trigger: ['blur', 'change']

### 使用示例
### 普通情况下

> 此情况下notice=observable({})，此时的search是mobx的对象

```JS
import mobx, { observable, action, transaction, spy } from 'mobx';

// 注意notice的定义
const notice = observable({
  alert: 1,
  phone: 1,
  phones: ['']
});
const noticeRule = observable({
  singlePhone: [
    { required: true, message: '必填', trigger: 'blur'},
    { ...rules.cellphone, trigger: ['blur', 'change']}
  ]
})
@observer
export default class Remind extends React.Component {
  render() {
    return (
      <Form model={notice} rules={noticeRule} ref={ref => this.remindForm = ref} labelWidth={80} labelPosition=":flex-start">
        <FormItem labelStyle={labelStyle} className="mb-13" label="弹窗提醒">
          <Select_ duplex="alert" style={{ width: 130 }}>
            <Option value={1}>开启</Option>
            <Option value={0}>关闭</Option>
          </Select_>
        </FormItem>
        <FormItem labelStyle={labelStyle} className="mb-13" label="电话提醒">
          <Select_ duplex="phone" style={{ width: 130 }}>
            <Option value={1}>开启</Option>
            <Option value={0}>关闭</Option>
          </Select_>
          {notice.phone === 1 &&
            <View clear mt={20}>
              {phones.map((item, i) => {
                return (
                  <View clear key={i} mb={i === phones.length - 1 ? 0 : 14}>
                    <FormItem prop="singlePhone" duplex={['phones', i]} labelWidth={0}>
                      <Input_ key={i} type_="vice" duplex={['phones', i]} style={{ width: 130 }} placeholder="请输入手机号" />
                    </FormItem>
                  </View>
                )
              })}
            </View>
          }
        </FormItem>
      </Form>
    )
  }
}
```

### 特殊情况下

> 此时的notice=observable.map({})，此时的search是mobx的map对象，在且仅在这种情况下才可以使用a.b.c

```JS
import mobx, { observable, action, transaction, spy } from 'mobx';

// 注意notice的定义
const notice=observable.map({
})
const noticeRule = observable({
  singlePhone: [
    { required: true, message: '必填', trigger: 'blur'},
    { ...rules.cellphone, trigger: ['blur', 'change']}
  ]
})
@observer
export default class Remind extends React.Component {
  render() {
    return (
      <Form model={notice} rules={noticeRule} ref={ref => this.remindForm = ref} labelWidth={80} labelPosition=":flex-start">
        <FormItem labelStyle={labelStyle} className="mb-13" label="弹窗提醒">
        
          {/* 注意duplex的取值 */}
          <Select_ duplex="a.b.c" style={{ width: 130 }}>
            <Option value={1}>开启</Option>
            <Option value={0}>关闭</Option>
          </Select_>
        </FormItem>
        <FormItem labelStyle={labelStyle} className="mb-13" label="电话提醒">

          {/* 注意duplex的取值 */}
          <Select_ duplex="b.c" style={{ width: 130 }}>
            <Option value={1}>开启</Option>
            <Option value={0}>关闭</Option>
          </Select_>
          {notice.phone === 1 &&
            <View clear mt={20}>
              {phones.map((item, i) => {
                return (
                  <View clear key={i} mb={i === phones.length - 1 ? 0 : 14}>
                    <FormItem prop="singlePhone" duplex={['phones', i]} labelWidth={0}>
                      <Input_ key={i} type_="vice" duplex={['phones', i]} style={{ width: 130 }} placeholder="请输入手机号" />
                    </FormItem>
                  </View>
                )
              })}
            </View>
          }
        </FormItem>
      </Form>
    )
  }
}
```

### 校验规则的使用说明

校验规则的使用分为两步

* 在Form上传入rules={noticeRule} 参见上面代码
* 在FormItem中传入prop="singlePhone"，如果是数组还需要传入duplex，duplex的取值和循环元素的取值一样，循环的元素注意加上key 参见上面代码

### API

> style,className等原有属性均支持

### Form方法

方法 | 说明 | 用法
---|---|---|
resetFields | 重置表单默认值 | this.xxxFrom.resetFields()
resetFieldsStyle| 重置校验过之后的样式 | this.xxxFrom.resetFieldsStyle()
validate| 校验表单，返回一个Promise实例，也支持传入回调函数处理 | this.xxxForm.validate().then((valid)=>{}) 或者 this.xxxForm.validate((valid)=>{})

#### Form属性

方法 | 说明 | 类型 | 默认值 | 必须
---|---|---|---|---|
model | mobx的observable对象，存储表单的数据 | object | - | Y
rules | mobx的observable对象或JS对象，验证表单的规则 | object | - | | 
inline | form表单的布局方式。设为true时，form的子元素按inline布局 | bool | false | |
layout | FormItem整体、Action以及各个FormItem的布局,用法可为‘:flex:block’，未设置的那个值回去默认值<br/>第一个值表示FormItem整体的布局，可取值flex和block<br/>第二个值表示Action的布局，可取值flex和block<br/>第三个值表示各个FormItem的布局，可取值flex和block | string | 'flex:block:block' | |
actionPosition | Action的位置，用法可为‘:flex-start’或‘bottom:’，未设置的那个值取默认值<br/>第一个值表示action相对于FormItem的位置，可取值right和bottom<br/>第二个值表示action局部的布局，有效值alignItem的值 | string | 'right:flex-end' | |
labelPosition | FormItem中label的位置，用法可为‘::right’，未设置的那个值取默认值<br/>第一个值表示label的宏观位置，取值为top或者left<br/>第二个值表示label在垂直方向的布局，有效值是alignItems的值<br/>第三个是label在水平方向的布局，取值为textAlign的值 | string | 'left:center:right' | |
fillCount | 每行FormItem的数量，如果最后一行FormItem数量<fillCount，会使用空的FormItem填充，以保证布局的对齐 | number | 1 | |
manualLayout | 手动布局，设为true时，上面的inline,layout,actionPosition,lablePosition,fillCount不再生效 | bool | false | |
labelWidth | label的宽度，设为0时，会被替换为'auto' | number | 0 | |
needCls | 设为false时，不再使用q-antd自带的样式className——i-form | bool | true | |

#### FormItem属性

方法 | 说明 | 类型 | 默认值 | 必须
---|---|---|---|---|
label | FormItem各项名称 | string | - |  |
labelStyle | label的style | object | - |  |
labelWidth | label的宽度 | number | 0 |  |
prop | 表单验证时候用到，若无此属性，不验证。取值为Form重rules属性中的key | number | - |  |

#### Action属性

方法 | 说明 | 类型 | 默认值 | 必须
---|---|---|---|---|



## Fields

### 特殊说明

* q-antd中的所有表单元素命名规则都是在antd的命名之后加上\_。比如Input在q-antd中就叫Input_;Input.TextArea在q-antd中就叫Input_.TextArea_
* 由于有些antd组件的源码存在缺陷，故做如下特殊说明
  * Mention_双绑的时候有bug，可使用antd的Mention
  * Select_, TreeSelect_双绑的值当且仅当为none(void 0的别名)的时候才显示placeholder

### 使用说明

* 每个元素都有一个duplex属性，此属性与Model或者Form组件的model属性结合起来完成双绑，duplex的值为model对象的key

#### Props

> Input_等输入框元素支持以下属性

### onKeyUp-enter
> onKeyUp-13和onKeyUp-enter是一样的效果，enter是13的别名，免除了记keyCode的麻烦

> 除了onKeyUp时间，所有react(html)支持的事件都支持，比如onKeyDown,onKeyPress等等

onKeyUp事件，`-enter`为__按键修饰符__[(参考vue按键修饰符)](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)，当输入回车的时候执行onKeyUp的回调

类型 | 默认值
---|---
function|-


### 支持按键修饰符列表

> 除了以下的别名，可以通过qAntd.config.keyCodes.enter=13进行扩展

别名 | keyCode
---|---
enter|13
right| 39
left| 37
up| 38
down| 40
del| 46
tab| 9
back| 8
esc| 27

### 使用示例

```JS
import React from 'react';
import mobx, { observable, action } from 'mobx';
import { observer, Provider } from 'mobx-react';
import { Radio, Select, TreeSelect } from 'antd';
const { Option } = Select;
const { TreeNode } = TreeSelect;
import {
  Input_,
  InputNumber_,
  Radio_,
  Checkbox_,
  AutoComplete_,
  Cascader_,
  DatePicker_,
  Select_,
  Slider_,
  Switch_,
  TreeSelect_,
  TimePicker_,
  Transfer_,
  // Mention_, //Mention_的双绑有问题，antd的实现有问题
  Rate_,
  Model,
  Form,
  View
} from 'q-antd';
const { MonthPicker_, WeekPicker_, RangePicker_ } = DatePicker_;
const cascaderOptions = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake'
    }]
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men'
    }]
  }]
}];
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i}`,
    description: `description of content${i}`,
    disabled: i % 3 < 1
  });
}
const targetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);
const search = observable({
  a: 1,
  aa: '我是TextArea',
  aaa: 1,
  b: true,
  c: '1',
  cc: 'Apple',
  d: true,
  e: ['Apple'],
  suggest: '',
  area: [],
  date: '2014-07-02',
  month: '2014-07-02',
  week: '2014-07-02',
  rangeStart: '2017-10-11',
  rangeEnd: '2018-01-10',
  inputNumber: 8,
  mention: '@afc163 ',
  rate: 1,
  radioGroup: 'Apple',
  radio: false,
  select: none,
  slider: 68,
  sliderRange: [10, 50],
  switch: true,
  treeSelect: none,
  time: '00:00:00',
  transfer: ['2', '5', '8']
});
@observer
export default class QAntd extends React.Component {
  render() {
    return (
      <Model model={search}>
        <View ml={30} mr={30}>
          <div>{JSON.stringify(mobx.toJS(search))}</div><br />
          
          <View clear block><Input_ duplex="a" placeholder="没有form的表单" /></View> Input_的使用<br />
          
          <View clear block><Input_.TextArea_ duplex="aa" rows={2} placeholder="没有form的表单" /></View> Input_.TextArea_的使用<br />
          
          <View clear block><InputNumber_ duplex="aaa" rows={2} placeholder="没有form的表单" /></View> InputNumber_的使用<br />
          
          <Radio_ duplex="b" >我是一个人</Radio_>Radio_的使用，单个Radio可将b设为true或者false <br />
          
          <Radio_.Group_ duplex="c">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
          </Radio_.Group_> Radio_.Group_的使用之用法一<br />
          
          <Radio_.Group_ duplex="cc" options={[
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' }
          ]} /> Radio_.Group_的使用之用法二<br />
          
          <Checkbox_ duplex="d">Banana</Checkbox_> Checkbox_的使用<br />
          
          <Checkbox_.Group_ options={[{ label: 'Apple', value: 'Apple' }, { label: 'Pear', value: 'Pear' }]} duplex="e" /> Checkbox_.Group_的使用<br />
          
          <Select_ style={{ width: 400 }} duplex="select" placeholder="select的双绑值为none的时候才能显示placeholder" >
            <Option value="Jack">Jack</Option>
            <Option value="ruler">ruler</Option>
          </Select_> Select_的使用<br />
          
          <AutoComplete_ duplex="suggest" dataSource={['1', '2', '3']}></AutoComplete_> AutoComplete_的使用 <br />
          
          <Cascader_ style={{ width: 400 }} duplex="area" options={cascaderOptions}></Cascader_> Cascader_的使用 <br />
          
          <DatePicker_ duplex="date" /> DatePicker_的使用 <br />
          
          <MonthPicker_ duplex="month" /> MonthPicker_的使用<br />
          
          <WeekPicker_ duplex="week" /> WeekPicker_的使用<br />
          
          <RangePicker_ duplex="rangeStart, rangeEnd" /> RangePicker_的使用 <br />
          
          <Rate_ duplex="rate" /> Rate_的使用<br />
          
          <Slider_ duplex="slider" min={0} max={100} /> Slider_的使用<br />
          
          <Slider_ range duplex="sliderRange" min={0} max={100} /> Slider_中range的使用<br />
          
          <Switch_ range duplex="switch" min={0} max={100} /> Switch_的使用<br />
          
          <TreeSelect_ treeDefaultExpandAll duplex="treeSelect" placeholder="Please select" >
            <TreeNode value="parent 1" title="parent 1" key="0-1">
              <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                <TreeNode value="leaf1" title="my leaf" key="random" />
                <TreeNode value="leaf2" title="your leaf" key="random1" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
              </TreeNode>
            </TreeNode>
          </TreeSelect_> TreeSelect_的使用<br />
          
          <TimePicker_ duplex="time" /> TimePicker_的使用<br />
          
          <Transfer_
            dataSource={mockData}
            duplex="transfer"
          /> Transfer_的使用<br />
        </View>
      </Model>
    )
  }
}
```



## Flexbox

对flex布局的简单封装，需要Flexbox, Flex, Block三个组件一起使用

### 示例

```JS
import {Flexbox} from 'q-antd'
const {Flex, Block} = Flexbox;

export default class Demo extends React.Component {
  render() {
    return (
      <Flexbox>
        <Flex flex={3}>
          什么是服务器端渲染(SSR)？<br/>
          Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。<br/>

          服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。
        </Flex>
        <Flex>
          这么牛
        </Flex>
        <Block>
          OK
        </Block>
      </Flexbox>
    )
  }
}
```

### Flexbox属性

> 除了以下属性，也支持style属性

#### alignItems
同style的alignItems

类型 | 默认值
---|---
string| -

#### jusitfyContent
同style的jusitfyContent

类型 | 默认值
---|---
string| -

#### flexDirection
同style的flexDirection

类型 | 默认值
---|---
string| -

### Flex属性

#### flex
同style的flex

类型 | 默认值
---|---
number| 1

### Block属性


## View

对div标签的升级，支持属性定义样式

### 示例

```JS
export default class Demo extends React.Component{
  render(){
    return(
      <View ml={20} mr={20} paddingTop={10} borderWidth={2} block clear>
        xxx
      </View>
    )
  }
}
```

### Props

> 除了以下属性，同时支持style属性以及具体的style的属性

#### ml
margin-left缩写
类型 | 默认值
---|---
number|-

#### mr
maring-right缩写
类型 | 默认值
---|---
number|-

#### pl
padding-left缩写
类型 | 默认值
---|---
number|-

#### pr
padding-right缩写
类型 | 默认值
---|---
number|-

#### type
View类型，有效值为oneOf([hp-20,hp-30,vp-20,vp-30])
类型 | 默认值
---|---
string|hp-20

#### block
View表现为inline-block
类型 | 默认值
---|---
bool|false

#### clear
取消type的默认值
类型 | 默认值
---|---
bool|false


## Text

文字标签

### 示例

```JS
export default class Demo extends React.Component{
  render(){
    return(
      <Text size="small" type="dark" bold italic ml={20}>
        提交
      </Text>
    )
  }
}
```

### Props

> 除了以下属性，同时支持style属性以及具体的style的属性

#### ml
margin-left缩写
类型 | 默认值
---|---
number|-

#### mr
maring-right缩写
类型 | 默认值
---|---
number|-

#### pl
padding-left缩写
类型 | 默认值
---|---
number|-

#### pr
padding-right缩写
类型 | 默认值
---|---
number|-

#### type
Text类型，有效值为
* normal
* dark
* primary
* primary-deep
* warning
* error
* success
* room-number
* remark
* main

类型 | 默认值
---|---
string|normal

#### size
字体大小，有有效值为
* small
* normal
* large

类型 | 默认值
---|---
string|normal


#### bold
是否为粗体

类型 | 默认值
---|---
bool|false

#### italic
是否为斜体

类型 | 默认值
---|---
bool|false


## A

A标签模拟button标签，由于antd的Button当为两个汉字的时候，两个汉字中间会有间隙

### 示例

```JS
export default class Demo extends React.Component{
  render(){
    return(
      <A onClick={e=>1}>
        提交
      </A>
    )
  }
}
```

