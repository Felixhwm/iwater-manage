import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
export default class Bar extends React.Component {
  bar() {
    var myChart = echarts.init(document.getElementById('bar'));
    myChart.setOption({
      title: { text: '柱状图' },
      tooltip: {},
      xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
  componentDidMount() {
    this.bar()
  }
  render() {
    return (
        <div id="bar" style={{ width: 500, height: 300 }}></div>
    )
  }
}