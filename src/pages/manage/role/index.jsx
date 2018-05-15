import React, { Component } from 'react'
import './index.scss'
import { getRoleList, common } from '@/api'
import Breadcrumb from '@/components/breadcrumb/'
import MainHanle from '@/components/mainHandle/'
import MyModal from './modal'
import { Table, Pagination, message, Modal } from 'antd'

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
      limit: 18
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
  pageChangeHandle = (pageNum) => {
    this.setState({
      searchData: {...this.state.searchData, pageNum}
      }, () => {
      this.initData();
    })
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
    const { selectedRowKeys } = this.state;
    if(selectedRowKeys.length === 0) {
      message.warning('请先选中需要删除的行！');
      return 
    }
    Modal.confirm({
      title: '提示?',
      content: '您确定要删除选中的所有数据吗？',
      onOk: async() => {
        const fRoleid = selectedRowKeys.reduce((total, num) => total+','+num)
        await common({
          tradeCode: 'userrole.deleteByPrimaryKey',
          fRoleid
        }); 
        message.success('删除成功！');
        this.initData();
      }
    });
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const { visible, roleList, rowData, total } = this.state;
    const { pageNum, limit } = this.state.searchData;
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
          <Pagination size="small" showQuickJumper 
            total={total} current={pageNum} pageSize={limit}
            showTotal={(total, range) => `共 ${this.state.total} 条`}
            onChange={this.pageChangeHandle}
          />  
        </div>
        <MyModal visible={visible} data={rowData} trigger={this.modalEvent}/>
      </div>
    )
  }
}

export default Role