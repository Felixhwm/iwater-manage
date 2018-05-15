import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb/'
import MainHanle from '@/components/mainHandle/'
import Alert from './alert'
import './index.scss'
import { Table, Pagination, message, Modal } from 'antd'
import { getUserList, common } from '@/api'

export default class App extends Component {
  state = {
    personList: [],
    total: null,
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
        const fPid = selectedRowKeys.reduce((total, num) => total+','+num)
        await common({
          tradeCode: 'user.deleteByPrimaryKey',
          fPid
        }); 
        message.success('删除成功！');
        this.initData();
      }
    });
  }
  showAlert = (rowData) => {
    console.log(rowData ? 0 : 1)
    this.setState({
      rowData: rowData ? { title: '添加' } : {...rowData, title: '编辑'},
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
    const { personList, total, visible, rowData } = this.state;
    const { pageNum, limit } = this.state.searchData;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="人员管理"/>
        <div className="main-container">
          <MainHanle onAdd={this.showAlert} onDelete={this.deleteHandle}/>
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
            size="small" showQuickJumper 
            total={total} current={pageNum} pageSize={limit}
            showTotal={(total, range) => `共 ${this.state.total} 条`}
            onChange={this.pageChangeHandle}/>
        </div>
        <Alert visible={visible} data={rowData} trigger={this.AlertTrigger}/>
      </div>
    )
  }
}
