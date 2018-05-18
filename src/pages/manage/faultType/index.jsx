import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getFaultTypeList, deleteFaultType } from '@/api'
import { Table } from 'antd'

class FaultType extends Component {
  state = {
    visible: false,
    rowData: {},
    faultTypeList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getFaultTypeList({
      ...this.state.searchData
    });
    res.data && this.setState({
      faultTypeList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    // const res = await searchStation({
    //   condition
    // })
    // this.setState({
    //   personList: res.data.list,
    //   total: res.data.total
    // })
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
    Delete(keys, deleteFaultType, this.initData)
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, faultTypeList, rowData, total, searchData } = this.state;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="角色管理"></Breadcrumb>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
          <Table 
            dataSource={faultTypeList} 
            rowKey="id" 
            size="small" 
            pagination={false} 
            scroll={{ x: 800 }}
            rowSelection={this.rowSelection}>
            <Table.Column title="故障大类名称" dataIndex="fClass"></Table.Column>
            <Table.Column title="故障小类名称" dataIndex="fPart"></Table.Column>
            <Table.Column title="故障编号" dataIndex="fFaultnum"></Table.Column>
            <Table.Column title="解决方案" dataIndex="fSolution"></Table.Column>
            <Table.Column title="备注" dataIndex="fPad"></Table.Column>
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

export default FaultType