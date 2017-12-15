## Introduce
这是一个基于express，react， recharts的图表渲染系统。

可以根据输入的参数，提供渲染的图表图片下载。


## api
```
url: /getImageByData
type: POST,
content-Type: application/json
params:
    title: '图表标题',
    settings: ['model1', 'model2'],
    type: '图表类型'
    data: []
```

* 图表类型 type的取值
    * pie //饼状图
    * lineChart //折线图
    * barChart //柱状图
    * rankingChart //排名图

## Usage

``` text
npm start
```



### Production

``` text
npm run production
```
