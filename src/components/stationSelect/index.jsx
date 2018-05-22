import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { common } from '@/api'
import { Tree, TreeSelect, Layout } from 'antd'

class StationSelect extends React.Component {
  state = {
    treeData: [
      { title: '上海市', key: '310000', value: '310000' },
      { title: '江苏省', key: '320000', value: '320000' },
      { title: '浙江省', key: '330000', value: '330000' }
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
    const { type, size } = this.props
    return (
      type === 'select' ? (
          <div className="select">
            <TreeSelect 
              {...this.props} 
              labelInValue
              loadData={this.onLoadData} 
              treeNodeFilterProp="title"
              dropdownStyle={{maxHeight: 400}}>
              { this.renderTreeNodes(treeData) }
            </TreeSelect>
            <span className="ant-select-arrow span"/>
          </div>
      ) : (
        size.isMobile ? null : <Layout.Sider width="180px">
          <Tree loadData={this.onLoadData} {...this.props}>
            { this.renderTreeNodes(treeData) }
          </Tree>
        </Layout.Sider>
      )
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(StationSelect)