import React, { Component } from 'react'
import { TreeSelect, Tree } from 'antd'
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
    const{ type } = this.props
    return (
      type === 'select' ? (
        <TreeSelect {...this.props} treeData={this.state.treeData}/>
      ) : (
        <Tree {...this.props} treeData={this.state.treeData} />
      )
    )
  }
}
