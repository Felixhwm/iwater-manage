import React, { Component } from 'react'
import Breadcrumb from '@/components/breadcrumb/'
import './index.scss'
import { Table, Button, Pagination } from 'antd'
import { getUserList } from '@/api'

export default class App extends Component {
  state = {
    personList: [],
    total: null,
    searchData: {
      limit: 10,
      pageNum: 1
    }
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
  render() {
    const { personList, total } = this.state;
    const { pageNum, limit } = this.state.searchData;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="人员管理"/>
        <div className="main-container">
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
            pagination={false} 
            scroll={{ x: 800 }}>
            <Table.Column title="姓名" dataIndex="fName"/>
            <Table.Column title="所属机构" dataIndex="branchname"/>
            <Table.Column title="角色" dataIndex="rolename"/>
            <Table.Column title="联系手机" dataIndex="fTelephone1"/>
            <Table.Column title="座机" dataIndex="fTelephone2"/>
            <Table.Column title="责任区域" dataIndex="area_name" render={text => 
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            }/>
            <Table.Column title="服务标志" dataIndex="showstate" 
              render={(text,record) => 
                <span className={ `server-statu ${record.fState === '0' ? 'normal' : 'rest'}` }>{text}</span>
              }>
            </Table.Column>
          </Table>
          <Pagination
            size="small" showQuickJumper 
            total={total} current={pageNum} pageSize={limit}
            showTotal={(total, range) => `共 ${this.state.total} 条`}
            onChange={this.pageChangeHandle}/>
        </div>
      </div>
    )
  }
}
