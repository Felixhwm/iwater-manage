import React, { Component } from 'react'
import { getAreaList, deleteArea } from '@/api'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import { Table } from 'antd'

export default class componentName extends Component {
  state = {
    areaList: [],
    total: null,
    searchData: {
      limit: 16,
      pageNum: 1
    },
    loading: true,
    selectedRowKeys: [],
    visible: false,
    rowData: {}
  }
  componentDidMount() {
    this.initData();
  }
  initData = async() => {
    const res = await getAreaList({
      ...this.state.searchData
    });
    this.setState({
      areaList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    // const res = await searchUser({
    //   condition
    // })
    // this.setState({
    //   personList: res.data.list,
    //   total: res.data.total
    // })
  }
  pageChange = async(pageNum) => {
    await this.setState({
      searchData: {...this.state.searchData, pageNum}
    })
    this.initData();
  }
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete(keys, deleteArea, this.initData)
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
  render() {
    const { areaList, visible, rowData, total, searchData } = this.state
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="行政区域管理"/>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
          <Table
            dataSource={areaList} 
            rowKey="id" 
            size="small" 
            rowSelection={this.rowSelection}
            pagination={false} 
            scroll={{ x: 800 }}>
            <Table.Column title="区域名称" dataIndex="label"/>
            <Table.Column title="区域等级" dataIndex="fLevel" 
              render={(text,record) => 
                `测试${text}级`
              }/>
            <Table.Column title="上级区域名称" dataIndex="showname"/>
            <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
              <span className="span" onClick={() => this.showAlert(record)}>
                查看详情
              </span>
            )}/>
          </Table>
          <Pagination total={total} searchData={searchData} onChange={this.pageChange}/>
        </div>
        <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/>
      </div>
    )
  }
}