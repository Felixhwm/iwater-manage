import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { getRoleList, common } from '@/api';
import Breadcrumb from '@/components/breadcrumb/';
import MyModal from './modal'
import { Row, Col, Table, Button, Input, Pagination, message, Modal } from 'antd'

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
    const { isMobile, isSmallScreen, width } = this.props.size;
    const { pageNum, limit } = this.state.searchData;
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="角色管理"></Breadcrumb>
        <div className="main-container">
          <Row className="main-handle" type="flex" justify="space-between">
            <Col xxl={10} xl={10}lg={12} md={12} sm={24} xs={24}>
              <Button type="primary" onClick={() => this.showModal()} style={{width: 80}}>
                <i style={{backgroundImage: `url(${require('./img/add.png')})`}}/> 添加
              </Button>
              <Button type="primary" onClick={this.deleteHandle} style={{ marginLeft: 20, width: 80 }}>
                <i style={{backgroundImage: `url(${require('./img/del.png')})`}}/> 删除
                </Button>
              <Button type="primary" style={{ marginLeft: 20, width: 80 }}>
                <i style={{backgroundImage: `url(${require('./img/export.png')})`}}/>导出
              </Button>
            </Col>
            <Col xxl={10} xl={10}lg={12} md={12} sm={24} xs={24} style={{textAlign: width >768 && 'right'}}>
              <Input.Search 
                placeholder="输入内容以搜索"
                style={{ height: '100%', width: isSmallScreen ? '100%' : 270 }}/>
            </Col>
          </Row>
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
        {isMobile && <style>{`
          .ant-modal {
            margin: 0;
            padding: 0;
            top: 0;
            width: 100%!important;
          }
          .ant-modal *:not(button) {
            border-radius: 0!important;
            box-shadow: none!important;
          }
          .ant-modal-mask {
            background-color: #fff;
          }
          .base li {
            width: 100%!important;
          }
        `}</style>}
      </div>
    )
  }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Role)