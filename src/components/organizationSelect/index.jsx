import React, { Component } from 'react'
import { TreeSelect } from 'antd'
import { common } from '@/api'

export default class componentName extends Component {
  state = {
    treeData: [],
  }
  initData = async() => {
    const res = await common({
      tradeCode: 'branch.selectAllBranches',
      id: '0000'
    });
    this.setState({
      treeData: res.branchInfo
    })
  }
  componentDidMount() {
    this.initData()
  }
  render() {
    return (
      <TreeSelect 
        {...this.props}
        treeData={this.state.treeData}
      />
    )
  }
}
