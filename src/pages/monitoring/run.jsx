import React, { Component } from 'react';
import { getAreaList } from '@api';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

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
        <Tree>
          {
            this.state.areaList.map(item => 
              <TreeNode title={item.label} key={item.id}></TreeNode>
            )
          }
        </Tree>
      </div>
    );
  }
}

export default Run;