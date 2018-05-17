import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getBranchList, deleteBranch } from '@/api'
import { Table } from 'antd'

class Branch extends Component {
  state = {
    visible: false,
    rowData: {},
    branchList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 10
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getBranchList({
      ...this.state.searchData
    });
    this.setState({
      branchList: res.data.list,
      total: res.data.total
    })
  }
  pageChangeHandle = async(pageNum) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum}
    })
    this.initData()
  }
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        selectedRowKeys
      })
    },
  }
  showAlert = (rowData = {}) => {
    this.setState({
      rowData,
      visible: true
    })
  }
  AlertTrigger = (ok) => {
    this.setState({
      visible: false
    })
    if(ok) this.initData();
  }
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete(keys, deleteBranch, this.initData)
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, branchList, rowData, total, searchData } = this.state;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="角色管理"></Breadcrumb>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle}/>
          <Table 
            dataSource={branchList} 
            rowKey="id" 
            size="small" 
            pagination={false} 
            scroll={{ x: 800 }}
            rowSelection={this.rowSelection}>
            <Table.Column title="名称" dataIndex="label"></Table.Column>
            <Table.Column title="级别" dataIndex="fLevel"></Table.Column>
            <Table.Column title="上级机构名称" dataIndex="branchname"></Table.Column>
            <Table.Column title="机构性质" dataIndex="showpropty"></Table.Column>
            <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
              <span className="span" onClick={() => this.showAlert(record)}>
                查看详情
              </span>
            )}></Table.Column>
          </Table>
          <Pagination 
            total={total} 
            searchData={searchData} 
            onChange={this.pageChangeHandle}/>  
        </div>
        <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/>
      </div>
    )
  }
}

export default Branch