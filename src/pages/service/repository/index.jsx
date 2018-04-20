import React, { Component } from 'react';
import { Row, Col, Table, Pagination, Button, Divider, Select, Input } from 'antd';
import Breadcrumb from '@components/breadcrumb'
import { getRepositoryList, getRepositoryTypeList } from '@api';
const { Column } = Table;

export default class Repository extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositoryList: [],
      total: null,
      repositoryTypeList: [],
      searchData: {
        type: '0',
        typeId: 0,
        name: '',
        limit: 10,
        pageNum: 1
      }
    }
  }
  
  async initData() {
    const res = await getRepositoryList({
      ...this.state.searchData
    });
    this.setState({
      repositoryList: res.data.list,
      total: res.data.total
    })
  }
  async getRepositoryTypeList() {
    const res = await getRepositoryTypeList({
      type: this.state.searchData.type
    });
    const repositoryTypeList = res.data
    this.setState({ repositoryTypeList });
  }
  componentDidMount() {
    this.initData();
    this.getRepositoryTypeList();
  }
  pageChangeHandle = (pageNum) => {
    const searchData = this.state.searchData;
    searchData.pageNum = pageNum
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  keywordsSeach = (e) => {
    const searchData = this.state.searchData;
    searchData.name = e.target.value;
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  typeChange = (typeId) => {
    const searchData = this.state.searchData;
    searchData.typeId = typeId;
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  uploadHandle = () => {
    const { type } = this.state.searchData;
    const typeName = type === '0' ? 'document' : 'video'
    this.props.history.push({
      pathname: `/app/service/respository/upload/${typeName}`
    })
  }
  render() {
    const { repositoryList, total,repositoryTypeList } = this.state;
    const { limit, pageNum } = this.state.searchData;
    return (
      <div>
        <Breadcrumb first="服务中心" second="知识库">
          <Button type="primary" onClick={this.uploadHandle}>上传</Button>
        </Breadcrumb>
        <Row gutter={16} type="flex" justify="space-between">
            <Col xs={24} sm={12} md={8} lg={7} xl={5} xxl={4} className="mg-v-10">
              <Select
                style={{width: '100%'}}
                showSearch
                placeholder="请选择"
                optionFilterProp="children"
                onChange={this.typeChange}>
                {
                  repositoryTypeList.map(item => 
                    <Select.Option value={item.typeId} key={item.typeId}>{item.typeName}</Select.Option>
                  )
                }
              </Select>
            </Col>
            <Col xs={24} sm={12} md={8} lg={7} xl={5} xxl={4} className="mg-v-10">
              <Input.Search onInput={this.keywordsSeach} placeholder="请输入文件名称"/>
            </Col>
        </Row> 
        <Table bordered size="small" rowKey="fileId" pagination={false}
          dataSource={repositoryList} scroll={{ x: 555 }}>
          <Column title="文件" dataIndex="name"/>
          <Column title="格式" dataIndex="typeName"/>
          <Column title="浏览次数" dataIndex="browseTime"/>
          <Column title="下载次数" dataIndex="downLoadTime"/>
          <Column title="操作" width="195px"
            render={(text, record) => (
            <span>
              <Button type="primary" size="small">预览</Button><Divider type="vertical" />
              <Button type="primary" size="small">下载</Button><Divider type="vertical" />
              <Button type="danger" size="small">删除</Button>
            </span>
          )}/>
        </Table>
        <Pagination size="small" showQuickJumper 
          total={total} current={pageNum} pageSize={limit}
          showTotal={(total, range) => `共 ${this.state.total} 条`}
          onChange={this.pageChangeHandle}
        />  
      </div>
    )
  }
}
