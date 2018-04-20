import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie';

export default class Pie extends React.Component {
  componentDidMount() {
    var myChart = echarts.init(document.getElementById('pie'));
  
  var option = {
      title: {
          text: '污水站情况运行总览',
          left: 'left'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['正常站点','水质异常站点','设备异常站点']
      },
      series : [
          {
              name: '站点数量',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:75, name:'正常站点'},
                  {value:10, name:'水质异常站点'},
                  {value:15, name:'设备异常站点'},
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };
  
    myChart.setOption(option)
  }
  render() {
    return (
      <div id="pie" style={{ width: 600, height: 300 }}></div>
    )
  }
}