import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TreeSelect, Tree, Layout } from 'antd'
import { common } from '@/api'
import './index.scss'

class OrganizationSelect extends Component {
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
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Tree.TreeNode title={item.label} key={item.value} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={item.label} key={item.value}/>
    });
  }
  render() {
    const{ type, size } = this.props
    return (
      type === 'select' ? (
        <TreeSelect {...this.props} treeData={this.state.treeData}/>
      ) : (
        size.isMobile ? null : <Layout.Sider width="180px">
          <Tree {...this.props}>
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
        </Layout.Sider>
      )
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(OrganizationSelect)
