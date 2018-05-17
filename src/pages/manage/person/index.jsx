import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import MainHanle from '@/components/mainHandle'
import Pagination from '@/components/pagination'
import Delete from '@/components/delete'
import Alert from './alert'
import './index.scss'
import { Table } from 'antd'
import { getUserList, deleteUser, searchUser } from '@/api'

export default class App extends Component {
  state = {
    personList: [],
    total: 0,
    searchData: {
      limit: 17,
      pageNum: 1
    },
    selectedRowKeys: [],
    visible: false,
    rowData: {}
  }
  componentDidMount() {
    this.initData();
  }
  initData = async() => {
    const res = await getUserList({
      ...this.state.searchData
    });
    this.setState({
      personList: res.data.list,
      total: res.data.total
    })
  }
  searchHandle = async(condition) => {
    console.log(condition)
    const res = await searchUser({
      condition
    })
    this.setState({
      personList: res.data.list,
      total: res.data.total
    })
  }
  pageChangeHandle = async (pageNum) => {
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
  deleteHandle = () => {
    const keys = this.state.selectedRowKeys
    Delete(keys, deleteUser, this.initData)
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
    const { personList, total, visible, rowData, searchData } = this.state;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="人员管理"/>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle} onSearch={this.searchHandle}/>
          <Table
            dataSource={personList} 
            // expandedRowRender={record => 
            //   <div className="expand">
            //     <p>姓名：{record.fName}</p>
            //     <p>所属机构：{record.branchname}</p>
            //     <p>角色：{record.rolename}</p>
            //     <p>联系手机：{record.fTelephone1}</p>
            //     <p>座机：{record.fTelephone2}</p>
            //     <p dangerouslySetInnerHTML={{__html: '责任区域：' + record.area_name}}></p>
            //     <style>{`
            //       .expand p {
            //         line-height: 30px;
            //       }
            //     `}</style>
            //   </div>
            // }
            rowKey="fPid" 
            size="small" 
            rowSelection={this.rowSelection}
            pagination={false} 
            scroll={{ x: 800 }}>
            <Table.Column title="姓名" dataIndex="fName"/>
            <Table.Column title="所属机构" dataIndex="branchname"/>
            <Table.Column title="角色" dataIndex="rolename"/>
            <Table.Column title="联系手机" dataIndex="fTelephone1"/>
            <Table.Column title="责任区域" dataIndex="area_name" render={text => 
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            }/>
            <Table.Column title="服务标志" dataIndex="showstate" 
              render={(text,record) => 
                <span className={ `server-statu ${record.fState === '0' ? 'normal' : 'rest'}` }>{text}</span>
              }>
            </Table.Column>
            <Table.Column title="操作" width="90px" fixed="right" render={(text, record) => (
              <span className="span" onClick={() => this.showAlert(record)}>
                查看详情
              </span>
            )}/>
          </Table>
          <Pagination
            total={total} searchData={searchData}
            onChange={this.pageChangeHandle}/>
        </div>
        <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/>
      </div>
    )
  }
}
