import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { getDeviceList, deleteDevice, searchDevice } from '@/api'
import { Table } from 'antd'

class Device extends Component {
  state = {
    visible: false,
    rowData: {},
    deviceList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 17
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const res = await getDeviceList({
      ...this.state.searchData
    });
    res.data && this.setState({
      deviceList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    const res = await searchDevice({
      condition
    })
    this.setState({
      deviceList: res.data.list,
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
    Delete(keys, deleteDevice, this.initData)
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, deviceList, rowData, total, searchData } = this.state;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="角色管理"></Breadcrumb>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
          <Table 
            dataSource={deviceList} 
            rowKey="fDeviceid" 
            size="small" 
            pagination={false} 
            scroll={{ x: 800 }}
            rowSelection={this.rowSelection}>
            <Table.Column title="设备名称" dataIndex="fDevname"></Table.Column>
            <Table.Column title="编号" dataIndex="fDeviceid"></Table.Column>
            <Table.Column title="类别" dataIndex="fDevtypename"></Table.Column>
            <Table.Column title="型号" dataIndex="fDevmodel"></Table.Column>
            <Table.Column title="安装日期" dataIndex="fAzdate"></Table.Column>
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

export default Device