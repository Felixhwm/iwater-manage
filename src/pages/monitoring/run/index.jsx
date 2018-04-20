import React, { Component } from 'react';
import { getAreaList } from '@api';
import Tree from './tree';
import Pie from './pie'
import Table from './table'
import Line from './line'
import STable from './sTable'
import Bar from './bar'
import Breadcrumb from '@components/breadcrumb'

class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: []
    }
  }
  async initData() {
    const res = await getAreaList({
      tradeCode: 'area.selectByPrimaryKey',
      fLevel: 1
    });
    this.setState({
      areaList: res.listInfo
    });
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    return (
      <div>
        <Breadcrumb fisrt="监控平台" second="地图监控"/>
        <Tree/>
        <div style={{display: 'inline-block'}}>
          <div style={{float: 'left', width: '1000px',height: '100%', borderRight: '1px solid #ccc', paddingRight: '20px'}}>
            <Pie/>
            <Table/>
          </div>
          <div style={{ width: 'auto', marginLeft: '1050px'}}>
            <Line/>
            <Bar/>
            <STable/>
          </div>
        </div> 
      </div>
    );
  }
}

export default Run;