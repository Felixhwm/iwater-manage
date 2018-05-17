import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './modal'
import { getRoleList, deleteRole } from '@/api'
import { Table } from 'antd'

class Role extends Component {
  state = {
    visible: false,
    submit: false,
    confirmLoading: false,
    rowData: {},
    roleList: [],
    total: null,
    searchData: {
      pageNum: 1,
      limit: 10
    },
    selectedRowKeys: []
  }
  initData = async() => {
    const { pageNum, limit } = this.state.searchData;
    const res = await getRoleList({
      pageNum,
      limit
    });
    this.setState({
      roleList: res.data.list,
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
  showModal = (rowData = {}) => {
    this.setState({
      rowData,
      visible: true
    })
  }
  modalEvent = (event) => {
    this.setState({
      visible: false
    })
    event === 'submit' && this.initData();
  }
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete(keys, deleteRole, this.initData)
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, roleList, rowData, total, searchData } = this.state;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="角色管理"></Breadcrumb>
        <div className="main-container">
          <MainHanle onAdd={this.showModal} onDelete={this.deleteHandle}/>
          <Table 
            dataSource={roleList} 
            rowKey="fRoleid" 
            size="small" 
            pagination={false} 
            scroll={{ x: 555 }}
            rowSelection={this.rowSelection}>
            <Table.Column title="角色名称" dataIndex="fName"></Table.Column>
            <Table.Column title="角色代码" dataIndex="fRoleid"></Table.Column>
            <Table.Column title="角色类型" dataIndex="fTypename"></Table.Column>
            <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
              <span className="span" onClick={() => this.showModal(record)}>
                查看详情
              </span>
            )}></Table.Column>
          </Table>
          <Pagination 
            total={total} 
            searchData={searchData} 
            onChange={this.pageChangeHandle}/>  
        </div>
        <Alert visible={visible} data={rowData} trigger={this.modalEvent}/>
      </div>
    )
  }
}

export default Role