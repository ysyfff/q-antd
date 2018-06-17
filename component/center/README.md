# 关于垂直居中

## component中使用Center来实现垂直水平居中

> 根据内容宽度自适应宽度

例子

```js
  <Center style={{ height: 400, backgroundColor: '#ddd' }}>
    <div style={{ backgroundColor: '#888' }}>jio</div>
  </Center>
```

## antd中使用Row Col来实现垂直水平居中

> 需要使用span来定义元素宽度

例子

```js
  <Row type="flex" justify="center" align="middle" style={{background: 'green', height: 200}}>
    <Col span={4} style={{background: 'blue'}}>
      Wtf
    </Col>
    <Col span={18}>
      <Input />
    </Col>
  </Row>
```