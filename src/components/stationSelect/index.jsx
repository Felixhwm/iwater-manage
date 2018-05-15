import React from 'react'
import './index.scss'
import { common } from '@/api'
import { Tree, TreeSelect } from 'antd'

class TreeNav extends React.Component {
  state = {
    treeData: [
      { title: '中国', key: '3', value: '3' }
    ],
    level: 1
  } 
  renderTreeNodes = (data) => {
    const { type } = this.props
    return data.map((item) => {
      if (item.children) {
        return (
          type === 'select' ? (
            <TreeSelect.TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeSelect.TreeNode>
          ) : (
            <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </Tree.TreeNode>
          )
        );
      }
      return (
        type === 'select' ? ( 
          <TreeSelect.TreeNode {...item} dataRef={item} />
        ) : (
          <Tree.TreeNode {...item} dataRef={item} />
        )
      )
    })
  }
  onLoadData = (treeNode) => {
    return new Promise(async(resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const res = await common({
        tradeCode: 'area.selectByPrimaryKey',
        fUpbrno: treeNode.props.eventKey
      });
      var list = res.listInfo.map(item => 
        ({ title: item.label, key: item.id, value: item.id })
      );
      treeNode.props.dataRef.children = list;
      this.setState({
        treeData: [...this.state.treeData]
      });
      
      resolve();
    })
  }
  render() {
    const { treeData } = this.state
    const { type } = this.props
    return (
      type === 'select' ? (
        <TreeSelect {...this.props} loadData={this.onLoadData}>
          { this.renderTreeNodes(treeData) }
        </TreeSelect>
      ) : (
        <Tree {...this.props} loadData={this.onLoadData}>
          { this.renderTreeNodes(treeData) }
        </Tree>
      )
    )
  }
}

export default TreeNav